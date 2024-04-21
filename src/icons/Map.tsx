import { SVGAttributes } from "react";
export default function Map({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9.5 2.985 14 1.86v10.03l-4.5 1.125-4-1L1 13.14V3.11l4.5-1.125zM5 3.14l-3 .75v7.97l3-.75zm1 7.97 3 .75V3.89l-3-.75zm4 .75 3-.75V3.14l-3 .75z"/></svg>
  );
}
