import { SVGAttributes } from "react";
export default function ArrowTopLeftBottomRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4 4.707V9L3 8V3h5l1 1H4.707L11 10.293V6l1 1v5H7l-1-1h4.293z"/></svg>
  );
}
