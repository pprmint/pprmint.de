import { SVGAttributes } from "react";
export default function Processor({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 9.75a.25.25 0 0 1-.25.25h-4.5A.25.25 0 0 1 5 9.75v-4.5A.25.25 0 0 1 5.25 5h4.5a.25.25 0 0 1 .25.25zM6 9h3V6H6z"/><path d="M2 6H1V5h1V3.5A1.5 1.5 0 0 1 3.5 2H5V1h1v1h3V1h1v1h1.5A1.5 1.5 0 0 1 13 3.5V5h1v1h-1v3h1v1h-1v1.5a1.5 1.5 0 0 1-1.5 1.5H10v1H9v-1H6v1H5v-1H3.5A1.5 1.5 0 0 1 2 11.5V10H1V9h1zm9.5-3h-8a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5"/></svg>
  );
}
