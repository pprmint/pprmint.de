import { SVGAttributes } from "react";
export default function ObjectRotateCw({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M8.499 2H5.5A3.5 3.5 0 0 0 2 5.5V10H1V5.5A4.5 4.5 0 0 1 5.5 1h2.999L7.5 0h1.413l1.499 1.5L8.913 3H7.5z"/><path d="M14 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 4 12.5v-7A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5m-1 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
