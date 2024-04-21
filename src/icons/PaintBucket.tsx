import { SVGAttributes } from "react";
export default function PaintBucket({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11.146 5.854 8.5 3.207 4.207 7.5l4.439 4.439a.5.5 0 0 0 .708 0l3.585-3.585a.5.5 0 0 0 0-.708l-.343-.343.707-.707.343.343a1.5 1.5 0 0 1 0 2.122l-3.585 3.585a1.5 1.5 0 0 1-2.122 0L3.5 8.207c-.793.793.6 2.149.6 3.27 0 .841-.717 1.623-1.6 1.623S.9 12.318.9 11.477C.9 10.389 2.096 8.196 3.293 7l5-5H10.5a2.5 2.5 0 1 1 0 5h-3V6h3c.226 0 .446-.051.646-.146M9.707 3l2.147 2.146A1.5 1.5 0 0 0 10.5 3z"/><circle cx="7.5" cy="6.5" r="1.1"/></svg>
  );
}
