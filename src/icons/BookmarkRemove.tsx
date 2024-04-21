import { SVGAttributes } from "react";
export default function BookmarkRemove({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10.5 1A1.503 1.503 0 0 1 12 2.5v12.207l-4.5-4.5-4.5 4.5V2.5A1.503 1.503 0 0 1 4.5 1zm0 1h-6a.5.5 0 0 0-.354.146A.5.5 0 0 0 4 2.5v9.793l3.5-3.5 3.5 3.5V2.5a.5.5 0 0 0-.146-.354A.5.5 0 0 0 10.5 2"/><path d="M5 5h5v1H5z"/></svg>
  );
}
