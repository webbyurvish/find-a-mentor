export const withSuccess = (data) => ({
  success: true,
  data,
});

export const withError = (errors) => ({
  success: false,
  errors,
});
