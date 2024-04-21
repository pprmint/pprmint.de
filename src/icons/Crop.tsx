import { SVGAttributes } from "react";
export default function Crop({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M3 4H1V3h2V1h1v2h6.5A1.5 1.5 0 0 1 12 4.5V11h2v1h-2v2h-1v-2H4.5A1.5 1.5 0 0 1 3 10.5zm8 7V4.5a.5.5 0 0 0-.5-.5H4v6.5c0 .276.225.5.5.5z"/></svg>
  );
}
