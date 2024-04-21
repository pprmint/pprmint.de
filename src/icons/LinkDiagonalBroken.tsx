import { SVGAttributes } from "react";
export default function LinkDiagonalBroken({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m11.65 12.36-2.026-2.026.707-.707 2.025 2.025zM8 11.035h1.001V12h-1zM11.037 9V7.999H12v1zM4.675 5.38 2.65 3.354l.707-.707 2.025 2.025zM6 3h1.002v.965H6zM3 7V6h.965v1zM3.354 11.648a1.5 1.5 0 0 0 2.121 0L7.5 9.623l.708.707-2.026 2.025a2.5 2.5 0 1 1-3.535-3.536l2.025-2.025.707.707-2.025 2.025a1.5 1.5 0 0 0 0 2.122M12.354 2.648a2.5 2.5 0 0 1 0 3.535l-2.025 2.025-.707-.707 2.025-2.025a1.5 1.5 0 0 0-2.121-2.121L7.5 5.38l-.707-.707 2.025-2.025a2.5 2.5 0 0 1 3.536 0"/></svg>
  );
}
