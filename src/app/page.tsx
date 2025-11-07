import PageLayout from "@/components/PageLayout";
import TransportWidget from "@/components/TransportWidget";
import RouteCard from "@/components/RouteCard";
import { Button } from "@/components/ui/button";
import { Users, Shield, Wifi, Bus, Award } from "lucide-react";

export default function Home() {
  // Mock data for popular routes
  const popularRoutes = [
    {
      id: 1,
      from: "Hà Nội",
      to: "TP. Hồ Chí Minh",
      duration: "24h",
      price: "800,000",
      type: "Limousine",
      rating: 4.8,
      passengers: 1200,
      image: "/sample-1.jpg",
    },
    {
      id: 2,
      from: "Hà Nội",
      to: "Đà Nẵng",
      duration: "12h",
      price: "450,000",
      type: "Limousine Cabin",
      rating: 4.9,
      passengers: 850,
      image: "/sample-1.jpg",
    },
    {
      id: 3,
      from: "TP. Hồ Chí Minh",
      to: "Đà Lạt",
      duration: "8h",
      price: "350,000",
      type: "Minibus",
      rating: 4.7,
      passengers: 650,
      image: "/sample-1.jpg",
    },
    {
      id: 4,
      from: "Hà Nội",
      to: "Hải Phòng",
      duration: "2h",
      price: "120,000",
      type: "Minibus",
      rating: 4.6,
      passengers: 450,
      image: "/sample-1.jpg",
    },
    {
      id: 5,
      from: "TP. Hồ Chí Minh",
      to: "Vũng Tàu",
      duration: "3h",
      price: "180,000",
      type: "Limousine",
      rating: 4.8,
      passengers: 320,
      image: "/sample-1.jpg",
    },
    {
      id: 6,
      from: "Đà Nẵng",
      to: "Huế",
      duration: "2.5h",
      price: "150,000",
      type: "Minibus",
      rating: 4.5,
      passengers: 280,
      image: "/sample-1.jpg",
    },
  ];

  // Mock data for news - same as /news page
  const news = [
    {
      id: 1,
      title: "Khai trương tuyến mới Hà Nội - Phú Quốc",
      excerpt:
        "Từ ngày 15/01/2024, chúng tôi chính thức khai trương tuyến xe mới từ Hà Nội đến Phú Quốc với giá vé ưu đãi và dịch vụ chất lượng cao.",
      date: "10/01/2024",
      image: "/sample-1.jpg",
      category: "Tuyến mới",
      author: "Admin",
      views: 1250,
    },
    {
      id: 2,
      title: "Chương trình khuyến mãi Tết Nguyên Đán 2024",
      excerpt:
        "Nhân dịp Tết Nguyên Đán, chúng tôi áp dụng chương trình giảm giá 20% cho tất cả các tuyến từ 20/01 đến 20/02/2024.",
      date: "05/01/2024",
      image: "/sample-1.jpg",
      category: "Khuyến mãi",
      author: "Marketing",
      views: 2100,
    },
    {
      id: 3,
      title: "Nâng cấp đội xe Limousine mới",
      excerpt:
        "Đầu năm 2024, chúng tôi đã bổ sung 20 xe Limousine mới với tiện nghi hiện đại, wifi miễn phí và ghế ngả 180 độ.",
      date: "02/01/2024",
      image: "/sample-1.jpg",
      category: "Cải tiến",
      author: "Operations",
      views: 980,
    },
    {
      id: 4,
      title: "Hệ thống đặt vé online mới",
      excerpt:
        "Ra mắt hệ thống đặt vé online với giao diện thân thiện, thanh toán đa dạng và hỗ trợ 24/7.",
      date: "28/12/2023",
      image: "/sample-1.jpg",
      category: "Công nghệ",
      author: "IT Team",
      views: 1560,
    },
    {
      id: 5,
      title: "Chính sách hoàn vé linh hoạt",
      excerpt:
        "Áp dụng chính sách hoàn vé linh hoạt với phí hoàn vé thấp và thời gian xử lý nhanh chóng.",
      date: "25/12/2023",
      image: "/sample-1.jpg",
      category: "Chính sách",
      author: "Customer Service",
      views: 890,
    },
    {
      id: 6,
      title: "Tuyến xe du lịch mùa hè 2024",
      excerpt:
        "Khai trương các tuyến xe du lịch mùa hè đến các điểm du lịch nổi tiếng với giá vé đặc biệt.",
      date: "20/12/2023",
      image: "/sample-1.jpg",
      category: "Du lịch",
      author: "Tourism",
      views: 1340,
    },
  ];

  // Mock data for features - reduced to 3 key features
  const features = [
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      title: "An toàn tuyệt đối",
      description: "Đội ngũ tài xế chuyên nghiệp, xe mới 100%",
    },
    {
      icon: <Wifi className="h-5 w-5 text-green-600" />,
      title: "Tiện nghi hiện đại",
      description: "Wifi miễn phí, ghế ngả 180 độ",
    },
    {
      icon: <Users className="h-5 w-5 text-purple-600" />,
      title: "Hỗ trợ 24/7",
      description: "Chăm sóc khách hàng tận tình",
    },
  ];

  return (
    <PageLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Đặt vé xe khách
              <span className="text-blue-600"> dễ dàng</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hơn 100 tuyến xe trên toàn quốc với giá vé cạnh tranh và dịch vụ
              chất lượng cao
            </p>
          </div>

          <div className="w-full mx-auto p-8">
            <TransportWidget />
          </div>
        </section>

        {/* Popular Routes Section */}
        <section className="mb-16">
          <div className="text-center mb-12 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tuyến nổi bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những tuyến xe được yêu thích nhất với giá vé hấp dẫn và dịch vụ
              chất lượng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route) => (
              <RouteCard key={route.id} item={route} variant="route" />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tin tức & Cập nhật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất về dịch vụ và chương trình
              khuyến mãi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((article) => (
              <RouteCard key={article.id} item={article} variant="news" />
            ))}
          </div>
        </section>

        {/* About Company Section */}
        <section className="mb-16 bg-gray-50 py-12 rounded-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Về nhà xe chúng tôi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Với hơn 10 năm kinh nghiệm trong ngành vận tải, chúng tôi tự hào
              là đối tác tin cậy của hàng triệu khách hàng trên toàn quốc.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                100+ Tuyến xe
              </h3>
              <p className="text-gray-600 text-sm">Kết nối mọi miền đất nước</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Chất lượng 5 sao
              </h3>
              <p className="text-gray-600 text-sm">
                Được đánh giá cao bởi khách hàng
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                1M+ Khách hàng
              </h3>
              <p className="text-gray-600 text-sm">Tin tưởng và lựa chọn</p>
            </div>
          </div>

          {/* Features - Integrated */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-900">
              Tại sao chọn chúng tôi?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    {feature.icon}
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" size="sm" className="mr-3">
              Tìm hiểu thêm
            </Button>
            <Button size="sm">Liên hệ ngay</Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
