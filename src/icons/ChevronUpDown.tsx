import { SVGAttributes } from "react";
export default function ChevronUpDown({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4 9.707V8.293l3.5 3.5 3.5-3.5v1.414l-3.5 3.5zM11 5.293v1.414l-3.5-3.5-3.5 3.5V5.293l3.5-3.5z"/></svg>
  );
}
