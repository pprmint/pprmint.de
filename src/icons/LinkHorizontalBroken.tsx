import { SVGAttributes } from "react";
export default function LinkHorizontalBroken({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14.1 7.5a2.5 2.5 0 0 1-2.5 2.5H9V9h2.6a1.502 1.502 0 0 0 1.06-2.56A1.5 1.5 0 0 0 11.6 6H9V5h2.6a2.502 2.502 0 0 1 2.5 2.5M1.9 7.5A1.5 1.5 0 0 0 3.4 9H6v1H3.4a2.502 2.502 0 0 1 0-5H6v1H3.4a1.5 1.5 0 0 0-1.5 1.5M7 13v-2h1v2zM5.646 10.645l.707.709-1 1-.707-.709zM8.647 11.351l.707-.708 1 1-.707.708zM7 4V2h1v2zM9.647 2.646l.707.708-1 1-.707-.708zM4.646 3.352l.707-.709 1 1-.707.709z"/></svg>
  );
}
