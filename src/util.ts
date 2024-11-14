import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL is not defined');
}
export const API_URL = process.env.REACT_APP_API_URL


