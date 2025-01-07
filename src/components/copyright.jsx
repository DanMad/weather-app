import classNames from 'classnames';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import utils from 'helpers/utils';
import 'components/copyright.scss';

function Copyright(props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleTransitionEnd = (event) => {
    event.target.style.transition = 'none';
  };

  const className = classNames('copyright', { ready: isReady });
  const range = utils.toRange(dayjs().year(), props.year);

  return (
    <div className={className} onTransitionEnd={handleTransitionEnd}>
      <span className="copyright__statement">
        Copyright&nbsp;&copy;&nbsp;{range} Daniel&nbsp;Maddison.
        All&nbsp;rights&nbsp;reserved.
      </span>
    </div>
  );
}

Copyright.displayName = 'Copyright';

Copyright.propTypes = {
  year: PropTypes.number,
};

export default Copyright;
