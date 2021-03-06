import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { Box } from '@material-ui/core';
import { name, internet } from 'faker/locale/en';

import Sortly, { ItemData } from 'react-sortly/src';
import ItemRenderer from './ItemRenderer';

type Item = {
  name: string;
  color: string;
};
const generate = (numItems: number): ItemData<Item>[] => (
  Array
    .from(Array(numItems).keys())
    .map((index) => ({ 
      id: index + 1, 
      name: name.findName(), 
      color: internet.color(),
      depth: 0,
    }))
);

const HorizontalList = () => {
  const [items, setItems] = React.useState(generate(6));
  const handleChange = (newItems: ItemData<Item>[]) => {
    setItems(newItems);
  };

  return (
    <Box>
      <Flipper
        flipKey={items.map(({ id }) => id).join('.')}
      >
        <Box>
          <Sortly<Item>
            maxDepth={0}
            horizontal
            items={items}
            onChange={handleChange}
          >
            {(props) => <ItemRenderer {...props} />}
          </Sortly>
        </Box>
      </Flipper>
    </Box>
  );
};

export default HorizontalList;
