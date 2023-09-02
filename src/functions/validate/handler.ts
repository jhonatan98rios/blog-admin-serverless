import { verify, Secret } from 'jsonwebtoken'
import { middyfy } from '@libs/lambda';
import { authConfig } from 'src/utils/authConfig';
import { generatePolicy } from 'src/utils/generatePolicy';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import AppError from 'src/utils/AppError';

const validate = async (event: APIGatewayTokenAuthorizerEvent) => {
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

export const main = middyfy(validate);
