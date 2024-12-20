import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWeather } from "../../store/citySlice";
import { AppDispatch } from "../../store/store";
import { CityCardProps } from "../../interfaces/weatherInterfaces";
import "./styles.scss";

const CityCard: React.FC<CityCardProps> = ({
  cityName,
  temperature,
  description,
  icon,
  onRemove,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRefresh = () => {
    dispatch(fetchWeather(cityName));
  };

  const handleCardClick = () => {
    navigate(`/city/${cityName}`);
  };

  return (
    <div className="city-card" onClick={handleCardClick}>
      <div className="city-card__city-name">{cityName}</div>
      <div className="city-card__wrapper">
        <div>
          <img
            className="city-card__city-icon"
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="weather icon"
          />
          <div className="city-card__weather-info">
            <p>{description}</p>
            <p>{Math.round(temperature)}°C</p>
          </div>
        </div>
        <div className="city-card__buttons">
          <button
            className="city-card__update-button"
            onClick={(e) => {
              e.stopPropagation();
              handleRefresh();
            }}
          >
            Refresh
          </button>
          <button
            className="city-card__remove-button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
