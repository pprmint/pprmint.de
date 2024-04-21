import { SVGAttributes } from "react";
export default function TV({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.5 2A1.501 1.501 0 0 1 14 3.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.501 1.501 0 0 1 1 9.5v-6A1.5 1.5 0 0 1 2.5 2zm0 1h-10a.5.5 0 0 0-.5.5v6a.503.503 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-6a.503.503 0 0 0-.5-.5M4 12h7v1H4z"/></svg>
  );
}
