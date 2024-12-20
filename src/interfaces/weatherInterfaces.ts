export interface CityWeather {
  cityName: string;
  temperature: number;
  description: string;
  icon: string;
  details: {
    main: {
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
  };
}

export interface HourlyCityWeather {
  cityName: string;
  hourlyData: number[];
  hourlyLabels: string[];
}

export interface CityState {
  cities: CityWeather[];
  hourlyCityWeather: HourlyCityWeather[];
  loading: boolean;
  error: string | null;
}

export interface CityCardProps {
  cityName: string;
  temperature: number;
  description: string;
  icon: string;
  onRemove: () => void;
}

export interface HourlyTemperatureChartProps {
  labels: string[];
  hourlyData: number[];
}

export interface HourlyForecastItem {
  dt: number;
  main: {
    temp: number;
  };
}
