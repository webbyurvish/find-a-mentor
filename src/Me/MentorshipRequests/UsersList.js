import { getAvatarUrl } from '../../helpers/avatar';
import ReqContent from './ReqContent';
import { Status } from '../../helpers/mentorship';
import { formatTimeAgo } from '../../helpers/time';
import { RichList, RichItem } from '../components/RichList';
import { Loader } from '../../components/Loader';
import styled from 'styled-components/macro';
import { STATUS } from '../../helpers/mentorship';
import UserWasRemovedIcon from '../../assets/me/icon-user-remove.svg';
import { MentorshipRequest } from '../../types/models';
import { useExpendableRichItems } from '../components/RichList/RichList';
import { RichItemTagTheme } from '../components/RichList/ReachItemTypes';

const Spinner = styled(Loader)`
  position: absolute;
  left: calc(50% - 10px);
`;

const UserWasRemoved = styled.div`
  display: grid;
  grid-template-columns: 21px auto;
  align-items: center;
  grid-gap: 10px;
  height: 40px;
`;

const STATUS_THEME = {
  [STATUS.approved]: 'primary',
  [STATUS.cancelled]: 'cancelled',
  [STATUS.new]: 'secondary',
  [STATUS.rejected]: 'danger',
  [STATUS.viewed]: 'checked',
};

const renderList = ({
  requests,
  expandId,
  onSelect,
  onAccept,
  onDecline,
  onCancel,
  isLoading,
}) =>
  requests?.map(
    ({
      id,
      status,
      date,
      message,
      background,
      expectation,
      isMine,
      mentee,
      mentor,
    }) => {
      const user = isMine ? mentor : mentee;
      if (!user) {
        return (
          <li key={id}>
            <UserWasRemoved>
              <UserWasRemovedIcon />
              User was removed
            </UserWasRemoved>
          </li>
        );
      }
      const username = user.name;
      const menteeEmail = mentee.email;
      return (
        <li key={id}>
          <RichItem
            id={id}
            userId={user.id}
            avatar={getAvatarUrl(user.avatar)}
            title={user.name}
            subtitle={user.title}
            onClick={() => {
              onSelect({ id, status });
            }}
            expand={id === expandId}
            tag={{
              value: status,
              theme: STATUS_THEME[status],
            }}
            info={formatTimeAgo(new Date(date))}
          >
            <ReqContent
              status={status}
              message={message}
              isLoading={isLoading}
              background={background}
              expectation={expectation}
              menteeEmail={mentee.email}
              user={user}
              mentee={mentee}
              onAccept={
                onAccept
                  ? () => onAccept({ id, status, username, menteeEmail })
                  : null
              }
              onDecline={
                onDecline
                  ? () => onDecline({ id, status, username, menteeEmail })
                  : null
              }
              onCancel={
                onCancel
                  ? () => onCancel({ id, status, username, menteeEmail })
                  : null
              }
            />
          </RichItem>
        </li>
      );
    }
  );

export const UsersList = ({
  isLoading,
  requests,
  onAccept,
  onDecline,
  onCancel,
  onSelect: onItemSelect,
}) => {
  const { expandId, onSelect } = useExpendableRichItems();

  if (!isLoading && !(requests?.length > 0)) {
    return <p>No requests</p>;
  }

  return (
    <>
      {isLoading && <Spinner />}
      <RichList>
        {renderList({
          requests,
          expandId,
          isLoading,
          onAccept,
          onDecline,
          onCancel,
          onSelect: (item) => {
            onItemSelect?.(item);
            onSelect?.(item.id);
          },
        })}
      </RichList>
    </>
  );
};
