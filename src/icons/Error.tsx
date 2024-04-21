import { SVGAttributes } from "react";
export default function Error({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m12.354 11.646-.708.708-9-9 .708-.708z"/><path d="m11.646 2.646.708.708-9 9-.708-.708z"/></svg>
  );
}
