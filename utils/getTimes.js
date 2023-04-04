function getTimes(times) {
  function formatTime(n) {
    return n < 10 ? '0' + n : n;
  }

  function getTimes(dateInput) {
    var date = new Date(dateInput);
    var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
    return time;
  }

  return times ? getTimes(times * 1000) : 'TBD';
}

module.exports = getTimes
