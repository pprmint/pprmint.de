import { SVGAttributes } from "react";
export default function Sun({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5 3.9c1.987 0 3.6 1.613 3.6 3.6s-1.613 3.6-3.6 3.6a3.6 3.6 0 0 1-3.6-3.6c0-1.987 1.613-3.6 3.6-3.6m0 1a2.601 2.601 0 0 0 0 5.2 2.601 2.601 0 0 0 0-5.2M7 1h1v2H7zM3.964 10.328l.708.708-1.415 1.414-.707-.707zM12 8V7h2v1zM4.672 3.964l-.708.708L2.55 3.257l.707-.707zM7 12h1v2H7zM11.743 2.55l.707.707-1.414 1.415-.708-.708zM1 8V7h2v1zM12.45 11.743l-.707.707-1.415-1.414.708-.708z"/></svg>
  );
}
