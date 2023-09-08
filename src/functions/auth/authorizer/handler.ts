import { verify, Secret } from 'jsonwebtoken'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

import { authConfig } from 'opt/nodejs/infra/utils/authConfig';
import { generatePolicy } from 'opt/nodejs/infra/utils/generatePolicy';
import AppError from "opt/nodejs/infra/utils/AppError"

export const authorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  if (!event.authorizationToken) {
    throw new AppError('Falha ao autenticar o usuário');
  }

  const [, token] = event.authorizationToken.split(' ');
 
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);
    console.log('valid from customAuthorizer', decoded);
    return generatePolicy(decoded.sub, 'Allow', event.methodArn)

  } catch (err) {
    throw new AppError('Falha ao autenticar o usuário');
  }
}
