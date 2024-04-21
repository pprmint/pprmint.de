import { SVGAttributes } from "react";
export default function VolumeLow({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11 6h1v3h-1zM4.293 11H2.5A1.5 1.5 0 0 1 1 9.5v-4A1.5 1.5 0 0 1 2.5 4h1.793l2.561-2.561A1.5 1.5 0 0 1 7.914 1H10v13H7.914c-.398 0-.779-.158-1.06-.439zM5 4.707v5.586l2.561 2.561a.5.5 0 0 0 .353.146H9V2H7.914a.5.5 0 0 0-.353.146zM4 5H2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5H4z"/></svg>
  );
}
