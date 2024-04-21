import { SVGAttributes } from "react";
export default function ListAlphabetical({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M6 12h6v-1H6zM6 8h6V7H6zM6 4h6V3H6zM4 4.5s-.216.55-.816.55c-.855 0-1.285-.695-1.285-1.55s.799-1.55 1.654-1.55c.856 0 1.446.497 1.446 1.05v.245L5 3.246V5H4zm0-1.554a1.1 1.1 0 0 0-.343-.066c-.518 0-.725.335-.725.62s.056.62.571.62c.176 0 .347-.051.497-.119zM4.999 11.93v.862s-.59.258-1.446.258c-.855 0-1.654-.695-1.654-1.55s.799-1.55 1.654-1.55c.856 0 1.446.258 1.446.258v.862s-.824-.19-1.342-.19-.725.335-.725.62.209.62.725.62c.518 0 1.342-.19 1.342-.19M3.799 9H2V6h1v.852c.17-.192.436-.352.852-.352.683 0 1.247.56 1.247 1.25S4.516 9 3.799 9M3 7.411V8.2h.54c.279 0 .519-.2.519-.5 0-.49-.662-.392-1.059-.289"/></svg>
  );
}
