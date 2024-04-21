import { SVGAttributes } from "react";
export default function Cube({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6.75.856a1.5 1.5 0 0 1 1.5 0l5 2.886c.464.268.75.764.75 1.299v4.918c0 .535-.286 1.031-.75 1.299l-5 2.886a1.5 1.5 0 0 1-1.5 0l-5-2.886A1.5 1.5 0 0 1 1 9.959V5.041c0-.535.286-1.031.75-1.299zm5.75 3.608L7.75 1.722a.5.5 0 0 0-.5 0L2.5 4.464l5 2.887zM8 13.134l4.75-2.742a.5.5 0 0 0 .25-.433V5.33L8 8.217zM2 5.33v4.629a.5.5 0 0 0 .25.433L7 13.134V8.217z"/></svg>
  );
}
