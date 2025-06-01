"use client";

import { useMemo, useCallback } from "react";
import { useParentSize } from "@visx/responsive";
import { scaleTime, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { AreaClosed, LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveLinear } from "@visx/curve";
import { extent, max } from "@visx/vendor/d3-array";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { PaginatedDocs } from "payload";
import { Mina } from "@/payload-types";
import { useFormatter, useTranslations } from "next-intl";

type Datum = { date: string; count: number };

export default function CumulativeChart({ allDocs }: { allDocs: PaginatedDocs<Mina> }) {
	const t = useTranslations("MINA");
	const format = useFormatter();

	// Convert docs into array of just dates and numbers.
	const data = allDocs.docs.reduce<{ date: string; count: number }[]>((acc, doc) => {
		const date = new Date(doc.normalizedDate).toISOString().split("T")[0];
		const last = acc[acc.length - 1];
		if (last && last.date === date) {
			last.count += 1;
		} else {
			acc.push({ date, count: (last?.count ?? 0) + 1 });
		}
		return acc;
	}, []);

	// Chart dimensions.
	const { parentRef, width, height } = useParentSize({ debounceTime: 150 });
	const margin = { top: 8, right: 36, bottom: 36, left: 36 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Data scales.
	const xScale = useMemo(
		() =>
			scaleTime({
				range: [0, innerWidth],
				domain: extent(data, (d) => new Date(d.date)) as [Date, Date],
			}),
		[data, innerWidth]
	);
	const yScale = useMemo(
		() =>
			scaleLinear({
				range: [innerHeight, 0],
				domain: [0, max(data, (d) => d.count) ?? 0],
			}),
		[data, innerHeight]
	);

	// Tooltip configuration.
	const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip<Datum>();
	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		scroll: true,
	});
	const handleTooltip = useCallback(
		(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
			const { x } = localPoint(event) || { x: 0 };
			const x0 = xScale.invert(x - margin.left);

			const index = data.findIndex((d) => new Date(d.date) >= x0);
			const nearest = index > 0 ? data[index - 1] : data[0];

			const tooltipX = xScale(new Date(nearest.date));
			const tooltipY = yScale(nearest.count);

			showTooltip({
				tooltipData: nearest,
				tooltipLeft: tooltipX,
				tooltipTop: tooltipY,
			});
		},
		[data, xScale, yScale, margin.left, showTooltip]
	);

	// Grid lines.
	function getMonthlyTicks(start: Date, end: Date): Date[] {
		const ticks: Date[] = [];
		const current = new Date(start.getFullYear(), start.getMonth(), 1);
		while (current <= end) {
			ticks.push(new Date(current));
			current.setMonth(current.getMonth() + 1);
		}
		return ticks;
	}

	return (
		<div ref={parentRef} className="relative size-full">
			<svg ref={containerRef} width={width} height={height}>
				<Group left={margin.left} top={margin.top}>
					{getMonthlyTicks(xScale.domain()[0], xScale.domain()[1])
						.slice(1)
						.map((tick, i) => (
							<line
								key={i}
								x1={xScale(tick)}
								x2={xScale(tick)}
								y1={0}
								y2={innerHeight}
								stroke="currentColor"
								strokeDasharray={tick.getMonth() === 0 ? 0 : 4}
								strokeWidth={1}
								className="stroke-black/5 dark:stroke-white/5"
							/>
						))}
					<Group className="animate-graph-enter-left">
						<LinePath
							data={data}
							x={(d) => xScale(new Date(d.date)) ?? 0}
							y={(d) => yScale(d.count) ?? 0}
							strokeWidth={2}
							curve={curveLinear}
							className="stroke-neutral-950 dark:stroke-white"
						/>
						<AreaClosed
							data={data}
							x={(d) => xScale(new Date(d.date)) ?? 0}
							y={(d) => yScale(d.count) ?? 0}
							yScale={yScale}
							className="fill-black/5 dark:fill-white/5"
							curve={curveLinear}
						/>
					</Group>
					{tooltipData && (
						<>
							<line
								x1={tooltipLeft}
								x2={tooltipLeft}
								y1={0}
								y2={(tooltipTop || 0) - 8}
								strokeWidth={1}
								className="stroke-neutral-950 dark:stroke-white"
							/>
							<line
								x1={tooltipLeft}
								x2={tooltipLeft}
								y1={(tooltipTop || 0) + 8}
								y2={innerHeight}
								strokeWidth={1}
								className="stroke-neutral-950 dark:stroke-white"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop}
								r={8}
								className="fill-white/50 dark:fill-neutral-950/50 stroke-neutral-950 dark:stroke-white"
							/>
							<circle cx={tooltipLeft} cy={tooltipTop} r={4} className="fill-green" />
						</>
					)}
					<AxisLeft
						scale={yScale}
						axisLineClassName="stroke-current"
						tickLineProps={{ stroke: "currentColor" }}
						tickLabelProps={{ fill: "currentColor", fontFamily: "inherit" }}
					/>
					<AxisBottom
						top={innerHeight}
						scale={xScale}
						axisLineClassName="stroke-current"
						tickLineProps={{ stroke: "currentColor" }}
						tickLabelProps={{ fill: "currentColor", fontFamily: "inherit", textAnchor: "start" }}
					/>
					<rect
						width={innerWidth + margin.left}
						height={innerHeight}
						fill="transparent"
						onMouseMove={handleTooltip}
						onMouseLeave={hideTooltip}
					/>
				</Group>
				{tooltipData && (
					<>
						<TooltipInPortal
							key={Math.random()}
							top={tooltipTop}
							left={(tooltipLeft || 0) + margin.left}
							className="absolute z-100 text-neutral-950 dark:text-white bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-2.5 pt-1.5 pb-2 text-xs leading-none shadow-xl shadow-neutral-950/5 border border-neutral-100 dark:border-neutral-800"
							unstyled
						>
							<div>{t("Content.Artworks.Statistics.numberArtworks", { count: tooltipData.count })}</div>
						</TooltipInPortal>
						<TooltipInPortal
							key={Math.random()}
							offsetLeft={0}
							top={innerHeight + margin.top + 32}
							left={(tooltipLeft || 0) + margin.left}
							className="absolute z-100 text-white dark:text-neutral-950 bg-neutral-950 dark:bg-white px-1.5 pt-1 pb-1.5 text-xs text-center leading-none"
							unstyled
						>
							<div>
								{format.dateTime(new Date(tooltipData.date), {
									day: "2-digit",
									month: "short",
									year: "numeric",
								})}
							</div>
						</TooltipInPortal>
					</>
				)}
			</svg>
		</div>
	);
}
