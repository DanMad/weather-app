import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import isEqual from 'lodash/isEqual';

dayjs.extend(timezone);
dayjs.extend(utc);

const isExpiredForecast = (forecast) => {
  const now = dayjs().tz(forecast.timezone);

  const lastUpdated = dayjs.unix(forecast.lastUpdated).tz(forecast.timezone);
  const isExpired = lastUpdated.isBefore(now.startOf('hour'));

  if (isExpired) {
    console.log('isExpired');
  }

  const sunriseTime = dayjs
    .unix(forecast.current.sunrise)
    .tz(forecast.timezone);

  const isSunriseEvent =
    now.isAfter(sunriseTime) && now.isBefore(sunriseTime.add(1, 'minute'));

  if (isSunriseEvent) {
    console.log('isSunriseEvent');
  }

  const isAfterSunriseEvent =
    now.isAfter(sunriseTime.add(20, 'minute')) &&
    now.isBefore(sunriseTime.add(21, 'minute'));

  if (isAfterSunriseEvent) {
    console.log('isAfterSunriseEvent');
  }

  const sunsetTime = dayjs.unix(forecast.current.sunset).tz(forecast.timezone);

  const isSunsetEvent =
    now.isAfter(sunsetTime) && now.isBefore(sunsetTime.add(1, 'minute'));

  if (isSunsetEvent) {
    console.log('isSunsetEvent');
  }

  const isAfterSunsetEvent =
    now.isAfter(sunsetTime.add(20, 'minute')) &&
    now.isBefore(sunsetTime.add(21, 'minute'));

  if (isAfterSunsetEvent) {
    console.log('isAfterSunsetEvent');
  }

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

const toRange = (min, max) => {
  let range = min;

  if (min < max) {
    range = `${min}–${max}`;
  } else if (min > max) {
    range = `${max}–${min}`;
  }

  return range;
};

const utils = {
  isEqual,
  isExpiredForecast,
  isSubsetEqual,
  toFormattedNumber,
  toRange,
};

export default utils;
