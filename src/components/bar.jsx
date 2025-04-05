import { useEffect, useMemo, useState } from 'react';
import 'components/bar.scss';

function Bar(props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const current = props.current < props.max ? props.current : props.max;

  const style = useMemo(() => {
    return {
      fill: {
        marginRight: isReady
          ? `${((props.max - current) * 100) / props.max}%`
          : '100%',
      },
    };
  }, [props.current, props.max, isReady]);

  return (
    <div className="bar">
      <span className="bar__value">{props.min}</span>
      <div className="bar__track">
        <div className="bar__fill" style={style.fill}>
          <div className="bar__line">
            <span className="bar__label">{props.label}</span>
            {current > props.min && current < props.max && (
              <span className="bar__label">{current}</span>
            )}
          </div>
        </div>
      </div>
      <span className="bar__value">{props.max}+</span>
    </div>
  );
}

Bar.displayName = 'Bar';

export default Bar;
