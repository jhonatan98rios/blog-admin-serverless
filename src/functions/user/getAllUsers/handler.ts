import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ReadAllUsersController } from './ReadAllUsersController';
import * as dotenv from 'dotenv'

dotenv.config()

const userController = new ReadAllUsersController()

const getAllUsers = async () => { 
  try {    
    const response = await userController.readAll()
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

export const main = middyfy(getAllUsers);