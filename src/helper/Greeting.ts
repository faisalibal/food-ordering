export const Greeting = () => {
  const timeHours = `${new Date().getHours()}`;

  if (parseInt(timeHours) >= 5 && parseInt(timeHours) < 11) {
    return "Good Morning";
  }

  if (parseInt(timeHours) >= 11 && parseInt(timeHours) < 16) {
    return "Good Afternoon";
  }

  if (parseInt(timeHours) >= 16 && parseInt(timeHours) < 19) {
    return "Good Evening";
  }

  if (parseInt(timeHours) >= 19) {
    return "Good Night";
  }

  if (parseInt(timeHours) < 5) {
    return "Good Night";
  }
};
