import PropTypes from 'prop-types';
import styled from 'styled-components';
import AvailableIcon from '../../../assets/me/icon-available.svg';
import CountryIcon from '../../../assets/me/icon-country.svg';
import DescriptionIcon from '../../../assets/me/icon-description.svg';
import EmailIcon from '../../../assets/me/icon-email.svg';
import SpokenLanguagesIcon from '../../../assets/me/icon-spokenLanguages.svg';
import TagsIcon from '../../../assets/me/icon-tags.svg';
import TitleIcon from '../../../assets/me/icon-title.svg';
import UnavailableIcon from '../../../assets/me/icon-unavailable.svg';

const icons = {
  email: EmailIcon,
  spokenLanguages: SpokenLanguagesIcon,
  country: CountryIcon,
  title: TitleIcon,
  tags: TagsIcon,
  available: AvailableIcon,
  unavailable: UnavailableIcon,
  description: DescriptionIcon,
};

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  margin-top: 5px;
`;

const ItemIcon = styled.div`
  width: 24px;
  height: 100%;
  margin-right: 20px;
`;

const ItemText = styled.div`
  padding-top: 4px;
`;

const ListItem = ({ type, value }) => {
  const Icon = icons[type];
  return (
    <ItemRow>
      {Icon && (
        <ItemIcon data-testid={type}>
          <Icon />
        </ItemIcon>
      )}
      <ItemText data-testid={`${type}-label`}>{value}</ItemText>
    </ItemRow>
  );
};

ListItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf([
    'email',
    'spokenLanguages',
    'country',
    'title',
    'tags',
    'available',
    'unavailable',
    'description',
  ]),
};

export default ListItem;
