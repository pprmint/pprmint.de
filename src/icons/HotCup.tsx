import { SVGAttributes } from "react";
export default function HotCup({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 12.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 1 12.5V6h11v1.5a2.5 2.5 0 0 1 0 5m0-4v3a1.5 1.5 0 0 0 0-3M11 7H2v5.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5zM3.8 1S5 2 5 3 3.8 5 3.8 5H5s1-1 1-2-1-2-1-2zM6.8 1S8 2 8 3 6.8 5 6.8 5H8s1-1 1-2-1-2-1-2z"/></svg>
  );
}
