const isDev = process.env.NODE_ENV === 'development';

export const server = isDev ? 'http://localhost:3000' : '';
