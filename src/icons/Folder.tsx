import { SVGAttributes } from "react";
export default function Folder({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1 11.5v-8A1.503 1.503 0 0 1 2.5 2h4.207l2 2H12.5A1.503 1.503 0 0 1 14 5.5v6a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 11.5M7.293 4l-1-1H2.5a.5.5 0 0 0-.354.146A.5.5 0 0 0 2 3.5v.586q.24-.085.5-.086zM2 5.5v6c0 .133.053.26.146.354A.5.5 0 0 0 2.5 12h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 11.5v-6a.5.5 0 0 0-.146-.354A.5.5 0 0 0 12.5 5h-10a.5.5 0 0 0-.354.146A.5.5 0 0 0 2 5.5"/></svg>
  );
}
