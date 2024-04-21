import { SVGAttributes } from "react";
export default function Play({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.351 6.227a1.5 1.5 0 0 1 0 2.546l-8.108 5.05a1.501 1.501 0 0 1-2.293-1.274V2.451a1.5 1.5 0 0 1 2.293-1.274zm-.528.849-8.109-5.05a.498.498 0 0 0-.764.425v10.098a.498.498 0 0 0 .764.425l8.109-5.05a.5.5 0 0 0 0-.848"/></svg>
  );
}
