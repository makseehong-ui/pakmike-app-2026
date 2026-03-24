import React, { useState, useEffect } from "react";
import { 
  Home as HomeIcon, 
  LayoutGrid, 
  Settings, 
  User, 
  MessageSquare, 
  Image as ImageIcon, 
  Phone, 
  Shield, 
  Zap, 
  Wrench, 
  Lightbulb,
  MapPin,
  Clock,
  CircleDollarSign,
  ChevronRight,
  ExternalLink,
  Send,
  Loader2,
  Plus,
  Bell,
  Search,
  Facebook,
  Youtube,
  X,
  ZoomIn,
  ZoomOut,
  Calendar,
  Info,
  Users,
  Award,
  Target,
  History,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import { chatWithGemini, searchWithGemini, generateImageWithGemini } from "./lib/gemini";
import ReactMarkdown from "react-markdown";

// --- Components ---

const Footer = () => (
  <footer className="text-center space-y-4 py-12 border-t border-white/5 mt-8">
    <div className="flex justify-center gap-6">
      <a href="https://facebook.com/pakmiketechnology" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors">
        <Facebook size={20} />
      </a>
      <a href="https://youtube.com/@pakmiketechnology" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
        <Youtube size={20} />
      </a>
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-[10px]">© 2026 Pakmike Technology. All rights reserved.</p>
      <p className="text-gray-600 text-[9px]">Operating Hours: Mon - Sat, 9:00 AM - 6:00 PM</p>
    </div>
  </footer>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: "home", icon: HomeIcon, label: "Home" },
    { id: "products", icon: Shield, label: "Products" },
    { id: "gallery", icon: ImageIcon, label: "Gallery" },
    { id: "projects", icon: LayoutGrid, label: "Projects" },
    { id: "about", icon: Info, label: "About" },
    { id: "ai", icon: MessageSquare, label: "AI" },
    { id: "contact", icon: Phone, label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 flex items-center gap-8 z-50 shadow-2xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300",
            activeTab === tab.id ? "text-brand-blue scale-110" : "text-gray-400 hover:text-white"
          )}
        >
          <tab.icon size={20} />
          <span className="text-[10px] uppercase font-bold tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Header = () => (
  <header className="flex items-center justify-between px-6 py-4 fixed top-0 w-full z-40 bg-brand-dark/80 backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
        <Shield size={18} className="text-white" />
      </div>
      <span className="font-bold tracking-tight text-lg">Pakmike Technology</span>
    </div>
    <button className="bg-brand-blue hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors blue-glow">
      Call Now
    </button>
  </header>
);

// --- Screens ---

