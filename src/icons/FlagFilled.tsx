import { SVGAttributes } from "react";
export default function FlagFilled({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2 14V1h1v.754C3.791 1.445 5.064 1 5.833 1c.623 0 1.25.264 1.872.544.489.22.973.456 1.462.456.673 0 1.781-.408 2.481-.685l.005-.002a.996.996 0 0 1 1.344.933C13 3.802 13 7.368 13 8.842c0 .627-.389 1.188-.97 1.404-.796.309-2.086.754-2.863.754-.623 0-1.25-.264-1.872-.544-.489-.22-.973-.456-1.462-.456-.803 0-2.221.565-2.833.827V14z"/></svg>
  );
}
