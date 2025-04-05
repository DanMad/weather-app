import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import Grid from 'components/grid';
import GridItem from 'components/grid-item';
import Header from 'components/header';
import Icon from 'components/icon';
import { Context } from 'components/provider';
import 'components/hourly-forecast.scss';

function HourlyForecast(props) {
  const context = useContext(Context);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const className = classNames('hourly-forecast', { 'is-ready': isReady });
  const unit = context.forecast.units === 'imperial' ? 'ºF' : 'ºC';

  return (
    <section className={className}>
      <Header>Hourly Forecast</Header>
      <div className="hourly-forecast__inner">
        <Grid>
          {props.hourly.map((item) => (
            <GridItem key={item.id}>
              <span className="hourly-forecast__label">{item.hour}</span>
              <Icon type={item.icon} />
              <span className="hourly-forecast__value">
                {item.temp}
                {unit}
              </span>
            </GridItem>
          ))}
        </Grid>
      </div>
    </section>
  );
}

HourlyForecast.displayName = 'HourlyForecast';

export default HourlyForecast;
