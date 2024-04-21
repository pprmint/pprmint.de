import { SVGAttributes } from "react";
export default function ExternalLink({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m7 1.045-1 1H2.5a.5.5 0 0 0-.5.5V12.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.023l1-1V12.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5V2.545a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M13 2.707 7.354 8.354l-.708-.708L12.293 2H9l1-1h4v4l-1 1z"/></svg>
  );
}
