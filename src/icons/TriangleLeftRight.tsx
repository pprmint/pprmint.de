import { SVGAttributes } from "react";
export default function TriangleLeftRight({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9.957 11H9V4h.957l3.5 3.5zM5.043 4H6v7h-.957l-3.5-3.5z"/></svg>
  );
}
