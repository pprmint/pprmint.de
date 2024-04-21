import { SVGAttributes } from "react";
export default function SkipPrevious({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 9.01v3.49A1.5 1.5 0 0 1 4.5 14h-2A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h2A1.5 1.5 0 0 1 6 2.5v3.49l5.527-4.714A1.498 1.498 0 0 1 14 2.417v10.166a1.5 1.5 0 0 1-2.473 1.141zM5 2.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5zm1.216 5.38 5.96 5.083a.499.499 0 0 0 .824-.38V2.417a.5.5 0 0 0-.825-.38L6.216 7.12a.5.5 0 0 0 0 .76"/></svg>
  );
}
