import { SVGAttributes } from "react";
export default function HourglassDraining({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9 4v.5a1.5 1.5 0 1 1-3 0V4z"/><path d="M3 2V1h9v1h-.5a.5.5 0 0 0-.35.146.48.48 0 0 0-.15.354v2c0 1.273-.68 2.388-1.7 3a3.49 3.49 0 0 1 1.7 3v2c0 .132.05.26.15.354a.5.5 0 0 0 .35.146h.5v1H3v-1h.5a.5.5 0 0 0 .35-.146A.48.48 0 0 0 4 12.5v-2c0-1.274.68-2.388 1.7-3a3.49 3.49 0 0 1-1.7-3v-2a.48.48 0 0 0-.15-.354A.5.5 0 0 0 3.5 2zm7.09 0H4.91q.09.241.09.5v2a2.5 2.5 0 0 0 5 0v-2q0-.259.09-.5m0 11q-.09-.241-.09-.5v-2a2.5 2.5 0 0 0-5 0v2q0 .259-.09.5z"/><path d="M6 11h3v1H6z"/></svg>
  );
}
