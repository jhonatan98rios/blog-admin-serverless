import type { AWS } from '@serverless/typescript';

import healthCheck from '@functions/healthCheck';
import getUser from '@functions/getUser';
import getAllUsers from '@functions/getAllUsers'
import login from '@functions/login';
import checkIn from '@functions/checkIn';
import create from '@functions/create';
import logout from '@functions/logout';
import forgotPassword from '@functions/forgotPassword'
import resetPassword from '@functions/resetPassword'
import validate from '@functions/validate'

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
  functions: { healthCheck, getAllUsers, getUser, login, checkIn, create, logout, forgotPassword, resetPassword, validate },
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
