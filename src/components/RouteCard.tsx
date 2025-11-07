import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Users, Newspaper } from "lucide-react";
import Image from "next/image";

interface RouteCardProps {
  item: {
    id: number;
    from?: string;
    to?: string;
    duration?: string;
    price?: string;
    type?: string;
    rating?: number;
    passengers?: number;
    image: string;
    // News properties
    title?: string;
    excerpt?: string;
    date?: string;
    category?: string;
    author?: string;
    views?: number;
  };
  variant?: "route" | "news";
}

const RouteCard: React.FC<RouteCardProps> = ({ item, variant = "route" }) => {
  const isNews = variant === "news";

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow"
      style={{
        paddingTop: 0,
      }}
    >
      <div className={`${isNews ? "h-32" : "h-48"} relative overflow-hidden`}>
        <Image
          src={item.image}
          alt={isNews ? item.title || "" : `${item.from} to ${item.to}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div
          className={`absolute inset-0 ${
            isNews
              ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          }`}
        ></div>

        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 backdrop-blur-sm text-blue-600 font-semibold text-xs shadow-sm">
            {isNews ? item.category : item.type}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          {isNews ? (
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span className="text-xs font-medium tracking-wide">Tin tức</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold text-sm tracking-wide">
                  {item.from} → {item.to}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">{item.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="font-medium">
                    {item.passengers?.toLocaleString()}+
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {isNews ? (
          <>
            <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 tracking-wide">
              {item.title}
            </h3>
            <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
              {item.excerpt}
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">
                {item.date}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="font-medium">{item.author}</span>
                <span>•</span>
                <span className="font-medium">{item.views}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-medium tracking-wide"
            >
              Đọc thêm
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="font-semibold text-sm tracking-wide">
                  {item.rating}
                </span>
              </div>
              <div className="text-lg font-bold text-blue-600 tracking-wide">
                {item.price} VNĐ
              </div>
            </div>

            <Button size="sm" className="w-full font-medium tracking-wide">
              Đặt vé ngay
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteCard;
