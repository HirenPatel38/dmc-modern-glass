import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ShieldCheck,
  Award,
  Users,
  Bath,
  ParkingCircle,
  Dumbbell,
  Leaf,
  Quote,
  BedDouble,
  Maximize,
  Eye,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Link } from "react-router";

/* ──────────────────────────────────────────────────────────────
   NAVBAR
   ────────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useState(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white font-bold text-lg tracking-tight">
            D
          </div>
          <span className="text-xl font-bold tracking-tight">
            DMC{" "}
            <span className="font-light text-navy-600">Hospitality</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/40"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+1800123456"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
          >
            <Phone className="w-4 h-4" />
            +1 800-123-456
          </a>
          <Link
            to="/auth"
            className="glass-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg glass"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass-strong mt-2 mx-4 rounded-2xl p-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-black/5 mt-2 pt-2 flex flex-col gap-2">
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="glass-btn px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────
   ROOMS DATA
   ────────────────────────────────────────────────────────────── */
export const rooms = [
  {
    id: "deluxe-suite",
    name: "Deluxe Suite",
    description: "Spacious living area with panoramic views, marble bathroom, and curated furnishings designed for comfort and elegance.",
    price: 289,
    rating: 4.9,
    reviews: 124,
    capacity: 2,
    size: "52 m²",
    gradient: "room-gradient-1",
    amenities: ["King Bed", "City View", "Rain Shower", "Mini Bar", "Wi-Fi"],
    category: "Suite",
    featured: true,
  },
  {
    id: "executive-room",
    name: "Executive Room",
    description: "Refined workspace meets restful retreat — ideal for the discerning traveler who values both productivity and relaxation.",
    price: 199,
    rating: 4.8,
    reviews: 98,
    capacity: 2,
    size: "38 m²",
    gradient: "room-gradient-2",
    amenities: ["Queen Bed", "Work Desk", "Coffee Maker", "Wi-Fi", "Safe"],
    category: "Room",
    featured: true,
  },
  {
    id: "premium-family",
    name: "Premium Family",
    description: "Generous space for the whole family with connecting rooms, child-friendly amenities, and thoughtful touches throughout.",
    price: 349,
    rating: 4.9,
    reviews: 87,
    capacity: 4,
    size: "65 m²",
    gradient: "room-gradient-3",
    amenities: ["2 Queen Beds", "Sofa Bed", "Bathtub", "Mini Fridge", "Wi-Fi"],
    category: "Suite",
    featured: true,
  },
  {
    id: "penthouse",
    name: "The Penthouse",
    description: "Our finest accommodation — a private rooftop retreat with expansive terrace, butler service, and unobstructed skyline views.",
    price: 599,
    rating: 5.0,
    reviews: 42,
    capacity: 2,
    size: "110 m²",
    gradient: "room-gradient-4",
    amenities: ["King Bed", "Private Terrace", "Butler Service", "Jacuzzi", "Wi-Fi"],
    category: "Penthouse",
    featured: false,
  },
  {
    id: "garden-view",
    name: "Garden View Room",
    description: "A serene escape overlooking our landscaped gardens — natural light, organic textures, and a private balcony.",
    price: 179,
    rating: 4.7,
    reviews: 156,
    capacity: 2,
    size: "34 m²",
    gradient: "room-gradient-5",
    amenities: ["Queen Bed", "Garden View", "Balcony", "Coffee Maker", "Wi-Fi"],
    category: "Room",
    featured: false,
  },
  {
    id: "accessible-suite",
    name: "Accessible Suite",
    description: "Fully accessible luxury with wide doorways, roll-in shower, grab bars, and all the premium amenities you expect.",
    price: 229,
    rating: 4.8,
    reviews: 63,
    capacity: 2,
    size: "44 m²",
    gradient: "room-gradient-1",
    amenities: ["Queen Bed", "Roll-in Shower", "Grab Bars", "Smart Controls", "Wi-Fi"],
    category: "Suite",
    featured: false,
  },
];

