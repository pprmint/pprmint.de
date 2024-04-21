import { SVGAttributes } from "react";
export default function Cup({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 10v.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 1 10.5V3h11v2h.2a2.5 2.5 0 0 1 0 5zm0-4v3h.2a1.5 1.5 0 0 0 0-3zm-1-2H2v6.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
