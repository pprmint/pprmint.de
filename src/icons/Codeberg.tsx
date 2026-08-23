import { SVGAttributes } from "react";
export default function Codeberg({ ...props }: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor" {...props}><path d="M1.79 11.8a6.6 6.6 0 1 1 9.02 2.41l-.53.3-2.95-8.5-5.18 6.43zm10.91-1.23A5.58 5.58 0 0 0 7.5 2.9a5.6 5.6 0 0 0-5.18 7.73L7.5 4.21zM8.91 7.53l1.9 5.5q.84-.62 1.4-1.48z"/></svg>
	);
}
