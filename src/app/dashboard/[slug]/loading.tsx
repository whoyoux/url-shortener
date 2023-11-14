import CopyButton from "./CopyButton";
import { H1 } from "@/components/ui/H1";
import { H3 } from "@/components/ui/H3";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <H1>Shorted URL</H1>
      <div className="flex items-center gap-4">
        <H3>Destination:</H3>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
      <div className="flex items-center gap-4">
        <H3>Shorted version:</H3>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    </div>
  );
};

export default LoadingPage;
