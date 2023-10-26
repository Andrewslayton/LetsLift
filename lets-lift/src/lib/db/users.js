import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./client.js";

export async function createNewUser(user) {
  const input = {
    // PutItemInput
    TableName: process.env.AWS_USER_TABLENAME,
    Item: {
      user_id: {
        S: user.id,
      },
      email: {
        S: user.email,
      },
      name: {
        S: user.name,
      },
      image: {
        S: user.image,
      },
    },
  };
  const command = new PutItemCommand(input);
  const response = await client.send(command);
}

export async function getUserById(user_id) {
  const input = {
    TableName: process.env.AWS_USER_TABLENAME,
    Key: {
      user_id: {
        S: user_id,
      },
    },
  };
  try {
    const command = new GetItemCommand(input);
    const response = await client.send(command);
    return response.Item;
  } catch (error) {
    console.error(error);
  }
}
