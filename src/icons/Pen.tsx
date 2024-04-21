import { SVGAttributes } from "react";
export default function Pen({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M12 1c.35.023.693.186.961.454l.585.585a1.5 1.5 0 0 1 0 2.122L4 13.707a1 1 0 0 1-.707.293H1v-2.293A1 1 0 0 1 1.293 11l9-9H8.914a.5.5 0 0 0-.353.146L5.354 5.354l-.708-.708 3.208-3.207A1.5 1.5 0 0 1 8.914 1zM9.5 4.207l-7.5 7.5V13h1.293l7.5-7.5zm2 .586 1.339-1.339a.5.5 0 0 0 0-.708l-.585-.585a.5.5 0 0 0-.708 0L10.207 3.5z"/></svg>
  );
}
