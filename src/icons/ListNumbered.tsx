import { SVGAttributes } from "react";
export default function ListNumbered({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 12h6v-1H6zM6 8h6V7H6zM6 4h6V3H6zM2 3.2v-1L3 2h1v3H3V3zM2 9v-.772s2-.46 2-1.094c0-.486-1.228-.424-2.002.046l.011-1.001S2.578 5.9 3.5 5.9c1.117 0 1.499.553 1.499 1.08C4.999 7.769 4 8 4 8h1v1zM3 11.187s1.001-.042 1.001-.193c0-.511-1.228-.477-2.001 0l.01-.812S2.58 9.9 3.501 9.9c1.117 0 1.499.394 1.499.79 0 .355-.208.547-.45.652.314.121.55.325.55.664 0 .534-.395 1.094-1.549 1.094-.952 0-1.54-.282-1.54-.282L2 11.804c.799.476 2.068.602 2.068.202S3 11.813 3 11.813z"/></svg>
  );
}
