"use client";
import { Button as ButtonType } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import Clipboard from "@/icons/Clipboard";
import Error from "@/icons/Error";

const code = `<a href="https://pprmint.de">
    <img src="https://pprmint.de/88x31.png" alt="Go to pprmint.de" />
</a>
`;

export default function Buttons({
  buttons,
}: {
  buttons: PaginatedDocs<ButtonType>;
}) {
  const t = useTranslations();
  return (
    <div className="flex justify-center">
      <Dialog.Root>
        <Dialog.Trigger>
          <Image
            unoptimized
            src="/88x31.png"
            width={88}
            height={31}
            alt="pprmint.de button"
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-white/90 dark:bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
          <Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh md:h-max w-[93vw] max-w-5xl bg-white dark:bg-neutral-950 outline-solid outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl">
            <Dialog.Close asChild>
              <button
                className="absolute top-0 right-0 inline-flex size-9 items-center justify-center text-neutral-950 dark:text-white hover:text-white dark:hover:text-neutral-950 bg-black/5 dark:bg-white/5 hover:bg-neutral-950 dark:hover:bg-white active:bg-neutral-800 dark:active:bg-neutral-100 duration-100 active:duration-75"
                aria-label="Close"
              >
                <Error />
              </button>
            </Dialog.Close>
            <Dialog.Title
              asChild
              className="px-6 md:px-9 mt-6 md:mt-9 md:text-center"
            >
              <h2 className="lg:text-balance">
                {t("FOOTER.Button.title")}
                <span className="text-green">.</span>
              </h2>
            </Dialog.Title>
            <Dialog.Description asChild>
              <div className="px-6 md:px-9 md:text-center">
                <p>{t("FOOTER.Button.description")}</p>
                <div className="flex justify-center gap-3 mb-[7px]">
                  <div>
                    <Image
                      unoptimized
                      src="/88x31.png"
                      width={88}
                      height={31}
                      alt="pprmint.de button"
                    />
                    <span className="text-xs">PNG</span>
                  </div>
                  <div>
                    <Image
                      unoptimized
                      src="/88x31.gif"
                      width={88}
                      height={31}
                      alt="pprmint.de button"
                    />
                    <span className="text-xs">GIF</span>
                  </div>
                </div>
                <p>{t("FOOTER.Button.codeSnippet")}</p>
                <pre className="mb-2 text-left font-mono text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 max-w-max mx-auto px-2 py-1 overflow-auto">
                  {code}
                </pre>
                <p>{t("FOOTER.Button.alsoAsGif")}</p>
              </div>
            </Dialog.Description>
            <div className="mt-6 md:mt-9 border-t border-black/5 dark:border-white/5 h-12">
              <Dialog.Close asChild>
                <Button
                  align="center"
                  size="full"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    toast(t("COMMON.copied"), {
                      icon: <Clipboard width={30} height={30} />,
                    });
                  }}
                >
                  {t("FOOTER.Button.copy")}
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {buttons.docs.length > 0 &&
        buttons.docs.map((button) => (
          <Link
            key={button.id}
            href={button.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              unoptimized
              src={
                (button.url && typeof button.url === "string" && button.url) ||
                ""
              }
              width={88}
              height={31}
              alt={button.alt}
            />
          </Link>
        ))}
    </div>
  );
}
