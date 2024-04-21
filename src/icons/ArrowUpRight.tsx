import { SVGAttributes } from "react";
export default function ArrowUpRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m11 4.707-7.646 7.647-.708-.708L10.293 4H5l1-1h6v6l-1 1z"/></svg>
  );
}
