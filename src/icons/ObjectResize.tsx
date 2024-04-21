import { SVGAttributes } from "react";
export default function ObjectResize({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3.414 1h5.172l-1-1H9l1.5 1.5L9 3H7.586l1-1H3.414l1 1H3L1.5 1.5 3 0h1.414zM14 6.414v5.172l1-1V12l-1.5 1.5L12 12v-1.414l1 1V6.414l-1 1V6l1.5-1.5L15 6v1.414zM11 5.5v7A1.5 1.5 0 0 1 9.5 14h-7A1.5 1.5 0 0 1 1 12.5v-7A1.5 1.5 0 0 1 2.5 4h7A1.5 1.5 0 0 1 11 5.5m-1 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
