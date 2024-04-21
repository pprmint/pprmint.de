import { SVGAttributes } from "react";
export default function Bomb({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M9.004 5.15a4.61 4.61 0 0 1 3.102 4.35c0 2.54-2.063 4.6-4.605 4.6a4.605 4.605 0 0 1-4.606-4.6 4.61 4.61 0 0 1 3.102-4.35v-1.2h.998c.014-.71.246-1.61.93-2.226.45-.42 1.12-.724 2.077-.724v1c-.643 0-1.094.178-1.408.46-.451.41-.588 1.015-.588 1.49h.998zM7.5 5.9a3.6 3.6 0 0 0 0 7.2 3.6 3.6 0 0 0 0-7.2"/></svg>
  );
}
