import { SVGAttributes } from "react";
export default function ChevronRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5.957 12H4.543l4.5-4.5-4.5-4.5h1.414l4.5 4.5z"/></svg>
  );
}
