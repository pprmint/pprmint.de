import { SVGAttributes } from "react";
export default function ArrowLeftRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m3.707 8 3 3H5.293l-3.5-3.5 3.5-3.5h1.414l-3 3h7.586l-3-3h1.414l3.5 3.5-3.5 3.5H8.293l3-3z"/></svg>
  );
}
