import { paths } from '.';

export function getAllMentorshipRequests(apiService) {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  return apiService.makeApiCall(`${paths.MENTORSHIP}/requests`, {
    from: monthAgo,
  });
}

export async function sendStaledRequestEmail(apiService, mentorshipId) {
  await apiService.makeApiCall(
    `${paths.MENTORSHIP}/requests/${mentorshipId}/reminder`,
    null,
    'PUT'
  );
}

export async function sendMentorNotActive(apiService, mentorId) {
  const response = await apiService.makeApiCall(
    `${paths.ADMIN}/mentor/${mentorId}/notActive`,
    null,
    'PUT'
  );
  if (response?.success) {
    return response.data;
  }
}

export async function freezeMentor(apiService, mentorId) {
  await apiService.makeApiCall(
    `${paths.ADMIN}/mentor/${mentorId}/freeze`,
    null,
    'PUT'
  );
}

export function getUserRecords(apiService, userId) {
  return apiService.makeApiCall(`${paths.USERS}/${userId}/records`);
}
