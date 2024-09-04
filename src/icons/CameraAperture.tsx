import { SVGAttributes } from "react";
export default function CameraAperture({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.9c3.643 0 6.6 2.957 6.6 6.6s-2.957 6.6-6.6 6.6A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9m-.845 1.063A5.6 5.6 0 0 0 2.83 4.411L4.036 6.5zM11.87 4a5.6 5.6 0 0 0-4.029-2.09L6.634 4zm.847 5.537A5.6 5.6 0 0 0 13.1 7.5a5.6 5.6 0 0 0-.588-2.5h-2.414zm-4.372 3.5a5.6 5.6 0 0 0 3.825-2.448L10.964 8.5zM3.13 11a5.6 5.6 0 0 0 4.029 2.09L8.366 11zm-.847-5.537A5.6 5.6 0 0 0 1.9 7.5c0 .898.212 1.747.588 2.5h2.414zM8.943 5H6.057L4.613 7.5 6.057 10h2.886l1.444-2.5z"/></svg>
  );
}
