import { SVGAttributes } from "react";
export default function Login({ ...props }: SVGAttributes<SVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="currentColor"
			{...props}
		>
			<path d="M4 6H3V2.5C3 1.67 3.67 1 4.5 1h6c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5h-6A1.5 1.5 0 0 1 3 12.5V9h1v3.5c0 .28.22.5.5.5h6a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V6Z" />
			<path d="M7.3 8H1V7h6.3l-2-2h1.4l2.5 2.5L6.7 10H5.3l2-2Z" />
		</svg>
	);
}
