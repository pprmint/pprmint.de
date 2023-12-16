/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	safelist: ["object-top", "object-center", "object-bottom", "object-left", "object-right"],
	theme: {
		extend: {
			colors: {
				red: {
					DEFAULT: "#ff4444",
					50: "#fde9ec",
					100: "#fec8ca",
					200: "#fea6a7",
					300: "#ff8585",
					400: "#ff6665",
					500: "#ff4444",
					600: "#d43838",
					700: "#ae2e2e",
					800: "#822222",
					900: "#591717",
					950: "#2e0b0b",
				},
				orange: {
					DEFAULT: "#ff7722",
					50: "#ffeee4",
					100: "#ffd7be",
					200: "#ffbf97",
					300: "#ffa871",
					400: "#ff8f4a",
					500: "#ff7722",
					600: "#d6631d",
					700: "#ab4e18",
					800: "#823913",
					900: "#56240e",
					950: "#2c0f09",
				},
				yellow: {
					DEFAULT: "#ffaa00",
					50: "#fdf6de",
					100: "#fee8b5",
					200: "#feda8b",
					300: "#ffcb61",
					400: "#ffbe3a",
					500: "#ffaa00",
					600: "#d88900",
					700: "#b16c00",
					800: "#864e00",
					900: "#573100",
					950: "#291400",
				},
				lime: {
					DEFAULT: "#99bb44",
					50: "#f3f9db",
					100: "#e1f0bd",
					200: "#cfe79f",
					300: "#bdde81",
					400: "#abd562",
					500: "#99cc45",
					600: "#7da938",
					700: "#61852c",
					800: "#456120",
					900: "#2a3e15",
					950: "#0e1b09",
				},
				green: {
					DEFAULT: "#00cc66",
					50: "#d6ffe9",
					100: "#aef6d0",
					200: "#84ecb6",
					300: "#5ae39c",
					400: "#30d982",
					500: "#00cc66",
					600: "#02a853",
					700: "#048541",
					800: "#05622e",
					900: "#07401c",
					950: "#091f0b",
				},
				cyan: {
					DEFAULT: "#44ccdd",
					50: "#ccfffc",
					100: "#b2f6f7",
					200: "#97edf2",
					300: "#80e4ed",
					400: "#63dae7",
					500: "#44ccdd",
					600: "#38a8b6",
					700: "#2d8591",
					800: "#22626b",
					900: "#163d43",
					950: "#0b1a1e",
				},
				blue: {
					DEFAULT: "#4499ee",
					50: "#d1faff",
					100: "#b6e7fc",
					200: "#97d2f8",
					300: "#7cc0f5",
					400: "#60acf1",
					500: "#4499ee",
					600: "#397ec6",
					700: "#2f65a0",
					800: "#234977",
					900: "#182e4e",
					950: "#0d1326",
				},
				violet: {
					DEFAULT: "#8866dd",
					50: "#f7e9fd",
					100: "#e2d0f7",
					200: "#cbb5f0",
					300: "#b59bea",
					400: "#9e80e3",
					500: "#8866dd",
					600: "#7055b9",
					700: "#594496",
					800: "#423373",
					900: "#2a224f",
					950: "#12102b",
				},
				purple: {
					DEFAULT: "#bb66bb",
					50: "#ffe4fc",
					100: "#f1caef",
					200: "#e4b2e2",
					300: "#d698d5",
					400: "#c87fc8",
					500: "#bb66bb",
					600: "#9c559c",
					700: "#7b437b",
					800: "#5b315b",
					900: "#3e213e",
					950: "#1c0f1c",
				},
				pink: {
					DEFAULT: "#ee77aa",
					50: "#ffe1fb",
					100: "#fccceb",
					200: "#f8b6da",
					300: "#f5a2cb",
					400: "#f18cba",
					500: "#ee77aa",
					600: "#c7638d",
					700: "#9c4d6e",
					800: "#73374f",
					900: "#4f2435",
					950: "#250e16",
				},
				rose: {
					DEFAULT: "#ff6677",
					50: "#ffe2f2",
					100: "#ffcada",
					200: "#ffb0c1",
					300: "#ff98a9",
					400: "#ff7e8f",
					500: "#ff6677",
					600: "#d45463",
					700: "#ab4350",
					800: "#80323d",
					900: "#552029",
					950: "#2b0e15",
				},
				neutral: {
					DEFAULT: "#aaaaaa",
					50: "#eeeeee",
					100: "#dddddd",
					200: "#cccccc",
					300: "#bbbbbb",
					400: "#999999",
					500: "#777777",
					600: "#555555",
					700: "#444444",
					800: "#333333",
					900: "#222222",
					950: "#111111",
				},
			},
			fontFamily: {
				sans: [
					"'Basier Square', Inter, Roboto, Helvetica, Arial, sans-serif",
					{
						fontFeatureSettings: '"ss01"',
					},
				],
				display: ["Silka", "Gotham", "Metropolis", "Clarity City", "Montserrat", "sans-serif"],
				mintbit: "Mintbit, 'Roboto Mono', monospace",
				mono: "'Basier Square Mono', 'Roboto Mono', monospace",
				"display-mono": "'Silka Mono', 'Roboto Mono', monospace",
				lcd: "'LCD 14', 'Roboto Mono', monospace",
				// yikes
				mintsans: "MintSans, sans-serif",
			},
			keyframes: {
				enterFromLeft: {
					from: { opacity: 0, transform: "translateX(-290px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				enterFromRight: {
					from: { opacity: 0, transform: "translateX(290px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				enterFromTop: {
					from: { opacity: 0, transform: "rotateX(-20deg)" },
					to: { opacity: 1, transform: "rotateX(0deg)" },
				},
				exitToLeft: {
					from: { opacity: 1, transform: "translateX(0)" },
					to: { opacity: 0, transform: "translateX(-290px)" },
				},
				exitToRight: {
					from: { opacity: 1, transform: "translateX(0)" },
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
			},
			animation: {
				"enter-from-l": "enterFromLeft .25s cubic-bezier(.15,0,.35,1)",
				"enter-from-r": "enterFromRight .25s cubic-bezier(.15,0,.35,1)",
				"enter-from-t": "enterFromTop .25s cubic-bezier(.15,0,.35,1)",
				"exit-to-l": "exitToLeft .25s cubic-bezier(.15,0,.35,1)",
				"exit-to-r": "exitToRight .25s cubic-bezier(.15,0,.35,1)",
				"exit-to-t": "exitToTop .25s cubic-bezier(.15,0,.35,1)",
				"accordion-slide-down": "accordionSlideDown .4s cubic-bezier(0.5, 0, 0.1, 1);",
				"accordion-slide-up": "accordionSlideUp .4s cubic-bezier(0.5, 0, 0.1, 1);",
				"toast-slide-in": "toastSlideIn .3s cubic-bezier(0.16, 1, 0.3, 1);",
				"toast-slide-out": "toastSlideOut .25s cubic-bezier(0.33, 1, 0.68, 1);",
				"scale-up": "scaleUp .2s cubic-bezier(0, 0, 0.2, 1)",
				"scale-down": "scaleDown .2s cubic-bezier(0, 0, 0.2, 1)",
				"fade-in": "fadeIn .25s cubic-bezier(0, 0, 0.2, 1)",
				"fade-out": "fadeOut .25s cubic-bezier(0, 0, 0.2, 1)",
				"fade-out-scale-down": "fadeOutScaleDown .2s cubic-bezier(0, 0, 0.2, 1)",
				"arrow-fade-down": "arrowFadeDown 1.5s cubic-bezier(0.2, 0.2, .2, 1) 2s infinite",
			},
			transitionDuration: {
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
		},
	},
	plugins: [],
};
