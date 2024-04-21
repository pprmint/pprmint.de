import { SVGAttributes } from "react";
export default function Headphones({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1 14V7.45C1 3.834 3.914.9 7.5.9S14 3.834 14 7.45V14h-2.5a1.5 1.5 0 0 1-1.5-1.5v-4A1.5 1.5 0 0 1 11.5 7h1.482c-.227-2.852-2.596-5.1-5.482-5.1S2.245 4.148 2.018 7H3.5A1.5 1.5 0 0 1 5 8.5v4A1.5 1.5 0 0 1 3.5 14zm12-1V8h-1.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5zM2 13h1.5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5H2z"/></svg>
  );
}
