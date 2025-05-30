import { SVGAttributes } from "react";
export default function GraphTrendUp({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2 11.7v.3h12v1H1V2h1v8.3l4.5-4.5 2 2L12.3 4H10V3h4v4h-1V4.7L8.5 9.2l-2-2L2 11.7Z"/></svg>
  );
}