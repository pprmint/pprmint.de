import { SVGAttributes } from "react";
export default function Text({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7 3H4a1 1 0 0 0-1 1H2V2h11v2h-1a1 1 0 0 0-1-1H8v10H7z"/></svg>
  );
}
