import { SVGAttributes } from "react";
export default function ChevronTopLeftBottomRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m11 6 1 1v5H7l-1-1h5zM4 9 3 8V3h5l1 1H4z"/></svg>
  );
}
