import { SVGAttributes } from "react";
export default function ArrowPassUpDown({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m4 3.707-3 3V5.293l3.5-3.5 3.5 3.5v1.414l-3-3V13H4zm7 7.579 3-3V9.7l-3.5 3.5L7 9.7V8.286l3 3V1.993h1z"/></svg>
  );
}
