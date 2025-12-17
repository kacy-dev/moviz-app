// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');
 
// const config = getDefaultConfig(__dirname)
 
// module.exports = withNativeWind(config, { input: './global.css' })



const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 🔹 SVG transformer setup
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve(
    "react-native-svg-transformer"
  ),
};

// 🔹 Tell Metro how to handle SVG files
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

// 🔹 Export with NativeWind enabled
module.exports = withNativeWind(config, {
  input: "./global.css",
});
