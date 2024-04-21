import { SVGAttributes } from "react";
export default function Download({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m8 8.386 3-3V6.8l-3.5 3.5L4 6.8V5.386l3 3V2h1z"/><path d="M1 8h1v3.5c0 .133.053.26.146.354A.5.5 0 0 0 2.5 12h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 11.5V8h1v3.5a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 11.5z"/></svg>
  );
}
