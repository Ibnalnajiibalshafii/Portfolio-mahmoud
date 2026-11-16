import { useEffect, useState, type ReactNode } from "react";

export function AfterMount({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-72 w-full rounded-card bg-paper-2" />;
  }

  return <div className="h-72 w-full">{children}</div>;
}
