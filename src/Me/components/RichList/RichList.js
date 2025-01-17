import { FC, useState } from 'react';
import { UnstyledList } from '../../../components/common';

export const useExpendableRichItems = () => {
  const [expandId, setExpandId] = useState('');

  const onSelect = (id) => {
    setExpandId(expandId === id ? '' : id);
  };

  return { expandId, onSelect };
};

export const RichList = ({ children }) => {
  return <UnstyledList>{children}</UnstyledList>;
};

export default RichList;
