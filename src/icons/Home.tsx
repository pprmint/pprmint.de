import { SVGAttributes } from "react";
export default function Home({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m2 7.707-.5.5L.793 7.5 7.5.793 14.207 7.5l-.707.707-.5-.5V12.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5zm10-1-4.5-4.5-4.5 4.5V12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
