import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="w-full h-full px-2 space-y-24">
        <div className="h-100 w-full grid grid-flow-col grid-rows-4 gap-1">
          <div className="row-span-4 col-span-2 bg-yellow-500"></div>
          <div className="row-span-4 col-span-6 bg-red-500"></div>
          <div className="row-span-2 col-span-3 bg-blue-500"></div>
          <div className="row-span-2 col-span-3 bg-green-500"></div>
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
