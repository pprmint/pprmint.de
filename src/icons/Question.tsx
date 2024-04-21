import { SVGAttributes } from "react";
export default function Question({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7 12h1v1H7zM8 11H7v-1c0-1.636.992-2.184 2.028-2.698.714-.354 1.472-.674 1.472-1.802 0-.503-.169-1.299-.829-1.853C9.208 3.259 8.514 3 7.5 3 4.986 3 4.491 5.595 4.491 5.595l-.982-.19S4.181 2 7.5 2c1.32 0 2.212.376 2.813.881.936.785 1.187 1.906 1.187 2.619 0 1.636-.992 2.184-2.028 2.698C8.758 8.552 8 8.872 8 10z"/></svg>
  );
}
