import { MediaBlock } from "@/blocks/MediaBlock/Component";
import {
	DefaultNodeTypes,
	SerializedBlockNode,
	SerializedLinkNode,
	type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
	JSXConvertersFunction,
	LinkJSXConverter,
	RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";

import type {
	MediaBlock as MediaBlockProps,
} from "@/payload-types";
import { cn } from "@/utilities/cn";

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<MediaBlockProps>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value, relationTo } = linkNode.fields.doc!;
	if (typeof value !== "object") {
		throw new Error("Expected value to be an object");
	}
	const slug = value.slug;
	return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	blocks: {
		mediaBlock: ({ node }) => (
			<MediaBlock
				{...node.fields}
				disableInnerContainer={true}
				videoClassName="w-full h-auto"
			/>
		),
	},
});

type Props = {
	data: DefaultTypedEditorState;
	enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
	const { className, enableProse = true, ...rest } = props;
	return (
		<ConvertRichText
			converters={jsxConverters}
			className={cn(
				"prose-ul:list-disc prose-ul:list-inside prose-ul:ml-1.5 prose-ul:mb-3 prose-h2:mt-9 prose-h3:mt-9 prose-h4:mt-9 prose-h5:mt-9 prose-blockquote:font-serif prose-blockquote:text-lg prose-blockquote:text-black dark:prose-blockquote:text-white prose-blockquote:bg-black/5 dark:prose-blockquote:bg-white/5 prose-blockquote:px-3 prose-blockquote:py-2 prose-blockquote:mb-3 prose-hr:border-black/5 dark:prose-hr:border-white/5 prose-hr:mt-9 prose-a:text-link",
				className
			)}
			{...rest}
		/>
	);
}
