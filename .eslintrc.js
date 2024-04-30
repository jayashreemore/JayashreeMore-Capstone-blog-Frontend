module.exports = {
  // Other ESLint configurations...
  rules: {
    // Other rules...
    "no-unused-vars": process.env.CI ? "warn" : "error",
  },
};
