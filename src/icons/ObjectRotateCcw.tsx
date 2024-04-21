import { SVGAttributes } from "react";
export default function ObjectRotateCcw({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6.414 1h3.09a4.5 4.5 0 0 1 4.5 4.5V10h-1V5.5a3.5 3.5 0 0 0-3.5-3.5h-3.09l1 1H6L4.5 1.5 6 0h1.414z"/><path d="M11 5.5v7A1.5 1.5 0 0 1 9.5 14h-7A1.5 1.5 0 0 1 1 12.5v-7A1.5 1.5 0 0 1 2.5 4h7A1.5 1.5 0 0 1 11 5.5m-1 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
