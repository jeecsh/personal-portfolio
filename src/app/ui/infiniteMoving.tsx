"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";

export const InfiniteMovingSkills = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  iconSize = 48,
}: {
  items: {
    name: string;
    icon: keyof typeof LucideIcons;
    category?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  iconSize?: number;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => {
          const Icon = LucideIcons[item.icon];
          return (
            <li
              className="w-[90vw] max-w-full relative rounded-2xl flex-shrink-0 p-4 md:p-8"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
              key={idx}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="p-4 rounded-full bg-slate-900/50 mb-4">
                  {Icon && (
                    <Icon
                      size={iconSize}
                      className="text-slate-100"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <span className="text-center">
                  <span className="text-lg font-semibold leading-[1.6] text-white">
                    {item.name}
                  </span>
                  {item.category && (
                    <span className="block text-sm leading-[1.6] text-slate-300 font-normal">
                      {item.category}
                    </span>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};