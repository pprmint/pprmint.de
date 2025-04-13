import { SVGAttributes } from "react";
export default function BrokenImage({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m9 14 1-1h1.5a.5.5 0 0 0 .5-.5V11l1-1v2.5c0 .83-.67 1.5-1.5 1.5H9ZM6.7 14H3.5A1.5 1.5 0 0 1 2 12.5v-10A1.5 1.5 0 0 1 3.5 1h5.59c.4 0 .78.16 1.06.44l2.41 2.41c.28.29.44.67.44 1.06v2.8L6.7 14ZM11 8.3l1-1V4.9a.5.5 0 0 0-.15-.35L9.44 2.15A.5.5 0 0 0 9.09 2H3.5a.5.5 0 0 0-.35.15.5.5 0 0 0-.15.35v10c0 .28.22.5.5.5h2.8l4-4H9V7h2v1.3Z"/><circle cx="6" cy="5" r="1.25"/><path d="m5 8 3 3H5V8Z"/></svg>
  );
}
