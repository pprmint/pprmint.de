import { SVGAttributes } from "react";
export default function Thermometer({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9 9.376A2.599 2.599 0 0 1 7.5 14.1 2.601 2.601 0 0 1 6 9.377V2.4a1.5 1.5 0 0 1 3 0zM8 2.4a.5.5 0 0 0-1 0v7.551l-.261.142A1.598 1.598 0 0 0 7.5 13.1a1.6 1.6 0 0 0 .761-3.007L8 9.951z"/></svg>
  );
}
