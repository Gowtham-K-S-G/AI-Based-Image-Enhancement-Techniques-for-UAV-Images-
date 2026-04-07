import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Database, Home, Layers, SplitSquareHorizontal, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Pipeline", path: "/pipeline", icon: Layers },
  { label: "Enhance", path: "/enhance", icon: Upload },
  { label: "Datasets", path: "/datasets", icon: Database },
  { label: "Compare", path: "/comparison", icon: SplitSquareHorizontal },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
