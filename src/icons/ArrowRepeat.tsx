import { SVGAttributes } from "react";
export default function ArrowRepeat({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.29 4H5.501a3.5 3.5 0 0 0-3.5 3.5v.495h-1V7.5a4.5 4.5 0 0 1 4.5-4.5h6.79l-2-2h1.414l2.5 2.5-2.5 2.5H10.29zm-9.582 8 2 2H3.294l-2.5-2.5 2.5-2.5h1.414l-2 2h6.79a3.496 3.496 0 0 0 3.5-3.5v-.494h1V7.5a4.497 4.497 0 0 1-4.5 4.5z"/></svg>
  );
}
