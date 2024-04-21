import { SVGAttributes } from "react";
export default function Login({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5 6H4V2.5A1.5 1.5 0 0 1 5.5 1h6A1.5 1.5 0 0 1 13 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 4 12.5V9h1v3.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5z"/><path d="M8.293 8H2V7h6.293l-2-2h1.414l2.5 2.5-2.5 2.5H6.293z"/></svg>
  );
}
