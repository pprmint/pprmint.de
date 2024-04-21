import { SVGAttributes } from "react";
export default function Keyboard({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 4.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 10.5v-6A1.5 1.5 0 0 1 2.5 3h10A1.5 1.5 0 0 1 14 4.5m-1 0a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z"/><path d="M5 9h5v1H5zM3 9h1v1H3zM4 7h1v1H4zM6 7h1v1H6zM8 7h1v1H8zM3 5h1v1H3zM5 5h1v1H5zM7 5h1v1H7zM9 5h1v1H9zM11 5h1v1h-1zM11 9h1v1h-1zM10 7h1v1h-1z"/></svg>
  );
}
