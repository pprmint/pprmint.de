import { SVGAttributes } from "react";
export default function TriangleBottomLeftTopRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m9 11.5-.5.5H3V6.5l.5-.5zM6 3.5l.5-.5H12v5.5l-.5.5z"/></svg>
  );
}
