import { Suspense } from "react";
import { MomentsArchive } from "@/components/MomentsArchive";
import { SparkleField } from "@/components/decorative";

export const metadata = {
  title: "All Moments — Dolly Legacy",
  description:
    "Browse every moment, quote, and fact in the Dolly Parton tribute archive.",
};

export default function MomentsPage() {
  return (
    <div className="relative overflow-hidden px-6 py-12 md:py-16">
      <SparkleField />
      <div className="relative mx-auto max-w-6xl">
        <Suspense
          fallback={
            <p className="font-script text-2xl text-hot-pink">
              Loading moments…
            </p>
          }
        >
          <MomentsArchive />
        </Suspense>
      </div>
    </div>
  );
}
