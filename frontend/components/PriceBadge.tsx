import { displayPrice } from "@/lib/price-display";

type PriceBadgeProps = {
  price?: string;
  className?: string;
};

export function PriceBadge({ price = "Price on request", className = "" }: PriceBadgeProps) {
  return <p className={`price-badge ${className}`.trim()}><span>Price</span><strong>{displayPrice(price)}</strong></p>;
}
