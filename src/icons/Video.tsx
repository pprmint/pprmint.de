import { SVGAttributes } from "react";
export default function Video({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.5 14h-10A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h10A1.5 1.5 0 0 1 14 2.5v10a1.5 1.5 0 0 1-1.5 1.5M3 2h-.5a.5.5 0 0 0-.5.5V3h1zM2 4v1h1V4zm0 2v.992h1V6zm0 1.992V9h1V7.992zM2 10v1h1v-1zm0 2v.5a.5.5 0 0 0 .5.5H3v-1zm9-10H4v4.992h7zm1 11h.5a.5.5 0 0 0 .5-.5V12h-1zm1-2v-1h-1v1zm0-2V7.992h-1V9zm0-2.008V6h-1v.992zM13 5V4h-1v1zm0-2v-.5a.5.5 0 0 0-.5-.5H12v1zM4 13h7V7.992H4z"/></svg>
  );
}
