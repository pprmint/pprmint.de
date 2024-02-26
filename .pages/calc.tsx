import { PropsWithChildren, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import * as Switch from "@radix-ui/react-switch";
import { a, useSpring, useTransition } from "@react-spring/web";

import Head from "src/components/Head";
import NoSSR from "src/components/NoSSR";

type Colors = "grey" | "orange" | "red";
function Button(
    props: PropsWithChildren<{
        color?: Colors;
        className?: string;
        tabIndex: number;
    }>
) {
    const color =
        props.color === "grey"
            ? "from-neutral-600 to-neutral-700 border border-b-2 border-neutral-50/10 border-b-neutral-600 text-neutral-50"
            : props.color === "orange"
            ? "from-orange-500 to-orange-600 border border-b-2 border-neutral-50/10 border-b-orange-600 text-neutral-50"
            : props.color === "red"
            ? "from-neutral-100 to-neutral-200 border border-b-2 border-neutral-50/10 border-b-neutral text-red-600"
            : "from-neutral-100 to-neutral-200 border border-b-2 border-neutral-50/10 border-b-neutral text-neutral-950";
    return (
        <button
            tabIndex={props.tabIndex}
            className={`bg-gradient-to-t ${color} font-bold text-xl active:border-b-0 active:border-t-0 active:brightness-90 py-3 rounded-md shadow-md active:shadow-inner m-1 active:scale-[98%] duration-75 ${props.className}`}
        >
            <span className="drop-shadow-md">{props.children}</span>
        </button>
    );
}

export default function Calc() {
    const { t } = useTranslation();

    // Toggle to show and hide settings
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    // Setting enable/disable LCD/monospace font
    const [lcdFont, setLcdFont] = useState(false);
    const toggleFont = () => {
        setLcdFont(!lcdFont);
    };
    // Setting enable/disable light theme
    const [lightTheme, setLightTheme] = useState(false);
    const toggleTheme = () => {
        setLightTheme(!lightTheme);
    };

    // Animations
    const inFromBottom = useSpring({
        from: { opacity: 0, y: 80 },
        to: { opacity: 1, y: 0 },
    });
    const expand = useTransition(expanded, {
        from: { opacity: 0, maxHeight: 0 },
        enter: { opacity: 1, maxHeight: 105 },
        leave: { opacity: 0, maxHeight: 0 },
    });
    return (
        <>
            <Head
                title={t("CALC:Head.title")}
                description={t("CALC:Head.description")}
            />
            <main className="flex flex-col items-center justify-center min-h-screen py-12">
                <a.div style={{ ...inFromBottom }} className="w-full max-w-xs">
                    <div className={`bg-gradient-to-b ${lightTheme ? "from-neutral-200 to-neutral-400 border-2 border-neutral-100" : "from-neutral-900 to-neutral-800 border-2 border-neutral-800"} p-3 mb-3 rounded-xl`}>
                        <div className="flex justify-between m-1 pb-2">
                            <div className={`grid grid-cols-4 w-24 h-8 divide-x-2 rounded-sm overflow-hidden ${lightTheme ? "divide-neutral" : "divide-neutral-900"}`}>
                                <div className={lightTheme ? "bg-neutral-700" : "bg-neutral-950"} />
                                <div className={lightTheme ? "bg-neutral-700" : "bg-neutral-950"} />
                                <div className={lightTheme ? "bg-neutral-700" : "bg-neutral-950"} />
                                <div className={lightTheme ? "bg-neutral-700" : "bg-neutral-950"} />
                            </div>
                            <div style={{ fontFeatureSettings: "'ss02'" }}>
                                <h1 className="font-medium text-neutral-500">
                                    p.calc MKI
                                </h1>
                                <h2 className="text-neutral-600 text-xs italic text-right">
                                    rev.0
                                </h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 grid-rows-5">
                            <div
                                className={`flex justify-end py-1 px-2 items-end bg-gradient-to-b m-1 text-3xl text-neutral-950 ${
                                    lcdFont ? "font-lcd" : "font-mono"
                                } rounded-md ${lightTheme ? "from-slate-100 to-slate-50" : "from-amber-100 to-amber-50"} row-span-1 col-span-5 shadow-inner`}
                                style={{
                                    fontFeatureSettings: "'ss01', 'tnum'",
                                }}
                            >
                                <NoSSR>1234567890</NoSSR>
                            </div>
                            <div className="grid grid-cols-3 grid-rows-5 col-span-3 row-span-5 grid-row">
                                <div className="grid grid-cols-3 grid-rows-1 col-span-3 row-span-1 grid-row">
                                    <Button tabIndex={18} color="red">
                                        AC
                                    </Button>
                                    <Button
                                        tabIndex={17}
                                        color="red"
                                        className="col-span-2"
                                    >
                                        <i className="ri-delete-back-2-line" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 grid-rows-4 col-span-3 row-span-4 grid-row">
                                    <Button tabIndex={8}>7</Button>
                                    <Button tabIndex={9}>8</Button>
                                    <Button tabIndex={10}>9</Button>
                                    <Button tabIndex={5}>4</Button>
                                    <Button tabIndex={6}>5</Button>
                                    <Button tabIndex={7}>6</Button>
                                    <Button tabIndex={2}>1</Button>
                                    <Button tabIndex={3}>2</Button>
                                    <Button tabIndex={4}>3</Button>
                                    <Button className="col-span-2" tabIndex={1}>
                                        0
                                    </Button>
                                    <Button tabIndex={11}>.</Button>
                                </div>
                            </div>
                            <div className="grid grid-rows-5 row-span-5">
                                <Button tabIndex={12} color="grey">
                                    ÷
                                </Button>
                                <Button tabIndex={13} color="grey">
                                    ×
                                </Button>
                                <Button tabIndex={14} color="grey">
                                    −
                                </Button>
                                <Button tabIndex={15} color="grey">
                                    +
                                </Button>
                                <Button
                                    tabIndex={16}
                                    color="orange"
                                    className="row-span-2"
                                >
                                    =
                                </Button>
                            </div>
                        </div>
                    </div>
                    {expand((styles, item) =>
                        item ? (
                            <a.form
                                style={styles}
                                className="overflow-hidden bg-neutral-900 rounded-t-xl"
                            >
                                <div className="text-neutral w-full divide-y divide-neutral-800 px-3">
                                    <div className="flex items-center justify-between py-3">
                                        <label
                                            className="Label"
                                            htmlFor="lcd-font"
                                            style={{ paddingRight: 15 }}
                                        >
                                            {t("CALC:Content.Settings.lcdFont")}
                                        </label>
                                        <Switch.Root
                                            className="group relative w-12 h-7 rounded-full bg-neutral-800  data-[state='checked']:bg-green duration-200 ease-out"
                                            id="lcd-font"
                                            onClick={toggleFont}
                                            checked={lcdFont}
                                        >
                                            <Switch.Thumb className="flex items-center justify-center w-5 h-5 group-active:w-7 data-[state='checked']:group-active:translate-x-4 rounded-full bg-gradient-to-b from-neutral-50 to-neutral-100 translate-x-1 data-[state='checked']:translate-x-6 shadow-md duration-200 ease-out">
                                                <div className="h-2 w-2 rounded-full group-data-[state='checked']:w-0 ring-2 group-data-[state='checked']:ring-1 ring-neutral-700 group-data-[state='checked']:ring-green-700 duration-200 ease-out" />
                                            </Switch.Thumb>
                                        </Switch.Root>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <label
                                            className="Label"
                                            htmlFor="light-theme"
                                            style={{ paddingRight: 15 }}
                                        >
                                            {t("CALC:Content.Settings.lightTheme")}
                                        </label>
                                        <Switch.Root
                                            className="group relative w-12 h-7 rounded-full bg-neutral-800  data-[state='checked']:bg-green duration-200 ease-out"
                                            id="light-theme"
                                            onClick={toggleTheme}
                                            checked={lightTheme}
                                        >
                                            <Switch.Thumb className="flex items-center justify-center w-5 h-5 group-active:w-7 data-[state='checked']:group-active:translate-x-4 rounded-full bg-gradient-to-b from-neutral-50 to-neutral-100 translate-x-1 data-[state='checked']:translate-x-6 shadow-md duration-200 ease-out">
                                                <div className="h-2 w-2 rounded-full group-data-[state='checked']:w-0 ring-2 group-data-[state='checked']:ring-1 ring-neutral-700 group-data-[state='checked']:ring-green-700 duration-200 ease-out" />
                                            </Switch.Thumb>
                                        </Switch.Root>
                                    </div>
                                </div>
                            </a.form>
                        ) : null
                    )}
                    <div className="flex justify-center w-full">
                        <button
                            onClick={() => toggleExpanded()}
                            className={`text-neutral-100 hover:text-neutral-50 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 ${
                                expanded
                                    ? "w-full rounded-b-xl"
                                    : "w-1/2 rounded-[20px]"
                            } duration-300 ease-in-out`}
                        >
                            <i className="ri-settings-3-line mr-3" />
                            {t("COMMON:settings")}
                        </button>
                    </div>
                </a.div>
            </main>
        </>
    );
}
