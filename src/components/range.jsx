import { useMemo } from 'react';
import 'components/range.scss';

function Range(props) {
  const style = useMemo(() => {
    return {
      fill: {
        marginRight: `${((props.max - props.high) * 100) / (props.max - props.min)}%`,
        marginLeft: `${((props.low - props.min) * 100) / (props.max - props.min)}%`,
      },
      ...(props.current !== undefined && {
        line: {
          marginLeft: `${((props.current - props.low) * 100) / (props.high - props.low)}%`,
        },
      }),
    };
  }, [props.current, props.high, props.low, props.max, props.min]);

  return (
    <div className="range">
      <span className="range__value">
        {props.low}
        {props.unit}
      </span>
      <div className="range__track">
        <div className="range__fill" style={style.fill}>
          {style.line && <div className="range__line" style={style.line} />}
        </div>
      </div>
      <span className="range__value">
        {props.high}
        {props.unit}
      </span>
    </div>
  );
}

Range.displayName = 'Range';

export default Range;
