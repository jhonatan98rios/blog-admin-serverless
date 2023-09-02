export default {
  type: "object",
  properties: {
    user: { type: 'string' },
    mail: { type: 'string' },
    password: { type: 'string' },
    consent: { type: 'boolean' },
  },
  required: ['user', 'mail', 'password', 'consent']
} as const;
