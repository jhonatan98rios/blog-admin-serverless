import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { UserController } from 'src/controlllers/UserController';
import Database from 'src/data/database';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Database({
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASS!,
  collection: process.env.DATABASE_NAME!,
})

const userController = new UserController()

const getUser = async (event) => { 
  try {    
    await database.connect()

    const response = await userController.readOne(event.queryStringParameters.user)
    return formatJSONResponse({
      response
    });

  } catch (err) {

    console.log(err)

    return formatJSONResponse({
      err
    });

  }
}


export const main = middyfy(getUser);
