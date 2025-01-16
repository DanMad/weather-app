import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useInterval } from 'react-use';
import api from 'helpers/api';
import dom from 'helpers/dom';
import store from 'helpers/store';
import utils from 'helpers/utils';
import Atmospheric from 'components/atmospheric';
import Copyright from 'components/copyright';
import CurrentForecast from 'components/current-forecast';
import DailyForecast from 'components/daily-forecast';
import Error from 'components/error';
import HourlyForecast from 'components/hourly-forecast';
import Preloader from 'components/preloader';
import { Context } from 'components/provider';
import UvIndex from 'components/uv-index';
import 'app.scss';

function App() {
  const context = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get('city');
  const units =
    searchParams.get('units') === 'imperial' ? 'imperial' : 'metric';

  useEffect(() => {
    (async () => {
      store.removeExpiredForecasts();

      const location = await api.getLocation(city);
      const forecast = store.isExistingForecast(location, units)
        ? store.getForecast(location, units)
        : await api.getForecast(location, units);

      await dom.setColorScheme(forecast.colorScheme);
      dom.setTitle(`The Weather in ${location.city}`);

      context.setForecast(forecast);

      // setSearchParams({ city: location.city, units });

      store.setColorScheme(forecast.colorScheme);
      store.setForecast(forecast);
    })();
  }, []);

  useInterval(() => {
    (async () => {
      console.log('firing interval');
      if (!utils.isExpiredForecast(context.forecast)) {
        return;
      }

      console.log('Expired forecast, fetching new data...');

      store.removeExpiredForecasts();

      const location = await api.getLocation(city);
      const forecast = await api.getForecast(location, units);

      await dom.setColorScheme(forecast.colorScheme);
      dom.setTitle(`The Weather in ${location.city}`);

      context.setForecast(forecast);

      store.setColorScheme(forecast.colorScheme);
      store.setForecast(forecast);
    })();
  }, 60000);

  if (!context.isReady) {
    return <Preloader />;
  }

  if (context.error) {
    return <Error />;
  }

  return (
    <>
      <div className="layout">
        <div className="layout__inner">
          <div className="layout__item">
            <CurrentForecast
              {...context.forecast.current}
              city={context.forecast.location.city}
            />
            <UvIndex {...context.forecast.current} />
            <Atmospheric {...context.forecast.current} />
          </div>
          <div className="layout__item">
            <HourlyForecast hourly={context.forecast.hourly} />
            <DailyForecast
              daily={context.forecast.daily}
              temp={context.forecast.current.temp}
            />
          </div>
        </div>
        <Copyright />
      </div>
    </>
  );
}

App.displayName = 'App';

export default App;
