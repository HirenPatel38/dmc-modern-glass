import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartPulse,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Ambulance,
  Clock,
  Phone,
  MapPin,
  Star,
  ShieldCheck,
  Users,
  Award,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect, type ComponentType } from "react";
import { Link } from "react-router";

/* ──────────────────────────────────────────────────────────────
   NAVBAR
   ────────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Doctors", href: "#doctors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl glass-btn flex items-center justify-center text-white font-bold text-lg">
            D
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">DMC</span>{" "}
            <span className="text-foreground/70">Hospital</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/40"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+1800123456"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            Emergency
          </a>
          <Link
            to="/auth"
            className="glass-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
          >
            Book Appointment
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
          exit={{ opacity: 0, y: -10 }}
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
          <div className="border-t border-white/30 mt-2 pt-2 flex flex-col gap-2">
            <a
              href="tel:+1800123456"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary"
            >
              <Phone className="w-4 h-4" />
              Emergency: +1 800-123-456
            </a>
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="glass-btn px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
            >
              Book Appointment
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

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
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 50,000+ Patients
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Your Health,{" "}
              <span className="shimmer-text">Our Priority</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              DMC Hospital delivers world-class healthcare with cutting-edge technology,
              compassionate specialists, and personalized treatment plans — all under one roof.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/auth"
                className="glass-btn px-7 py-3.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2 relative pulse-ring"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#services"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold glass inline-flex items-center gap-2 hover:bg-white/70 transition-all"
              >
                Explore Services
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              {[
                { icon: ShieldCheck, text: "NABH Accredited" },
                { icon: Award, text: "25+ Years" },
                { icon: Users, text: "200+ Doctors" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <badge.icon className="w-4 h-4 text-primary" />
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
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-primary/5" />

              {/* Main circle */}
              <div className="absolute inset-8 glass-strong rounded-full flex items-center justify-center">
                <div className="text-center">
                  <HeartPulse className="w-20 h-20 text-primary mx-auto float-animation" />
                  <p className="mt-4 font-bold text-2xl text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Emergency Care</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 right-4 glass-card rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Dr. Smith</p>
                    <p className="text-[10px] text-muted-foreground">Cardiology</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 -left-2 glass-card rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">98.7%</p>
                    <p className="text-[10px] text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-2 right-8 glass-card rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">4.9 / 5.0</p>
                    <p className="text-[10px] text-muted-foreground">Patient Rating</p>
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
   SERVICES
   ────────────────────────────────────────────────────────────── */
const services = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    desc: "Advanced cardiac care with state-of-the-art catheterization labs and experienced cardiologists.",
    color: "bg-rose-50 text-rose-500",
    accent: "from-rose-500/10 to-transparent",
  },
  {
    icon: Brain,
    title: "Neurology",
    desc: "Comprehensive neurological diagnostics and treatment for brain, spine, and nerve conditions.",
    color: "bg-violet-50 text-violet-500",
    accent: "from-violet-500/10 to-transparent",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    desc: "Expert eye care from routine exams to advanced surgical procedures with modern laser tech.",
    color: "bg-sky-50 text-sky-500",
    accent: "from-sky-500/10 to-transparent",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    desc: "Specialized bone and joint care including joint replacements, sports medicine, and rehabilitation.",
    color: "bg-amber-50 text-amber-600",
    accent: "from-amber-500/10 to-transparent",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    desc: "Compassionate healthcare for children from newborns to adolescents in a child-friendly environment.",
    color: "bg-teal-50 text-teal-600",
    accent: "from-teal-500/10 to-transparent",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    desc: "Primary care for adults covering prevention, diagnosis, and treatment of common health conditions.",
    color: "bg-emerald-50 text-emerald-600",
    accent: "from-emerald-500/10 to-transparent",
  },
];

