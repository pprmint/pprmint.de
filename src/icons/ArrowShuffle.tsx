import { SVGAttributes } from "react";
export default function ArrowShuffle({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m5.941 7.5-.783-1.565A3.5 3.5 0 0 0 2.028 4H1.001l.013-1h1.014a4.5 4.5 0 0 1 4.025 2.488l.447.894.447-.894A4.5 4.5 0 0 1 10.972 3h1.318l-2-2h1.415l2.5 2.5-2.5 2.5H10.29l2-2h-1.318a3.5 3.5 0 0 0-3.13 1.935L7.06 7.5l.783 1.566A3.5 3.5 0 0 0 10.972 11h1.318l-2-2h1.415l2.5 2.5-2.5 2.5H10.29l2-2h-1.318a4.5 4.5 0 0 1-4.025-2.487L6.5 8.618l-.447.895A4.5 4.5 0 0 1 2.028 12H1.001l.013-1h1.014a3.5 3.5 0 0 0 3.13-1.934z"/></svg>
  );
}
