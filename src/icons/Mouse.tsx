import { SVGAttributes } from "react";
export default function Mouse({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 5.4v4.2c0 2.484-2.016 4.5-4.5 4.5A4.5 4.5 0 0 1 3 9.6V5.4C3 2.916 5.016.9 7.5.9S12 2.916 12 5.4m-1 0c0-1.932-1.568-3.5-3.5-3.5A3.5 3.5 0 0 0 4 5.4v4.2c0 1.932 1.568 3.5 3.5 3.5S11 11.532 11 9.6z"/><path d="M8 4.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 1 0"/></svg>
  );
}
