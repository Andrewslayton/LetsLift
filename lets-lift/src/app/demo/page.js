import { Background } from "@/components/animatedBackground";
import { LoadingBackground } from "@/components/loadingBack";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <LoadingBackground />
      </main>
    </div>
  );
}
