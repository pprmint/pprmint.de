import { SVGAttributes } from "react";
export default function MeatballsVertical({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><circle cx="7.5" cy="3.5" r="1"/><circle cx="7.5" cy="7.5" r="1"/><circle cx="7.5" cy="11.5" r="1"/></svg>
  );
}
