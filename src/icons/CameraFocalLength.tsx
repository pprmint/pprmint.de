import { SVGAttributes } from "react";
export default function CameraFocalLength({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.9c3.643 0 6.6 2.957 6.6 6.6s-2.957 6.6-6.6 6.6A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9m0 1a5.6 5.6 0 0 0-5.6 5.6c0 3.091 2.509 5.6 5.6 5.6s5.6-2.509 5.6-5.6-2.509-5.6-5.6-5.6"/><path d="M11.1 7.5h1c0 2.539-2.061 4.6-4.6 4.6v-1c1.987 0 3.6-1.613 3.6-3.6m-7.2 0h-1c0-2.539 2.061-4.6 4.6-4.6v1a3.6 3.6 0 0 0-3.6 3.6"/></svg>
  );
}
