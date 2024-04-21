import { SVGAttributes } from "react";
export default function ArrowAllDirections({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m2.707 8 2 2H3.293l-2.5-2.5 2.5-2.5h1.414l-2 2H7V2.708l-2 2V3.292l2.5-2.5 2.5 2.5v1.414l-2-2V7h4.293l-2-2h1.414l2.5 2.5-2.5 2.5h-1.414l2-2H8v4.293l2-2v1.415l-2.5 2.499-2.5-2.5v-1.414l2 2V8z"/></svg>
  );
}
