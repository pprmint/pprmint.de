import { SVGAttributes } from "react";
export default function PaperclipVertical({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 4h1v6.6c0 1.932-1.568 3.5-3.5 3.5A3.5 3.5 0 0 1 4 10.6V3.4a2.5 2.5 0 0 1 5 0v6.2a1.5 1.5 0 0 1-3 0V4h1v5.6a.5.5 0 0 0 1 0V3.4a1.5 1.5 0 0 0-3 0v7.2a2.5 2.5 0 0 0 5 0z"/></svg>
  );
}
