import { SVGAttributes } from "react";
export default function FastBackward({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M8 9.272v3.324a1.499 1.499 0 0 1-2.682.923L1.337 8.423a1.5 1.5 0 0 1 0-1.846l3.981-5.096A1.5 1.5 0 0 1 8 2.404v3.324l3.318-4.247A1.5 1.5 0 0 1 14 2.404v10.192a1.499 1.499 0 0 1-2.682.923zm.125-1.464 3.981 5.096a.5.5 0 0 0 .894-.308V2.404a.5.5 0 0 0-.894-.308L8.125 7.192a.5.5 0 0 0 0 .616m-6 0 3.981 5.096A.5.5 0 0 0 7 12.596V2.404a.5.5 0 0 0-.894-.308L2.125 7.192a.5.5 0 0 0 0 .616"/></svg>
  );
}
