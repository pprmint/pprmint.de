import { SVGAttributes } from "react";
export default function PaperclipHorizontal({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11 10v1H4.4A3.5 3.5 0 0 1 .9 7.5C.9 5.568 2.468 4 4.4 4h7.2a2.5 2.5 0 0 1 0 5H5.4a1.5 1.5 0 0 1 0-3H11v1H5.4a.5.5 0 0 0 0 1h6.2a1.5 1.5 0 0 0 0-3H4.4a2.5 2.5 0 0 0 0 5z"/></svg>
  );
}
