import { SVGAttributes } from "react";
export default function Key({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 .9c2.263 0 4.1 1.837 4.1 4.1S12.263 9.1 10 9.1A4.1 4.1 0 0 1 5.9 5C5.9 2.737 7.737.9 10 .9m0 1A3.1 3.1 0 0 0 6.9 5c0 1.711 1.389 3.1 3.1 3.1s3.1-1.389 3.1-3.1-1.389-3.1-3.1-3.1"/><path d="m4 11.75.75-.75h1.043L6 10.793V9.749l.746-.75 1.068-.007.83-.843.712.702-1.12 1.139L7 9.997v1.21L6.207 12H5v1.207L4.207 14H1v-3.707l5.146-5.147.708.708L2 10.707V13h1.793L4 12.793z"/><circle cx="10.5" cy="4.5" r="1"/></svg>
  );
}
