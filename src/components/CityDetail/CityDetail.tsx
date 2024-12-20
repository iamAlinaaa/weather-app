import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchHourlyForecast } from "../../store/citySlice";
import HourlyTemperatureChart from "../HourlyTemperatureChart/HourlyTemperatureChart";
import "./styles.scss";

const CityDetail: React.FC = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const city = useSelector((state: RootState) =>
    state.city.cities.find((city) => city.cityName === cityName)
  );

  const hourlyData = useSelector(
    (state: RootState) =>
      state.city.hourlyCityWeather.find(
        (hourly) => hourly.cityName === cityName
      )?.hourlyData
  );
  const labels = useSelector(
    (state: RootState) =>
      state.city.hourlyCityWeather.find(
        (hourly) => hourly.cityName === cityName
      )?.hourlyLabels
  );

  const loading = useSelector((state: RootState) => state.city.loading);
  const error = useSelector((state: RootState) => state.city.error);

  useEffect(() => {
    if (!city) return;

    if (!hourlyData || !labels) {
      dispatch(fetchHourlyForecast(city.cityName));
    }
  }, [city, hourlyData, labels, dispatch]);

  if (!city) {
    return <div>City not found</div>;
  }

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="background-image" />
      <div className="city-detail">
        <h2 className="city-detail__title">{city.cityName}</h2>
        <div className="city-detail__wrapper">
          <div className="city-detail__current">
            <img
              className="city-card__city-icon"
              src={`http://openweathermap.org/img/wn/${city.icon}.png`}
              alt="weather icon"
            />
            <p className="city-detail__description">{city.description}</p>
            <p className="city-detail__temperature">
              {Math.round(city.temperature)}°C
            </p>
          </div>
          <div className="city-detail__next">
            <p className="city-detail__info">
              Humidity: <span>{city.details.main.humidity}%</span>
            </p>
            <p className="city-detail__info">
              Pressure: <span>{city.details.main.pressure} hPa</span>
            </p>
            <p className="city-detail__info">
              Wind Speed: <span>{city.details.wind.speed} m/s</span>
            </p>
            <p className="city-detail__info">
              Wind Direction: <span>{city.details.wind.deg}°</span>
            </p>
            <p className="city-detail__info">
              Cloudiness: <span>{city.details.clouds.all}%</span>
            </p>
          </div>
        </div>
        <h3 className="city-detail__subtitle">Hourly Temperature</h3>
        {hourlyData && labels ? (
          <HourlyTemperatureChart labels={labels} hourlyData={hourlyData} />
        ) : (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetail;
