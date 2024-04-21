import { SVGAttributes } from "react";
export default function Stack({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.779 14 5.598v.804l-6.5 4.819L1 6.402v-.804zm0 1.245L2.137 6 7.5 9.976 12.863 6z"/><path d="M14 8.157v1.245l-6.5 4.819L1 9.402V8.157l6.5 4.819z"/></svg>
  );
}
