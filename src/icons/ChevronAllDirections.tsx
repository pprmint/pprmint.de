import { SVGAttributes } from "react";
export default function ChevronAllDirections({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5 11.707v-1.414l2.5 2.5 2.5-2.5v1.414l-2.5 2.5zM11.707 10h-1.414l2.5-2.5-2.5-2.5h1.414l2.5 2.5zM10 3.293v1.414l-2.5-2.5-2.5 2.5V3.293l2.5-2.5zM3.293 5h1.414l-2.5 2.5 2.5 2.5H3.293l-2.5-2.5z"/></svg>
  );
}
