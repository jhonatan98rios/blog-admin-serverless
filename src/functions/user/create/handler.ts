import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CreateUserController } from './CreateUserController';
import Database from 'opt/nodejs/infra/data/database';
import schema from './schema';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Database({
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASS!,
  collection: process.env.DATABASE_NAME!,
})

const userController = new CreateUserController()

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
 
  const { user, mail, password, consent } = event.body

  try {    
    await database.connect()

    const response = await userController.create({ user, mail, password, consent })

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


export const main = middyfy(create);
