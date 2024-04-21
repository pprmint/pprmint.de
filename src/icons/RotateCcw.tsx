import { SVGAttributes } from "react";
export default function RotateCcw({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2 4.036A6.5 6.5 0 0 1 7.5 1C11.087 1 14 3.913 14 7.5S11.087 14 7.5 14a6.504 6.504 0 0 1-6.481-6h1.003A5.504 5.504 0 0 0 7.5 13c3.036 0 5.5-2.464 5.5-5.5S10.536 2 7.5 2a5.5 5.5 0 0 0-4.9 3H6L5 6H1V2l1-1z"/></svg>
  );
}
