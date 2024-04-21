import { SVGAttributes } from "react";
export default function Disc({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.9c3.643 0 6.6 2.957 6.6 6.6s-2.957 6.6-6.6 6.6A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9m0 1a5.6 5.6 0 0 0-5.6 5.6c0 3.091 2.509 5.6 5.6 5.6s5.6-2.509 5.6-5.6-2.509-5.6-5.6-5.6"/><path d="M7.5 5.75a1.75 1.75 0 1 1-.001 3.501A1.75 1.75 0 0 1 7.5 5.75m0 1a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"/></svg>
  );
}
