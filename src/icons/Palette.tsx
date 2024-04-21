import { SVGAttributes } from "react";
export default function Palette({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><circle cx="6" cy="4.5" r="1"/><circle cx="9" cy="4.5" r="1"/><circle cx="11" cy="6.5" r="1"/><circle cx="4" cy="6.5" r="1"/><path d="M8.349 12.53a.937.937 0 0 1-.545 1.485c-.186.119-.304.085-.304.085A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9s6.6 2.957 6.6 6.6a2.5 2.5 0 0 1-2.5 2.5H9.55a1.551 1.551 0 0 0-1.204 2.525zm-1.007.568.065-.061h.072A2.552 2.552 0 0 1 9.55 9h2.05a1.5 1.5 0 0 0 1.5-1.5c0-3.091-2.509-5.6-5.6-5.6a5.6 5.6 0 0 0-5.6 5.6 5.604 5.604 0 0 0 5.442 5.598"/></svg>
  );
}
