export default {
  type: "object",
  properties: {
    mail: { type: 'string' },
    token: { type: 'string' },
    password: { type: 'string' },
    passwordConfirmation: { type: 'string' }
  },
  required: ['mail', 'token', 'password', 'passwordConfirmation']
} as const;
