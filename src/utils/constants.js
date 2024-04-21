export const API_KEY = "f36464ed89d663794630263c14054ea2";
export const formatHour = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return date.getHours() + ":00";
};