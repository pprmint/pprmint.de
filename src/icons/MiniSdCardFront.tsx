import { SVGAttributes } from "react";
export default function MiniSdCardFront({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12.5 1A1.5 1.5 0 0 1 14 2.5v10a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 12.5V6.914c0-.398.158-.779.439-1.06l1.415-1.415A.5.5 0 0 0 3 4.086V2.5A1.5 1.5 0 0 1 4.5 1zm0 1h-8a.5.5 0 0 0-.5.5v1.586c0 .398-.158.779-.439 1.06L2.146 6.561A.5.5 0 0 0 2 6.914V12.5c0 .133.053.26.146.354A.5.5 0 0 0 2.5 13h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 12.5v-10a.5.5 0 0 0-.5-.5"/><path d="M8.323 3.077a.25.25 0 0 1 .354 0l1.496 1.496A.25.25 0 0 1 9.996 5H7.004a.25.25 0 0 1-.177-.427z"/></svg>
  );
}
