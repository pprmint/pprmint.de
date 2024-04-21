import { SVGAttributes } from "react";
export default function Filter({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M13 1v2.672c0 .663-.263 1.299-.732 1.767L9 8.707v3l-3 3v-6L2.732 5.439A2.5 2.5 0 0 1 2 3.672V1zM3 2v1.672c0 .397.158.779.439 1.06L7 8.293v4l1-1v-3l3.561-3.561A1.5 1.5 0 0 0 12 3.672V2z"/></svg>
  );
}
