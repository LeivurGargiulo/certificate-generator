import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tag, Menu, Home, Plus, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Inicio", icon: Home },
    { path: "/generar", label: "Generar Certificado", icon: Plus },
    { path: "/dashboard", label: "Panel de Control", icon: BarChart3 },
  ];

  const NavLink = ({ path, label, icon: Icon, mobile = false }: any) => (
    <Link href={path}>
      <Button
        variant={location === path ? "default" : "ghost"}
        className={cn(
          "justify-start",
          mobile ? "w-full" : "",
          location === path && "bg-primary text-primary-foreground"
        )}
        onClick={() => mobile && setIsOpen(false)}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-2 text-xl font-bold text-slate-900">
                <Tag className="h-6 w-6 text-primary" />
                <span>CertifiApp</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <NavLink key={item.path} {...item} mobile />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
