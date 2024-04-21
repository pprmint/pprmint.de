import { SVGAttributes } from "react";
export default function ArrowDownLeft({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4.707 11H10l-1 1H3V6l1-1v5.293l7.646-7.647.708.708z"/></svg>
  );
}
