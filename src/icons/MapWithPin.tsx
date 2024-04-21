import { SVGAttributes } from "react";
export default function MapWithPin({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m9 4.89-2-.5.243-.97 2.257.565L14 2.86v10.03l-4.5 1.125-4-1L1 14.14V8l1 2v2.86l3-.75V10l1-2v4.11l3 .75zm1 7.97 3-.75V4.14l-3 .75z"/><path d="M3.09 8.787s-.78-1.114-1.404-2.452C1.251 5.403.9 4.363.9 3.5a2.601 2.601 0 0 1 5.2 0c0 .863-.351 1.903-.786 2.835A18 18 0 0 1 3.91 8.787l-.41.585zm.41-1.205c.26-.422.604-1.018.908-1.669.371-.796.692-1.676.692-2.413a1.6 1.6 0 0 0-3.2 0c0 .737.321 1.617.692 2.413.304.651.648 1.247.908 1.669"/><circle cx="3.5" cy="3.5" r=".75"/></svg>
  );
}
