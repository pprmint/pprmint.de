import { SVGAttributes } from "react";
export default function Stopwatch({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11.801 4.91a5.56 5.56 0 0 1 1.292 3.59c0 3.09-2.499 5.6-5.593 5.6a5.594 5.594 0 0 1-5.593-5.6 5.604 5.604 0 0 1 5.1-5.578V2H6.004V1h2.992v1H7.993v.923a5.58 5.58 0 0 1 3.094 1.28l1.156-1.156.714.708zM7.5 3.9c-2.533 0-4.607 2.062-4.607 4.6s2.074 4.6 4.607 4.6 4.607-2.062 4.607-4.6S10.033 3.9 7.5 3.9"/><path d="M7 5h1v4H7z"/></svg>
  );
}
