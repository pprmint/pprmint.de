import { SVGAttributes } from "react";
export default function ChevronDown({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3 5.957V4.543l4.5 4.5 4.5-4.5v1.414l-4.5 4.5z"/></svg>
  );
}
