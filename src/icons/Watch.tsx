import { SVGAttributes } from "react";
export default function Watch({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5 11.361a4.62 4.62 0 0 1-2.105-3.86c0-1.617.847-3.041 2.105-3.861V2.5C5 1.673 5.67 1 6.503 1h1.995a1.5 1.5 0 0 1 1.504 1.5v1.14a4.62 4.62 0 0 1 2.104 3.86c0 1.617-.847 3.041-2.104 3.861v1.14a1.5 1.5 0 0 1-1.504 1.5H6.503A1.5 1.5 0 0 1 5 12.5zm.997-8.21a4.7 4.7 0 0 1 1.504-.25 4.7 4.7 0 0 1 1.503.25V2.5a.507.507 0 0 0-.506-.499H6.503a.507.507 0 0 0-.506.499zm3.007 8.7a4.7 4.7 0 0 1-1.503.25 4.7 4.7 0 0 1-1.504-.25v.65c0 .275.233.5.506.5h1.995a.507.507 0 0 0 .506-.5zM7.5 3.9a3.6 3.6 0 0 0 0 7.2 3.6 3.6 0 0 0 0-7.2"/><path d="M7 5h1v2.293l1.35 1.353-.7.708L7 7.707z"/></svg>
  );
}
