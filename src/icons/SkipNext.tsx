import { SVGAttributes } from "react";
export default function SkipNext({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m9 9.01-5.527 4.714A1.498 1.498 0 0 1 1 12.583V2.417a1.5 1.5 0 0 1 2.473-1.141L9 5.99V2.5A1.5 1.5 0 0 1 10.5 1h2A1.5 1.5 0 0 1 14 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9 12.5zm-.216-1.89-5.96-5.083a.499.499 0 0 0-.824.38v10.166a.5.5 0 0 0 .825.38L8.784 7.88a.5.5 0 0 0 0-.76M10 12.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5z"/></svg>
  );
}
