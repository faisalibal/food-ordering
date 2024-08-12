export const HelperStringUppercase = (categoryName: string) => {
  const category = categoryName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return category;
};
