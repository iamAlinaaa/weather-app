import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

// Назначаем их глобально с явным указанием типа
global.TextEncoder = NodeTextEncoder as unknown as typeof globalThis.TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

// jest.setup.js
globalThis.import.meta = {
    env: {
      VITE_OPEN_WEATHER_API_KEY: '37a3c2d23245d57d2ae3cd675fa693b9',
    },
  };
  
