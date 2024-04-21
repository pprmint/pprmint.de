import { SVGAttributes } from "react";
export default function Twitch({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M10 4h1v3h-1zM7 4h1v3H7z"/><path d="m5.854 13.146-1.147 1.147A1.002 1.002 0 0 1 3 13.586V13h-.5A1.5 1.5 0 0 1 1 11.5V3.914c0-.398.158-.779.439-1.06l1.415-1.415A1.5 1.5 0 0 1 3.914 1H12.5A1.5 1.5 0 0 1 14 2.5v5.586c0 .398-.158.779-.439 1.06l-3.415 3.415a1.5 1.5 0 0 1-1.06.439H6.207a.5.5 0 0 0-.353.146M7 12h2.086c.132 0 .26-.053.353-.146l.854-.854H8zm4.293-2 1.561-1.561A.5.5 0 0 0 13 8.086V2.5a.5.5 0 0 0-.5-.5H4v8h2v1.586L7.586 10zM3 2.707l-.854.854A.5.5 0 0 0 2 3.914V11.5a.5.5 0 0 0 .5.5h.986C4 12 4 12.5 4 12.5v1.086l1-1V11H3z"/></svg>
  );
}
