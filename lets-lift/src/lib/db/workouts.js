import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./client.js";

export async function createNewWorkout(user_id, workouts, location) {
  const input = {
    // PutItemInput
    TableName: process.env.AWS_WORKOUT_TABLENAME,
    Item: {
      user_id: {
        S: user_id,
      },
      workouts: {
        L: workouts.map((workout) => ({
          S: workout,
        })),
      },
      lat : {
        S: location.lat.toString(),
      },
      lng : {
        S: location.lng.toString(),
      },
      timestamp: {
        S: Date.now().toString(),
      },
    },
  };
  const command = new PutItemCommand(input);
  const response = await client.send(command);
}

export async function getWorkoutById(lift_id) {
  const input = {
    TableName: process.env.AWS_WORKOUT_TABLENAME,
    Key: {
      lift_id: {
        S: lift_id,
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

