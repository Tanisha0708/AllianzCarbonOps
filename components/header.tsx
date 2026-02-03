'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, User } from 'lucide-react';

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/model-selection': 'Model Selection & Amplification',
  '/dashboard/model-analysis': 'AI Model Analysis & Recommendation',
  '/dashboard/region-optimization': 'Region Optimization',
  '/dashboard/reports': 'ESG Reports & Compliance',
};

export function Header() {
  const pathname = usePathname();
  const pageTitle = pageNames[pathname] || 'Dashboard';

  return (
    <header className="border-b border-sidebar-border/30 bg-card h-16 flex items-center justify-between px-8 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <h1 className="text-xl font-bold text-foreground tracking-tight">{pageTitle}</h1>
        </div>
        <p className="text-xs text-muted-foreground">Monitor your AI carbon footprint</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg hover:bg-sidebar-accent/50 text-muted-foreground hover:text-primary"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg hover:bg-sidebar-accent/50"
        >
          <Avatar className="h-8 w-8 border border-sidebar-border">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
