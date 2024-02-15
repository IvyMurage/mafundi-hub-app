module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ios.js", ".android.js", ".js", ".json"],
          alias: {
            "@/*": ["./src/*"],
            "@components/*": ["./src/components/*"],
            "@utils/*": ["./src/utils/*"],
            "@assets/*": ["./assets/*"],
            "@constants/*": ["./src/constants/*"],
            "@hooks/*": ["./src/hooks/*"],
            "@types/*": ["./src/types/*"],
            "@contexts/*": ["./src/contexts/*"], // Adjust based on your actual structure
          },
        },
      ],
    ],
  };
};
