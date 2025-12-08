import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div
      role="img"
      aria-label="Markaz al-Haqq"
      className={cn("inline-block h-12 w-[160px]", className)}
    >
      <span className="sr-only">Markaz al-Haqq</span>
    </div>
  );
}
