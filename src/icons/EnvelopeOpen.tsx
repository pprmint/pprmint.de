import { SVGAttributes } from "react";
export default function EnvelopeOpen({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1 5.719a1.5 1.5 0 0 1 .663-1.245l5-3.363a1.5 1.5 0 0 1 1.674 0l5 3.363A1.5 1.5 0 0 1 14 5.719V11.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 11.5zm11.364-.694L7.779 1.94a.5.5 0 0 0-.558 0L2.636 5.025 7.221 8.11a.5.5 0 0 0 .558 0zM2 5.803V11.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V5.803L8.337 8.939a1.5 1.5 0 0 1-1.674 0z"/></svg>
  );
}
