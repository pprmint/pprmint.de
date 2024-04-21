import { SVGAttributes } from "react";
export default function CreditCardFront({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M14 4.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 10.5v-6A1.5 1.5 0 0 1 2.5 3h10A1.5 1.5 0 0 1 14 4.5m-1 0a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z"/><path d="M6 5.25v1.5a.25.25 0 0 1-.25.25h-2.5A.25.25 0 0 1 3 6.75v-1.5A.25.25 0 0 1 3.25 5h2.5a.25.25 0 0 1 .25.25M12 9.25v.5a.25.25 0 0 1-.25.25h-8.5A.25.25 0 0 1 3 9.75v-.5A.25.25 0 0 1 3.25 9h8.5a.25.25 0 0 1 .25.25"/></svg>
  );
}
