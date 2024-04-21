import { SVGAttributes } from "react";
export default function Search({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m6.621 9.086-5.267 5.268-.708-.708 5.268-5.267A4.58 4.58 0 0 1 4.9 5.5C4.9 2.961 6.961.9 9.5.9s4.6 2.061 4.6 4.6-2.061 4.6-4.6 4.6a4.58 4.58 0 0 1-2.879-1.014M9.5 1.9a3.6 3.6 0 0 0-3.6 3.6c0 1.987 1.613 3.6 3.6 3.6s3.6-1.613 3.6-3.6-1.613-3.6-3.6-3.6"/></svg>
  );
}
