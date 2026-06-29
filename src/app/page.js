import AdminCharts from "@/components/dashboard/admin/AdminCharts";
import GetTopFreelancer from "@/components/Home/GetTopFreelancer";
import Hero from "@/components/Home/Hero";
import How from "@/components/Home/How";
import LatestFeaturedTasks from "@/components/Home/LatestFeaturedTasks";
import PlatformStats from "@/components/Home/PlatformStats";
import ReadyToStart from "@/components/Home/ReadyToStart";
import { getAllSummary } from "@/lib/actions/admin";

export default async function Home() {
  const result = await getAllSummary();
  const summary = result?.data;

  return (
    <div className="min-h-[50vh]">
      <Hero />
      
      <div className="max-w-7xl mx-auto">
        <GetTopFreelancer/>
        <LatestFeaturedTasks />
        <AdminCharts summary={summary} />
      </div>
      <How />
      <PlatformStats />
      <ReadyToStart />

    </div>
  );
}
