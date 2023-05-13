import React, { ReactElement } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const isA = (element) => {
  return (
    React.isValidElement(element) &&
    (element.type === 'a' || /* styled.a */ element.type.target === 'a')
  );
};

const hasATag = (children) => {
  if (typeof children !== 'object') {
    return false;
  }
  if (isA(children)) {
    return true;
  }
  return React.Children.toArray(children.props?.children)?.some(hasATag);
};

const Link = (props) => {
  const { children, className, ...rest } = props;
  const hasA = hasATag(props.children);

  return (
    <NextLink {...rest}>
      {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        hasA ? children : <a className={className}>{children}</a>
      }
    </NextLink>
  );
};

export default Link;
