import { SVGAttributes } from "react";
export default function ChevronBottomLeftTopRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m6 4 1-1h5v5l-1 1V4zM9 11l-1 1H3V7l1-1v5z"/></svg>
  );
}
