import { TmHome } from "@/components/templates/TmHome";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense>
      <TmHome />
    </Suspense>
  );
}
