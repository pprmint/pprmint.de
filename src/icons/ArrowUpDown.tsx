import { SVGAttributes } from "react";
export default function ArrowUpDown({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m7 3.707-3 3V5.293l3.5-3.5 3.5 3.5v1.414l-3-3v7.586l3-3v1.414l-3.5 3.5-3.5-3.5V8.293l3 3z"/></svg>
  );
}
