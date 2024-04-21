import { SVGAttributes } from "react";
export default function Heart({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1.881 7.619a3.353 3.353 0 0 1 0-4.738 3.353 3.353 0 0 1 4.738 0l.881.881.881-.881a3.353 3.353 0 0 1 4.738 0 3.353 3.353 0 0 1 0 4.738L7.5 13.238zM7.5 11.823l4.912-4.911a2.35 2.35 0 0 0 0-3.324 2.35 2.35 0 0 0-3.324 0L7.5 5.177 5.912 3.588a2.35 2.35 0 0 0-3.324 0 2.35 2.35 0 0 0 0 3.324z"/></svg>
  );
}
