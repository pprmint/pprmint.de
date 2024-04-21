import { SVGAttributes } from "react";
export default function Controller({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.019 10A3.552 3.552 0 0 1 .9 7.55 3.55 3.55 0 0 1 4.45 4h6.1a3.55 3.55 0 0 1 3.55 3.55 3.55 3.55 0 0 1-3.55 3.55A3.54 3.54 0 0 1 7.982 10zM8.44 9l.15.18c.468.562 1.172.92 1.96.92a2.55 2.55 0 0 0 2.55-2.55A2.55 2.55 0 0 0 10.55 5h-6.1A2.55 2.55 0 0 0 1.9 7.55a2.55 2.55 0 0 0 2.55 2.55c.788 0 1.492-.358 1.96-.92L6.56 9z"/><path d="M4 6h1v3H4z"/><path d="M6 8H3V7h3z"/><circle cx="10.5" cy="6.5" r=".55"/><circle cx="9.5" cy="7.5" r=".55"/><circle cx="10.5" cy="8.5" r=".55"/><circle cx="11.5" cy="7.5" r=".55"/></svg>
  );
}
