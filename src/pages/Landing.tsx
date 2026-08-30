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
  Syringe,
  Activity,
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
  Ambulance,
  Heart,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Link } from "react-router";

/* ──────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Departments", href: "#departments" },
  { label: "About", href: "#about" },
  { label: "Doctors", href: "#doctors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const departments = [
  {
    icon: HeartPulse,
    name: "Cardiology",
    desc: "Advanced heart care with state-of-the-art catheterization labs, interventional cardiology, and preventive cardiac programs.",
    color: "spec-cardiology",
    iconColor: "text-rose-500",
  },
  {
    icon: Brain,
    name: "Neurology",
    desc: "Comprehensive neurological diagnostics and treatment for brain, spine, and nerve disorders including stroke intervention.",
    color: "spec-neurology",
    iconColor: "text-violet-500",
  },
  {
    icon: Bone,
    name: "Orthopedics",
    desc: "Specialized bone and joint care — joint replacements, sports medicine, spine surgery, and rehabilitation programs.",
    color: "spec-orthopedics",
    iconColor: "text-amber-600",
  },
  {
    icon: Baby,
    name: "Pediatrics",
    desc: "Compassionate healthcare for children from newborns to adolescents in a child-friendly, safe environment.",
    color: "spec-pediatrics",
    iconColor: "text-emerald-600",
  },
  {
    icon: Eye,
    name: "Ophthalmology",
    desc: "Expert eye care from routine exams to advanced laser surgeries, cataract treatment, and retinal care.",
    color: "spec-ophthalmology",
    iconColor: "text-sky-500",
  },
  {
    icon: Syringe,
    name: "Oncology",
    desc: "Comprehensive cancer care with chemotherapy, radiation therapy, surgical oncology, and palliative support.",
    color: "spec-oncology",
    iconColor: "text-pink-500",
  },
  {
    icon: Stethoscope,
    name: "General Medicine",
    desc: "Primary care for adults covering prevention, diagnosis, and treatment of common and chronic health conditions.",
    color: "spec-general",
    iconColor: "text-teal-600",
  },
  {
    icon: Activity,
    name: "Emergency Care",
    desc: "24/7 emergency and trauma center equipped with advanced life support, rapid diagnostics, and critical care.",
    color: "spec-cardiac",
    iconColor: "text-red-500",
  },
];

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    experience: "18 years",
    rating: 4.9,
    reviews: 312,
    initials: "SM",
    color: "from-rose-400 to-pink-400",
  },
  {
    name: "Dr. James Chen",
    specialty: "Neurologist",
    experience: "15 years",
    rating: 4.8,
    reviews: 287,
    initials: "JC",
    color: "from-violet-400 to-purple-400",
  },
  {
    name: "Dr. Emily Ross",
    specialty: "Pediatrician",
    experience: "12 years",
    rating: 4.9,
    reviews: 445,
    initials: "ER",
    color: "from-emerald-400 to-teal-400",
  },
  {
    name: "Dr. Michael Park",
    specialty: "Orthopedic Surgeon",
    experience: "20 years",
    rating: 4.7,
    reviews: 198,
    initials: "MP",
    color: "from-amber-400 to-orange-400",
  },
  {
    name: "Dr. Ananya Gupta",
    specialty: "Oncologist",
    experience: "14 years",
    rating: 4.9,
    reviews: 256,
    initials: "AG",
    color: "from-pink-400 to-rose-400",
  },
  {
    name: "Dr. David Kim",
    specialty: "Ophthalmologist",
    experience: "16 years",
    rating: 4.8,
    reviews: 189,
    initials: "DK",
    color: "from-sky-400 to-blue-400",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    condition: "Cardiac Surgery",
    text: "The care I received at DMC Hospital was exceptional. Dr. Mitchell and her team made me feel safe throughout my entire cardiac procedure. The facilities are world-class and the nursing staff was incredibly attentive.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Robert Williams",
    condition: "Knee Replacement",
    text: "After my knee replacement surgery, the recovery program was outstanding. The physiotherapy team was supportive and professional — I was back on my feet in just a few weeks.",
    rating: 5,
    initials: "RW",
  },
  {
    name: "Anika Patel",
    condition: "Pediatric Care",
    text: "DMC Hospital's pediatric department made my daughter's hospital stay so much easier. The staff is warm, the rooms are child-friendly, and the doctors explain everything clearly to both parents and children.",
    rating: 5,
    initials: "AP",
  },
];

/* ──────────────────────────────────────────────────────────────
   NAVBAR
   ────────────────────────────────────────────────────────────── */
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
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
            D
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">DMC</span>{" "}
            <span className="text-foreground/70 font-light">Hospital</span>
          </span>
        </a>

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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg glass"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

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
            <a
              href="tel:+1800123456"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-500"
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
      <div className="hero-orb-1 -top-40 -left-40" />
      <div className="hero-orb-2 top-1/3 right-0" />
      <div className="hero-orb-3 bottom-20 left-1/3" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Trusted by 50,000+ Patients
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Your Health,{" "}
              <span className="shimmer-text">Our Priority</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              DMC Hospital delivers world-class healthcare with cutting-edge technology,
              compassionate specialists, and personalized treatment — all under one roof.
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
                href="#departments"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold glass inline-flex items-center gap-2 hover:bg-white/70 transition-all"
              >
                Our Departments
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-primary/5" />
              <div className="absolute inset-8 glass-strong rounded-full flex items-center justify-center">
                <div className="text-center">
                  <HeartPulse className="w-20 h-20 text-primary mx-auto float-animation" />
                  <p className="mt-4 font-bold text-2xl text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Emergency Care</p>
                </div>
              </div>

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
                    <p className="text-xs font-semibold">Dr. Mitchell</p>
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
                    <Activity className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">98.7% Success</p>
                    <p className="text-[10px] text-muted-foreground">Surgery Rate</p>
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   DEPARTMENTS
   ────────────────────────────────────────────────────────────── */
