import { verify, Secret } from 'jsonwebtoken'
import { authConfig } from 'src/utils/authConfig';
import { generatePolicy } from 'src/utils/generatePolicy';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import AppError from 'src/utils/AppError';
import { Roles } from 'src/domain/User';

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
  role: string
}

export const adminAuthorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  if (!event.authorizationToken) {
    throw new AppError('Falha ao autenticar o usuário');
  }

  const [, token] = event.authorizationToken.split(' ');
 
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);
    const { sub, role } = decoded as ITokenPayload

    if (role !== Roles.ADMIN) {
      throw new AppError('Falha ao autenticar o usuário');
    }

    console.log('valid from customAuthorizer', decoded);
    return generatePolicy(sub, 'Allow', event.methodArn)

  } catch (err) {
    throw new AppError('Falha ao autenticar o usuário');
  }
}
