import { SVGAttributes } from "react";
export default function WarningTriangle({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6.8 5.5a.7.7 0 0 1 1.4 0s-.108 1.619-.153 2.8c-.025.672-.025 1.2-.025 1.2a.522.522 0 0 1-1.044 0s0-.528-.025-1.2A121 121 0 0 0 6.8 5.5"/><circle cx="7.5" cy="11.5" r=".75"/><path d="M1.503 14.008a1.501 1.501 0 0 1-1.291-2.264L6.209 1.608a1.5 1.5 0 0 1 2.582 0l5.997 10.136a1.501 1.501 0 0 1-1.291 2.264zm0-1h11.994a.5.5 0 0 0 .43-.755L7.93 2.117a.5.5 0 0 0-.86 0L1.073 12.253a.502.502 0 0 0 .43.755"/></svg>
  );
}
