import { SVGAttributes } from "react";
export default function UsbStick({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11 5.085c.582.207 1 .762 1 1.415v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5v-6c0-.653.418-1.208 1-1.415V1h7zM4.5 6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5zM10 5V2H5v3z"/><path d="M6 3h1v1H6zM8 3h1v1H8z"/></svg>
  );
}
