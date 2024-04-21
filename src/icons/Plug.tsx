import { SVGAttributes } from "react";
export default function Plug({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7 11h-.5A3.5 3.5 0 0 1 3 7.5V4h2V1h1v3h3V1h1v3h2v3.5c0 1.932-1.568 3.5-3.5 3.5H8v3H7zM4 7.5A2.5 2.5 0 0 0 6.5 10h2A2.5 2.5 0 0 0 11 7.5V5H4z"/></svg>
  );
}
