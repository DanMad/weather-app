import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Context } from 'provider';
import Icon from 'components/icon';
import 'components/current-forecast.scss';

function CurrentForecast(props) {
  const context = useContext(Context);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleTransitionEnd = (event) => {
    event.target.style.transition = 'none';
  };

  const className = classNames('current-forecast', { ready: isReady });
  const unit = context.forecast.units === 'imperial' ? 'ºF' : 'ºC';

  return (
    <section className={className}>
      <header style={{ display: 'none' }}>
        <h2>Current Forecast</h2>
      </header>
      <div
        className="current-forecast__metadata"
        onTransitionEnd={handleTransitionEnd}
      >
        <h3 className="current-forecast__heading">{props.city}</h3>
        <span className="current-forecast__label">{props.date}</span>
      </div>
      <Icon size="176" type={props.icon} />
      <div className="current-forecast__summary">
        <h3 className="current-forecast__heading">
          {props.temp}
          {unit}
        </h3>
        <span className="current-forecast__label">
          Feels like {props.feelsLike}
          {unit}
        </span>
      </div>
    </section>
  );
}

CurrentForecast.displayName = 'CurrentForecast';

CurrentForecast.propTypes = {
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  feelsLike: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
};

export default CurrentForecast;
