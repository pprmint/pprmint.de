import { SVGAttributes } from "react";
export default function Logout({ ...props }: SVGAttributes<SVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="currentColor"
			{...props}
		>
			<path d="M11 11h1v1.5c0 .83-.67 1.5-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5v-10C3 1.67 3.67 1 4.5 1h6c.83 0 1.5.67 1.5 1.5V4h-1V2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h6a.5.5 0 0 0 .5-.5V11Z" />
			<path d="M12.3 8H6V7h6.3l-2-2h1.4l2.5 2.5-2.5 2.5h-1.4l2-2Z" />
		</svg>
	);
}
