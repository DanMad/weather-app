import axios from 'axios';

const getForecast = async (location, units) => {
  const params = { location, units };
  const route = `${process.env.REACT_APP_API_URL}/forecast`;

  try {
    const response = await axios.get(route, { params, timeout: 10000 });

    return response.data;
  } catch (error) {
    throw new Error('forecastFailed');
  }
};

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('User denied the request for Geolocation'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information is unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('The request to get user location timed out'));
              break;
            case error.UNKNOWN_ERROR:
            default:
              reject(new Error('An unknown error occurred'));
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        },
      );
    }
  });
};

const getLocation = async (city) => {
  const params = {};
  const route = `${process.env.REACT_APP_API_URL}/location`;

  if (city) {
    params.city = city;
  } else {
    try {
      const currentPosition = await getCurrentPosition();

      params.lat = currentPosition.coords.latitude;
      params.lon = currentPosition.coords.longitude;
    } catch (error) {
      throw new Error('currentPositionDenied');
    }
  }

  try {
    const response = await axios.get(route, { params, timeout: 10000 });

    return response.data;
  } catch (error) {
    throw new Error('locationFailed');
  }
};

const api = { getForecast, getLocation };

export default api;
