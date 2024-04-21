import { SVGAttributes } from "react";
export default function Eraser({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M13.646 5.939a1.5 1.5 0 0 1 0 2.122L8.707 13H3.293l-1.939-1.939a1.5 1.5 0 0 1 0-2.122l6.585-6.585a1.5 1.5 0 0 1 2.122 0zM9.5 10.793l3.439-3.439a.5.5 0 0 0 0-.708L9.354 3.061a.5.5 0 0 0-.708 0L5.207 6.5zm-5-3.586L2.061 9.646a.5.5 0 0 0 0 .708L3.707 12h4.586l.5-.5z"/></svg>
  );
}
