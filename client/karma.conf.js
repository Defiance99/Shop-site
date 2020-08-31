module.exports = function(config) {
  config.set({
      frameworks: ["jasmine", "karma-typescript"],
      files: [
          "./src/app/**/*spec.ts",
      ],
      preprocessors: {
        "./src/app/**/*spec.ts": "karma-typescript"
      },
      reporters: ["progress", "karma-typescript"],
      browsers: ["Chrome"]
  });
};
