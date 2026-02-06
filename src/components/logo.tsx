import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div
      role="img"
      aria-label="Markaz al-Haqq"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span className="font-headline text-lg font-semibold tracking-wide text-foreground">
        Markaz al-Haqq
      </span>
    </div>
  );
}
