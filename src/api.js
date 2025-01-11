import axios from 'axios';

const getForecast = async (location, units) => {
  const params = { location, units };
  const route = 'https://api.danielmaddison.io/forecast';

  const response = await axios.get(route, { params, timeout: 10000 });

  return response.data;
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
  const route = 'https://api.danielmaddison.io/location';

  if (city) {
    params.city = city;
  } else {
    const currentPosition = await getCurrentPosition();

    params.lat = currentPosition.coords.latitude;
    params.lon = currentPosition.coords.longitude;
  }

  const response = await axios.get(route, { params, timeout: 10000 });

  return response.data;
};

const api = { getForecast, getLocation };

export default api;
