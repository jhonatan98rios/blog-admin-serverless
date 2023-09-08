import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CheckInUserController } from './CheckInUserController';
import schema from './schema';
import Database from 'opt/nodejs/infra/data/database';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Database({
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASS!,
  collection: process.env.DATABASE_NAME!,
})

const userController = new CheckInUserController()

const checkIn: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const { token } = event.body

  try {    
    await database.connect()
    const response = await userController.checkIn(token)

    return formatJSONResponse({
      response
    });

  } catch (err) {

    console.log(err)

    return formatJSONResponse({
      err
    });
  }
};


export const main = middyfy(checkIn);
