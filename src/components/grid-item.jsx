import PropTypes from 'prop-types';
import 'components/grid-item.scss';

function GridItem(props) {
  return <li className="grid__item">{props.children}</li>;
}

GridItem.displayName = 'GridItem';

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridItem;
