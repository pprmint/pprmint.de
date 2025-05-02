"use client"

import { cn } from "@/utilities/cn"
import React, { useEffect, useRef } from "react"

import type { Props as MediaProps } from "../types"

import { getClientSideURL } from "@/utilities/getURL"

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, autoPlay, controls, muted } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener("suspend", () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === "object") {
    const { url } = resource

    return (
      <video
        className={cn(videoClassName, "w-full aspect-video bg-black")}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source suppressHydrationWarning src={`${getClientSideURL()}${url}`} />
      </video>
    )
  }

  return null
}
