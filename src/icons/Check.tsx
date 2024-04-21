import { SVGAttributes } from "react";
export default function Check({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m1.646 7.354.708-.708L6 10.293l6.646-6.647.708.708L6 11.707z"/></svg>
  );
}
