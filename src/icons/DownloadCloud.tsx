import { SVGAttributes } from "react";
export default function DownloadCloud({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m8 12.386 3-3V10.8l-3.5 3.5L4 10.8V9.386l3 3V6h1z"/><path d="M6 8v1H3.95A3.05 3.05 0 0 1 .9 5.95 3.05 3.05 0 0 1 3.95 2.9h2.607A4.05 4.05 0 1 1 10.05 9H9V8h1.05a3.05 3.05 0 0 0 3.05-3.05 3.05 3.05 0 0 0-3.05-3.05c-1.206 0-2.25.702-2.745 1.719l-.136.281H3.95c-1.131 0-2.05.919-2.05 2.05S2.819 8 3.95 8z"/></svg>
  );
}
