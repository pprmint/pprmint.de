import { SVGAttributes } from "react";
export default function DollarBill({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 4.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 10.5v-6A1.5 1.5 0 0 1 2.5 3h10A1.5 1.5 0 0 1 14 4.5M11.05 4h-7.1A2.5 2.5 0 0 1 2 5.95v3.1c.98.199 1.751.97 1.95 1.95h7.1c.199-.98.97-1.751 1.95-1.95v-3.1A2.5 2.5 0 0 1 11.05 4M7.5 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5"/></svg>
  );
}
