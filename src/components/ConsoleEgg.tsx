"use client";

import { useEffect } from "react";

export default function ConsoleEgg() {
  useEffect(() => {
    console.log(
      "%c 👨‍💻 Marc von Gehlen | Portfolio v1.0 %c",
      "color: white; background: #10b981; font-weight: bold; padding: 4px; border-radius: 4px;",
      "color: #10b981; font-weight: bold;"
    );
    console.log("> System Status: All systems nominal. Let's talk business.");
  }, []);

  return null;
}
