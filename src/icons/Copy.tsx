import { SVGAttributes } from "react";
export default function Copy({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11 4.5v8A1.5 1.5 0 0 1 9.5 14h-6A1.5 1.5 0 0 1 2 12.5v-8A1.5 1.5 0 0 1 3.5 3h6A1.5 1.5 0 0 1 11 4.5m-1 0a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5z"/><path d="M5 2V1h6.5A1.5 1.5 0 0 1 13 2.5V11h-1V2.5a.5.5 0 0 0-.5-.5z"/></svg>
  );
}
