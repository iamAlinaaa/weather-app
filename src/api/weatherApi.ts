const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const HOURLY_FORECAST_BASE_URL =
  "https://api.openweathermap.org/data/2.5/forecast";

interface WeatherData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
  }>;
}

export const fetchCurrentWeather = async (cityName: string) => {
  try {
    const response = await fetch(
      `${WEATHER_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.status}`);
    }

    const data = await response.json();
    return {
      cityName: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      details: data,
    };
  } catch (err: unknown) {
    throw new Error(err instanceof Error ? err.message : "Error occurred");
  }
};

export const fetchHourlyWeather = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${HOURLY_FORECAST_BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unknown error");
    } else {
      throw new Error("Error occurred");
    }
  }
};
