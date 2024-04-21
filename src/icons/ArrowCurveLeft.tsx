import { SVGAttributes } from "react";
export default function ArrowCurveLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3.714 5h4.79a4.5 4.5 0 0 1 4.5 4.5V13h-1V9.5a3.5 3.5 0 0 0-3.5-3.5h-4.79l3 3H5.3L1.8 5.5 5.3 2h1.414z"/></svg>
  );
}
