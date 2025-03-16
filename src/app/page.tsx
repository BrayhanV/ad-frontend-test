import { TmHome } from "@/components/templates/tm-home";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense>
      <TmHome />
    </Suspense>
  );
}
