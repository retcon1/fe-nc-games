const secondsToTimeString = (seconds) => {
  const years = Math.floor(seconds / (365 * 24 * 60 * 60));
  seconds -= years * (365 * 24 * 60 * 60);
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let result = "";

  if (years > 0) {
    result += `${years} year${years > 1 ? "s" : ""}`;
    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
      result += `, `;
    }
  }

  if (days > 0) {
    result += `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0 || minutes > 0 || seconds > 0) {
      result += `, `;
    }
  }

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0 || seconds > 0) {
      result += `, `;
    }
  }

  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return result;
};

module.exports = { secondsToTimeString };
