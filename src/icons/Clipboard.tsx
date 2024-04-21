import { SVGAttributes } from "react";
export default function Clipboard({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10.915 1h.585A1.5 1.5 0 0 1 13 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5v-10A1.5 1.5 0 0 1 3.5 1h.585c.207-.582.762-1 1.415-1h4c.653 0 1.208.418 1.415 1m-6.83 1H3.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-.585c-.207.582-.762 1-1.415 1h-4a1.5 1.5 0 0 1-1.415-1M10 1.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 .5-.5"/></svg>
  );
}
