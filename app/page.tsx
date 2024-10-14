import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Welcome to dietOS
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Revolutionize your nutrition journey with dietOS - v1.1. An innovative MVP under active development, designed to transform your diettian journey.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="group bg-black text-white hover:bg-gray-800 transition-colors duration-300">
              <Link href="/dashboard" className="flex items-center">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-4 text-sm text-gray-500">
        © 2024 dietOS. All rights reserved.
      </footer>
    </div>
  );
}
