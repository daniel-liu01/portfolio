/** @type {import('next').NextConfig} */
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  turbopack: {
    // Ensure Turbopack resolves deps from this app folder even if
    // the repo has multiple lockfiles.
    root: __dirname,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 100],
  },
};

export default nextConfig;
