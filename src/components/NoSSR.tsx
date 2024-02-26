import dynamic from "next/dynamic";
import React from "react";

function NoSSR(props: React.PropsWithChildren) {
	return <>{props.children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), {
	ssr: false,
});
