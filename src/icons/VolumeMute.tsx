import { SVGAttributes } from "react";
export default function VolumeMute({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9 5.707 9.707 5 11.5 6.793 13.293 5l.707.707L12.207 7.5 14 9.293l-.707.707L11.5 8.207 9.707 10 9 9.293 10.793 7.5z"/><path d="M4.293 11H2.5A1.5 1.5 0 0 1 1 9.5v-4A1.5 1.5 0 0 1 2.5 4h1.793l2.561-2.561A1.5 1.5 0 0 1 7.914 1h2.087l-.005 3.001-1-.002L8.999 2H7.914a.5.5 0 0 0-.353.146L5 4.707v5.586l2.561 2.561a.5.5 0 0 0 .353.146H9v-2h1v3H7.914c-.398 0-.779-.158-1.06-.439zM4 5H2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5H4z"/></svg>
  );
}
