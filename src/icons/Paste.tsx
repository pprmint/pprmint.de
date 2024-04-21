import { SVGAttributes } from "react";
export default function Paste({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4.085 2H3.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5H6v1H3.5A1.5 1.5 0 0 1 2 12.5v-10A1.5 1.5 0 0 1 3.5 1h.585c.207-.582.762-1 1.415-1h4c.653 0 1.208.418 1.415 1h.585A1.5 1.5 0 0 1 13 2.5V5h-1V2.5a.5.5 0 0 0-.5-.5h-.585c-.207.582-.762 1-1.415 1h-4a1.5 1.5 0 0 1-1.415-1M10 1.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 .5-.5"/><path d="M14 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 7 13.5v-6A1.5 1.5 0 0 1 8.5 6h4A1.5 1.5 0 0 1 14 7.5m-1 0a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
