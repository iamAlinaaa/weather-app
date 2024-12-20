import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchWeather, removeCity } from "../../store/citySlice";
import CityCard from "../CityCard/CityCard";
import "./styles.scss";

const CityList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    cities,
    loading,
    error: apiError,
  } = useSelector((state: RootState) => state.city);

  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState<string>("");

  const handleCityInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCityInput(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  const handleAddCity = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedCityInput = cityInput.trim().toLowerCase();
      setError("");

      if (!cityInput.trim()) {
        setError("City name cannot be empty.");
        return;
      }

      if (
        cities.some((city) => city.cityName.toLowerCase() === trimmedCityInput)
      ) {
        setError("City already exists in the list.");
        return;
      }

      dispatch(fetchWeather(cityInput));

      setCityInput("");
    },
    [cityInput, cities, dispatch]
  );

  const handleRemoveCity = useCallback(
    (cityName: string) => {
      dispatch(removeCity(cityName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError]);

  // load from localStorage
  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("cities") || "[]");
    if (savedCities.length) {
      savedCities.forEach((cityName: string) => {
        if (!cities.some((city) => city?.cityName === cityName)) {
          dispatch(fetchWeather(cityName));
        }
      });
    }
  }, [dispatch, cities]);

  return (
    <div>
      <div className="background-image" />
      <div className="city-list">
        <form onSubmit={handleAddCity} className="city-list__form">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            placeholder="Enter city name"
            className={`city-list__input ${error ? "input-error" : ""}`}
          />
          <button type="submit" className="city-list__button">
            Add
          </button>
        </form>

        {error && <p className="city-list__error">{error}</p>}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {cities.length === 0 && !loading && (
          <p className="city-list__no-cities">No cities added</p>
        )}

        <div className="city-list__cards-container">
          {cities.map((city) => (
            <CityCard
              key={city?.cityName}
              {...city}
              onRemove={() => handleRemoveCity(city.cityName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityList;
