import { SVGAttributes } from "react";
export default function Printer({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4 11H2.5A1.5 1.5 0 0 1 1 9.5v-4A1.5 1.5 0 0 1 2.5 4H4V2h7v2h1.5A1.5 1.5 0 0 1 14 5.5v4a1.5 1.5 0 0 1-1.5 1.5H11v2H4zm1-7h5V3H5zm6 6h1.5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5H4V7h7zm-1-2H5v4h5z"/></svg>
  );
}
