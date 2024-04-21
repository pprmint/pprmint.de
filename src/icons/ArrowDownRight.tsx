import { SVGAttributes } from "react";
export default function ArrowDownRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10.293 11 2.646 3.354l.708-.708L11 10.293V5l1 1v6H6l-1-1z"/></svg>
  );
}
