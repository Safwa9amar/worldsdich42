module.exports = {
  // ... other webpack configurations

  // Add the following optimization to disable source maps in production
  optimization: {
    minimize: true,
    // ... other optimizations
  },

  // Specify how source maps are generated
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
};
