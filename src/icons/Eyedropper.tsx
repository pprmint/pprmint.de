import { SVGAttributes } from "react";
export default function Eyedropper({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m10.146 6.121.708.708-6.415 6.414a2.5 2.5 0 0 1-1.767.732H1v-1.672c0-.663.263-1.298.732-1.767l6.364-6.365.708.708-6.365 6.364A1.5 1.5 0 0 0 2 12.303v.672h.672a1.5 1.5 0 0 0 1.06-.439z"/><path d="M11 1a3.001 3.001 0 0 1 0 6 3.001 3.001 0 0 1 0-6m0 1a2 2 0 1 0 .001 4.001A2 2 0 0 0 11 2"/></svg>
  );
}
