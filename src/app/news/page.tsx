"use client";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function News() {
  // Mock data for news articles
  const newsData = [
    {
      id: 1,
      title: "Công ty mở rộng tuyến đường mới Hà Nội - Đà Nẵng",
      excerpt:
        "Chúng tôi vui mừng thông báo về việc mở rộng tuyến đường mới từ Hà Nội đến Đà Nẵng với tần suất 3 chuyến/ngày...",
      date: "2024-01-15",
      author: "Admin",
      category: "Tin tức",
      image: "/placeholder-news.jpg",
    },
    {
      id: 2,
      title: "Cập nhật quy trình đặt vé trực tuyến mới",
      excerpt:
        "Hệ thống đặt vé trực tuyến đã được cập nhật với giao diện mới, dễ sử dụng hơn và hỗ trợ thanh toán đa dạng...",
      date: "2024-01-10",
      author: "Admin",
      category: "Cập nhật",
      image: "/placeholder-news.jpg",
    },
    {
      id: 3,
      title: "Chương trình khuyến mãi đặc biệt tháng 1",
      excerpt:
        "Nhân dịp năm mới, chúng tôi triển khai chương trình khuyến mãi đặc biệt với giảm giá lên đến 30% cho tất cả tuyến đường...",
      date: "2024-01-05",
      author: "Admin",
      category: "Khuyến mãi",
      image: "/placeholder-news.jpg",
    },
    {
      id: 4,
      title: "Thông báo lịch nghỉ Tết Nguyên Đán 2024",
      excerpt:
        "Thông báo về lịch nghỉ Tết Nguyên Đán 2024 và các chuyến xe đặc biệt phục vụ nhu cầu di chuyển của khách hàng...",
      date: "2024-01-01",
      author: "Admin",
      category: "Thông báo",
      image: "/placeholder-news.jpg",
    },
    {
      id: 5,
      title: "Công ty nhận giải thưởng 'Dịch vụ vận tải tốt nhất'",
      excerpt:
        "Vinh dự nhận giải thưởng 'Dịch vụ vận tải tốt nhất năm 2023' do Hiệp hội Vận tải Việt Nam trao tặng...",
      date: "2023-12-28",
      author: "Admin",
      category: "Thành tựu",
      image: "/placeholder-news.jpg",
    },
    {
      id: 6,
      title: "Hướng dẫn sử dụng ứng dụng di động mới",
      excerpt:
        "Ứng dụng di động mới với nhiều tính năng tiện ích giúp khách hàng dễ dàng đặt vé, theo dõi chuyến đi...",
      date: "2023-12-20",
      author: "Admin",
      category: "Hướng dẫn",
      image: "/placeholder-news.jpg",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tin tức":
        return "bg-blue-100 text-blue-800";
      case "Cập nhật":
        return "bg-green-100 text-green-800";
      case "Khuyến mãi":
        return "bg-yellow-100 text-yellow-800";
      case "Thông báo":
        return "bg-red-100 text-red-800";
      case "Thành tựu":
        return "bg-purple-100 text-purple-800";
      case "Hướng dẫn":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageLayout>
      <div className="w-full space-y-8 mb-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Tin tức</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất về dịch vụ vận tải và các hoạt động
            của công ty.
          </p>
        </div>

        {/* Featured News */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600 text-white">Tin nổi bật</Badge>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {newsData[0].date}
              </div>
            </div>
            <CardTitle className="text-2xl">{newsData[0].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              {newsData[0].excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-1" />
                {newsData[0].author}
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Đọc thêm
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.slice(1).map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    {article.author}
                  </div>
                  <Button variant="outline" size="sm">
                    Đọc thêm
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Xem thêm tin tức
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
