import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  BarChart,
  Building2,
  FileText,
  Headphones,
  LayoutDashboard,
  Phone,
  Settings,
  TestTube2,
  PenToolIcon as Tool,
  User,
  Workflow,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "../Components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/avatar";
import { Button } from "../Components/ui/button";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Build",
      icon: Building2,
      children: [
        {
          title: "Agents",
          path: "/dashboard/agents",
          icon: Headphones,
        },
        {
          title: "Inbound",
          path: "/dashboard/inbound",
          icon: Workflow,
        },
        {
          title: "Outbound",
          path: "/dashboard/outbound",
          icon: Phone,
        },
        {
          title: "Files",
          path: "/dashboard/files",
          icon: FileText,
        },
        {
          title: "Tools",
          path: "/dashboard/tools",
          icon: Tool,
        },
        {
          title: "Blocks",
          path: "/dashboard/blocks",
          icon: Settings,
        },
        {
          title: "Squads",
          path: "/dashboard/squads",
          icon: User,
        },
      ],
    },
    {
      title: "Test",
      icon: TestTube2,
      path: "/dashboard/test",
    },
    {
      title: "Observe",
      icon: BarChart,
      path: "/dashboard/observe",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <div className="flex min-h-screen w-full bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff]">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-3">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src={"/DARKLOGO.png"} alt="Logo" className="h-8 w-auto" />
            </Link>
          </SidebarHeader>
          <div className="p-4">
            <SidebarContent className="text-[#1e2a3b]">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <SidebarMenuButton>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === child.path}
                              >
                                <Link to={child.path}>
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </div>
        </Sidebar>
        <div className="flex flex-1 flex-col w-full">
          <header className="flex h-[57px] items-center justify-between gap-4 border-b px-6">
            <SidebarTrigger />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/avatars/01.png"
                      alt={user?.name || "User avatar"}
                    />
                    <AvatarFallback className="bg-[#1e2a3b] text-white">{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 w-full">
            <div className="h-full w-full px-6 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
