import { SVGAttributes } from "react";
export default function Trash({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m3.293 3 2-2h4.414l2 2H13v1h-1v8.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5V4H2V3zm1.414 0h5.586l-1-1H5.707zM4 4v8.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V4z"/><path d="M9 5h1v7H9zM5 5h1v7H5zM7 5h1v7H7z"/></svg>
  );
}
