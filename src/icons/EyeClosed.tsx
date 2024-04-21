import { SVGAttributes } from "react";
export default function EyeClosed({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2.534 10.032c-.716-.686-1.245-1.506-1.513-2.385l.957-.29c.616 2.017 2.887 3.63 5.521 3.63s4.906-1.613 5.522-3.63l.957.29c-.268.879-.797 1.699-1.513 2.385l1.354 1.07-.62.786-1.526-1.206a7.2 7.2 0 0 1-1.982.972l.482 1.42-.947.32-.512-1.507a7.4 7.4 0 0 1-2.43 0l-.511 1.508-.947-.321.481-1.42a7.2 7.2 0 0 1-1.98-.972l-1.528 1.206-.62-.785z"/></svg>
  );
}
