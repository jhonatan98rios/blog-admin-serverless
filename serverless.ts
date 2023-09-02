import type { AWS } from '@serverless/typescript';

import healthCheck from '@functions/healthCheck';

import create from '@functions/user/create';
import getAllUsers from '@functions/user/getAllUsers';
import getUser from '@functions/user/getUser';
import updateUser from '@functions/user/updateUser'
import updateUserRole from '@functions/user/updateUserRole'
import forgotPassword from '@functions/user/forgotPassword'
import resetPassword from '@functions/user/resetPassword'

import login from '@functions/session/login';
import checkIn from '@functions/session/checkIn';
import logout from '@functions/session/logout';

import authorizer from '@functions/auth/authorizer'
import adminAuthorizer from '@functions/auth/adminAuthorizer'


const serverlessConfiguration: AWS = {
  service: 'blog-post-admin',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { 
    healthCheck, 
    getAllUsers, getUser, 
    login, checkIn, logout,
    create, updateUser, updateUserRole,
    forgotPassword, resetPassword, 
    authorizer, adminAuthorizer
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
