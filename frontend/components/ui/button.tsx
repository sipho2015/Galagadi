import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" };

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <Link className={`button button-${variant} ${className}`} {...props} />;
}
