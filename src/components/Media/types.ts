import type { StaticImageData } from "next/image";
import type { ElementType, Ref } from "react";

import type { Artwork as ArtworkType } from "@/payload-types";
import type { Announcement as AnnouncementType } from "@/payload-types";
import type { Asset as AssetType } from "@/payload-types";

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  autoPlay?: boolean
  controls?: boolean
  muted?: boolean
  loading?: "lazy" | "eager" // for NextImage only
  unoptimized?: boolean // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
	resource?: AssetType | AnnouncementType | ArtworkType | string | number | null; // for Payload media
  size?: "thumbnail" | "sd" | "hd" | "fhd" // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
  audioClassName?: string
}
