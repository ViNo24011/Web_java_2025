"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type ProductCardProps = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  discount?: number; // percentage 0..100
  currency?: string; // e.g., "VND", "USD"
  images?: string[];
  href?: string; // link to product details
  onAddToCart?: (productId: string) => void;
  disabled?: boolean;
};

function formatPrice(value: number, currency: string = "VND"): string {
  // Simple, stable price formatter suitable for SSR/CSR parity.
  if (currency === "VND") {
    return `${value.toLocaleString("vi-VN")} ₫`;
  }
  return `${currency} ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function CardItem({
  id,
  name,
  brand,
  price,
  discount,
  currency = "VND",
  images = [],
  href,
  onAddToCart,
  disabled = false,
}: ProductCardProps) {
  const hasDiscount = typeof discount === "number" && discount > 0;
  const discountPercent = hasDiscount
    ? Math.min(100, Math.max(0, Math.round(discount!)))
    : 0;
  const finalPrice = hasDiscount
    ? Math.max(0, Math.round(price * (1 - discountPercent / 100)))
    : price;
  const imageUrl = images[0] || "/logo.png";

  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full">
        {href ? (
          <Link href={href} aria-label={name} className="block">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={false}
            />
          </Link>
        ) : (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
        )}
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Content */}
      <CardHeader className="gap-1.5">
        <CardTitle className="text-base line-clamp-2">{name}</CardTitle>
        {brand && (
          <span className="text-xs text-muted-foreground">{brand}</span>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(finalPrice, currency)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(price, currency)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        {href ? (
          <Link
            href={href}
            className="text-sm font-medium text-blue-600 hover:underline"
            aria-label={`Xem chi tiết sản phẩm ${name}`}
          >
            Xem chi tiết
          </Link>
        ) : (
          <span />
        )}
        <Button
          variant="default"
          disabled={disabled}
          onClick={() => onAddToCart?.(id)}
          className="gap-2"
          aria-label={`Thêm ${name} vào giỏ hàng`}
        >
          <ShoppingCart className="h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
}
