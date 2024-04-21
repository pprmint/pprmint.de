import { SVGAttributes } from "react";
export default function DiskDrive({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.5 13h-10A1.5 1.5 0 0 1 1 11.5v-2q0-.204.052-.391L2.34 3.181A1.5 1.5 0 0 1 3.806 2h7.388a1.5 1.5 0 0 1 1.466 1.181l1.288 5.928q.051.187.052.391v2a1.5 1.5 0 0 1-1.5 1.5M11.194 3H3.806a.5.5 0 0 0-.489.394L2.314 8.011A2 2 0 0 1 2.5 8h10q.095 0 .186.011l-1.003-4.617A.5.5 0 0 0 11.194 3M12.5 9h-10a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5"/><path d="M4.25 10.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/></svg>
  );
}
