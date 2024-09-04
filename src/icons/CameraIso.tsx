import { SVGAttributes } from "react";
export default function CameraIso({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3 5h1v5H3z"/><path d="M7.5.9c3.643 0 6.6 2.957 6.6 6.6s-2.957 6.6-6.6 6.6A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9m0 1a5.6 5.6 0 0 0-5.6 5.6c0 3.091 2.509 5.6 5.6 5.6s5.6-2.509 5.6-5.6-2.509-5.6-5.6-5.6"/><path d="M6 6v1h1a.997.997 0 0 1 1 1v1a.997.997 0 0 1-1 1H5V9h2V8H6a.997.997 0 0 1-1-1V6a.997.997 0 0 1 1-1h2v1zM12 5.9v3.2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V5.9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1m-2 0v3.2h1V5.9z"/></svg>
  );
}
