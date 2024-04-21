import { SVGAttributes } from "react";
export default function Pause({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 2.5v10A1.5 1.5 0 0 1 4.5 14h-2A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h2A1.5 1.5 0 0 1 6 2.5m-1 0a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5zM14 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9 12.5v-10A1.5 1.5 0 0 1 10.5 1h2A1.5 1.5 0 0 1 14 2.5m-1 0a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
