import { SVGAttributes } from "react";
export default function YouTube({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m6.53 4.742 3.057 1.91a1 1 0 0 1 0 1.696l-3.057 1.91A1 1 0 0 1 5 9.41V5.59a1 1 0 0 1 1.53-.848M6 5.59v3.82L9.057 7.5z"/><path d="M14 4v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2m-1 0a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1z"/></svg>
  );
}
