import { SVGAttributes } from "react";
export default function Discord({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="m5.577 12.114-.921.919-.295-.101c-1.614-.555-3.207-2.071-3.207-2.071l-.134-.128-.018-.185c-.223-2.3.505-5.223 2.07-7.806l.074-.122.127-.064C4.089 2.139 6 2.001 6 2.001l.417-.027.262 1.058h1.642l.262-1.058.417.027s1.911.138 2.727.555l.127.064.074.122c1.565 2.583 2.293 5.506 2.07 7.806l-.018.185-.134.128s-1.593 1.516-3.207 2.071l-.295.101-.921-.919a.5.5 0 0 0-.353-.147H5.93a.5.5 0 0 0-.353.147m-.707-.708a1.5 1.5 0 0 1 1.06-.439h3.14a1.5 1.5 0 0 1 1.06.439l.471.47c1.064-.447 2.061-1.292 2.417-1.612.146-2.051-.519-4.594-1.869-6.874-.497-.205-1.308-.31-1.798-.358l-.247 1H5.896l-.247-1c-.491.048-1.301.153-1.8.359-1.348 2.279-2.013 4.822-1.866 6.874.355.319 1.352 1.165 2.416 1.611z"/><circle cx="5.5" cy="8" r="1.1"/><circle cx="9.5" cy="8" r="1.1"/></svg>
  );
}