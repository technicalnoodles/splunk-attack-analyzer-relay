module.exports = {
  getNow: function () {
    const date = new Date();
    const epochTimeInSeconds = Math.floor(Date.now() / 1000);
    return epochTimeInSeconds;
  },
  getHourAgo: function (nowTime) {
    return nowTime - 3600;
  },
  getDayAgo: function (nowTime) {
    return nowTime - 86400;
  },
  getMonthAgo: function (nowTime) {
    return nowTime - 2592000;
  },
};
// const getNow = () => {
//   const date = new Date();
//   const epochTimeInSeconds = Math.floor(Date.now() / 1000);
//   return epochTimeInSeconds;
// };

// const getHourAgo = (nowTime) => {
//   const hourAgo = nowTime - 3600;
// };

// const getDayAgo = (nowTime) => {
//   const dayAgo = nowTime - 86400;
// };

// const getWeekAgo = (nowTime) => {
//   const weekAgo = nowTime - 604800;
// };
// const getMonthAgo = (nowTime) => {
//   const monthAgo = nowTime - 2592000;
// };
