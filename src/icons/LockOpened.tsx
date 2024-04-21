import { SVGAttributes } from "react";
export default function LockOpened({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 5V3.4a1.5 1.5 0 0 0-3 0V6H2V3.4a2.5 2.5 0 1 1 5 0V5h4.5A1.5 1.5 0 0 1 13 6.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 4 12.5v-6A1.5 1.5 0 0 1 5.5 5zm5.5 1h-6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5"/><path d="M9.5 10h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 0 1"/></svg>
  );
}
