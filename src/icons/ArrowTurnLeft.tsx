import { SVGAttributes } from "react";
export default function ArrowTurnLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3.714 5h5.29a4 4 0 0 1 4 4v.004a4 4 0 0 1-4 4h-7v-1h7a3.004 3.004 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.29l3 3H5.3L1.8 5.5 5.3 2h1.414z"/></svg>
  );
}
