// components/app-sidebar.tsx

"use client";

import Link from "next/link";
import {
  MessageSquare,
  Plus,
  Trash2,
  Settings,
  PanelLeftClose,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const chats = [
  {
    title: "React chatbot project",
    url: "/chat/1",
  },
  {
    title: "Next.js learning",
    url: "/chat/2",
  },
  {
    title: "Portfolio ideas",
    url: "/chat/3",
  },
];

export function Appsidebar() {
  return (
    <Sidebar className="border-r bg-background">
      {/* Header */}
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Chat</h2>

          {/* <PanelLeftClose className="h-5 w-5 text-muted-foreground" /> */}
        </div>

        <Link
          href="/"
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Link>
      </SidebarHeader>

      {/* Chat List */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.title}>
                  <SidebarMenuButton>
                    <Link
                      href={chat.url}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <MessageSquare className="h-4 w-4 shrink-0" />

                        <span className="truncate text-sm">{chat.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <div className="space-y-2">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted">
            <Settings className="h-4 w-4" />
            Settings
          </button>

          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-muted">
            <Trash2 className="h-4 w-4" />
            Clear Chats
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Appsidebar;
