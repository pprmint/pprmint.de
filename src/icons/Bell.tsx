import { SVGAttributes } from "react";
export default function Bell({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M8.319 2.074a4.504 4.504 0 0 1 3.68 4.426v2.793l1.002 1L13 12H2v-1.707l1-1V6.5a4.505 4.505 0 0 1 3.682-4.426.999.999 0 1 1 1.637 0m2.68 4.426a3.501 3.501 0 0 0-7 0v3.207l-.998 1V11H12v-.293l-1-1zM9 13v.001a1 1 0 0 1-.999.999h-1A1 1 0 0 1 6 13z"/></svg>
  );
}
