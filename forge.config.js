const path = require("path");

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./public/icon", // optional
    extraResources: [
      {
        from: path.resolve(__dirname, "out"), // your static build output
        to: "out", // where Electron will reference it
        filter: ["**/*"], // include all nested files
      },
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"], // or ["darwin", "linux"] if you support more
    },
  ],
};
