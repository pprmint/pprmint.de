import { SVGAttributes } from "react";
export default function TextIndentIn({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M8 3h5v1H8zM9 7h4v1H9zM8 11h5v1H8zM5.496 8H2V7h3.496l-2-2h1.415l2.5 2.5-2.5 2.5H3.496z"/></svg>
  );
}
