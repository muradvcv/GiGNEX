import Hero from "@/components/Home/Hero";
import How from "@/components/Home/How";
import HowItWorks from "@/components/Home/How";
import PlatformStats from "@/components/Home/PlatformStats";
import ReadyToStart from "@/components/Home/ReadyToStart";

export default function Home() {
  return (
    <div className="min-h-[50vh]">
     <Hero/>
     <How/>
      <PlatformStats/>
      <ReadyToStart/>
    </div>
  );
}
