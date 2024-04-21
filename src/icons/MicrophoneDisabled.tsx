import { SVGAttributes } from "react";
export default function MicrophoneDisabled({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m13.707 2-11 11H1.293l2.692-2.692A4.48 4.48 0 0 1 3 7.5V5h1v2.5c0 .786.259 1.511.697 2.096l.718-.718A2.5 2.5 0 0 1 5 7.5v-4a2.5 2.5 0 0 1 5 0v.793L12.293 2zM9 5.293V3.5a1.5 1.5 0 0 0-3 0v4c0 .231.053.451.146.647zM12 5.121V7.5a4.5 4.5 0 0 1-4 4.472V14H7v-2.028a4.5 4.5 0 0 1-1.44-.411l.764-.764A3.501 3.501 0 0 0 11 7.5V6.121z"/><path d="M10 7.121V7.5a2.5 2.5 0 0 1-2.854 2.475z"/></svg>
  );
}
