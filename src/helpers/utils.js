import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isEqual from 'lodash/isEqual';

dayjs.extend(timezone);
dayjs.extend(utc);

const isExpiredForecast = (forecast) => {
  const now = dayjs().tz(forecast.timezone);

  const lastUpdated = dayjs.unix(forecast.lastUpdated).tz(forecast.timezone);
  const isExpired = lastUpdated.isBefore(now.startOf('hour'));

  const sunriseTime = dayjs
    .unix(forecast.current.sunrise)
    .tz(forecast.timezone);

  const isSunriseEvent =
    now.isAfter(sunriseTime) && now.isBefore(sunriseTime.add(1, 'minute'));

  const isAfterSunriseEvent =
    now.isAfter(sunriseTime.add(20, 'minute')) &&
    now.isBefore(sunriseTime.add(21, 'minute'));

  const sunsetTime = dayjs.unix(forecast.current.sunset).tz(forecast.timezone);

  const isSunsetEvent =
    now.isAfter(sunsetTime) && now.isBefore(sunsetTime.add(1, 'minute'));

  const isAfterSunsetEvent =
    now.isAfter(sunsetTime.add(20, 'minute')) &&
    now.isBefore(sunsetTime.add(21, 'minute'));

  return (
    isExpired ||
    isSunriseEvent ||
    isAfterSunriseEvent ||
    isSunsetEvent ||
    isAfterSunsetEvent
  );
};

const isSubsetEqual = (object, partialObject) => {
  const keys = Object.keys(partialObject);
  return keys.every((key) => isEqual(object[key], partialObject[key]));
};

const toFormattedNumber = (number, format = 'en-AU') => {
  return number.toLocaleString(format);
};

const utils = {
  isEqual,
  isExpiredForecast,
  isSubsetEqual,
  toFormattedNumber,
};

export default utils;
