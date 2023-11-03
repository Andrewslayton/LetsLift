import {
  PutItemCommand,
  GetItemCommand,
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
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
      location: {
        S: `${location.lat.toString()},${location.lng.toString()}`,
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

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" }); //import from client.js

export async function getWorkoutsByLoc(location, workoutPlural, currUser) {
  const tableName = process.env.AWS_WORKOUT_TABLENAME;
  const todayTimestamp = Math.floor(new Date().getTime() / 1000); // Get current timestamp in seconds
  console.log(location, workoutPlural, currUser)

  const locationScanParams = {
    TableName: tableName,
    FilterExpression: "#location = :location",
    ExpressionAttributeNames: {
      "#location": "location",
    },
    ExpressionAttributeValues: {
      ":location": { S: location },
    },
  };

  try {
    const locationData = await dynamoDBClient.send(
      new ScanCommand(locationScanParams)
    );

    const filteredItems = locationData.Items.filter((item) => {
      return true;
    });

    const matchingItems = [];

    for (const item of filteredItems) {
      const workouts = item.workouts.L.map((workout) => workout.S);

      // Check if all workouts in the 'workout' array are included in the list
      const allWorkoutsMatch = workoutPlural.every((singleWorkout) =>
        workouts.includes(singleWorkout)
      );

      if (allWorkoutsMatch) {
        matchingItems.push(item);
      }
    }
    const uniqueUsers = Array.from(
      new Set(
        matchingItems
          .map((item) => item.user_id.S)
          .filter((item) => item !== currUser)
      )
    );
    const latestWorkouts = uniqueUsers.map((user) => {
      const userWorkouts = matchingItems.filter(
        (item) => item.user_id.S === user
      );
      const latestWorkout = userWorkouts.reduce((a, b) =>
        new Date(parseInt(a.timestamp.S) * 1000) >
        new Date(parseInt(b.timestamp.S) * 1000)
          ? a
          : b
      );
      return latestWorkout;
    });
    return latestWorkouts;
  } catch (error) {
    console.error("Error scanning DynamoDB:", error);
  }
}
