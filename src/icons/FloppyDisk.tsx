import { SVGAttributes } from "react";
export default function FloppyDisk({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.5 14h-10A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h8.586c.398 0 .779.158 1.06.439l1.415 1.415c.281.281.439.662.439 1.06V12.5a1.5 1.5 0 0 1-1.5 1.5m-.5-1h.5a.5.5 0 0 0 .5-.5V3.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 11.086 2H11v2.5A1.5 1.5 0 0 1 9.5 6h-4A1.5 1.5 0 0 1 4 4.5V2H2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5H3V8.5A1.5 1.5 0 0 1 4.5 7h6A1.5 1.5 0 0 1 12 8.5zM10 2H8v3h1.5a.5.5 0 0 0 .5-.5zM4 13h7V8.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5z"/></svg>
  );
}
