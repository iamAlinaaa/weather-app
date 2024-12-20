import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather, fetchHourlyWeather } from "../api/weatherApi";
import { CityState, HourlyForecastItem } from "../interfaces/weatherInterfaces";

const initialState: CityState = {
  cities: [],
  hourlyCityWeather: [],
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "cities/fetchWeather",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const weather = await fetchCurrentWeather(cityName);
      return weather;
    } catch (error) {
      console.error("Error fetching hourly weather data:", error);
      return rejectWithValue(
        "Error fetching weather data. Please try again later."
      );
    }
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  "cities/fetchHourlyForecast",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const hourlyForecast = await fetchHourlyWeather(cityName);
      const temperatures = hourlyForecast.list
        .slice(0, 24)
        .map((item: HourlyForecastItem) => item.main.temp);
      const times = hourlyForecast.list
        .slice(0, 24)
        .map((item: HourlyForecastItem) =>
          new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      return { cityName, hourlyData: temperatures, hourlyLabels: times };
    } catch (error) {
      console.error("Error fetching hourly weather data:", error);
      return rejectWithValue("Error fetching hourly weather data");
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    removeCity: (state, action) => {
      const cityNameToRemove = action.payload;
      state.cities = state.cities.filter(
        (city) => city.cityName !== cityNameToRemove
      );
      // delete from localStorage
      const updatedCities = state.cities.map((city) => city.cityName);
      localStorage.setItem("cities", JSON.stringify(updatedCities));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const existingCity = state.cities.find(
          (city) => city.cityName === action.payload.cityName
        );
        if (existingCity) {
          state.cities = state.cities.map((city) =>
            city.cityName === action.payload.cityName ? action.payload : city
          );
        } else {
          state.cities.push(action.payload);
        }

        // save to localStorage
        const updatedCities = state.cities.map((city) => city.cityName);
        localStorage.setItem("cities", JSON.stringify(updatedCities));
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        const existingHourlyData = state.hourlyCityWeather.find(
          (hourly) => hourly.cityName === action.payload.cityName
        );
        if (existingHourlyData) {
          state.hourlyCityWeather = state.hourlyCityWeather.map((hourly) =>
            hourly.cityName === action.payload.cityName
              ? { ...hourly, ...action.payload }
              : hourly
          );
        } else {
          state.hourlyCityWeather.push(action.payload);
        }
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeCity } = citySlice.actions;

export default citySlice.reducer;
