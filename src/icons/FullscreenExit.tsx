import { SVGAttributes } from "react";
export default function FullscreenExit({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 14H9v-3.5A1.5 1.5 0 0 1 10.5 9H14v1h-3.5a.5.5 0 0 0-.5.5zM1 10V9h3.5A1.5 1.5 0 0 1 6 10.5V14H5v-3.5a.5.5 0 0 0-.5-.5zM5 1h1v3.5A1.5 1.5 0 0 1 4.5 6H1V5h3.5a.5.5 0 0 0 .5-.5zM14 5v1h-3.5A1.5 1.5 0 0 1 9 4.5V1h1v3.5a.5.5 0 0 0 .5.5z"/></svg>
  );
}
