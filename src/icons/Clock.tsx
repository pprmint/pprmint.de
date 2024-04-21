import { SVGAttributes } from "react";
export default function Clock({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.9c3.64 0 6.608 2.958 6.608 6.6s-2.969 6.6-6.609 6.6S.891 11.14.891 7.5C.891 3.857 3.86.9 7.5.9m0 1a5.595 5.595 0 0 0-5.592 5.6c0 3.09 2.5 5.6 5.591 5.6s5.592-2.51 5.592-5.6c0-3.091-2.5-5.6-5.592-5.6"/><path d="M7 3h1v4.293l2.35 2.353-.7.708L7 7.707z"/></svg>
  );
}
