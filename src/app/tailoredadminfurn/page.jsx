"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import FaqManager from "@/components/admin/FaqManager";
import AdminUserManager from "@/components/admin/AdminUserManager";
import AdminReviewManager from "@/components/admin/AdminReviewManager";
import {
  Users,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Loader2,
  Lock,
  MessageCircleIcon,
  PanelLeftClose,
  PanelLeftOpen,
  PenBoxIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import AdminCommissionsManager from "@/components/admin/AdminCommissionsManager";
import AdminGalleryManager from "@/components/admin/AdminGalleryManager";
import AdminOrdersManager from "@/components/admin/AdminOrdersManager";
import AdminHeroManager from "@/components/admin/AdminHeroManager";

// Updated to ensure your administrative identity is authenticated cleanly
const ADMIN_EMAILS = ["omoefe051@gmail.com", "tailoredfurnitures@gmail.com"];

const AdminPortal = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState("users"); // Adjusted fallback view to match valid menu keys
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = ADMIN_EMAILS.includes(user.email);
        setAuthorized(isAdmin);
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  // Neat initial authorization validation state screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="space-y-4 text-center">
          <Loader2 className="animate-spin text-primary mx-auto" size={32} />
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground animate-pulse">
            Verifying Authority
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#04342c] p-4 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Lock className="text-red-600" size={32} />
        </div>
        <h1 className="text-3xl font-body font-black uppercase tracking-tight mb-2">
          Access Denied
        </h1>
        <p className="text-muted-foreground max-w-sm font-body mb-8">
          This area is restricted to the primary administrator.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-white border border-border rounded-xl font-bold text-sm"
          >
            Return Home
          </Link>
          <button onClick={handleLogout} className="btn-brand px-8 py-3">
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      id: "users",
      label: "User Mgt",
      icon: <Users size={20} />,
      sub: "Manage Users",
    },
    {
      id: "gallery",
      label: "Gallery Mgt",
      icon: <PenBoxIcon size={20} />,
      sub: "Manage Gallery Content",
    },
    {
      id: "commissions",
      label: "Commission Mgt",
      icon: <Users size={20} />,
      sub: "Manage Commissions",
    },
    {
      id: "orders",
      label: "Order Mgt",
      icon: <Users size={20} />,
      sub: "Manage Orders",
    },
    {
      id: "hero-art",
      label: "Hero ArtWork",
      icon: <StarIcon size={20} />,
      sub: "Manage Hero Art",
    },
    {
      id: "faqs",
      label: "FAQ Mgt",
      icon: <HelpCircle size={20} />,
      sub: "Website FAQs",
    },
    {
      id: "testimonials",
      label: "Reviews Mgt",
      icon: <MessageCircleIcon size={20} />,
      sub: "Manage reviews from clients",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0d8a75] flex transition-all duration-300 ease-in-out">
      {/* Admin Sidebar */}
      <aside
        className={`bg-white dark:bg-[#04342c] border-r border-border flex flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden z-30 ${
          isSidebarOpen ? "w-80 p-8 opacity-100" : "w-0 p-0 opacity-0"
        }`}
      >
        <div className="mb-12 whitespace-nowrap">
          <Link
            href="/"
            className="font-body font-black text-2xl tracking-tighter block"
          >
            Admin<span className="text-primary ml-2">Panel</span>
          </Link>
          <div className="flex items-center gap-2 mt-2 bg-green-50 w-fit px-2 py-1 rounded-md">
            <ShieldCheck size={12} className="text-green-600" />
            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">
              Root Admin
            </p>
          </div>
        </div>

        <nav className="space-y-3 flex-1 whitespace-nowrap">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                activeView === item.id
                  ? "bg-primary text-white shadow-xl shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${activeView === item.id ? "text-white" : "text-primary"}`}
                >
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-black uppercase tracking-tight leading-none">
                    {item.label}
                  </p>
                  <p
                    className={`text-[10px] mt-1 font-medium ${activeView === item.id ? "text-white/70" : "text-muted-foreground"}`}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className={
                  activeView === item.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 transition-opacity"
                }
              />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Toggle Bar / Sub Menu Bar */}
        <header className="h-16 border-b border-border bg-white dark:bg-[#04342c] flex items-center px-6 justify-between shrink-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-primary flex items-center gap-2"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={22} />
            ) : (
              <PanelLeftOpen size={22} />
            )}
            {!isSidebarOpen && (
              <span className="font-body font-black text-sm tracking-tighter uppercase">
                Menu
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Active Database
              </p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          <div
            className={`mx-auto transition-all duration-500 ${isSidebarOpen ? "max-w-5xl" : "max-w-7xl"}`}
          >
            <div className="mb-10 animate-in fade-in slide-in-from-left-4 dark:text-white">
              <h2 className="text-4xl font-body font-black uppercase tracking-tight">
                {menuItems.find((m) => m.id === activeView)?.label}
              </h2>
              <p className="text-muted-foreground mt-2 font-body text-lg dark:text-white">
                {activeView === "users" && "View and manage all users."}
                {activeView === "gallery" &&
                  "Manage gallery content and artwork entries."}
                {activeView === "orders" && "View and manage customer orders."}
                {activeView === "commissions" &&
                  "Manage custom commission requests."}
                {activeView === "hero-art" && "Manage Hero Art."}
                {activeView === "faqs" && "Manage help section content."}
                {activeView === "testimonials" && "Manage testimonials."}
              </p>
            </div>

            <div className="animate-in fade-in duration-700 pb-12">
              {activeView === "users" && <AdminUserManager />}
              {activeView === "gallery" && <AdminGalleryManager />}
              {activeView === "orders" && <AdminOrdersManager />}
              {activeView === "hero-art" && <AdminHeroManager />}
              {activeView === "faqs" && <FaqManager />}
              {activeView === "testimonials" && <AdminReviewManager />}
              {activeView === "commissions" && <AdminCommissionsManager />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;
