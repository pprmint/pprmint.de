/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors");
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	safelist: ["object-top", "object-center", "object-bottom", "object-left", "object-right"],
	theme: {
		extend: {
			colors: {
				red: {
					DEFAULT: "#f44",
					50: "#fce3e7",
					100: "#fdcdcf",
					200: "#fea9ab",
					300: "#fe8687",
					400: "#ff6465",
					500: "#f44",
					600: "#df333a",
					700: "#b5262b",
					800: "#8e1a1d",
					900: "#640d0e",
					950: "#3b0000",
				},
				orange: {
					DEFAULT: "#f71",
					50: "#ffece0",
					100: "#ffdac1",
					200: "#ffc397",
					300: "#ffab6c",
					400: "#ff9443",
					500: "#f71",
					600: "#e36311",
					700: "#bc4e0e",
					800: "#95380a",
					900: "#6d2207",
					950: "#430f04",
				},
				yellow: {
					DEFAULT: "#fb0",
					50: "#fff4d6",
					100: "#ffeab1",
					200: "#ffe18e",
					300: "#ffd767",
					400: "#ffce44",
					500: "#fb0",
					600: "#e59801",
					700: "#bc7801",
					800: "#935802",
					900: "#703d03",
					950: "#441f02",
				},
				lime: {
					DEFAULT: "#9c3",
					50: "#f0fadb",
					100: "#dff0be",
					200: "#cfe89d",
					300: "#bfe17c",
					400: "#afd95c",
					500: "#9c3",
					600: "#82ad2b",
					700: "#688a23",
					800: "#4f6a1b",
					900: "#394c13",
					950: "#1f290b",
				},
				green: {
					DEFAULT: "#0c6",
					50: "#d1ffed",
					100: "#b2f6d3",
					200: "#8bedbb",
					300: "#63e4a3",
					400: "#3cda8b",
					500: "#0c6",
					600: "#00ab56",
					700: "#008b45",
					800: "#006b35",
					900: "#004a25",
					950: "#002914",
				},
				cyan: {
					DEFAULT: "#2cf",
					50: "#c7f9ff",
					100: "#acf3ff",
					200: "#8febff",
					300: "#70e2ff",
					400: "#50d9ff",
					500: "#2cf",
					600: "#1fb5e3",
					700: "#1894bc",
					800: "#106f90",
					900: "#084c65",
					950: "#062835",
				},
				blue: {
					DEFAULT: "#29f",
					50: "#c7f0ff",
					100: "#a4e1ff",
					200: "#88d2ff",
					300: "#68c0ff",
					400: "#4db1ff",
					500: "#29f",
					600: "#1f83e9",
					700: "#196bc0",
					800: "#135395",
					900: "#0d3b6a",
					950: "#00213d",
				},
				violet: {
					DEFAULT: "#a7e",
					50: "#f0e2ff",
					100: "#e1cafb",
					200: "#d3b6f8",
					300: "#c6a1f5",
					400: "#b88df1",
					500: "#a7e",
					600: "#9363ce",
					700: "#784caa",
					800: "#5c3586",
					900: "#411e62",
					950: "#220c3f",
				},
				pink: {
					DEFAULT: "#e6c",
					50: "#ffdeff",
					100: "#fcc6f5",
					200: "#f8afeb",
					300: "#f597e1",
					400: "#f180d7",
					500: "#e6c",
					600: "#d654b5",
					700: "#af3f93",
					800: "#882a70",
					900: "#62154e",
					950: "#3c002c",
				},
			},
			fontFamily: {
				sans: ["'Basier Square', Inter, Roboto, Helvetica, Arial, sans-serif"],
				display: [
					'"Aspekta Variable", "Silka", "Gotham", "Metropolis", "Clarity City", "Montserrat", "sans-serif"',
					{
						fontFeatureSettings: '"ss01", "ss05", "ss06", "ss07", "ss08", "ss09", "ss10"',
					},
				],
				digits: ["Mina Sans Digits", "Silka Mono", "Roboto Mono", "monospace"],
				mintbit: "Mintbit, 'Roboto Mono', monospace",
				minttriangles: "'Mint Triangles', monospace",
				mono: "'Basier Square Mono', 'Roboto Mono', monospace",
				"display-mono": "'Silka Mono', 'Roboto Mono', monospace",
				lcd: "'LCD 14', 'Roboto Mono', monospace",
				// yikes
				mintsans: "MintSans, sans-serif",
			},
			keyframes: {
				enterFromLeft: {
					from: { opacity: 0, transform: "translateX(-290px)" },
					to: { opacity: 1, transform: "translateX(0px)" },
				},
				enterFromRight: {
					from: { opacity: 0, transform: "translateX(290px)" },
					to: { opacity: 1, transform: "translateX(0px)" },
				},
				enterFromTop: {
					from: { opacity: 0, transform: "rotateX(-20deg)" },
					to: { opacity: 1, transform: "rotateX(0deg)" },
				},
				exitToLeft: {
					from: { opacity: 1, transform: "translateX(0px)" },
					to: { opacity: 0, transform: "translateX(-290px)" },
				},
				exitToRight: {
					from: { opacity: 1, transform: "translateX(0px)" },
					to: { opacity: 0, transform: "translateX(290px)" },
				},
				exitToTop: {
					from: { opacity: 1, transform: "rotateX(0deg)" },
					to: { opacity: 0, transform: "rotateX(-10deg)" },
				},
				accordionSlideDown: {
					from: { height: 0, opacity: 0 },
					to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
				},
				accordionSlideUp: {
					from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
					to: { height: 0, opacity: 0 },
				},
				collapsibleHorizontalOpen: {
					from: {
						width: 0,
					},
					to: {
						width: "var(--radix-collapsible-content-width)",
					},
				},
				collapsibleHorizontalClose: {
					from: {
						width: "var(--radix-collapsible-content-width)",
					},
					to: {
						width: 0,
					},
				},
				collapsibleVerticalOpen: {
					from: {
						height: 0,
					},
					to: {
						height: "var(--radix-collapsible-content-height)",
					},
				},
				collapsibleVerticalClose: {
					from: {
						height: "var(--radix-collapsible-content-height)",
					},
					to: {
						height: 0,
					},
				},
				selectOpen: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				selectClose: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				toastSlideIn: {
					from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
					to: { transform: "translateX(0)" },
				},
				toastSlideOut: {
					from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
					to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
				},
				scaleUp: {
					from: { scale: "95%", opacity: 0 },
					to: { scale: "100%", opacity: 1 },
				},
				scaleDown: {
					from: { scale: "100%", opacity: 1 },
					to: { scale: "95%", opacity: 0 },
				},
				titleFadeIn: {
					from: { opacity: 0, fontWeight: "50" },
					to: { opacity: 1, fontWeight: "700" },
				},
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				fadeOut: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				fadeOutScaleDown: {
					from: { opacity: 1, transform: "scale(1)" },
					to: { opacity: 0, transform: "scale(0.9)" },
				},
				arrowFadeDown: {
					"0%": {
						opacity: 0,
						transform: "translateY(-30px)",
						clipPath: "polygon(55% 65%, 100% 0, 100% 100%, 0 100%, 0 0, 45% 65%)",
					},
					"50%": { opacity: 1, clipPath: "polygon(55% 0, 100% 0, 100% 100%, 0 100%, 0 0, 45% 0)" },
					"70%": { opacity: 1 },
					"100%": { opacity: 0, transform: "translateY(0px)" },
				},
				tooltipEnterTop: {
					from: {
						opacity: 0,
						transform: "translateY(-4px)",
					},
					to: {
						opacity: 1,
						transform: "translateY(0px)",
					},
				},
				tooltipExitTop: {
					from: {
						opacity: 1,
						transform: "translateY(0px)",
					},
					to: {
						opacity: 0,
						transform: "translateY(-4px)",
					},
				},
				tooltipEnterBottom: {
					from: {
						opacity: 0,
						transform: "translateY(4px)",
					},
					to: {
						opacity: 1,
						transform: "translateY(0px)",
					},
				},
				tooltipExitBottom: {
					from: {
						opacity: 1,
						transform: "translateY(0px)",
					},
					to: {
						opacity: 0,
						transform: "translateY(4px)",
					},
				},
				tooltipEnterLeft: {
					from: {
						opacity: 0,
						transform: "translateX(4px)",
					},
					to: {
						opacity: 1,
						transform: "translateX(0px)",
					},
				},
				tooltipExitLeft: {
					from: {
						opacity: 1,
						transform: "translateX(0px)",
					},
					to: {
						opacity: 0,
						transform: "translateX(4px)",
					},
				},
				tooltipEnterRight: {
					from: {
						opacity: 0,
						transform: "translateX(-4px)",
					},
					to: {
						opacity: 1,
						transform: "translateX(0px)",
					},
				},
				tooltipExitRight: {
					from: {
						opacity: 1,
						transform: "translateX(0px)",
					},
					to: {
						opacity: 0,
						transform: "translateX(-4px)",
					},
				},
				skeletonPulse: {
					"0%": { backgroundColor: "#eeeeee14" },
					"50%": { backgroundColor: "#eeeeee26" },
					"100%": { backgroundColor: "#eeeeee14" },
				},
				lucideCheckDrawIn: {
					from: { strokeDashoffset: 24 },
					to: { strokeDashoffset: 48 },
				},
				lucideSparkle: {
					"0%": { transform: "scale(0) rotate(-90deg)", opacity: 0, filter: "blur(5px)" },
					"40%": { transform: "scale(1) rotate(-5deg)", opacity: 1, filter: "blur(1px)" },
					"50%": { transform: "scale(1) rotate(0deg)", opacity: 1, filter: "blur(0px)" },
					"100%": { transform: "scale(0) rotate(45deg)", opacity: 0, filter: "blur(5px)" },
				},
				float: {
					"0%": { transform: "translateY(10px)" },
					"50%": { transform: "translateY(-10px)" },
					"100%": { transform: "translateY(10px)" },
				},
				floatRotateL: {
					"0%": { transform: "translateY(10px) rotate(3deg)" },
					"50%": { transform: "translateY(-10px) rotate(1deg)" },
					"100%": { transform: "translateY(10px) rotate(-3deg)" },
				},
				floatRotateR: {
					"0%": { transform: "translateY(10px) rotate(-3deg)" },
					"50%": { transform: "translateY(-10px) rotate(-1deg)" },
					"100%": { transform: "translateY(10px) rotate(3deg)" },
				},
				dialogEnter: {
					from: {
						transform: "translateY(calc(-50% + 30px)) translateX(-50%) scale(0.98)",
						boxShadow: "0 0px 10px -12px rgb(0 0 0 / 0.25)",
						opacity: 0,
					},
					to: {
						transform: "translateY(-50%) translateX(-50%) scale(1)",
						boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
						opacity: 1,
					},
				},
				dialogExit: {
					from: {
						transform: "translateY(-50%) translateX(-50%)",
						opacity: 1,
					},
					to: {
						transform: "translateY(calc(-50% + 10px)) translateX(-50%)",
						opacity: 0,
					},
				},
			},
			animation: {
				"slow-spin": "spin 3s linear infinite;",
				"enter-from-l": "enterFromLeft .25s cubic-bezier(.15,0,.35,1)",
				"enter-from-r": "enterFromRight .25s cubic-bezier(.15,0,.35,1)",
				"enter-from-t": "enterFromTop .25s cubic-bezier(.15,0,.35,1)",
				"exit-to-l": "exitToLeft .25s cubic-bezier(.15,0,.35,1)",
				"exit-to-r": "exitToRight .25s cubic-bezier(.15,0,.35,1)",
				"exit-to-t": "exitToTop .25s cubic-bezier(.15,0,.35,1)",
				"accordion-slide-down": "accordionSlideDown .4s cubic-bezier(0.5, 0, 0.1, 1);",
				"accordion-slide-up": "accordionSlideUp .4s cubic-bezier(0.5, 0, 0.1, 1);",
				"collapsible-horizontal-open": "collapsibleHorizontalOpen .3s cubic-bezier(0.5, 0, 0.17, 1);",
				"collapsible-horizontal-close": "collapsibleHorizontalClose .3s cubic-bezier(0.3, 0, 0.2, 1);",
				"collapsible-vertical-open": "collapsibleVerticalOpen .3s cubic-bezier(0.5, 0, 0.17, 1);",
				"collapsible-vertical-close": "collapsibleVerticalClose .3s cubic-bezier(0.3, 0, 0.2, 1);",
				"select-open": "selectOpen .2s;",
				"select-close": "selectClose .2s;",
				"toast-slide-in": "toastSlideIn .3s cubic-bezier(0.16, 1, 0.3, 1);",
				"toast-slide-out": "toastSlideOut .25s cubic-bezier(0.33, 1, 0.68, 1);",
				"scale-up": "scaleUp .2s cubic-bezier(0, 0, 0.2, 1)",
				"scale-down": "scaleDown .2s cubic-bezier(0, 0, 0.2, 1)",
				"fade-in": "fadeIn .25s cubic-bezier(0, 0, 0.2, 1)",
				"title-fade-in": "titleFadeIn .5s cubic-bezier(0.2, 0, 0.2, 1)",
				"fade-out": "fadeOut .3s cubic-bezier(0, 0, 0.2, 1)",
				"fade-out-scale-down": "fadeOutScaleDown .2s cubic-bezier(0, 0, 0.2, 1)",
				"arrow-fade-down": "arrowFadeDown 1.5s cubic-bezier(0.2, 0.2, .2, 1) 2s infinite",
				"tooltip-enter-top": "tooltipEnterTop .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-exit-top": "tooltipExitTop .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-enter-bottom": "tooltipEnterBottom .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-exit-bottom": "tooltipExitBottom .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-enter-left": "tooltipEnterLeft .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-exit-left": "tooltipExitLeft .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-enter-right": "tooltipEnterRight .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"tooltip-exit-right": "tooltipExitRight .2s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"skeleton-pulse": "skeletonPulse 3s cubic-bezier(0.7, 0, 0.3, 1) 2s infinite",
				"lucide-check-draw-in": "lucideCheckDrawIn 0.25s cubic-bezier(0.33, 1, 0.68, 1) forwards",
				"lucide-sparkle": "lucideSparkle 0.75s linear 0.25s forwards",
				float: "float 4s cubic-bezier(0.5, 0, 0.5, 1) alternate-reverse infinite",
				"float-rotate-l": "floatRotateL 6s cubic-bezier(0.5, 0, 0.5, 1) alternate-reverse infinite",
				"float-rotate-r": "floatRotateR 6s cubic-bezier(0.5, 0, 0.5, 1) alternate-reverse infinite",
				"dialog-enter": "dialogEnter .5s cubic-bezier(0.16, 1, 0.3, 1) .1s normal backwards",
				"dialog-exit": "dialogExit .15s ease-in",
			},
			transitionDuration: {
				25: "25ms",
				50: "50ms",
				250: "250ms",
				400: "400ms",
			},
			transitionTimingFunction: {
				"in-out-custom": "cubic-bezier(0.5, 0, 0.1, 1);",
				"in-sine": "cubic-bezier(0.12, 0, 0.39, 0)",
				"in-quad": "cubic-bezier(0.11, 0, 0.5, 0)",
				"in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
				"in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
				"in-quint": "cubic-bezier(0.64, 0, 0.78, 0)",
				"in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
				"in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
				"in-back": "cubic-bezier(0.36, 0, 0.66, -0.56)",
				"out-sine": "cubic-bezier(0.61, 1, 0.88, 1)",
				"out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
				"out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
				"out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
				"out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
				"out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
				"out-circ": "cubic-bezier(0, 0.55, 0.45, 1)",
				"out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
				"in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",
				"in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
				"in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
				"in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
				"in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
				"in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
				"in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
				"in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
			},
			width: {
				"1/2-screen": "50vw",
				"1/3-screen": "33.333333vw",
				"2/3-screen": "66.666667vw",
				"1/4-screen": "25vw",
				"2/4-screen": "50vw",
				"3/4-screen": "75vw",
				"1/5-screen": "20vw",
				"2/5-screen": "40vw",
				"3/5-screen": "60vw",
				"4/5-screen": "80vw",
				"1/6-screen": "16.666667vw",
				"2/6-screen": "33.333333vw",
				"3/6-screen": "50vw",
				"4/6-screen": "66.666667vw",
				"5/6-screen": "83.333333vw",
				"1/12-screen": "8.333333vw",
				"2/12-screen": "16.666667vw",
				"3/12-screen": "25vw",
				"4/12-screen": "33.333333vw",
				"5/12-screen": "41.666667vw",
				"6/12-screen": "50vw",
				"7/12-screen": "58.333333vw",
				"8/12-screen": "66.666667vw",
				"9/12-screen": "75vw",
				"10/12-screen": "83.333333vw",
				"11/12-screen": "91.666667vw",
			},
			minWidth: {
				"8xl": "120rem",
				"1/2-screen": "50vw",
				"1/3-screen": "33.333333vw",
				"2/3-screen": "66.666667vw",
				"1/4-screen": "25vw",
				"2/4-screen": "50vw",
				"3/4-screen": "75vw",
				"1/5-screen": "20vw",
				"2/5-screen": "40vw",
				"3/5-screen": "60vw",
				"4/5-screen": "80vw",
				"1/6-screen": "16.666667vw",
				"2/6-screen": "33.333333vw",
				"3/6-screen": "50vw",
				"4/6-screen": "66.666667vw",
				"5/6-screen": "83.333333vw",
				"1/12-screen": "8.333333vw",
				"2/12-screen": "16.666667vw",
				"3/12-screen": "25vw",
				"4/12-screen": "33.333333vw",
				"5/12-screen": "41.666667vw",
				"6/12-screen": "50vw",
				"7/12-screen": "58.333333vw",
				"8/12-screen": "66.666667vw",
				"9/12-screen": "75vw",
				"10/12-screen": "83.333333vw",
				"11/12-screen": "91.666667vw",
			},
			maxWidth: {
				"8xl": "120rem",
				"1/2-screen": "50vw",
				"1/3-screen": "33.333333vw",
				"2/3-screen": "66.666667vw",
				"1/4-screen": "25vw",
				"2/4-screen": "50vw",
				"3/4-screen": "75vw",
				"1/5-screen": "20vw",
				"2/5-screen": "40vw",
				"3/5-screen": "60vw",
				"4/5-screen": "80vw",
				"1/6-screen": "16.666667vw",
				"2/6-screen": "33.333333vw",
				"3/6-screen": "50vw",
				"4/6-screen": "66.666667vw",
				"5/6-screen": "83.333333vw",
				"1/12-screen": "8.333333vw",
				"2/12-screen": "16.666667vw",
				"3/12-screen": "25vw",
				"4/12-screen": "33.333333vw",
				"5/12-screen": "41.666667vw",
				"6/12-screen": "50vw",
				"7/12-screen": "58.333333vw",
				"8/12-screen": "66.666667vw",
				"9/12-screen": "75vw",
				"10/12-screen": "83.333333vw",
				"11/12-screen": "91.666667vw",
			},
			height: {
				"1/2-screen": "50vh",
				"1/3-screen": "33.333333vh",
				"2/3-screen": "66.666667vh",
				"1/4-screen": "25vh",
				"2/4-screen": "50vh",
				"3/4-screen": "75vh",
				"1/5-screen": "20vh",
				"2/5-screen": "40vh",
				"3/5-screen": "60vh",
				"4/5-screen": "80vh",
				"1/6-screen": "16.666667vh",
				"2/6-screen": "33.333333vh",
				"3/6-screen": "50vh",
				"4/6-screen": "66.666667vh",
				"5/6-screen": "83.333333vh",
			},
			minHeight: {
				"1/2-screen": "50vh",
				"1/3-screen": "33.333333vh",
				"2/3-screen": "66.666667vh",
				"1/4-screen": "25vh",
				"2/4-screen": "50vh",
				"3/4-screen": "75vh",
				"1/5-screen": "20vh",
				"2/5-screen": "40vh",
				"3/5-screen": "60vh",
				"4/5-screen": "80vh",
				"1/6-screen": "16.666667vh",
				"2/6-screen": "33.333333vh",
				"3/6-screen": "50vh",
				"4/6-screen": "66.666667vh",
				"5/6-screen": "83.333333vh",
			},
			maxHeight: {
				"1/2-screen": "50vh",
				"1/3-screen": "33.333333vh",
				"2/3-screen": "66.666667vh",
				"1/4-screen": "25vh",
				"2/4-screen": "50vh",
				"3/4-screen": "75vh",
				"1/5-screen": "20vh",
				"2/5-screen": "40vh",
				"3/5-screen": "60vh",
				"4/5-screen": "80vh",
				"1/6-screen": "16.666667vh",
				"2/6-screen": "33.333333vh",
				"3/6-screen": "50vh",
				"4/6-screen": "66.666667vh",
				"5/6-screen": "83.333333vh",
			},
			screens: {
				"3xl": "1921px",
			},
			gridTemplateColumns: {
				16: "repeat(16, minmax(0, 1fr))",
			},
			boxShadow: {
				inner: "inset 0 2px 3px rgba(0, 0, 0, 0.2)",
			},
			zIndex: {
				60: "60",
				70: "70",
				80: "80",
				90: "90",
				100: "100",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		createThemes({
			light: {
				elevate: "#fff",
				neutral: {
					DEFAULT: "#777",
					50: "#111",
					100: "#222",
					200: "#333",
					300: "#444",
					400: "#555",
					500: "#aaa",
					600: "#bbb",
					700: "#ccc",
					800: "#ddd",
					900: "#eee",
					950: "#fafafa",
				},
			},
			dark: {
				elevate: "#222",
				neutral: {
					DEFAULT: "#aaa",
					50: "#eee",
					100: "#ddd",
					200: "#ccc",
					300: "#bbb",
					400: "#999",
					500: "#777",
					600: "#555",
					700: "#444",
					800: "#333",
					900: "#222",
					950: "#111",
				},
			},
		}),
	],
};
