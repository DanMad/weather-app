import classNames from 'classnames';
import {
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Header from 'components/header';
import Icon from 'components/icon';
import { Context } from 'components/provider';
import Range from 'components/range';
import 'components/daily-forecast.scss';

function DailyForecast(props) {
  const context = useContext(Context);
  const items = useRef([]);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const itemWidths = items.current.map((item) => {
      const highItem = item.querySelector('.range__value:nth-of-type(2)');
      const lowItem = item.querySelector('.range__value:nth-of-type(1)');

      return {
        high: highItem.offsetWidth,
        low: lowItem.offsetWidth,
      };
    });

    const lowItemMaxWidth = Math.max(...itemWidths.map((w) => w.low));
    const highItemMaxWidth = Math.max(...itemWidths.map((w) => w.high));

    items.current.forEach((item) => {
      const highItem = item.querySelector('.range__value:nth-of-type(2)');
      const lowItem = item.querySelector('.range__value:nth-of-type(1)');

      highItem.style.minWidth = `${highItemMaxWidth / 16}rem`;
      lowItem.style.minWidth = `${lowItemMaxWidth / 16}rem`;
    });
  }, [props.daily]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const setRef = useCallback((node, i) => {
    items.current[i] = node;
  }, []);

  const temp = useMemo(() => {
    let max = null;
    let min = null;

    props.daily.forEach((item) => {
      if (max === null || item.high > max) {
        max = item.high;
      }
      if (min === null || item.low < min) {
        min = item.low;
      }
    });

    return {
      max,
      min,
    };
  }, [props.daily]);

  const className = classNames('daily-forecast', { 'is-ready': isReady });
  const unit = context.forecast.units === 'imperial' ? 'ºF' : 'ºC';

  return (
    <section className={className}>
      <Header>Daily Forecast</Header>
      <div className="daily-forecast__inner">
        <ul className="daily-forecast__list">
          {props.daily.map((item, i) => (
            <div
              className="daily-forecast__item"
              key={item.id}
              ref={(node) => setRef(node, i)}
            >
              <span className="daily-forecast__label">{item.day}</span>
              <Icon type={item.icon} />
              <Range
                current={!i ? props.temp : undefined}
                high={item.high}
                low={item.low}
                max={temp.max}
                min={temp.min}
                unit={unit}
              />
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

DailyForecast.displayName = 'DailyForecast';

export default DailyForecast;
