export const NatsStreamingMock = {
  emit: jest.fn().mockImplementation((subject: string, message: any) => {
    console.log(`Message émis sur ${subject}:`, message);
    return { subscribe: jest.fn() };
  }),
  close: jest.fn().mockImplementation(() => {
    console.log('Connexion NATS fermée');
  }),
  publish: jest.fn().mockResolvedValue(null),  // pour les tests async
};
