import ISO6391 from 'iso-639-1';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components/macro';
import countries from 'svg-country-flags/countries.json';
import { useApi } from '../../context/apiContext/ApiContext';
import { useModal } from '../../context/modalContext/ModalContext';
import { useUser } from '../../context/userContext/UserContext';
import messages from '../../messages';
import Card from '../components/Card';
import List from '../components/List';
import EditMentorDetails from '../Modals/EditMentorDetails';
import { desktop } from '../styles/shared/devices';

const ProfileCard = styled(Card)`
  @media ${desktop} {
    max-width: 400px;
  }
`;

const Profile = () => {
  const { currentUser, updateCurrentUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();

  const [openModal, closeModal] = useModal(
    <EditMentorDetails
      isLoading={isLoading}
      userDetails={currentUser}
      updateMentor={handleUpdateMentor}
    />,
    [isLoading]
  );

  async function handleUpdateMentor(updatedUserInfo) {
    setIsLoading(true);
    try {
      const updateMentorResult = await api.updateMentor(updatedUserInfo);
      if (updateMentorResult) {
        api.clearCurrentUser();
        toast.success(messages.EDIT_DETAILS_MENTOR_SUCCESS);
        const updatedUserDetails = await api.getCurrentUser();
        updateCurrentUser(updatedUserDetails);
        closeModal();
      } else {
        toast.error(messages.GENERIC_ERROR);
      }
    } catch (error) {
      toast.error(messages.GENERIC_ERROR);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProfileCard title="My Profile" onEdit={openModal}>
      {currentUser && (
        <List>
          <List.Item type="email" value={currentUser.email} />
          <List.Item
            type="spokenLanguages"
            value={currentUser.spokenLanguages
              .map((language) => ISO6391.getName(language))
              .join(', ')}
          />
          <List.Item type="country" value={countries[currentUser.country]} />
          <List.Item type="title" value={currentUser.title} />
          <List.Item type="tags" value={currentUser.tags.join(', ')} />
          <List.Item
            type="available"
            value={currentUser.available ? 'available' : 'unavailable'}
          />
          <List.Item type="description" value={currentUser.description || ''} />
        </List>
      )}
    </ProfileCard>
  );
};

export default Profile;
