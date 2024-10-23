"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function Time() {
	const [time, setTime] = useState(["0", "0", "0"]);

	function getTime() {
		const hour = new Date().getHours().toString().padStart(2, "0");
		const minute = new Date().getMinutes().toString().padStart(2, "0");
		const second = new Date().getSeconds().toString().padStart(2, "0");
		return [hour, minute, second];
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(getTime);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<span className="font-minttriangles absolute top-[6%] left-0 text-neutral-50">
			{time[0]}
			<span className="text-green">:</span>
			{time[1]}
			<span className="text-green">:</span>
			{time[2]}
		</span>
	);
}

export default dynamic(() => Promise.resolve(Time), {
	ssr: false,
});
