import { SVGAttributes } from "react";
export default function ArrowUp({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m7 3.707-4 4V6.293l4.5-4.5 4.5 4.5v1.414l-4-4V13H7z"/></svg>
  );
}
