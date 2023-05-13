import { userBuilder } from '../users/current/get';

const defaultMentorshipRequest = {
  id: '123',
  mentor: userBuilder({
    name: 'Mentor',
  }),
  mentee: userBuilder(),
  status: 'Approved',
  date: '1609748339000',
  message: 'hi',
  background: 'yes',
  expectation: 'the world',
  isMine: false,
};

export const mentorshipRequestBuilder = (overrides) => ({
  ...defaultMentorshipRequest,
  ...overrides,
});
