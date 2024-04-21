import { SVGAttributes } from "react";
export default function HeadphonesMuted({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1 14V7.45C1 3.834 3.914.9 7.5.9S14 3.834 14 7.45V14h-2.5v-1H13V8h-1.5V7h1.482c-.227-2.852-2.596-5.1-5.482-5.1S2.245 4.148 2.018 7H3.5v1H2v5h1.5v1z"/><path d="M5 8.707 5.707 8 7.5 9.793 9.293 8l.707.707L8.207 10.5 10 12.293 9.293 13 7.5 11.207 5.707 13 5 12.293 6.793 10.5z"/></svg>
  );
}
