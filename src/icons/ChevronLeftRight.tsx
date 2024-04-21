import { SVGAttributes } from "react";
export default function ChevronLeftRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5.293 4h1.414l-3.5 3.5 3.5 3.5H5.293l-3.5-3.5zM9.707 11H8.293l3.5-3.5-3.5-3.5h1.414l3.5 3.5z"/></svg>
  );
}
