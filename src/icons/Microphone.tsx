import { SVGAttributes } from "react";
export default function Microphone({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7 11.972A4.5 4.5 0 0 1 3 7.5V5h1v2.5C4 9.432 5.568 11 7.5 11S11 9.432 11 7.5V5h1v2.5a4.5 4.5 0 0 1-4 4.472V14H7z"/><path d="M10 3.5v4a2.5 2.5 0 0 1-5 0v-4a2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 0 0-3 0v4a1.5 1.5 0 0 0 3 0z"/></svg>
  );
}
