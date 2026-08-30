import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  Star,
  Clock,
  Award,
  BookOpen,
  Calendar,
} from "lucide-react";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    department: "Cardiology",
    experience: "18 years",
    education: "MD, Harvard Medical School",
    rating: 4.9,
    reviews: 312,
    initials: "SM",
    color: "from-rose-400 to-pink-400",
    bio: "Board-certified cardiologist specializing in interventional cardiology and heart failure management. Published over 40 peer-reviewed papers on cardiovascular disease prevention.",
    languages: ["English", "Spanish"],
    availability: "Mon, Wed, Fri",
  },
  {
    name: "Dr. James Chen",
    specialty: "Neurologist",
    department: "Neurology",
    experience: "15 years",
    education: "MD, Johns Hopkins University",
    rating: 4.8,
    reviews: 287,
    initials: "JC",
    color: "from-violet-400 to-purple-400",
    bio: "Expert in stroke intervention and neurodegenerative disorders. Leads the hospital's stroke rapid response team and has treated over 3,000 neurological cases.",
    languages: ["English", "Mandarin"],
    availability: "Mon–Thu",
  },
  {
    name: "Dr. Emily Ross",
    specialty: "Pediatrician",
    department: "Pediatrics",
    experience: "12 years",
    education: "MD, Stanford University",
    rating: 4.9,
    reviews: 445,
    initials: "ER",
    color: "from-emerald-400 to-teal-400",
    bio: "Compassionate pediatrician focused on childhood development, vaccination programs, and pediatric emergency care. Known for putting young patients at ease.",
    languages: ["English"],
    availability: "Mon–Sat",
  },
  {
    name: "Dr. Michael Park",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    experience: "20 years",
    education: "MD, Mayo Clinic",
    rating: 4.7,
    reviews: 198,
    initials: "MP",
    color: "from-amber-400 to-orange-400",
    bio: "Renowned orthopedic surgeon with expertise in joint replacement, sports medicine, and minimally invasive spinal surgery. Has performed over 2,500 successful surgeries.",
    languages: ["English", "Korean"],
    availability: "Tue, Thu, Sat",
  },
  {
    name: "Dr. Ananya Gupta",
    specialty: "Oncologist",
    department: "Oncology",
    experience: "14 years",
    education: "MD, Memorial Sloan Kettering",
    rating: 4.9,
    reviews: 256,
    initials: "AG",
    color: "from-pink-400 to-rose-400",
    bio: "Compassionate oncologist specializing in breast cancer and hematological malignancies. Pioneer in immunotherapy treatments and clinical trial leadership.",
    languages: ["English", "Hindi"],
    availability: "Mon, Wed, Fri",
  },
  {
    name: "Dr. David Kim",
    specialty: "Ophthalmologist",
    department: "Ophthalmology",
    experience: "16 years",
    education: "MD, Duke University",
    rating: 4.8,
    reviews: 189,
    initials: "DK",
    color: "from-sky-400 to-blue-400",
    bio: "Expert ophthalmologist specializing in cataract surgery, glaucoma management, and retinal disorders. Performed over 5,000 successful eye surgeries.",
    languages: ["English", "Korean"],
    availability: "Mon–Fri",
  },
  {
    name: "Dr. Robert Hayes",
    specialty: "Cardiologist",
    department: "Cardiology",
    experience: "22 years",
    education: "MD, Yale School of Medicine",
    rating: 4.8,
    reviews: 302,
    initials: "RH",
    color: "from-red-400 to-rose-400",
    bio: "Senior cardiologist with decades of experience in preventive cardiology and cardiac rehabilitation. Former chief of cardiology at City General Hospital.",
    languages: ["English"],
    availability: "Mon, Tue, Thu",
  },
  {
    name: "Dr. Lisa Chang",
    specialty: "Endocrinologist",
    department: "Endocrinology",
    experience: "11 years",
    education: "MD, Columbia University",
    rating: 4.7,
    reviews: 178,
    initials: "LC",
    color: "from-teal-400 to-emerald-400",
    bio: "Specialist in diabetes management, thyroid disorders, and metabolic conditions. Active researcher in insulin pump therapy and continuous glucose monitoring.",
    languages: ["English", "Mandarin"],
    availability: "Mon–Thu",
  },
  {
    name: "Dr. Maria Santos",
    specialty: "Neurologist",
    department: "Neurology",
    experience: "13 years",
    education: "MD, University of Pennsylvania",
    rating: 4.8,
    reviews: 214,
    initials: "MS",
    color: "from-indigo-400 to-violet-400",
    bio: "Headache specialist and neuroimmunologist with expertise in migraine treatment, multiple sclerosis, and autoimmune neurological disorders.",
    languages: ["English", "Portuguese"],
    availability: "Wed–Fri",
  },
];

const specialties = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Oncology", "Ophthalmology", "Endocrinology"];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const filtered = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.department.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specialty === "All" || d.department === specialty;
    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen">
      <CursorGlow />

      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/60 transition-colors">
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
        <div ref={headerRef} className="reveal-up mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Our Medical Team
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our team of board-certified specialists — each brings deep expertise, years of experience, and a genuine commitment to patient care.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-strong rounded-2xl p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, specialty, or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  specialty === s
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/50 text-foreground/70 hover:bg-white/80 border border-white/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "doctor" : "doctors"} found
        </p>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {filtered.map((doc) => (
            <motion.div
              key={doc.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card rounded-2xl overflow-hidden group">
                {/* Header gradient */}
                <div className="h-24 bg-gradient-to-br from-teal-50 to-sky-50 relative">
                  <div className={`absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    {doc.initials}
                  </div>
                </div>

                <div className="p-6 pt-12">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">{doc.specialty}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{doc.experience} experience</p>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 line-clamp-3">
                    {doc.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {doc.languages.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded-md bg-primary/5 text-[11px] font-medium text-primary/80">
                        {l}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-black/5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {doc.availability}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {doc.education.split(",")[0]}
                    </span>
                  </div>

                  <Link
                    to="/auth"
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/5 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold mb-2">No doctors match your search</p>
            <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setSearch(""); setSpecialty("All"); }}
              className="glass px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/70 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
