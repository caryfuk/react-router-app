import type { ReactElement } from "react";
import { Welcome } from "@/features/welcome/components/welcome";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home(): ReactElement {
  return <Welcome />;
}
