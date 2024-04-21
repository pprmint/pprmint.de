import { SVGAttributes } from "react";
export default function TriangleUp({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 9.043V10H3v-.957l4.5-4.5z"/></svg>
  );
}