const HomeScreen = ({ setActiveTab }: { setActiveTab: (t: string) => void }) => {
  const services = [
    { icon: Shield, title: "CCTV Systems", desc: "Comamize CCTV security systems." },
    { icon: Zap, title: "Electrical Wiring", desc: "Electrical wiring and electrical wiring." },
    { icon: Wrench, title: "Maintenance", desc: "Manage and maintenance services." },
    { icon: Lightbulb, title: "Smart Solutions", desc: "We ootable smart solutions in smobox." },
  ];

  return (
    <div className="pt-24 pb-32 px-6 space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Building" 
          className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 space-y-4">
          <span className="text-brand-blue font-bold tracking-widest text-xs uppercase">Expert Solutions</span>
          <h1 className="text-4xl font-extrabold leading-tight max-w-[280px]">
            Expert Security & Electrical Services
          </h1>
          <p className="text-gray-300 text-sm max-w-[240px]">
            Trusted installations for homes and businesses across Penang.
          </p>
          <button className="bg-brand-blue w-fit px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-lg blue-glow">
            <Phone size={20} />
            0175162938
          </button>
        </div>
      </section>

      {/* Trusted Partners Banner */}
      <section className="glass-card p-4 flex items-center justify-between gap-4 bg-gradient-to-r from-brand-card to-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trusted Partners</span>
          <span className="text-sm font-bold">Authorized Partner</span>
        </div>
        <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
          <img src="https://www.hikvision.com/content/dam/hikvision/en/marketing/logo/hikvision-logo.png" alt="Hikvision" className="h-4" referrerPolicy="no-referrer" />
          <div className="w-px h-6 bg-white/10" />
          <img src="https://www.dahuasecurity.com/asset/upload/image/20180524/logo.png" alt="Dahua" className="h-4" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Services */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map((s, i) => (
            <div key={i} className="glass-card p-5 space-y-3 hover:border-brand-blue/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                <s.icon size={24} />
              </div>
              <h3 className="font-bold text-sm">{s.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Models */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Models</h2>
          <button onClick={() => setActiveTab("products")} className="text-brand-blue text-xs font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { brand: "HIKVISION", name: "ColorVu 4MP Dome", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop" },
            { brand: "DAHUA", name: "WizSense 5MP PTZ", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" },
          ].map((m, i) => (
            <div key={i} className="glass-card p-4 space-y-3 group cursor-pointer" onClick={() => setActiveTab("products")}>
              <div className="h-24 bg-brand-dark rounded-xl overflow-hidden">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-1">
                <p className={cn("text-[8px] font-bold uppercase tracking-widest", m.brand === "HIKVISION" ? "text-red-500" : "text-orange-500")}>{m.brand}</p>
                <h3 className="font-bold text-xs leading-tight">{m.name}</h3>
                <p className="text-[10px] text-gray-500">24/7 Full Color</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { icon: Shield, title: "Expert Solutions", desc: "We provide when you to detect and hums our services." },
            { icon: Clock, title: "24/7 Support", desc: "Our nextenow tomolens seit and teonthake vornnonir solutions." },
            { icon: CircleDollarSign, title: "Transparent Pricing", desc: "Transparent pricing are sible for transparent pricing." },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue shrink-0">
                <item.icon size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Featured Project</h2>
        <div className="glass-card overflow-hidden group cursor-pointer" onClick={() => setActiveTab("projects")}>
          <div className="h-48 relative">
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop" 
              alt="Industrial Warehouse Surveillance" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-brand-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
              Most Complex
            </div>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-brand-blue text-[10px] font-bold uppercase tracking-widest">Industrial Security</span>
              <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                <MapPin size={10} />
                Bayan Lepas, Penang
              </div>
            </div>
            <h3 className="text-xl font-bold leading-tight">Industrial Warehouse Surveillance System</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              A comprehensive 64-camera network with AI-powered intrusion detection and 24/7 remote monitoring for a major logistics hub.
            </p>
            <div className="flex items-center gap-2 text-brand-blue text-xs font-bold pt-2">
              View Full Case Study <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is ColorVu technology?", a: "ColorVu enables cameras to produce colorful videos even in extremely dimly lit environments by using advanced lenses and high-performance sensors." },
            { q: "Do you provide residential wiring?", a: "Yes, we provide full residential wiring services, including new installations, troubleshooting, and smart home integration." },
            { q: "Can I view footage remotely?", a: "Absolutely. We configure mobile app access so you can monitor your property in real-time from anywhere in the world." },
            { q: "What is the warranty period?", a: "Most Hikvision and Dahua products come with a 1-3 year manufacturer warranty, backed by our lifetime technical support." },
          ].map((faq, i) => (
            <div key={i} className="glass-card p-5 space-y-2">
              <h3 className="font-bold text-brand-blue text-sm flex items-center gap-2">
                <Lightbulb size={14} />
                {faq.q}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">What Our Clients Say</h2>
        <div className="space-y-4">
          {[
            { name: "Tan Ah Kow", rating: 5, comment: "Excellent service! The CCTV installation was neat and professional. Highly recommended for security needs in Penang." },
            { name: "Sarah Lim", rating: 5, comment: "Pakmike team fixed our office wiring issues quickly. Very knowledgeable and friendly technicians." },
            { name: "Rajesh Kumar", rating: 4, comment: "Good quality Hikvision cameras. The mobile app setup was smooth. Great after-sales support." },
          ].map((t, i) => (
            <div key={i} className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{t.name}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star 
                      key={starIdx} 
                      size={12} 
                      className={cn(starIdx < t.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600")} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 italic leading-relaxed">"{t.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Centres */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Service Centres</h2>
        <div className="grid grid-cols-1 gap-4">
          {["George Town", "Butterworth", "Bukit Mertajam"].map((city, i) => (
            <div key={i} className="glass-card p-4 relative overflow-hidden h-32 flex items-end">
              <img 
                src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop`} 
                alt={city} 
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{city}</h3>
                  <p className="text-xs text-gray-400">{city}, Penang</p>
                </div>
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shadow-lg">
                  <MapPin size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fast Help CTA */}
      <section className="bg-gradient-to-br from-blue-900 to-brand-dark p-8 rounded-3xl text-center space-y-6 border border-white/5">
        <h2 className="text-2xl font-bold">Need Help Fast?</h2>
        <button className="bg-white text-brand-dark px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
          Call 0175162938
        </button>
      </section>

      <Footer />
    </div>
  );
};

const ProductsScreen = () => {
  const [filter, setFilter] = useState("All Brands");
  const products = [
    { name: "ColorVu Turret", brand: "Hikvision", res: "4MP / 2K Res", night: "30m Color", lens: "Fixed", weather: "IP67", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop" },
    { name: "5MP WizSense PTZ", brand: "Dahua", res: "4MP / 2K Res", night: "30m Color", lens: "Fixed", weather: "IP67", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" },
    { name: "8MP AI Bullet", brand: "Hikvision", res: "4MP / 2K Res", night: "30m Color", lens: "Fixed", weather: "IP67", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop" },
    { name: "4MP Smart Dual Dome", brand: "Dahua", res: "4MP / 2K Res", night: "30m Color", lens: "Fixed", weather: "IP67", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" },
  ];

  const filtered = filter === "All Brands" ? products : products.filter(p => p.brand === filter);

  return (
    <div className="pt-24 pb-32 px-6 space-y-8">
      <div className="text-center space-y-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authorized Partner</p>
        <h1 className="text-3xl font-bold">Pakmike Technology</h1>
      </div>

      <div className="flex bg-brand-card p-1 rounded-2xl">
        {["All Brands", "Hikvision", "Dahua"].map((b) => (
          <button 
            key={b}
            onClick={() => setFilter(b)}
            className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", filter === b ? "bg-brand-blue text-white shadow-lg" : "text-gray-400")}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <div key={i} className="glass-card p-4 space-y-4">
            <div className="h-32 bg-brand-dark rounded-2xl overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-xs">{p.name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[8px] text-gray-400">
              <div className="flex items-center gap-1"><ImageIcon size={10} /> {p.res}</div>
              <div className="flex items-center gap-1"><Clock size={10} /> {p.night}</div>
              <div className="flex items-center gap-1"><Settings size={10} /> {p.lens}</div>
              <div className="flex items-center gap-1"><Shield size={10} /> {p.weather}</div>
            </div>
            <button className="w-full py-2 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white rounded-xl text-[10px] font-bold transition-all">
              Inquire
            </button>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 text-center space-y-4">
        <h3 className="font-bold">Need a custom quote?</h3>
        <button className="w-full py-3 bg-brand-blue rounded-2xl font-bold text-sm shadow-lg">Get Free Quote</button>
      </div>

      <Footer />
    </div>
  );
};

const GalleryScreen = () => {
  const [selectedImage, setSelectedImage] = useState<{ title: string, img: string } | null>(null);
  const [zoom, setZoom] = useState(1);

  const galleryItems = [
    { title: "CCTV Installation", desc: "High-definition surveillance for a retail store.", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop" },
    { title: "Smart Home Setup", desc: "Integrated lighting and security control.", img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop" },
    { title: "Industrial Wiring", desc: "Complex electrical panel for a factory.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop" },
    { title: "Solar Panel Integration", desc: "Sustainable energy solution for a villa.", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop" },
    { title: "Network Infrastructure", desc: "Robust data cabling for a corporate office.", img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop" },
    { title: "Access Control", desc: "Biometric security system implementation.", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="pt-24 pb-32 px-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Project Gallery</h1>
        <p className="text-gray-400 text-sm">A visual showcase of our recent work</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {galleryItems.map((item, i) => (
          <div 
            key={i} 
            className="glass-card overflow-hidden group cursor-pointer"
            onClick={() => {
              setSelectedImage(item);
              setZoom(1);
            }}
          >
            <div className="aspect-square relative">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <h3 className="text-xs font-bold text-white">{item.title}</h3>
                <p className="text-[8px] text-gray-300 line-clamp-2">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-6 right-6 flex gap-4">
              <button 
                onClick={() => setZoom(prev => Math.min(prev + 0.5, 3))}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ZoomIn size={24} />
              </button>
              <button 
                onClick={() => setZoom(prev => Math.max(prev - 0.5, 1))}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ZoomOut size={24} />
              </button>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="w-full max-w-2xl aspect-square overflow-hidden rounded-3xl relative">
              <motion.img 
                animate={{ scale: zoom }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={selectedImage.img} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-8 text-center space-y-2">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-400">Zoom: {Math.round(zoom * 100)}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const ProjectsScreen = () => {
  const projects = [
    { title: "Industrial Warehouse Surveillance", location: "Lagos, Nigeria", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop" },
    { title: "Corporate Office Power Grid", location: "Abuja, Nigeria", img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2000&auto=format&fit=crop" },
    { title: "Residential Smart Monitoring", location: "Lekki, Lagos", img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop" },
  ];

  return (
    <div className="pt-24 pb-32 px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Redesigned Projects Portfolio</h1>
        <p className="text-brand-blue font-bold text-xs uppercase tracking-widest">Pakmike Technology</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {["All", "CCTV", "Electrical Wiring", "Smart Home"].map((cat, i) => (
          <button key={i} className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border border-white/10",
            i === 0 ? "bg-brand-blue text-white" : "bg-brand-card text-gray-400"
          )}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <div key={i} className="glass-card overflow-hidden group cursor-pointer">
            <div className="h-48 relative">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-brand-blue text-[10px] font-bold uppercase tracking-widest">Case Study</span>
              <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <MapPin size={12} />
                {p.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

const AIScreen = () => {
  const [mode, setMode] = useState<"chat" | "image">("chat");
  const [topic, setTopic] = useState("General");
  const [messages, setMessages] = useState<{ role: "user" | "model", text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const topics = ["General", "CCTV", "Electrical", "Smart Home"];

  const handleChat = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: "user" as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Prepare context based on topic
    const topicContext = topic !== "General" ? `[Context: The user is asking about ${topic}] ` : "";
    const fullInput = topicContext + input;

    // Use search grounding for general queries if they seem like they need it
    const needsSearch = input.toLowerCase().includes("latest") || input.toLowerCase().includes("price") || input.toLowerCase().includes("news");
    
    let responseText = "";
    if (needsSearch) {
      const searchRes = await searchWithGemini(fullInput);
      responseText = searchRes.text;
    } else {
      const chatHistory = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      chatHistory.push({ role: "user", parts: [{ text: fullInput }] });
      responseText = await chatWithGemini(chatHistory) || "Error";
    }

    setMessages(prev => [...prev, { role: "model", text: responseText }]);
    setLoading(false);
  };

  const handleImageGen = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const url = await generateImageWithGemini(input);
    setGeneratedImage(url);
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-32 px-6 h-screen flex flex-col">
      <div className="flex bg-brand-card p-1 rounded-2xl mb-4">
        <button 
          onClick={() => setMode("chat")}
          className={cn("flex-1 py-2 rounded-xl text-sm font-bold transition-all", mode === "chat" ? "bg-brand-blue text-white shadow-lg" : "text-gray-400")}
        >
          Chat Assistant
        </button>
        <button 
          onClick={() => setMode("image")}
          className={cn("flex-1 py-2 rounded-xl text-sm font-bold transition-all", mode === "image" ? "bg-brand-blue text-white shadow-lg" : "text-gray-400")}
        >
          Image Generator
        </button>
      </div>

      {mode === "chat" && (
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap",
                topic === t ? "bg-brand-blue/20 border-brand-blue text-brand-blue" : "bg-brand-card border-white/5 text-gray-500"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-4">
        {mode === "chat" ? (
          <>
            {messages.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mx-auto">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-xl font-bold">How can I help you today?</h2>
                <p className="text-sm text-gray-400 max-w-[200px] mx-auto">Ask about CCTV installations, wiring quotes, or smart home tech.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                  m.role === "user" ? "bg-brand-blue text-white rounded-tr-none" : "glass-card rounded-tl-none"
                )}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass-card p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brand-blue" />
                  <span className="text-xs text-gray-400">Gemini is thinking...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">AI Image Generator</h2>
              <p className="text-sm text-gray-400">Describe the security setup or electrical plan you want to visualize.</p>
            </div>
            
            {generatedImage ? (
              <div className="glass-card overflow-hidden rounded-3xl group relative">
                <img src={generatedImage} alt="Generated" className="w-full aspect-square object-cover" />
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm hover:bg-black/80 transition-colors"
                >
                  <Plus className="rotate-45" size={20} />
                </button>
              </div>
            ) : (
              <div className="aspect-square glass-card flex flex-center items-center justify-center border-dashed border-2 border-white/10">
                <div className="text-center space-y-2 text-gray-500">
                  <ImageIcon size={48} className="mx-auto opacity-20" />
                  <p className="text-xs">Your generated image will appear here</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (mode === "chat" ? handleChat() : handleImageGen())}
          placeholder={mode === "chat" ? "Ask anything..." : "A futuristic CCTV camera..."}
          className="flex-1 bg-brand-card border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-colors"
        />
        <button 
          onClick={mode === "chat" ? handleChat : handleImageGen}
          disabled={loading || !input.trim()}
          className="bg-brand-blue p-3 rounded-2xl text-white disabled:opacity-50 transition-all active:scale-95"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </div>

      <Footer />
    </div>
  );
};

const AboutUsScreen = () => {
  const expertise = [
    { icon: Shield, title: "Certified Installers", desc: "Our team is fully certified by Hikvision and Dahua for professional security installations." },
    { icon: Zap, title: "Electrical Experts", desc: "Licensed electricians with over 10 years of experience in residential and commercial wiring." },
    { icon: Award, title: "Quality Guaranteed", desc: "We use only genuine products and provide a 1-year warranty on all our installation works." },
  ];

  return (
    <div className="pt-24 pb-32 px-6 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">About Pakmike Technology</h1>
        <p className="text-gray-400 text-sm">Your trusted partner in security and electrical solutions since 2014.</p>
      </section>

      <section className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3 text-brand-blue">
          <History size={24} />
          <h2 className="text-xl font-bold">Our History</h2>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          Founded in 2014 in Penang, Pakmike Technology started as a small electrical contracting firm. 
          Over the years, we recognized the growing need for integrated security solutions. 
          Today, we have grown into a leading provider of CCTV systems, smart home automation, 
          and comprehensive electrical services, serving thousands of satisfied customers across the region.
        </p>
      </section>

      <section className="glass-card p-6 space-y-4 bg-gradient-to-br from-brand-blue/10 to-transparent border-brand-blue/20">
        <div className="flex items-center gap-3 text-brand-blue">
          <Target size={24} />
          <h2 className="text-xl font-bold">Our Mission</h2>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed italic">
          "To provide peace of mind through innovative security technology and reliable electrical engineering, 
          ensuring every home and business in our community is safe, connected, and efficient."
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <Users size={24} className="text-brand-blue" />
          Team Expertise
        </h2>
        <div className="space-y-4">
          {expertise.map((item, i) => (
            <div key={i} className="glass-card p-5 flex gap-4 items-start">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon size={24} className="text-brand-blue" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto">
          <Award size={32} className="text-brand-blue" />
        </div>
        <h2 className="text-lg font-bold">Certified & Authorized</h2>
        <p className="text-xs text-gray-400">
          We are an authorized dealer and certified installer for major brands including 
          Hikvision, Dahua, and TP-Link VIGI.
        </p>
      </section>

      <Footer />
    </div>
  );
};

const ContactScreen = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [bookingData, setBookingData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    serviceType: "CCTV Installation", 
    dateTime: "" 
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingErrors, setBookingErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const validateInquiry = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBooking = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bookingData.name.trim()) newErrors.name = "Full Name is required";
    if (!bookingData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!bookingData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!bookingData.dateTime.trim()) newErrors.dateTime = "Preferred Date/Time is required";
    
    setBookingErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = async () => {
    if (!validateInquiry()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleBookingSubmit = async () => {
    if (!validateBooking()) return;

    setIsBookingSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBookingSubmitting(false);
    setIsBookingSuccess(true);
    setBookingData({ 
      name: "", 
      phone: "", 
      email: "", 
      serviceType: "CCTV Installation", 
      dateTime: "" 
    });
    setTimeout(() => setIsBookingSuccess(false), 5000);
  };

  return (
    <div className="pt-24 pb-32 px-6 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Contact & Service Centres</h1>
        <p className="text-gray-400 text-sm">We're here to help you 24/7</p>
      </div>

      <div className="glass-card p-6 flex items-center justify-between bg-gradient-to-r from-brand-card to-blue-900/20">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Call Our Support Line</p>
            <p className="text-2xl font-bold">017-5162938</p>
          </div>
          <button className="bg-brand-blue px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-sm">
            <Phone size={16} />
            CALL NOW
          </button>
        </div>
        <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
          <User size={40} className="text-brand-blue" />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Book a Professional Service</h2>
        {isBookingSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-2xl text-green-400 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Shield size={16} />
            Booking request received! We will contact you to confirm the schedule.
          </div>
        )}
        <div className="glass-card p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Service Type</label>
            <select 
              value={bookingData.serviceType}
              onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
              className="w-full bg-brand-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all appearance-none"
            >
              <option>CCTV Installation</option>
              <option>Electrical Wiring</option>
              <option>Smart Home Setup</option>
              <option>Maintenance & Repair</option>
              <option>Security Audit</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Preferred Date & Time</label>
              <div className="relative">
                <input 
                  type="datetime-local"
                  value={bookingData.dateTime}
                  onChange={(e) => setBookingData({ ...bookingData, dateTime: e.target.value })}
                  className={cn(
                    "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all",
                    bookingErrors.dateTime ? "border-red-500/50" : "border-white/10"
                  )} 
                />
              </div>
              {bookingErrors.dateTime && <p className="text-[9px] text-red-500 ml-2 font-bold">{bookingErrors.dateTime}</p>}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <p className="text-xs font-bold text-brand-blue uppercase tracking-widest ml-2">Contact Information</p>
            <div className="space-y-1">
              <input 
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                placeholder="Full Name" 
                className={cn(
                  "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all",
                  bookingErrors.name ? "border-red-500/50" : "border-white/10"
                )} 
              />
              {bookingErrors.name && <p className="text-[9px] text-red-500 ml-2 font-bold">{bookingErrors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <input 
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  placeholder="Phone Number" 
                  className={cn(
                    "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all",
                    bookingErrors.phone ? "border-red-500/50" : "border-white/10"
                  )} 
                />
                {bookingErrors.phone && <p className="text-[9px] text-red-500 ml-2 font-bold">{bookingErrors.phone}</p>}
              </div>
              <div className="space-y-1">
                <input 
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  placeholder="Email Address" 
                  className={cn(
                    "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all",
                    bookingErrors.email ? "border-red-500/50" : "border-white/10"
                  )} 
                />
                {bookingErrors.email && <p className="text-[9px] text-red-500 ml-2 font-bold">{bookingErrors.email}</p>}
              </div>
            </div>
          </div>

          <button 
            onClick={handleBookingSubmit}
            disabled={isBookingSubmitting}
            className="w-full py-4 bg-brand-blue rounded-2xl font-bold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {isBookingSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                BOOKING...
              </>
            ) : (
              <>
                <Calendar size={18} />
                Book Service Now
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Authorised Products Sales & Service Centres</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { name: "George Town Center", addr: "Jalan Zainul Abidl, George Town, 10400 George Town, Pulau Pinang" },
            { name: "Butterworth Center", addr: "Jalan Perai Jaya 6, Butterworth, 13700 Perai, Pulau Pinang" },
            { name: "Bukit Mertajam Center", addr: "Taman Juru, 14000 Bukit Mertajam, Pulau Pinang" },
          ].map((c, i) => (
            <div key={i} className="glass-card p-5 space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-16 bg-brand-dark rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm">{c.name}</h3>
                  <p className="text-[10px] text-gray-400 leading-tight">{c.addr}</p>
                </div>
              </div>
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                <MapPin size={14} className="text-brand-blue" />
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Send us an Inquiry</h2>
        {isSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-2xl text-green-400 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Shield size={16} />
            Your inquiry has been sent successfully! We'll get back to you soon.
          </div>
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Full Name</label>
              <input 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe" 
                className={cn(
                  "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all",
                  errors.name ? "border-red-500/50" : "border-white/10"
                )} 
              />
              {errors.name && <p className="text-[9px] text-red-500 ml-2 font-bold">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Email Address</label>
              <input 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com" 
                className={cn(
                  "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all",
                  errors.email ? "border-red-500/50" : "border-white/10"
                )} 
              />
              {errors.email && <p className="text-[9px] text-red-500 ml-2 font-bold">{errors.email}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Message</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4} 
              placeholder="How can we help you today?" 
              className={cn(
                "w-full bg-brand-card border rounded-xl px-4 py-3 text-sm focus:border-brand-blue outline-none resize-none transition-all",
                errors.message ? "border-red-500/50" : "border-white/10"
              )} 
            />
            {errors.message && <p className="text-[9px] text-red-500 ml-2 font-bold">{errors.message}</p>}
          </div>
          <button 
            onClick={handleInquirySubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-brand-blue to-blue-600 rounded-2xl font-bold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                SENDING...
              </>
            ) : (
              "Send Inquiry"
            )}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-blue/30">
      <Header />
      
      <main className="max-w-md mx-auto relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && <HomeScreen setActiveTab={setActiveTab} />}
            {activeTab === "products" && <ProductsScreen />}
            {activeTab === "gallery" && <GalleryScreen />}
            {activeTab === "projects" && <ProjectsScreen />}
            {activeTab === "about" && <AboutUsScreen />}
            {activeTab === "ai" && <AIScreen />}
            {activeTab === "contact" && <ContactScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
