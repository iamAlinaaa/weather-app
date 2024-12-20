import '@testing-library/jest-dom'; 
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

process.env.VITE_OPEN_WEATHER_API_KEY = '37a3c2d23245d57d2ae3cd675fa693b9';
