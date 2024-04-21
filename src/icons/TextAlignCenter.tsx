import { SVGAttributes } from "react";
export default function TextAlignCenter({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3 3h9v1H3zM5 7h5v1H5zM4 11h7v1H4z"/></svg>
  );
}
