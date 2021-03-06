import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { Box, Input } from '@material-ui/core';
import { name, internet } from 'faker/locale/en';
import { useDebouncedCallback } from 'use-debounce';

import Sortly, { ItemData } from 'react-sortly/src';
import DefaultItemRenderer from './DefaultItemRenderer';

type Item = {
  name: string;
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

const StressTest = () => {
  const [items, setItems] = React.useState(generate(100));
  const handleChange = (newItems: ItemData<Item>[]) => {
    setItems(newItems);
  };
  const [handleChangeNumItems] = useDebouncedCallback((value: string) => {    
    const num = parseInt(value, 10);

    if (Number.isInteger(num) && num > 0) {
      setItems(generate(num));
    }
  }, 500);

  return (
    <Box width={{ md: 600 }}>
      <Input 
        type="number"
        fullWidth
        defaultValue={100}
        endAdornment={<span>items</span>}
        onChange={(e) => { handleChangeNumItems(e.target.value); }}
      />
      <br />
      <br />
      <Flipper
        flipKey={items.map(({ id }) => id).join('.')}
      >
        <Sortly<Item>
          items={items}
          onChange={handleChange}
        >
          {(props) => <DefaultItemRenderer {...props} />}
        </Sortly>
      </Flipper>
    </Box>
  );
};

export default StressTest;
