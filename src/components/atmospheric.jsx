import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Header from 'components/header';
import Icon from 'components/icon';
import { Context } from 'components/provider';
import utils from 'helpers/utils';
import 'components/atmospheric.scss';

function Atmospheric(props) {
  const context = useContext(Context);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const className = classNames('atmospheric', { 'is-ready': isReady });
  const pressure = utils.toFormattedNumber(props.pressure);
  const unit = context.forecast.units === 'imperial' ? 'mph' : 'km/h';

  return (
    <section className={className}>
      <Header>Atmospheric</Header>
      <div className="atmospheric__inner">
        <ul className="atmospheric__list">
          <li className="atmospheric__item">
            <span className="atmospheric__label">Humidity</span>
            <Icon type="humidity" />
            <span className="atmospheric__value">{props.humidity}%</span>
          </li>
          <li className="atmospheric__item">
            <span className="atmospheric__label">Pressure</span>
            <Icon type="pressure" />
            <span className="atmospheric__value">{pressure} hPa</span>
          </li>
          <li className="atmospheric__item">
            <span className="atmospheric__label">Wind</span>
            <Icon type="wind" />
            <span className="atmospheric__value">
              {props.windSpeed} {unit}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

Atmospheric.displayName = 'Atmospheric';

Atmospheric.propTypes = {
  humidity: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
};

export default Atmospheric;
