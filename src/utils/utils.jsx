export const toTitleCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    dateStyle: "full",
  });
};
