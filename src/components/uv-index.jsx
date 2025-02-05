import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Bar from 'components/bar';
import Header from 'components/header';
import 'components/uv-index.scss';

function UvIndex(props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const className = classNames('uv-index', { 'is-ready': isReady });

  return (
    <section className={className}>
      <Header>UV Index</Header>
      <div className="uv-index__inner">
        <Bar current={props.uvIndex} label={props.uvRisk} max={11} min={0} />
      </div>
    </section>
  );
}

UvIndex.displayName = 'UvIndex';

UvIndex.propTypes = {
  uvIndex: PropTypes.number.isRequired,
  uvRisk: PropTypes.string.isRequired,
};

export default UvIndex;
