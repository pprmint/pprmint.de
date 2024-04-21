import { SVGAttributes } from "react";
export default function ChevronDownRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m10 4 1 1v6H5l-1-1h6z"/></svg>
  );
}
