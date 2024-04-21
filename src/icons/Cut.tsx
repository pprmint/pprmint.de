import { SVGAttributes } from "react";
export default function Cut({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6.009 10.228A3.001 3.001 0 1 1 4 5a3 3 0 0 1 2.999 2.937L8 7.004V1h1v5.072l3.652-3.405.708.707L9 7.439v1.326A3.001 3.001 0 1 1 11 14a3 3 0 0 1-3-2.95V8.371zm-.61-.799a2 2 0 1 0-.072.067zM9 11.05A2 2 0 1 0 9 11z"/></svg>
  );
}
