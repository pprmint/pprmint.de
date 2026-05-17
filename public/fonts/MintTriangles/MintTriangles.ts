import localFont from "next/font/local";

export const MintTriangles = localFont({
  src: [
    { path: "./minttriangles.woff2", weight: "400", style: "normal" },
  ],
  display: "swap",
  fallback: ["monospace"],
  variable: "--font-triangles",
});
