import { SVGAttributes } from "react";
export default function BookCheck({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3 12.5v-10A1.5 1.5 0 0 1 4.5 1H12v11H4.5q-.264-.001-.5-.085v.585c0 .133.053.26.146.354A.5.5 0 0 0 4.5 13H12v1H4.5A1.503 1.503 0 0 1 3 12.5m1-2a.5.5 0 0 0 .5.5H11V2H4.5a.5.5 0 0 0-.5.5z"/><path d="m4.646 6.354.708-.708L7 7.293l2.646-2.647.708.708L7 8.707z"/></svg>
  );
}
