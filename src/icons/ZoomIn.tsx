import { SVGAttributes } from "react";
export default function ZoomIn({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m6.62 9.085-5.267 5.269-.707-.707L5.915 8.38A4.58 4.58 0 0 1 4.9 5.5C4.9 2.962 6.962.9 9.5.9s4.6 2.062 4.6 4.6-2.062 4.6-4.6 4.6a4.58 4.58 0 0 1-2.88-1.015M9.5 1.9a3.6 3.6 0 0 0-3.6 3.6c0 1.986 1.614 3.6 3.6 3.6s3.6-1.614 3.6-3.6-1.614-3.6-3.6-3.6"/><path d="M9.002 6h-2V5h2V3h1v2h2v1h-2v2h-1z"/></svg>
  );
}
