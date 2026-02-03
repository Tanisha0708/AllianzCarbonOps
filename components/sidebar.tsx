'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Brain,
  Globe,
  FileText,
  LogOut,
  Settings,
  Leaf,
  Zap,
} from 'lucide-react';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: BarChart3,
  },
  {
    href: '/dashboard/model-selection',
    label: 'Model Selection',
    icon: Brain,
  },
  {
    href: '/dashboard/model-analysis',
    label: 'Model Analysis',
    icon: Brain,
  },
  {
    href: '/dashboard/region-optimization',
    label: 'Region Optimization',
    icon: Leaf,
  },
  {
    href: '/dashboard/reports',
    label: 'ESG Reports',
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col shadow-sm">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">AllianzCarbonOps</h1>
            <p className="text-xs text-muted-foreground">AI ESG Analytics</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 rounded-lg',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-primary'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
