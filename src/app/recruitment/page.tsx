"use client";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";

export default function Recruitment() {
  return (
    <PageLayout>
      <div className="w-full space-y-8 mb-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Tuyển dụng</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tham gia đội ngũ của chúng tôi và cùng phát triển sự nghiệp trong
            ngành vận tải.
          </p>
        </div>

        {/* Job Openings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Vị trí đang tuyển dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Tài xế xe khách</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Lái xe khách trên các tuyến đường dài, đảm bảo an toàn và đúng
                  giờ.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Hà Nội - TP.HCM</span>
                  <span>Toàn thời gian</span>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Nhân viên bán vé</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Tư vấn và bán vé cho khách hàng, hỗ trợ đặt vé trực tuyến.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Hà Nội</span>
                  <span>Toàn thời gian</span>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold">Kỹ thuật viên bảo trì</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Bảo trì và sửa chữa xe, đảm bảo xe luôn trong tình trạng tốt.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>TP.HCM</span>
                  <span>Toàn thời gian</span>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">
                    Nhân viên chăm sóc khách hàng
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Hỗ trợ khách hàng, giải đáp thắc mắc và xử lý khiếu nại.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Remote</span>
                  <span>Bán thời gian</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Đơn ứng tuyển</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input id="fullName" placeholder="Nhập họ và tên đầy đủ" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input id="phone" placeholder="Nhập số điện thoại" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" placeholder="Nhập địa chỉ thường trú" />
                </div>
              </div>
            </div>

            {/* Job Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Thông tin ứng tuyển
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Vị trí ứng tuyển *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vị trí ứng tuyển" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver">Tài xế xe khách</SelectItem>
                      <SelectItem value="ticket-seller">
                        Nhân viên bán vé
                      </SelectItem>
                      <SelectItem value="technician">
                        Kỹ thuật viên bảo trì
                      </SelectItem>
                      <SelectItem value="customer-service">
                        Nhân viên chăm sóc khách hàng
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Kinh nghiệm làm việc</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức kinh nghiệm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 năm</SelectItem>
                      <SelectItem value="1-3">1-3 năm</SelectItem>
                      <SelectItem value="3-5">3-5 năm</SelectItem>
                      <SelectItem value="5+">Trên 5 năm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Trình độ học vấn</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ học vấn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">
                        Trung học phổ thông
                      </SelectItem>
                      <SelectItem value="college">Cao đẳng</SelectItem>
                      <SelectItem value="university">Đại học</SelectItem>
                      <SelectItem value="postgraduate">Sau đại học</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedSalary">Mức lương mong muốn</Label>
                  <Input
                    id="expectedSalary"
                    placeholder="Nhập mức lương mong muốn"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Thông tin bổ sung</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Thư xin việc</Label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Viết thư xin việc của bạn..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">CV/Resume</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      Kéo thả file CV vào đây hoặc click để chọn file
                    </p>
                    <Button variant="outline" size="sm">
                      Chọn file
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                <Send className="w-4 h-4 mr-2" />
                Gửi đơn ứng tuyển
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
