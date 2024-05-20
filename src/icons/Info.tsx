import { SVGAttributes } from "react";
export default function InfoCircle({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><circle cx="7.5" cy="2.5" r=".75"/><path d="M9 13h-.5A1.503 1.503 0 0 1 7 11.5V6H6V5h2v6.5c0 .133.053.26.146.354A.5.5 0 0 0 8.5 12h.493z"/></svg>
  );
}
