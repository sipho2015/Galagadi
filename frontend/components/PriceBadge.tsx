type PriceBadgeProps = {
  price?: string;
  className?: string;
};

export function PriceBadge({ price = "Price on request", className = "" }: PriceBadgeProps) {
  return <p className={`price-badge ${className}`.trim()}><span>Price</span><strong>{price}</strong></p>;
}
