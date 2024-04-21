import { SVGAttributes } from "react";
export default function ArrowUpLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4 4.707V10L3 9V3h6l1 1H4.707l7.647 7.646-.708.708z"/></svg>
  );
}
