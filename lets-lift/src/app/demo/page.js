import {Background} from "@/components/animatedBackground"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <Background/>
      </main>
    </div>
  );
}

