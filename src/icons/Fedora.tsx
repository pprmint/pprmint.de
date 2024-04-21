import { SVGAttributes } from "react";
export default function Fedora({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14.1 4.45h-1a2.55 2.55 0 0 0-2.55-2.55A2.55 2.55 0 0 0 8 4.45v6.1a3.55 3.55 0 0 1-3.55 3.55A3.55 3.55 0 0 1 .9 10.55 3.55 3.55 0 0 1 4.45 7H6v1H4.45a2.55 2.55 0 0 0-2.55 2.55 2.55 2.55 0 0 0 2.55 2.55A2.55 2.55 0 0 0 7 10.55v-6.1A3.55 3.55 0 0 1 10.55.9a3.55 3.55 0 0 1 3.55 3.55"/><path d="M9 7h2v1H9z"/></svg>
  );
}
