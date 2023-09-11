import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ReadOneUserController } from './ReadOneUserController';
import * as dotenv from 'dotenv'

dotenv.config()

const userController = new ReadOneUserController()

const getUser = async (event) => { 
  try {    
    const { user } = event.queryStringParameters
    const response = await userController.readOne(user)
    
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
