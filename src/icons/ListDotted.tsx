import { SVGAttributes } from "react";
export default function ListDotted({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 12h6v-1H6zM6 8h6V7H6zM6 4h6V3H6z"/><circle cx="3.5" cy="3.5" r="1"/><circle cx="3.5" cy="7.5" r="1"/><circle cx="3.5" cy="11.5" r="1"/></svg>
  );
}
