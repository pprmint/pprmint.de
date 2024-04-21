import { SVGAttributes } from "react";
export default function SpeakerMuted({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5v-10A1.5 1.5 0 0 1 4.5 1h6A1.5 1.5 0 0 1 12 2.5m-1 0a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5z"/><circle cx="7.5" cy="10.5" r="1.6"/><path d="M5 3.707 5.707 3 7.5 4.793 9.293 3l.707.707L8.207 5.5 10 7.293 9.293 8 7.5 6.207 5.707 8 5 7.293 6.793 5.5z"/></svg>
  );
}
