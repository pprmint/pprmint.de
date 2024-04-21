import { SVGAttributes } from "react";
export default function Stop({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14.096 2.404v10.192a1.5 1.5 0 0 1-1.5 1.5H2.404a1.5 1.5 0 0 1-1.5-1.5V2.404a1.5 1.5 0 0 1 1.5-1.5h10.192a1.5 1.5 0 0 1 1.5 1.5m-1 0a.5.5 0 0 0-.5-.5H2.404a.5.5 0 0 0-.5.5v10.192a.5.5 0 0 0 .5.5h10.192a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
