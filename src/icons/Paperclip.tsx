import { SVGAttributes } from "react";
export default function Paperclip({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m3.421 12.32.004.004a2.65 2.65 0 0 0 3.75-.001l5.72-5.72.707.708-5.72 5.719a3.65 3.65 0 0 1-5.166 0 .5.5 0 0 0 .354.147l-.356-.15a3.65 3.65 0 0 1 0-5.166l6.199-6.199a2.6 2.6 0 0 1 3.679 0 2.605 2.605 0 0 1 .002 3.682L7.388 10.55a1.553 1.553 0 0 1-2.195-2.194L9.92 3.629l.707.707L5.9 9.063a.554.554 0 0 0 .001.78.547.547 0 0 0 .779 0l5.207-5.206A1.604 1.604 0 0 0 9.62 2.369L3.421 8.568a2.653 2.653 0 0 0 0 3.752"/></svg>
  );
}
