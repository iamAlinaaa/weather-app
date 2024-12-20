import { configureStore } from '@reduxjs/toolkit';
import cityReducer, { fetchWeather, removeCity } from '../store/citySlice';

describe('citySlice', () => {
  let store: any;


  beforeEach(() => {
    store = configureStore({
      reducer: { city: cityReducer },
    });
  });

  it('should handle add city action', async () => {
    // Мокаем API вызов (если fetchWeather использует API)
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        // Возвращаем моки данных для Киева
        name: 'Kyiv',
        weather: [{ description: 'Clear sky', icon: '01d' }],
        main: { temp: 5 },
      }),
    });

    // Диспатчим асинхронный экшен
    await store.dispatch(fetchWeather('Kyiv'));

    // Получаем актуальное состояние
    const state = store.getState().city;

    // Проверяем, что Киев добавлен в список
    expect(state.cities).toHaveLength(1);
    expect(state.cities[0].cityName).toBe('Kyiv');
    expect(state.cities[0].temperature).toBe(5);
    expect(state.cities[0].description).toBe('Clear sky');
  });

  it('should handle remove city action', () => {
    // Сначала добавим Киев, чтобы было что удалять
    store.dispatch(fetchWeather('Kyiv'));

    // Проверяем, что Киев добавлен
    let state = store.getState().city;
    expect(state.cities).toHaveLength(1);

    // Теперь удалим Киев
    store.dispatch(removeCity('Kyiv'));

    // Проверяем, что Киев удален
    state = store.getState().city;
    expect(state.cities).toHaveLength(0);
  });
});
