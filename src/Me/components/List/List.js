import { FC } from 'react';
import styled from 'styled-components';
import ListItem, { ListItemProps } from './ListItem';

const Style = {
  List: styled.ul`
    padding: 0;
  `,
};

const renderItems = (item) => (
  <ListItem {...item} key={`${item.type}${item.value}`} />
);

export const List = ({ items, children }) => {
  const listItems = items?.map(renderItems) ?? children;
  return <Style.List>{listItems}</Style.List>;
};

//This will allow us to use ListItem as <List.Item ... />
List.Item = ListItem;

export default List;
