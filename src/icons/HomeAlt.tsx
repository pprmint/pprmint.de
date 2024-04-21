import { SVGAttributes } from "react";
export default function HomeAlt({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 14H3.5A1.5 1.5 0 0 1 2 12.5V7.707l-.5.5L.793 7.5 7.5.793 14.207 7.5l-.707.707-.5-.5V12.5a1.5 1.5 0 0 1-1.5 1.5H9V9.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5zm6-7.293-4.5-4.5-4.5 4.5V12.5a.5.5 0 0 0 .5.5H5V9.5A1.5 1.5 0 0 1 6.5 8h2A1.5 1.5 0 0 1 10 9.5V13h1.5a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
