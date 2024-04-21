import { SVGAttributes } from "react";
export default function BrightnessLow({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5 4.9a2.601 2.601 0 0 1 0 5.2 2.601 2.601 0 0 1 0-5.2m0 1a1.6 1.6 0 1 0 .002 3.202A1.6 1.6 0 0 0 7.5 5.9M7 3h1v1H7zM10.328 5.379l-.707-.707.707-.708.708.708zM11 8V7h1v1zM9.621 10.328l.707-.707.708.707-.708.708zM7 11h1v1H7zM4.672 11.036l-.708-.708.708-.707.707.707zM3 8V7h1v1zM3.964 4.672l.708-.708.707.708-.707.707z"/></svg>
  );
}
