export default {
  type: "object",
  properties: {
    user: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['user', 'password']
} as const;
