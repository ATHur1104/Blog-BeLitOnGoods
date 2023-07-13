module.exports = {
  format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
  },
  eq: function (a, b) {
    return a == b;
  },
};