import { SVGAttributes } from "react";
export default function Eye({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1.022 7.354c.727-2.381 3.37-4.34 6.478-4.34s5.751 1.959 6.478 4.34l.045.146-.045.146c-.727 2.381-3.37 4.34-6.478 4.34s-5.751-1.959-6.478-4.34L.977 7.5zm1.004.145v.002C2.705 9.45 4.93 10.986 7.5 10.986s4.795-1.536 5.474-3.487C12.295 5.55 10.07 4.014 7.5 4.014S2.705 5.55 2.026 7.499"/><path d="M7.5 4.9a2.601 2.601 0 0 1 0 5.2 2.601 2.601 0 0 1 0-5.2m0 1a1.6 1.6 0 1 0 .002 3.202A1.6 1.6 0 0 0 7.5 5.9"/></svg>
  );
}
