import { SVGAttributes } from "react";
export default function Archive({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M2 6.915c-.582-.207-1-.762-1-1.415v-2A1.5 1.5 0 0 1 2.5 2h10A1.5 1.5 0 0 1 14 3.5v2c0 .653-.418 1.208-1 1.415V11.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 11.5zM12.5 6a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5zM3 7v4.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7z"/></svg>
  );
}
