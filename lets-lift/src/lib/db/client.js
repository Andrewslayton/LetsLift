import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";

export const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});
