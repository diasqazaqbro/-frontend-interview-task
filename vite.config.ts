import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const isProduction = command === "build";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        app: path.resolve(__dirname, "./src/app"),
        pages: path.resolve(__dirname, "./src/pages"),
        widgets: path.resolve(__dirname, "./src/widgets"),
        features: path.resolve(__dirname, "./src/features"),
        entities: path.resolve(__dirname, "./src/entities"),
        shared: path.resolve(__dirname, "./src/shared"),
      },
    },
    base: isProduction ? "/-frontend-interview-task/" : "/",
    server: {
      port: 3000,
    },
  };
});
