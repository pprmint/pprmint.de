import { SVGAttributes } from "react";
export default function TriangleUpRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m4 4.5.5-.5H11v6.5l-.5.5z"/></svg>
  );
}
