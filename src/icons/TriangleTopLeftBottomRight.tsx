import { SVGAttributes } from "react";
export default function TriangleTopLeftBottomRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3.5 9 3 8.5V3h5.5l.5.5zM11.5 6l.5.5V12H6.5l-.5-.5z"/></svg>
  );
}
