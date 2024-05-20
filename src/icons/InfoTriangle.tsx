import { SVGAttributes } from "react";
export default function InfoTriangle({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><circle cx="7.5" cy="5.5" r=".75"/><path d="M8.5 11.003c.016-.002.491-.003.491-.003L9 12h-.5A1.503 1.503 0 0 1 7 10.5V8H6V7h2v3.5c0 .133.053.26.146.354A.5.5 0 0 0 8.5 11z"/><path d="M1.503 14.008a1.501 1.501 0 0 1-1.291-2.264L6.209 1.608a1.5 1.5 0 0 1 2.582 0l5.997 10.136a1.501 1.501 0 0 1-1.291 2.264zm0-1h11.994a.5.5 0 0 0 .43-.755L7.93 2.117a.5.5 0 0 0-.86 0L1.073 12.253a.502.502 0 0 0 .43.755"/></svg>
  );
}
