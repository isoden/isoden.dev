import type { PortableTextBlock } from "emdash";

type PortableTextSpan = {
  _type: string;
  text?: string;
};

type PortableTextTextBlock = PortableTextBlock & {
  _type: "block";
  children: PortableTextSpan[];
};

function isTextBlock(block: PortableTextBlock): block is PortableTextTextBlock {
  return block._type === "block" && Array.isArray(block.children);
}

/**
 * Extract plain text from Portable Text blocks
 */
export function extractText(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .filter(isTextBlock)
    .map((block) =>
      block.children
        .filter(
          (child) => child._type === "span" && typeof child.text === "string",
        )
        .map((span) => span.text)
        .join(""),
    )
    .join(" ");
}
