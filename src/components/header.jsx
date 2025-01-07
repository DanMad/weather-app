import PropTypes from 'prop-types';
import 'components/header.scss';

function Header(props) {
  return (
    <header className="header">
      <h2 className="header__heading">{props.children}</h2>
    </header>
  );
}

Header.displayName = 'Header';

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
