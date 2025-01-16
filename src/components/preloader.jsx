import classNames from 'classnames';
import { useContext, useLayoutEffect, useState } from 'react';
import { Context } from 'components/provider';
import 'components/preloader.scss';

function Preloader() {
  const context = useContext(Context);
  const [isReady, setIsReady] = useState(true);

  useLayoutEffect(() => {
    if (context.error || context.forecast) {
      setIsReady(false);
    }
  }, [context.error, context.forecast]);

  const handleTransitionEnd = () => {
    context.setIsReady(true);
  };

  const className = classNames('preloader', { ready: isReady });

  return (
    <div className={className} onTransitionEnd={handleTransitionEnd}>
      <div className="preloader__track">
        <div className="preloader__fill" />
      </div>
    </div>
  );
}

Preloader.displayName = 'Preloader';

export default Preloader;
