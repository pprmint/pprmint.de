import { SVGAttributes } from "react";
export default function Instagram({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 3.9v7.2a2.9 2.9 0 0 1-2.9 2.9H3.9A2.9 2.9 0 0 1 1 11.1V3.9A2.9 2.9 0 0 1 3.9 1h7.2A2.9 2.9 0 0 1 14 3.9m-1 0A1.9 1.9 0 0 0 11.1 2H3.9A1.9 1.9 0 0 0 2 3.9v7.2A1.9 1.9 0 0 0 3.9 13h7.2a1.9 1.9 0 0 0 1.9-1.9z"/><circle cx="11" cy="4" r="1"/><path d="M7.5 4C9.432 4 11 5.568 11 7.5S9.432 11 7.5 11A3.5 3.5 0 0 1 4 7.5C4 5.568 5.568 4 7.5 4m0 1a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5"/></svg>
  );
}
