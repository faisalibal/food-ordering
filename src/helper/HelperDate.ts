export const HelperDate = (getDate: string) => {
  let date = new Date(getDate);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const viewDate = day + " " + month + " " + year;

  return viewDate;
};
