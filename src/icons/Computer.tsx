import { SVGAttributes } from "react";
export default function Computer({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M4.761 10H2.5A1.5 1.5 0 0 1 1 8.5v-5A1.5 1.5 0 0 1 2.5 2h10A1.5 1.5 0 0 1 14 3.5v5a1.5 1.5 0 0 1-1.5 1.5h-2.261L11 11.904V13H4v-1.096zm4.4 0H5.839l-.8 2h4.922zM13 3.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z"/></svg>
  );
}
