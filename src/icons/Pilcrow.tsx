import { SVGAttributes } from "react";
export default function Pilcrow({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 2h7v1h-2v10h-1V3H8v10H7V9l-1 .001C4 9.001 2.465 7.5 2.465 5.5S4 2 6 2"/></svg>
  );
}
