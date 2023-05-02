function getTimes(times, isDate = false) {
  function formatTime(dateInput) {
    const dates = new Date(dateInput);

    if (isDate) {
      let optionsDate = {
        timeZone: "Asia/Jakarta",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      let date = dates.toLocaleString("id-ID", optionsDate);

      return date;
    } else {
      let options = {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "numeric",
      };
      let time = dates.toLocaleString("id-ID", options);
      return time;
    }
  }

  return times ? formatTime(times * 1000) : "TBD";
}

module.exports = getTimes;
