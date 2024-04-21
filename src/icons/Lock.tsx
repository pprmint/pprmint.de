import { SVGAttributes } from "react";
export default function Lock({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 5h.5A1.5 1.5 0 0 1 12 6.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5v-6A1.5 1.5 0 0 1 4.5 5H5V3.4a2.5 2.5 0 1 1 5 0zm.5 1h-6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5M9 5V3.4a1.5 1.5 0 0 0-3 0V5z"/><path d="M8 8.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 1 0"/></svg>
  );
}
