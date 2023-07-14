import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.tikts.app",
  appName: "tikts",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.28:3000",
    cleartext: true,
  },
};

export default config;
