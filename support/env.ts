import dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL ?? '',
  testUserEmail: process.env.TEST_USER_EMAIL ?? '',
  testUserPassword: process.env.TEST_USER_PASSWORD ?? '',
};