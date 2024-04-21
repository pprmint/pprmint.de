import { SVGAttributes } from "react";
export default function SdCardFront({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2 2.5A1.503 1.503 0 0 1 3.5 1h5.586c.398 0 .779.158 1.06.439l2.415 2.415c.281.281.439.662.439 1.06V12.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5V8h1V7H2zM3 6h1v3H3v3.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V4.914a.5.5 0 0 0-.146-.353L9.439 2.146A.5.5 0 0 0 9.086 2H3.5a.5.5 0 0 0-.354.146A.5.5 0 0 0 3 2.5z"/><path d="M7.323 3.077a.25.25 0 0 1 .354 0l1.496 1.496A.25.25 0 0 1 8.996 5H6.004a.25.25 0 0 1-.177-.427z"/></svg>
  );
}
