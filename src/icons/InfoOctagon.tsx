import { SVGAttributes } from "react";
export default function InfoOctagon({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M8 11H7V6h1z"/><path d="M9.086 1c.398 0 .779.158 1.06.439l3.415 3.415c.281.281.439.662.439 1.06v3.172c0 .398-.158.779-.439 1.06l-3.415 3.415a1.5 1.5 0 0 1-1.06.439H5.914c-.398 0-.779-.158-1.06-.439l-3.415-3.415A1.5 1.5 0 0 1 1 9.086V5.914c0-.398.158-.779.439-1.06l3.415-3.415A1.5 1.5 0 0 1 5.914 1zm0 1H5.914a.5.5 0 0 0-.353.146L2.146 5.561A.5.5 0 0 0 2 5.914v3.172c0 .132.053.26.146.353l3.415 3.415a.5.5 0 0 0 .353.146h3.172c.132 0 .26-.053.353-.146l3.415-3.415A.5.5 0 0 0 13 9.086V5.914a.5.5 0 0 0-.146-.353L9.439 2.146A.5.5 0 0 0 9.086 2"/><path d="M7 4h1v1H7z"/><path d="M7 4h1v1H7z"/></svg>
  );
}