/* ──────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Gradient Orbs */}
      <div className="hero-orb-1 -top-40 -left-40" />
      <div className="hero-orb-2 top-1/3 right-0" />
      <div className="hero-orb-3 bottom-20 left-1/3" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-navy-800 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Five-Star Hospitality Since 2001
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-navy-900">
              Where Every Stay{" "}
              <span className="shimmer-text">Becomes a Memory</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              DMC Hospitality delivers an experience defined by understated luxury, impeccable service,
              and spaces crafted for the modern traveler who values both comfort and character.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="glass-btn-gold px-7 py-3.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2 relative pulse-ring"
              >
                Explore Rooms
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#rooms"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold glass inline-flex items-center gap-2 hover:bg-white/70 transition-all text-navy-800"
              >
                View Gallery
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              {[
                { icon: ShieldCheck, text: "AAA Five Diamond" },
                { icon: Award, text: "23 Years of Excellence" },
                { icon: Star, text: "4.9 Guest Rating" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <badge.icon className="w-4 h-4 text-navy-800" />
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-navy-200/30 animate-[spin_50s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-navy-100/20" />

              {/* Main circle */}
              <div className="absolute inset-8 glass-strong rounded-full flex items-center justify-center">
                <div className="text-center">
                  <BedDouble className="w-20 h-20 text-navy-800 mx-auto float-animation" />
                  <p className="mt-4 font-bold text-2xl text-navy-900">DMC</p>
                  <p className="text-sm text-muted-foreground">Hospitality</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 right-4 glass-card rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-900">4.9 / 5.0</p>
                    <p className="text-[10px] text-muted-foreground">Guest Rating</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 -left-2 glass-card rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center">
                    <Award className="w-4 h-4 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-900">Top Rated</p>
                    <p className="text-[10px] text-muted-foreground">2024 Travel Awards</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-2 right-8 glass-card rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-900">50,000+</p>
                    <p className="text-[10px] text-muted-foreground">Happy Guests</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURED ROOMS
   ────────────────────────────────────────────────────────────── */
function FeaturedRooms() {
  const sectionRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const featured = rooms.filter((r) => r.featured);

  return (
    <section id="rooms" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-navy-900/5 text-navy-800 mb-4">
            Accommodations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
            Curated <span className="shimmer-text">Rooms & Suites</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Each space has been designed with intention — natural materials, considered lighting,
            and details that reward attention.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {featured.map((room) => (
            <Link key={room.id} to={`/room/${room.id}`}>
              <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer">
                {/* Image placeholder */}
                <div className={`h-52 ${room.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent" />
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-semibold text-navy-900">
                    {room.category}
                  </div>
                  <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-navy-900" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                      <span className="text-sm font-semibold">{room.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5" /> {room.capacity} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5" /> {room.size}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-navy-900">
                      ${room.price}
                      <span className="text-xs font-normal text-muted-foreground"> / night</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/catalog"
            className="glass px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/70 transition-all text-navy-800"
          >
            View All Rooms <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   ABOUT
   ────────────────────────────────────────────────────────────── */
function About() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-navy-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Visual */}
          <div ref={leftRef} className="reveal-left relative">
            <div className="glass-strong rounded-3xl p-8 relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Luxury Suites", value: "120+", icon: BedDouble },
                  { label: "Team Members", value: "300+", icon: Users },
                  { label: "Guest Satisfaction", value: "99%", icon: Star },
                  { label: "Years of Service", value: "23+", icon: Award },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass-card rounded-2xl p-5 text-center group"
                  >
                    <stat.icon className="w-8 h-8 text-navy-800 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Content */}
          <div ref={rightRef} className="reveal-right">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-navy-900/5 text-navy-800 mb-4">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
              A Legacy of{" "}
              <span className="shimmer-text">Thoughtful Hospitality</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Since 2001, DMC Hospitality has set the standard for what luxury means in the modern era.
              We believe true hospitality is invisible — it anticipates rather than reacts.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team of 300 hospitality professionals shares a single philosophy: every guest
              deserves to feel that their stay was designed with them in mind.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Sustainably designed with LEED Gold certification",
                "On-site fine dining by Michelin-recognized chef",
                "Private concierge and curated local experiences",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-navy-900/5 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-navy-800" />
                  </div>
                  <span className="text-sm font-medium text-navy-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                to="/catalog"
                className="glass-btn-gold px-6 py-3 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                Book a Stay <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+1800123456"
                className="glass px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/70 transition-all text-navy-800"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   STATS BAR
   ────────────────────────────────────────────────────────────── */
const statItems = [
  { label: "Guests Hosted", value: "50,000+" },
  { label: "Luxury Suites", value: "120+" },
  { label: "Guest Rating", value: "4.9" },
  { label: "Years of Service", value: "23+" },
];

function Stats() {
  const ref = useScrollReveal();

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="reveal-scale glass-strong rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {statItems.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-navy-900">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   EXPERIENCE / AMENITIES
   ────────────────────────────────────────────────────────────── */
const experiences = [
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    desc: "Seasonal menus crafted by our Michelin-recognized chef, featuring locally sourced ingredients and an award-winning wine collection.",
  },
  {
    icon: Bath,
    title: "Wellness & Spa",
    desc: "A full-service spa offering therapeutic treatments, heated pools, sauna, and personalized wellness programs.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    desc: "State-of-the-art equipment, personal training, and daily yoga sessions in a space designed to inspire movement.",
  },
  {
    icon: Leaf,
    title: "Rooftop Garden",
    desc: "A tranquil green space above the city skyline — perfect for morning meditation or an evening cocktail.",
  },
  {
    icon: Coffee,
    title: "Artisan Café",
    desc: "Specialty coffee, fresh pastries, and a curated selection of teas served in a relaxed, light-filled environment.",
  },
  {
    icon: ParkingCircle,
    title: "Valet & Parking",
    desc: "Complimentary valet service and secure underground parking available to all guests around the clock.",
  },
];

function Experience() {
  const sectionRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gold-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={sectionRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-navy-900/5 text-navy-800 mb-4">
            The Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
            Beyond the <span className="shimmer-text">Room Itself</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            True luxury is found in the details — from the moment you arrive to the moment you leave,
            every touchpoint has been considered.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.title} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-7 group cursor-pointer">
      <div className="w-14 h-14 rounded-2xl bg-navy-900/5 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-navy-900 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="w-7 h-7 text-navy-800 transition-colors duration-300 group-hover:text-white" />
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIALS
   ────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Victoria Chen",
    role: "Business Traveler",
    text: "DMC Hospitality understands what it means to be away from home. Every detail — from the thread count to the turn-down service — feels intentional and deeply personal.",
    rating: 5,
    initials: "VC",
  },
  {
    name: "James Harrington",
    role: "Leisure Guest",
    text: "We celebrated our anniversary here and it exceeded every expectation. The rooftop dinner, the spa, the room itself — everything was flawless. We will be back.",
    rating: 5,
    initials: "JH",
  },
  {
    name: "Anika Sharma",
    role: "Family Vacation",
    text: "Traveling with kids can be stressful, but DMC made it effortless. The family suite was beautiful, the staff was incredibly welcoming, and our children loved the gardens.",
    rating: 5,
    initials: "AS",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useScrollReveal();

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="reviews" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-navy-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={sectionRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-navy-900/5 text-navy-800 mb-4">
            Guest Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
            What Our <span className="shimmer-text">Guests Say</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="glass-strong rounded-3xl p-10 sm:p-12 text-center relative overflow-hidden">
            <Quote className="w-10 h-10 text-navy-200 mx-auto mb-6" />

            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>

              <p className="text-lg leading-relaxed text-foreground/80 italic">
                "{testimonials[current].text}"
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[current].initials}
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-navy-900">{testimonials[current].name}</p>
                  <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/70 transition-all hidden sm:flex"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-navy-800" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/70 transition-all hidden sm:flex"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-navy-800" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-navy-900 w-8"
                    : "bg-navy-900/15 w-2.5 hover:bg-navy-900/30"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CTA
   ────────────────────────────────────────────────────────────── */
function CTA() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="reveal-scale glass-strong rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-navy-100/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold-100/30 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
              Begin Your <span className="shimmer-text">Next Chapter</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Whether you are planning a weekend escape, a business trip, or a once-in-a-lifetime
              celebration — your table is set and your suite awaits.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/auth"
                className="glass-btn-gold px-8 py-4 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2 relative pulse-ring"
              >
                Reserve Your Stay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+1800123456"
                className="glass px-8 py-4 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/70 transition-all text-navy-800"
              >
                <Phone className="w-4 h-4" />
                +1 800-123-456
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: Clock, text: "Front Desk: 24 Hours" },
                { icon: MapPin, text: "456 Grand Avenue, Downtown" },
                { icon: Mail, text: "reservations@dmchospitality.com" },
              ].map((pill) => (
                <div
                  key={pill.text}
                  className="glass px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 text-navy-700"
                >
                  <pill.icon className="w-3.5 h-3.5 text-gold-500" />
                  {pill.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────────── */
const footerLinks = {
  Rooms: [
    "Deluxe Suite",
    "Executive Room",
    "Premium Family",
    "The Penthouse",
    "Garden View",
    "Accessible Suite",
  ],
  Company: [
    "Our Story",
    "Leadership",
    "Careers",
    "Press",
    "Sustainability",
  ],
  "Guest Services": [
    "Reservations",
    "Concierge",
    "Dining",
    "Spa & Wellness",
    "Events & Meetings",
  ],
};

function Footer() {
  return (
    <footer className="pt-20 pb-8 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white font-bold text-lg tracking-tight">
                D
              </div>
              <span className="text-xl font-bold tracking-tight text-navy-900">
                DMC <span className="font-light text-navy-600">Hospitality</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Five-star hospitality designed around you — where understated luxury
              meets genuine warmth, and every detail serves a purpose.
            </p>

            <div className="mt-6 space-y-2">
              <a
                href="tel:+1800123456"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" /> +1 800-123-456
              </a>
              <a
                href="mailto:reservations@dmchospitality.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" /> reservations@dmchospitality.com
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" /> 456 Grand Avenue, Downtown
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm text-navy-900 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DMC Hospitality. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   LANDING PAGE
   ────────────────────────────────────────────────────────────── */
export default function Landing() {
  return (
    <div className="min-h-screen">
      <CursorGlow />
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <FeaturedRooms />
      <div className="section-divider" />
      <About />
      <Stats />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
