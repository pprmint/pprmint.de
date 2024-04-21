import { SVGAttributes } from "react";
export default function Ruler({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2.496 5h10.012c.823 0 1.491.673 1.491 1.5v2c0 .829-.668 1.5-1.491 1.5H2.496a1.497 1.497 0 0 1-1.491-1.5v-2c0-.827.668-1.5 1.491-1.5m.515 1h-.515A.5.5 0 0 0 2 6.5v2c0 .277.223.5.497.5h10.012a.5.5 0 0 0 .497-.5v-2c0-.275-.223-.5-.497-.5h-.515v1H11V6h-.994v1H9.01V6H7.999v2h-.994V6H5.993v1H5V6h-.994v1H3.01z"/></svg>
  );
}
