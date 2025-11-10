import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo-placeholder.svg"
      alt="Markaz al-Haqq logo placeholder"
      width={160}
      height={48}
      sizes="160px"
      className={className}
      priority
    />
  );
}
