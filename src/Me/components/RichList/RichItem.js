import { FC } from 'react';
import styled from 'styled-components';
import Link from '../../../components/Link/Link';
import { useRoutes } from '../../../hooks/useRoutes';
import { RichItemProps, RichItemTagTheme } from './ReachItemTypes';

const RichItem = ({
  id,
  userId,
  avatar,
  title,
  subtitle,
  tag,
  info,
  expand,
  onClick,
  children,
}) => {
  const routes = useRoutes();
  return (
    <Root highlight={!!children && !expand} expanded={expand}>
      <Main onClick={() => onClick(id)}>
        <ItemRow>
          <ItemAvatar href={routes.user.get(userId)}>
            {avatar && <img src={avatar} alt="avatar" />}
          </ItemAvatar>
          <Titles>
            <ItemRow>
              <Title>{title}</Title>
              <Tag role="status" theme={tag.theme}>
                {tag.value}
              </Tag>
            </ItemRow>
            <Subtitle>{subtitle}</Subtitle>
          </Titles>
          <Info>{info}</Info>
        </ItemRow>
      </Main>
      <Content expand={expand}>{children}</Content>
    </Root>
  );
};

const themeColours = {
  primary: '#69d5b1',
  secondary: '#f3ca3e',
  danger: '#ff5f58',
  checked: '#69d579',
  disabled: '#e0e0e0',
  cancelled: '#ff5f58',
};

const ItemRow = styled.div`
  display: flex;
  gap: 5px;
`;

const ItemCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled(ItemRow)`
  height: 80px;
  padding: 0 1px;
  align-items: center;
  > div {
    flex: 1;
  }
`;

const Titles = styled(ItemCol)`
  flex: 1;

  ${ItemRow} {
    align-items: center;
  }
`;

const ItemAvatar = styled(Link)`
  user-select: none;
  width: 45px;
  overflow: hidden;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    border-radius: 50%;
  }
`;

const Title = styled.h5`
  width: 94px;
  margin: 0 10px 0 0;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled(Title)`
  color: #828282;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
`;

const Tag = styled.div`
  width: 46px;
  color: #fff;
  border-radius: 3px;
  padding: 1px 6px;
  user-select: none;
  font-size: 8px;
  line-height: 12px;
  text-align: center;
  background-color: ${({ theme }) => themeColours[theme]};
`;

const Content =
  styled.div <
  { expand: boolean } >
  `
  transition: max-height 350ms ease, padding 300ms 50ms, opacity 300ms;
  max-height: 0;
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;

  ${({ expand }) => ({
    visibility: 'visible',
    paddingBottom: expand ? '30px' : 0,
    maxHeight: expand ? '500px' : 0,
    opacity: expand ? 1 : 0,
  })}
`;

const Root = styled.div`
  position: relative;
  margin: 0 calc(-1 * var(--padding-inline));
  padding: 0 var(--padding-inline);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ highlight }) => (highlight ? '#f2f2f2' : '')};
    ${Main} {
      cursor: ${({ highlight, expanded }) =>
        expanded || highlight ? 'pointer' : 'default'};
    }
  }
  & + &::before {
    content: ' ';
    border-top: 1px solid #f2f2f2;
    display: block;
    position: absolute;
    width: 100%;
    top: -1px;
  }
`;

export default RichItem;
