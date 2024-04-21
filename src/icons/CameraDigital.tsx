import { SVGAttributes } from "react";
export default function CameraDigital({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 10.5a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 10.5v-6A1.503 1.503 0 0 1 2.5 3h10A1.503 1.503 0 0 1 14 4.5zm-1 0v-6a.5.5 0 0 0-.146-.354A.5.5 0 0 0 12.5 4h-10a.5.5 0 0 0-.354.146A.5.5 0 0 0 2 4.5v6c0 .133.053.26.146.354A.5.5 0 0 0 2.5 11h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 10.5"/><path d="M5 2.25A.25.25 0 0 0 4.75 2h-1.5a.25.25 0 0 0-.25.25V3.5h2zM5 5.25A.25.25 0 0 0 4.75 5h-1.5a.25.25 0 0 0-.25.25v.5a.25.25 0 0 0 .25.25h1.5A.25.25 0 0 0 5 5.75zM8.5 4.9a2.601 2.601 0 0 1 0 5.2 2.601 2.601 0 0 1 0-5.2m0 1a1.6 1.6 0 1 0 .002 3.202A1.6 1.6 0 0 0 8.5 5.9"/></svg>
  );
}
