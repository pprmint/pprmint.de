import { SVGAttributes } from "react";
export default function RotateCw({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.4 5a5.5 5.5 0 0 0-4.9-3A5.5 5.5 0 0 0 2 7.5C2 10.536 4.464 13 7.5 13a5.504 5.504 0 0 0 5.478-5h1.003A6.504 6.504 0 0 1 7.5 14 6.504 6.504 0 0 1 1 7.5C1 3.913 3.913 1 7.5 1A6.5 6.5 0 0 1 13 4.036V1l1 1v4h-4L9 5z"/></svg>
  );
}
