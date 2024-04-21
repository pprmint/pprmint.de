import { SVGAttributes } from "react";
export default function Kofi({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M11.991 10.662A1.5 1.5 0 0 1 10.5 12h-8A1.5 1.5 0 0 1 1 10.5V3h11v1.339a3.201 3.201 0 0 1-.009 6.323M12 5.357v4.286A2.2 2.2 0 0 0 13.7 7.5 2.2 2.2 0 0 0 12 5.357M11 4H2v6.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5z"/><path d="M6.5 10 3.901 7.401a1.407 1.407 0 0 1 1.99-1.989l.609.609.609-.609a1.407 1.407 0 0 1 1.99 1.989z"/></svg>
  );
}
