import { SVGAttributes } from "react";
export default function Accessibility({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.5.8a6.6 6.6 0 1 1 0 13.2A6.6 6.6 0 0 1 7.5.8Zm0 1a5.6 5.6 0 1 0 0 11.2 5.6 5.6 0 0 0 0-11.2Z"/><circle cx="7.5" cy="4" r="1.25"/><path d="m6 6.6-2-.58V4.98l2.68.77c.54.15 1.1.15 1.64 0L11 4.97v1.04l-2 .57V9l1.03 3H8.97L8 9H7l-.97 3H4.97L6 9V6.6Z"/></svg>
  );
}
