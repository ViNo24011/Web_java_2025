import PageLayout from "@/components/PageLayout";
import TransportWidget from "@/components/TransportWidget";

export default function Home() {
  return (
    <PageLayout>
      <div className="w-full h-full p-2 space-y-24">
        <div className="max-h-60">
          <TransportWidget />
        </div>
        <div className="h-100">
          <div className="h-full bg-blue-500"></div>
        </div>
        <div className="h-100">
          <div className="h-full bg-yellow-500"></div>
        </div>
      </div>
    </PageLayout>
  );
}
