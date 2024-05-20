import { SVGAttributes } from "react";
export default function WarningCircle({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.9c3.643 0 6.6 2.957 6.6 6.6s-2.957 6.6-6.6 6.6A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9m0 1a5.6 5.6 0 0 0-5.6 5.6c0 3.091 2.509 5.6 5.6 5.6s5.6-2.509 5.6-5.6-2.509-5.6-5.6-5.6"/><path d="M6.8 4.5a.7.7 0 0 1 1.4 0s-.108 1.619-.153 2.8c-.025.672-.025 1.2-.025 1.2a.522.522 0 0 1-1.044 0s0-.528-.025-1.2A121 121 0 0 0 6.8 4.5"/><circle cx="7.5" cy="10.5" r=".75"/></svg>
  );
}
