// components/app-sidebar.tsx

"use client";

import { MessageSquare, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

// interface of session
interface AppsidebarProps {
  session: Session | null;
}

export function Appsidebar({ session }: AppsidebarProps) {
  const router = useRouter();
  return (
    <Sidebar className="border-r bg-background">
      {/* Header */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <span className="font-semibold text-sm">AI Chat</span>
        </div>

        {/* New Chat button */}
        <Button
          variant="outline"
          size="sm"
          className="mx-2 justify-start gap-2"
          onClick={() => router.push("/chat")}
        >
          <Plus size={14} />
          New conversation
        </Button>
      </SidebarHeader>

      {/* Chat List */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            {!session ? ( // Not logged in
              <div className="px-2 py-4 text-center">
                <p className="text-xs text-muted-foreground mb-3">
                  Sign in to save your conversations
                </p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </Button>
              </div>
            ) : (
              // Logged in — empty for now, we'll add real data next
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <MessageSquare size={14} />
                    <span>No conversations yet</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — user info */}
      <SidebarFooter>
        <div className="px-2 py-2">
          {session ? (
            <div className="flex items-center gap-2">
              {session.user.image && (
                <Image
                  width={40}
                  height={40}
                  src={session.user.image}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center">
              Not signed in
            </p>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Appsidebar;
