import { SVGAttributes } from "react";
export default function TriangleAllDirections({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3.293 5H4v5h-.707l-2.5-2.5zM5 11.707V11h5v.707l-2.5 2.5zM11.707 10H11V5h.707l2.5 2.5zM10 3.293V4H5v-.707l2.5-2.5z"/></svg>
  );
}
