import { SVGAttributes } from "react";
export default function TextBold({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5 12.999zH3V2h2v.001L8 2c2 0 3.535 1 3.535 3 0 1.497-1.384 2.5-2.035 2.5.647 0 2.494.5 2.494 2.5 0 3-2.994 3.039-3.994 3zm0-10v4.002L8 7c1 0 1.546-1 1.546-2S9 3 7.5 3zm0 5v4.002L8 12c1.5 0 2.006-1 2.006-2S9.447 8 8 8z"/></svg>
  );
}
