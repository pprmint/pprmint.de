import { SVGAttributes } from "react";
export default function Clapperboard({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1 6.544.4 3.14 13.202.883l.695 3.939L7.215 6H14v6.5a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 12.5zm11.391-4.503L1.558 3.951l.348 1.97 10.832-1.91zM13 7H2v5.5c0 .133.053.26.146.354A.5.5 0 0 0 2.5 13h10c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 12.5z"/></svg>
  );
}
