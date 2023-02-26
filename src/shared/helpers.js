const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Helper = {
  calcTime: (offset) => {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * offset);

    // return time as a string
    return nd.toLocaleString();
  },
  getDuration: (date) => {
    var date = new Date(parseInt(date)).getTime();
    var currDate = new Date(Helper.calcTime("+0")).getTime();
    var duration = currDate - date;

    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((duration % (1000 * 60)) / 1000);

    var durationString = "";

    if (days > 90) {
      var date = new Date(date);

      durationString =
        date.getDate() +
        " " +
        month[date.getMonth()] +
        " " +
        date.getFullYear().toString().substr(-2);
    } else if (days > 30 && days <= 90) {
      var date = new Date(date);
      durationString = date.getDate() + " " + month[date.getMonth()];
    } else if (days !== 0 && days > 0) {
      durationString = days + " d";
    } else if (hours !== 0 && hours > 0) {
      durationString = hours + " h";
    } else if (minutes !== 0 && minutes > 0) {
      durationString = minutes + " m";
    } else if (seconds !== 0 && seconds > 0) {
      durationString = seconds + " s";
    } else {
      durationString = "Just now";
    }

    return durationString;
  },
};

module.exports = Helper;
