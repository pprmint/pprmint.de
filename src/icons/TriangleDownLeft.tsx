import { SVGAttributes } from "react";
export default function TriangleDownLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m11 10.5-.5.5H4V4.5l.5-.5z"/></svg>
  );
}
