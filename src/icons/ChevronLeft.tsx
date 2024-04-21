import { SVGAttributes } from "react";
export default function ChevronLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9.043 3h1.414l-4.5 4.5 4.5 4.5H9.043l-4.5-4.5z"/></svg>
  );
}
