import { P } from "@/components/ui/P";
import { H1 } from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center mt-10 md:mt-20 gap-6 max-w-xl mx-auto">
        <H1>Shorten your URL</H1>
        <Input type="url" placeholder="Enter a long URL" className="mt-8" />
        <Button className="w-full">Shorten!</Button>
        <P>Your shortened URL will appear here.</P>
      </section>
    </main>
  );
}
