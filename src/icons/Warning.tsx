import { SVGAttributes } from "react";
export default function Warning({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6.8 2.5a.7.7 0 0 1 1.4 0s-.108 2.837-.153 4.9c-.025 1.176-.025 2.1-.025 2.1a.522.522 0 0 1-1.044 0s0-.924-.025-2.1C6.908 5.337 6.8 2.5 6.8 2.5"/><circle cx="7.5" cy="12.5" r=".75"/></svg>
  );
}