function Services() {
  const sectionRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={sectionRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            World-Class{" "}
            <span className="shimmer-text">Medical Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Equipped with the latest technology and staffed by renowned specialists,
            DMC Hospital provides comprehensive healthcare across every major discipline.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  color,
  accent,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
  accent: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-7 group cursor-pointer relative overflow-hidden">
      {/* Hover gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
          Learn More <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
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
      {/* Background orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Visual */}
          <div ref={leftRef} className="reveal-left relative">
            <div className="glass-strong rounded-3xl p-8 relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Bed Capacity", value: "500+", icon: HeartPulse },
                  { label: "Departments", value: "30+", icon: Stethoscope },
                  { label: "Operations / Year", value: "10,000+", icon: Brain },
                  { label: "Emergency Cases", value: "24/7", icon: Ambulance },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass-card rounded-2xl p-5 text-center group"
                  >
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Content */}
          <div ref={rightRef} className="reveal-right">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
              About DMC Hospital
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Healing With{" "}
              <span className="shimmer-text">Compassion & Innovation</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded over 25 years ago, DMC Hospital has grown from a small clinic into one of the
              region's most trusted healthcare institutions. We combine advanced medical technology
              with a deeply human approach to care.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team of 200+ board-certified physicians, surgeons, and specialists work
              collaboratively to deliver treatment plans tailored to each patient's unique needs.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "NABH & JCI accredited facility",
                "24/7 emergency & trauma center",
                "Advanced robotic surgery suite",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                to="/auth"
                className="glass-btn px-6 py-3 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+1800123456"
                className="glass px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/70 transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
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
const stats = [
  { label: "Patients Treated", value: "50,000+", suffix: "" },
  { label: "Expert Doctors", value: "200+", suffix: "" },
  { label: "Success Rate", value: "98.7", suffix: "%" },
  { label: "Years of Service", value: "25", suffix: "+" },
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
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-primary">
                {stat.value}
                <span className="text-primary/60">{stat.suffix}</span>
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
   DOCTORS
   ────────────────────────────────────────────────────────────── */
const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    spec: "Cardiologist",
    rating: 4.9,
    reviews: 312,
    initials: "SM",
    color: "from-teal-400 to-sky-400",
  },
  {
    name: "Dr. James Chen",
    spec: "Neurologist",
    rating: 4.8,
    reviews: 287,
    initials: "JC",
    color: "from-violet-400 to-purple-400",
  },
  {
    name: "Dr. Emily Ross",
    spec: "Pediatrician",
    rating: 4.9,
    reviews: 445,
    initials: "ER",
    color: "from-rose-400 to-pink-400",
  },
  {
    name: "Dr. Michael Park",
    spec: "Orthopedic Surgeon",
    rating: 4.7,
    reviews: 198,
    initials: "MP",
    color: "from-amber-400 to-orange-400",
  },
];

function Doctors() {
  const sectionRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="doctors" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={sectionRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Meet Our <span className="shimmer-text">Expert Doctors</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our team of highly qualified physicians bring decades of combined experience
            and a commitment to exceptional patient outcomes.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
            >
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${doc.color} mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold transition-transform duration-300 group-hover:scale-110`}
              >
                {doc.initials}
              </div>
              <h3 className="font-bold text-base">{doc.name}</h3>
              <p className="text-sm text-primary font-medium">{doc.spec}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold">{doc.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({doc.reviews} reviews)
                </span>
              </div>
              <Link
                to="/auth"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Book Consultation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIALS
   ────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Cardiac Patient",
    text: "The care I received at DMC Hospital was exceptional. Dr. Mitchell and her team made me feel safe throughout my entire cardiac procedure. The facilities are world-class.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Robert Williams",
    role: "Orthopedic Patient",
    text: "After my knee replacement, the recovery program was outstanding. The physiotherapy team was incredibly supportive and I was back on my feet in weeks.",
    rating: 5,
    initials: "RW",
  },
  {
    name: "Ananya Patel",
    role: "Pediatric Care",
    text: "DMC Hospital's pediatric wing made my daughter's hospital stay so much easier. The staff is warm, the rooms are child-friendly, and the doctors are very patient.",
    rating: 5,
    initials: "AP",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useScrollReveal();

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={sectionRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What Our <span className="shimmer-text">Patients Say</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-3xl p-10 text-center"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-lg leading-relaxed text-foreground/80 italic">
              "{testimonials[current].text}"
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center text-white font-bold">
                {testimonials[current].initials}
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">{testimonials[current].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/70 transition-all hidden sm:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/70 transition-all hidden sm:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary w-8"
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
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
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="reveal-scale glass-strong rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Take the{" "}
              <span className="shimmer-text">Next Step?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Schedule your consultation today and experience healthcare
              that puts you first. Our team is ready to help.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/auth"
                className="glass-btn px-8 py-4 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2 relative pulse-ring"
              >
                Book Appointment Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+1800123456"
                className="glass px-8 py-4 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/70 transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                +1 800-123-456
              </a>
            </div>

            {/* Quick info pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: Clock, text: "Mon – Sat: 8AM – 10PM" },
                { icon: MapPin, text: "123 Medical Avenue, City" },
                { icon: Mail, text: "care@dmchospital.com" },
              ].map((pill) => (
                <div
                  key={pill.text}
                  className="glass px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2"
                >
                  <pill.icon className="w-3.5 h-3.5 text-primary" />
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
  Services: [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Ophthalmology",
    "General Medicine",
  ],
  Company: [
    "About Us",
    "Our Doctors",
    "Departments",
    "Health Blog",
    "Careers",
  ],
  "Patient Care": [
    "Book Appointment",
    "Patient Portal",
    "Insurance Info",
    "Medical Records",
    "Visitor Policy",
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
              <div className="w-10 h-10 rounded-xl glass-btn flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">DMC</span>{" "}
                <span className="text-foreground/70">Hospital</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Providing compassionate, world-class healthcare since 2001.
              Your trust drives everything we do.
            </p>

            <div className="mt-6 space-y-2">
              <a
                href="tel:+1800123456"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" /> +1 800-123-456
              </a>
              <a
                href="mailto:care@dmchospital.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" /> care@dmchospital.com
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" /> 123 Medical Avenue, City
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
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
        <div className="mt-16 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DMC Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
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
      <Services />
      <div className="section-divider" />
      <About />
      <Stats />
      <div className="section-divider" />
      <Doctors />
      <div className="section-divider" />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
