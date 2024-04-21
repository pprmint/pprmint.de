import { SVGAttributes } from "react";
export default function CheckCircle({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.8c3.643 0 6.6 2.957 6.6 6.6S11.143 14 7.5 14A6.603 6.603 0 0 1 .9 7.4C.9 3.757 3.857.8 7.5.8m0 1a5.6 5.6 0 0 0-5.6 5.6c0 3.091 2.509 5.6 5.6 5.6s5.6-2.509 5.6-5.6-2.509-5.6-5.6-5.6"/><path d="m3.646 7.354.708-.708L6.5 8.793l4.146-4.147.708.708L6.5 10.207z"/></svg>
  );
}
