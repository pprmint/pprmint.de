import { SVGAttributes } from "react";
export default function Share({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m7 2.614-2 2V3.2L7.5.7 10 3.2v1.414l-2-2v7.409H7z"/><path d="M5 6.045v1H2.5a.5.5 0 0 0-.5.5V12.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7.545a.5.5 0 0 0-.5-.5H10v-1h2.5a1.5 1.5 0 0 1 1.5 1.5V12.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5V7.545a1.5 1.5 0 0 1 1.5-1.5z"/></svg>
  );
}
