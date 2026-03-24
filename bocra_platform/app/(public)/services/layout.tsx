import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Regulatory Sectors - BOCRA",
  description:
    "BOCRA regulates telecommunications, broadcasting, postal services, internet & ICT, radio spectrum, type approval, and cybersecurity in Botswana.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
