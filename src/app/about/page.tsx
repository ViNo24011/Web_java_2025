"use client";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <PageLayout>
      <div className="w-full space-y-8 mb-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Về chúng tôi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến dịch vụ vận tải chất lượng cao, an toàn
            và tiện lợi cho mọi khách hàng.
          </p>
        </div>

        {/* Company Story */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Câu chuyện của chúng tôi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Được thành lập với sứ mệnh kết nối mọi người thông qua dịch vụ vận
              tải chất lượng cao, chúng tôi đã phát triển từ một công ty nhỏ
              thành một trong những nhà cung cấp dịch vụ vận tải hàng đầu tại
              Việt Nam.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Với đội ngũ nhân viên chuyên nghiệp và đội xe hiện đại, chúng tôi
              cam kết mang đến trải nghiệm di chuyển tốt nhất cho khách hàng.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Khách hàng là trung tâm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Chúng tôi luôn đặt nhu cầu và sự hài lòng của khách hàng lên
                hàng đầu.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Chất lượng dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Cam kết cung cấp dịch vụ vận tải an toàn, đúng giờ và chất lượng
                cao.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-lg">Kinh nghiệm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Với nhiều năm kinh nghiệm trong ngành vận tải và đội ngũ chuyên
                nghiệp.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-lg">Tận tâm phục vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Luôn tận tâm, chu đáo trong từng dịch vụ để mang đến trải nghiệm
                tốt nhất.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sứ mệnh</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Mang đến dịch vụ vận tải an toàn, tiện lợi và chất lượng cao,
                góp phần kết nối mọi người và thúc đẩy sự phát triển của xã hội.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tầm nhìn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Trở thành nhà cung cấp dịch vụ vận tải hàng đầu tại Việt Nam,
                được khách hàng tin tưởng và yêu mến.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Thành tựu của chúng tôi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  10,000+
                </div>
                <div className="text-gray-600">Khách hàng hài lòng</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Chuyến xe mỗi ngày</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  5+
                </div>
                <div className="text-gray-600">Năm kinh nghiệm</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
