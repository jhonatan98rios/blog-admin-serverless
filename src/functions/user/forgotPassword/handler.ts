import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as dotenv from 'dotenv'
import { ForgotPasswordController } from './ForgotPasswordController';
import Database from 'opt/nodejs/infra/data/database';
import schema from './schema';

dotenv.config()

const database = new Database({
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASS!,
  collection: process.env.DATABASE_NAME!,
})

const userController = new ForgotPasswordController()

const forgotPassword: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const { mail } = event.body

  try {    
    await database.connect()

    const response = await userController.forgotPassword(mail)

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


export const main = middyfy(forgotPassword);
