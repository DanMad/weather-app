import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { useLayoutEffect, useRef } from 'react';
import 'components/grid.scss';

function Grid(props) {
  const grid = useRef(null);

  const handleResize = debounce(() => {
    grid.current.style.gap = '';

    const items = Array.from(grid.current.children);
    const itemWidths = items.map((item) => item.getBoundingClientRect().width);

    const { width: gridWidth } = grid.current.getBoundingClientRect();
    const { gap, paddingLeft } = window.getComputedStyle(grid.current);

    const paddingLeftWidth = parseInt(paddingLeft, 10);
    let gapWidth = parseInt(gap, 10);

    let remainingWidth = gridWidth - paddingLeftWidth;
    let visibleItemsCount = 0;
    let visibleItemsWidth = 0;

    itemWidths.some((itemWidth, i) => {
      const nextItemWidth = itemWidths[i + 1] || 0;
      const requiredWidth = i === 0 ? itemWidth : gapWidth + itemWidth;

      visibleItemsWidth += itemWidth / 2;

      if (requiredWidth + gapWidth + nextItemWidth / 2 > remainingWidth) {
        return true;
      }

      remainingWidth -= requiredWidth;
      visibleItemsCount += 1;
      visibleItemsWidth += itemWidth / 2;

      return false;
    });

    if (!visibleItemsCount) {
      return;
    }

    const visibleGapsCount =
      visibleItemsCount === items.length
        ? visibleItemsCount - 1
        : visibleItemsCount;

    gapWidth =
      (gridWidth - paddingLeftWidth - visibleItemsWidth) / visibleGapsCount;

    grid.current.style.gap = `${gapWidth}px`;
  }, 100);

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props.children]);

  return (
    <ul className="grid" ref={grid} tabIndex="1">
      {props.children}
    </ul>
  );
}

Grid.displayName = 'Grid';

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
