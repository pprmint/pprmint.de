import { SVGAttributes } from "react";
export default function Edit({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10.796 1.5a1 1 0 0 1 1.414 0l1.293 1.293a.997.997 0 0 1 0 1.414L7 10.707a1 1 0 0 1-.707.293H4V8.707c0-.265.105-.52.293-.707zM5 8.707V10h1.293l6.503-6.5-1.293-1.293z"/><path d="m13 7 1-1v6.5a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1H9L8 2H2.5a.5.5 0 0 0-.5.5v10c0 .133.053.26.146.354A.5.5 0 0 0 2.5 13h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 12.5z"/></svg>
  );
}
