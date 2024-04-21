import { SVGAttributes } from "react";
export default function EuroBill({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 4.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 10.5v-6A1.5 1.5 0 0 1 2.5 3h10A1.5 1.5 0 0 1 14 4.5M8 4H2.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5H8v-.565a3.103 3.103 0 0 1 0-5.87zm1 1.4a2.101 2.101 0 0 0 0 4.2 2.101 2.101 0 0 0 0-4.2"/><path d="M5 5.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 3 5.75v-.5A.25.25 0 0 1 3.25 5h1.5a.25.25 0 0 1 .25.25M4 9.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 3 9.75v-.5A.25.25 0 0 1 3.25 9h.5a.25.25 0 0 1 .25.25"/></svg>
  );
}
