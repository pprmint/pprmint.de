import { SVGAttributes } from "react";
export default function Jiggy({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 11.052V12.5a1.5 1.5 0 0 1-1.5 1.5H8.1v-.5a1.6 1.6 0 0 0-3.2 0v.5H2.5A1.5 1.5 0 0 1 1 12.5v-2.4h.5a1.6 1.6 0 0 0 0-3.2H1V4.5A1.5 1.5 0 0 1 2.5 3h1.448A2.6 2.6 0 0 1 6.5.9c1.264 0 2.319.904 2.552 2.1H10.5A1.5 1.5 0 0 1 12 4.5v1.448A2.6 2.6 0 0 1 14.1 8.5a2.6 2.6 0 0 1-2.1 2.552m-.5-.952a1.6 1.6 0 0 0 0-3.2H11V4.5a.5.5 0 0 0-.5-.5H8.1v-.5a1.6 1.6 0 0 0-3.2 0V4H2.5a.5.5 0 0 0-.5.5v1.448A2.6 2.6 0 0 1 4.1 8.5 2.6 2.6 0 0 1 2 11.052V12.5a.5.5 0 0 0 .5.5h1.448A2.6 2.6 0 0 1 6.5 10.9c1.264 0 2.319.904 2.552 2.1H10.5a.5.5 0 0 0 .5-.5v-2.4z"/></svg>
  );
}
