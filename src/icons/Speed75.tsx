import { SVGAttributes } from "react";
export default function Speed75({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m2.737 11.25.25.433-.866.5-.25-.433A6.504 6.504 0 0 1 7.5 2a6.504 6.504 0 0 1 5.629 9.75l-.25.433-.866-.5.25-.433A5.498 5.498 0 0 0 7.5 3a5.502 5.502 0 0 0-4.763 8.25"/><circle cx="7.5" cy="8.5" r="1.25"/><path d="m7.854 8.854-.708-.708 2.858-2.857.707.707z"/></svg>
  );
}
