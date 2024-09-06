import { handler } from "../../handlers/hello";
import { APIGatewayProxyEvent } from "aws-lambda";

describe("Hello handler", () => {
  it("should return a 200 status code", async () => {
    const event = {} as APIGatewayProxyEvent;

    const result = await handler(event);
    console.log("Hello i am the", result);

    expect(result.statusCode).toBe(200);
  });

  it("should return a JSON body with a message", async () => {
    const event = {} as APIGatewayProxyEvent;
    const result = await handler(event);

    const body = JSON.parse(result.body);
    expect(body.message).toBe("Hello from serverless v4!");
  });
});
