import { SVGAttributes } from "react";
export default function MapPin({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M7.12 13.825s-1.506-1.763-2.711-3.879C3.576 8.484 2.9 6.854 2.9 5.5 2.9 2.961 4.961.9 7.5.9s4.6 2.061 4.6 4.6c0 1.354-.676 2.984-1.509 4.446-1.205 2.116-2.711 3.879-2.711 3.879l-.38.445zm.38-1.116c.507-.64 1.432-1.87 2.222-3.258C10.464 8.148 11.1 6.706 11.1 5.5c0-1.987-1.613-3.6-3.6-3.6a3.6 3.6 0 0 0-3.6 3.6c0 1.206.636 2.648 1.378 3.951.79 1.388 1.715 2.618 2.222 3.258"/><circle cx="7.5" cy="5.5" r="1.5"/></svg>
  );
}
