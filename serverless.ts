import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "tixit-microservices-template",
  frameworkVersion: "4",
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    stage: "${opt:stage , 'dev'}",
    region: "${opt:region, 'us-east-1'}" as any,
    environment: {
      STAGE: "${self:provider.stage}",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*", "sqs:*", "sns:*", "events:*"],
            Resource: "*",
          },
        ],
      },
    },
  },
  functions: {
    hello: {
      handler: "src/handlers/hello.handler",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },
  },
  package: { individually: true },
  resources: {
    Resources: {
      MyTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:service}-${self:provider.stage}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
