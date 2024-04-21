import { SVGAttributes } from "react";
export default function TriangleUpDown({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11 5.043V6H4v-.957l3.5-3.5zM4 9.957V9h7v.957l-3.5 3.5z"/></svg>
  );
}
