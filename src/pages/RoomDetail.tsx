import { diseases } from "@/pages/Catalog";
import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Clock,
  Calendar,
  User,
  Phone,
  Check,
  Shield,
  BookOpen,
  Stethoscope,
  Star,
  Pill,
  Activity,
  Heart,
} from "lucide-react";

/* ── Appointment Booking Modal ────────────────────────────── */
function BookingModal({
  diseaseName,
  doctors,
  onClose,
}: {
  diseaseName: string;
  doctors: string[];
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0] || "");
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!date || !time) return;
    setBooked(true);
    setTimeout(() => onClose(), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-strong rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {booked ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Appointment Booked!</h3>
            <p className="text-sm text-muted-foreground">
              You have a consultation for <strong>{diseaseName}</strong> on{" "}
              {new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}{" "}
              at {time}.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Book Consultation</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <span className="text-primary text-lg leading-none">&times;</span>
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Schedule an appointment for <strong>{diseaseName}</strong> with one of our specialists.
            </p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-semibold mb-1 block">Select Doctor</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {doctors.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!date || !time}
              className="w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirm Appointment
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
export default function DiseaseDetail() {
  const { id } = useParams();
  const disease = diseases.find((d) => d.id === id);
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  const [showBooking, setShowBooking] = useState(false);

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Condition not found</p>
          <Link to="/diseases" className="text-sm text-primary underline">
            Browse all conditions
          </Link>
        </div>
      </div>
    );
  }

  const relatedDiseases = diseases
    .filter((d) => d.category === disease.category && d.id !== disease.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <CursorGlow />

      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/diseases" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/60 transition-colors">
              <ArrowLeft className="w-4 h-4 text-primary" />
            </Link>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-primary">DMC</span>{" "}
              <span className="text-foreground/70 font-light">Hospital</span>
            </span>
          </div>
          <Link to="/auth" className="glass-btn px-4 py-2 rounded-xl text-xs font-semibold text-white">
            Sign In
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/diseases" className="hover:text-foreground transition-colors">Conditions</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{disease.name}</span>
        </div>

        {/* Header */}
        <div ref={headerRef} className="reveal-up mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl ${disease.color} flex items-center justify-center shrink-0`}>
              <disease.icon className={`w-10 h-10 ${disease.iconColor}`} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{disease.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  disease.severity === "Serious"
                    ? "bg-red-50 text-red-600"
                    : disease.severity === "Chronic"
                    ? "bg-amber-50 text-amber-600"
                    : disease.severity === "Mild"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-sky-50 text-sky-600"
                }`}>
                  {disease.severity}
                </span>
              </div>
              <p className="text-sm font-medium text-primary mb-3">{disease.category}</p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {disease.shortDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left – Content */}
          <div ref={contentRef} className="reveal-left lg:col-span-2 space-y-8">
            {/* Symptoms */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Symptoms</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {disease.symptoms.map((s) => (
                  <div key={s} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 border border-white/60">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Causes */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Risk Factors & Causes</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {disease.causes.map((c) => (
                  <div key={c} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 border border-white/60">
                    <span className="w-2 h-2 rounded-full bg-primary/40 shrink-0" />
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatments */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Treatment Options</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {disease.treatments.map((t) => (
                  <div key={t} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 border border-white/60">
                    <Check className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="text-sm font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Prevention</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {disease.prevention}
              </p>
            </div>

            {/* Related Conditions */}
            {relatedDiseases.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Related Conditions</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedDiseases.map((rd) => (
                    <Link key={rd.id} to={`/disease/${rd.id}`}>
                      <div className="glass-card rounded-xl p-4 group cursor-pointer">
                        <div className={`w-10 h-10 rounded-xl ${rd.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                          <rd.icon className={`w-5 h-5 ${rd.iconColor}`} />
                        </div>
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{rd.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rd.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right – Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold mb-4">Consult a Specialist</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Our {disease.category.toLowerCase()} specialists can provide personalized diagnosis and treatment for {disease.name.toLowerCase()}.
              </p>

              <div className="space-y-3 mb-5">
                {disease.doctors.map((doc) => (
                  <div key={doc} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 border border-white/60">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {doc.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{doc}</p>
                      <p className="text-xs text-muted-foreground">{disease.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowBooking(true)}
                className="w-full py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors relative pulse-ring"
              >
                Book Appointment
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon – Sat: 8AM – 10PM</span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5" />
                <a href="tel:+1800123456" className="hover:text-primary transition-colors">+1 800-123-456</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBooking && (
          <BookingModal
            diseaseName={disease.name}
            doctors={disease.doctors}
            onClose={() => setShowBooking(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
