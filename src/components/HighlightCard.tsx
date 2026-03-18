"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export default function HighlightCard({
  id,
  children,
  style,
}: {
  id: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === `#${id}` && ref.current) {
      ref.current.classList.add("card-highlight");
      const t = setTimeout(() => ref.current?.classList.remove("card-highlight"), 2100);
      return () => clearTimeout(t);
    }
  }, [id]);

  return (
    <div ref={ref} id={id} style={{ scrollMarginTop: "6rem", minWidth: 0, ...style }}>
      {children}
    </div>
  );
}
