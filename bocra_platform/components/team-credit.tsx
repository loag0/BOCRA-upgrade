"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const teamMembers = [
  { name: "Loago Moremi", role: "Team Lead / Frontend Developer", link: "https://www.linkedin.com/in/loago-moremi" },
  { name: "Phemelo Gaborone", role: "Frontend Developer / DevOps", link: "" },
  { name: "Ineeleng Bagalatia", role: "Backend Developer", link: "" },
  { name: "Kaone Tidimalo", role: "Backend Developer", link: "" },
  { name: "Candy Dibobo", role: "Project Manager / UI/UX Design", link: "" },
  { name: "Omogolo Matema", role: "Business Analyst", link: "" },
];

export function TeamCredit() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-white/20 hover:text-white/50 transition-colors cursor-pointer text-xs">
        Developed by <span className="text-white/40">67 Gigabytes</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-bocra-navy border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white font-heading text-xl">
            67 Gigabytes
          </DialogTitle>
          <p className="text-white/50 text-sm">
            The team behind this platform
          </p>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {teamMembers.map((member) => {
            const Wrapper = member.link ? "a" : "div";
            const linkProps = member.link
              ? { href: member.link, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={member.name}
                {...linkProps}
                className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 ${
                  member.link ? "hover:bg-white/10 hover:border-bocra-gold/30 transition-all cursor-pointer" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-bocra-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-bocra-gold font-bold text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">
                    {member.name}
                  </div>
                  <div className="text-white/40 text-xs">{member.role}</div>
                </div>
                {member.link && (
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 shrink-0" />
                )}
              </Wrapper>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">
            Built for the BOCRA Website Development Hackathon 2026
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