function Departments() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="departments" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            Our Departments
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Comprehensive <span className="shimmer-text">Medical Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Equipped with the latest technology and staffed by board-certified specialists,
            DMC Hospital provides expert care across every major medical discipline.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {departments.map((dept) => (
            <Link key={dept.name} to="/diseases">
              <div className="glass-card rounded-2xl p-6 group cursor-pointer h-full">
                <div
                  className={`w-14 h-14 rounded-2xl ${dept.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <dept.icon className={`w-7 h-7 ${dept.iconColor}`} />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                  {dept.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
                  View Conditions <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={leftRef} className="reveal-left relative">
            <div className="glass-strong rounded-3xl p-8 relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Bed Capacity", value: "500+", icon: HeartPulse },
                  { label: "Departments", value: "30+", icon: Stethoscope },
                  { label: "Surgeries / Year", value: "10,000+", icon: Brain },
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
                "24/7 emergency and trauma center",
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
                to="/doctors"
                className="glass-btn px-6 py-3 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                Meet Our Doctors <ArrowRight className="w-4 h-4" />
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
const statItems = [
  { label: "Patients Treated", value: "50,000+" },
  { label: "Expert Doctors", value: "200+" },
  { label: "Success Rate", value: "98.7%" },
  { label: "Years of Service", value: "25+" },
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
              <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURED DOCTORS
   ────────────────────────────────────────────────────────────── */
function Doctors() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="doctors" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="reveal-up text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Meet Our <span className="shimmer-text">Expert Doctors</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our team of highly qualified physicians brings decades of combined experience
            and a commitment to exceptional patient outcomes.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {doctors.map((doc) => (
            <Link key={doc.name} to="/doctors">
              <div className="glass-card rounded-2xl p-6 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-white text-lg font-bold shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {doc.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">{doc.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.experience} experience</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold">{doc.rating}</span>
                      <span className="text-xs text-muted-foreground">({doc.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-black/5">
                  <Link
                    to="/auth"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/doctors"
            className="glass px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/70 transition-all"
          >
            View All Doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIALS
   ────────────────────────────────────────────────────────────── */
function Testimonials() {
  const [current, setCurrent] = useState(0);
  const headerRef = useScrollReveal();

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="reveal-up text-center mb-16">
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
                <p className="text-xs text-muted-foreground">{testimonials[current].condition}</p>
              </div>
            </div>
          </motion.div>

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

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-8" : "bg-primary/20 w-2.5 hover:bg-primary/40"
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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="reveal-scale glass-strong rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Take the <span className="shimmer-text">Next Step?</span>
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
  Departments: [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Ophthalmology",
    "Oncology",
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
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">DMC</span>{" "}
                <span className="text-foreground/70 font-light">Hospital</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Providing compassionate, world-class healthcare since 2001.
              Your trust drives everything we do.
            </p>
            <div className="mt-6 space-y-2">
              <a href="tel:+1800123456" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +1 800-123-456
              </a>
              <a href="mailto:care@dmchospital.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> care@dmchospital.com
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" /> 123 Medical Avenue, City
              </p>
            </div>
          </div>

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

        <div className="mt-16 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DMC Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Sitemap</a>
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
      <Departments />
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
