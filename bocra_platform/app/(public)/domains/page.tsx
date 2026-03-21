import { Navbar } from "@/components/navbar";
import { DomainsClient } from "./domains-client";

export const metadata = {
  title: ".bw Domain Registry — BOCRA",
  description: "Search, register and manage .bw country code top-level domains administered by BOCRA.",
};

export default function DomainsPage() {
  return (
    <>
      <Navbar />
      <DomainsClient />
    </>
  );
}
