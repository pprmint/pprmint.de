import { SVGAttributes } from "react";
export default function ArrowRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11.293 8H2V7h9.293l-4-4h1.414l4.5 4.5-4.5 4.5H7.293z"/></svg>
  );
}
