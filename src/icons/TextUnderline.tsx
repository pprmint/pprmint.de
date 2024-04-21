import { SVGAttributes } from "react";
export default function TextUnderline({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3 14h9v1H3zM7.5 12.2A2.5 2.5 0 0 0 10 9.7V2h1v7.7a3.503 3.503 0 0 1-3.5 3.5A3.503 3.503 0 0 1 4 9.7V2h1v7.7a2.5 2.5 0 0 0 2.5 2.5"/></svg>
  );
}
