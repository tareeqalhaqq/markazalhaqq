import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      width="150"
      height="30"
      {...props}
    >
      <text
        x="50"
        y="15"
        fontFamily="'PT Sans', sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="hsl(var(--primary))"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        MarkazalHaqq
      </text>
    </svg>
  );
}
