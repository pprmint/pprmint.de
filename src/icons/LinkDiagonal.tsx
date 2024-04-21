import { SVGAttributes } from "react";
export default function LinkDiagonal({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3.354 11.648a1.5 1.5 0 0 0 2.121 0L7.5 9.623l.708.707-2.026 2.025a2.5 2.5 0 1 1-3.535-3.536l2.025-2.025.707.707-2.025 2.025a1.5 1.5 0 0 0 0 2.122M12.354 2.648a2.5 2.5 0 0 1 0 3.535l-2.025 2.025-.707-.707 2.025-2.025a1.5 1.5 0 0 0-2.121-2.121L7.5 5.38l-.707-.707 2.025-2.025a2.5 2.5 0 0 1 3.536 0"/><path d="M9.268 5.025a.5.5 0 0 1 .707.707L5.733 9.975a.5.5 0 0 1-.707-.707z"/></svg>
  );
}
