export default {
  type: "object",
  properties: {
    currentPassword: { type: 'string' },
    password: { type: 'string' },
    passwordConfirmation: { type: 'string' },
  },
  required: ['currentPassword', 'password', 'passwordConfirmation']
} as const;
