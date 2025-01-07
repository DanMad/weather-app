import utils from 'helpers/utils';

const getColorScheme = () => {
  const defaultColorScheme = `{
    "background": "var(--color-uvi-low)",
    "foreground": "var(--color-black)"
  }`;

  return JSON.parse(
    window.localStorage.getItem('colorScheme') || defaultColorScheme,
  );
};

const getForecast = (location, units) => {
  return getForecasts().find((forecast) =>
    utils.isSubsetEqual(forecast, { location, units }),
  );
};

const getForecasts = () => {
  return JSON.parse(window.localStorage.getItem('forecasts') || '[]');
};

const isExistingColorScheme = (colorScheme) => {
  return utils.isEqual(getColorScheme(), colorScheme);
};

const isExistingForecast = (location, units) => {
  return getForecasts().some((forecast) =>
    utils.isSubsetEqual(forecast, { location, units }),
  );
};

const removeExpiredForecasts = () => {
  const nextForecasts = getForecasts().filter(
    (forecast) => !utils.isExpiredForecast(forecast),
  );

  window.localStorage.setItem('forecasts', JSON.stringify(nextForecasts));
};

const setColorScheme = (nextColorScheme) => {
  window.localStorage.setItem('colorScheme', JSON.stringify(nextColorScheme));
};

const setForecast = (nextForecast) => {
  const nextForecasts = getForecasts().filter((forecast) => {
    return !utils.isSubsetEqual(forecast, {
      location: nextForecast.location,
      units: nextForecast.units,
    });
  });

  nextForecasts.push(nextForecast);

  window.localStorage.setItem('forecasts', JSON.stringify(nextForecasts));
};

const store = {
  getColorScheme,
  getForecast,
  isExistingColorScheme,
  isExistingForecast,
  removeExpiredForecasts,
  setColorScheme,
  setForecast,
};

export default store;
