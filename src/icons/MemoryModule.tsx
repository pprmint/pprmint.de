import { SVGAttributes } from "react";
export default function MemoryModule({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2 9.914A1.503 1.503 0 0 1 1 8.5V7h.5a.5.5 0 0 0 0-1H1V4.5A1.503 1.503 0 0 1 2.5 3h10A1.503 1.503 0 0 1 14 4.5V6h-.5a.5.5 0 0 0 0 1h.5v1.5a1.5 1.5 0 0 1-1 1.414v.586a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 10.5zM12 10h-1v1h.5a.5.5 0 0 0 .5-.5zm-2 0H9v1h1zm-2 0H7v1h1zm-2 0H5v1h1zm-2 0H3v.5a.5.5 0 0 0 .5.5H4zM2 5.085c.582.207 1 .762 1 1.415s-.418 1.208-1 1.415V8.5c0 .133.053.26.146.354A.5.5 0 0 0 2.5 9h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 8.5v-.585c-.582-.207-1-.762-1-1.415s.418-1.208 1-1.415V4.5a.5.5 0 0 0-.146-.354A.5.5 0 0 0 12.5 4h-10a.5.5 0 0 0-.354.146A.5.5 0 0 0 2 4.5z"/></svg>
  );
}
