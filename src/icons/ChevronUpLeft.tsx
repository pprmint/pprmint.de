import { SVGAttributes } from "react";
export default function ChevronUpLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m5 11-1-1V4h6l1 1H5z"/></svg>
  );
}
