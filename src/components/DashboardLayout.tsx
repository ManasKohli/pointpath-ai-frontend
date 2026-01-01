import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrip } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Compass, 
  LogOut, 
  Plane, 
  Building2, 
  Map, 
  Plus,
  Settings,
  ChevronRight,
  PanelLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  currentStep?: number;
}

const WIZARD_STEPS = [
  { label: 'Trip Details', path: '/app', icon: Compass, step: 0 },
  { label: 'Flights', path: '/app/trip/:tripId/flights', icon: Plane, step: 1 },
  { label: 'Hotels', path: '/app/trip/:tripId/hotels', icon: Building2, step: 2 },
  { label: 'Roadmap', path: '/app/trip/:tripId/roadmap', icon: Map, step: 3 },
];

const AppSidebar = ({ currentStep }: { currentStep?: number }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId, resetTrip } = useTrip();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleNewTrip = () => {
    resetTrip();
    navigate('/app');
  };

  const getStepPath = (step: typeof WIZARD_STEPS[0]) => {
    if (step.path.includes(':tripId') && tripId) {
      return step.path.replace(':tripId', tripId);
    }
    return step.path;
  };

  const isStepAccessible = (stepIndex: number) => {
    if (currentStep === undefined) return stepIndex === 0;
    return stepIndex <= currentStep;
  };

  const isActive = (step: typeof WIZARD_STEPS[0]) => {
    const actualPath = getStepPath(step);
    return location.pathname === actualPath || 
           (step.path === '/app' && location.pathname === '/app');
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <button 
          onClick={() => navigate('/app')} 
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold">PointPath AI</span>
          )}
        </button>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground px-2 py-1">
              Current Trip
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {WIZARD_STEPS.map((step, index) => {
                const accessible = isStepAccessible(index);
                const active = isActive(step);
                const Icon = step.icon;

                return (
                  <SidebarMenuItem key={step.path}>
                    <SidebarMenuButton
                      onClick={() => accessible && navigate(getStepPath(step))}
                      className={cn(
                        'w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all',
                        active 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : accessible
                          ? 'hover:bg-muted text-foreground'
                          : 'text-muted-foreground cursor-not-allowed opacity-50'
                      )}
                      disabled={!accessible}
                    >
                      <div className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium',
                        active ? 'bg-primary-foreground/20' : 'bg-muted'
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{step.label}</span>
                          {active && <ChevronRight className="h-4 w-4" />}
                        </>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleNewTrip}
                  className="w-full justify-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-foreground"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                    <Plus className="h-3.5 w-3.5" />
                  </div>
                  {!collapsed && <span className="text-sm font-medium">New Trip</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      <SidebarTrigger className="-ml-1">
        <PanelLeft className="h-5 w-5" />
      </SidebarTrigger>

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 px-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                {getInitials(user?.name, user?.email)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium">{user?.name || user?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive focus:text-destructive">
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

const DashboardLayout = ({ children, currentStep }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentStep={currentStep} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
