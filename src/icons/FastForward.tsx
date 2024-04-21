import { SVGAttributes } from "react";
export default function FastForward({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m7.019 9.272-3.318 4.247a1.5 1.5 0 0 1-2.682-.923V2.404a1.499 1.499 0 0 1 2.682-.923l3.318 4.247V2.404a1.499 1.499 0 0 1 2.682-.923l3.981 5.096a1.5 1.5 0 0 1 0 1.846l-3.981 5.096a1.5 1.5 0 0 1-2.682-.923zm-.125-2.08L2.913 2.096a.5.5 0 0 0-.894.308v10.192a.5.5 0 0 0 .894.308l3.981-5.096a.5.5 0 0 0 0-.616m6 0L8.913 2.096a.5.5 0 0 0-.894.308v10.192a.5.5 0 0 0 .894.308l3.981-5.096a.5.5 0 0 0 0-.616"/></svg>
  );
}
