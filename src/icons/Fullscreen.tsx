import { SVGAttributes } from "react";
export default function Fullscreen({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M13 9h1v3.5a1.5 1.5 0 0 1-1.5 1.5H9v-1h3.5a.5.5 0 0 0 .5-.5zM6 13v1H2.5A1.5 1.5 0 0 1 1 12.5V9h1v3.5a.5.5 0 0 0 .5.5zM2 6H1V2.5A1.5 1.5 0 0 1 2.5 1H6v1H2.5a.5.5 0 0 0-.5.5zM9 2V1h3.5A1.5 1.5 0 0 1 14 2.5V6h-1V2.5a.5.5 0 0 0-.5-.5z"/></svg>
  );
}
