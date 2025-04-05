import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import 'components/footer.scss';

function Footer(props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleTransitionEnd = (event) => {
    event.target.style.transition = 'none';
  };

  const className = classNames('footer', { 'is-ready': isReady });
  const year = props.year || dayjs().year();

  return (
    <footer className={className} onTransitionEnd={handleTransitionEnd}>
      <p className="footer__copyright">
        Copyright&nbsp;&copy;&nbsp;{year}&nbsp;Daniel&nbsp;Maddison.
        All&nbsp;rights&nbsp;reserved.
      </p>
    </footer>
  );
}

Footer.displayName = 'Footer';

export default Footer;
