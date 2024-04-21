import { SVGAttributes } from "react";
export default function Pin({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M5.555 10.262 1.818 14H1v-.766l3.764-3.763-3.118-3.139.708-.707 1.213 1.213 6.175-4.411-1.074-1.073.707-.708 4.979 4.979-.708.707-1.073-1.074-4.411 6.175 1.213 1.213-.707.708zm1.89.454 4.402-6.162-1.401-1.401-6.162 4.402z"/></svg>
  );
}
