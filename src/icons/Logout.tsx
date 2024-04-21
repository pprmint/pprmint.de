import { SVGAttributes } from "react";
export default function Logout({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 11h1v1.5A1.5 1.5 0 0 1 9.5 14h-6A1.5 1.5 0 0 1 2 12.5v-10A1.5 1.5 0 0 1 3.5 1h6A1.5 1.5 0 0 1 11 2.5V4h-1V2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5z"/><path d="M11.293 8H5V7h6.293l-2-2h1.414l2.5 2.5-2.5 2.5H9.293z"/></svg>
  );
}
