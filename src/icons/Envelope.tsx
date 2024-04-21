import { SVGAttributes } from "react";
export default function Envelope({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 4.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 10.5v-6A1.5 1.5 0 0 1 2.5 3h10A1.5 1.5 0 0 1 14 4.5M12.402 4H2.598l4.623 3.11a.5.5 0 0 0 .558 0zM2 4.803V10.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4.803L8.337 7.939a1.5 1.5 0 0 1-1.674 0z"/></svg>
  );
}
