import 'components/grid-item.scss';

function GridItem(props) {
  return <li className="grid__item">{props.children}</li>;
}

GridItem.displayName = 'GridItem';

export default GridItem;
