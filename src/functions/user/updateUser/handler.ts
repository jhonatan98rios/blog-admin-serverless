import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { UpdateUserController } from './UpdateUserController';
import schema from './schema';
import Database from 'opt/nodejs/infra/data/database';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Database({
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASS!,
  collection: process.env.DATABASE_NAME!,
})

const userController = new UpdateUserController()

const updateUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const username = event.queryStringParameters.user
  const { currentPassword, password, passwordConfirmation } = event.body

  try {    
    await database.connect()

    const response = await userController.update({ username, currentPassword, password, passwordConfirmation })

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


export const main = middyfy(updateUser);
