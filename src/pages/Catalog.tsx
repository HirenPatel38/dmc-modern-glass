import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  X,
  SlidersHorizontal,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Syringe,
  Activity,
  Stethoscope,
} from "lucide-react";

/* ── Disease Data ──────────────────────────────────────────── */
export const diseases = [
  {
    id: "hypertension",
    name: "Hypertension",
    category: "Cardiology",
    severity: "Chronic",
    icon: HeartPulse,
    color: "spec-cardiology",
    iconColor: "text-rose-500",
    shortDesc: "A chronic condition where blood pressure against artery walls is consistently too high, increasing risk of heart disease and stroke.",
    symptoms: ["Persistent headaches", "Shortness of breath", "Nosebleeds", "Dizziness", "Chest pain", "Fatigue"],
    causes: ["Genetics", "High sodium diet", "Lack of physical activity", "Obesity", "Chronic stress", "Excessive alcohol"],
    treatments: ["ACE inhibitors", "Beta-blockers", "Diuretics", "DASH diet", "Regular exercise", "Stress management"],
    doctors: ["Dr. Sarah Mitchell", "Dr. Robert Hayes"],
    prevention: "Maintain a healthy weight, exercise regularly, reduce sodium intake, limit alcohol, and manage stress through mindfulness practices.",
  },
  {
    id: "diabetes-type2",
    name: "Type 2 Diabetes",
    category: "Endocrinology",
    severity: "Chronic",
    icon: Activity,
    color: "spec-general",
    iconColor: "text-teal-600",
    shortDesc: "A metabolic condition affecting how the body processes blood sugar, often linked to lifestyle factors and insulin resistance.",
    symptoms: ["Increased thirst", "Frequent urination", "Blurred vision", "Slow-healing wounds", "Fatigue", "Weight changes"],
    causes: ["Sedentary lifestyle", "Poor diet", "Obesity", "Family history", "Age", "Insulin resistance"],
    treatments: ["Metformin", "Insulin therapy", "Blood sugar monitoring", "Healthy diet", "Regular exercise", "Weight management"],
    doctors: ["Dr. Lisa Chang", "Dr. Ananya Gupta"],
    prevention: "Eat a balanced diet rich in whole grains and vegetables, maintain a healthy weight, exercise at least 150 minutes per week, and monitor blood sugar levels regularly.",
  },
  {
    id: "asthma",
    name: "Asthma",
    category: "Pulmonology",
    severity: "Chronic",
    icon: Stethoscope,
    color: "spec-ophthalmology",
    iconColor: "text-sky-500",
    shortDesc: "A chronic respiratory condition causing airway inflammation and narrowing, leading to wheezing, breathlessness, and coughing.",
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Nighttime coughing", "Rapid breathing", "Fatigue"],
    causes: ["Allergens", "Air pollution", "Respiratory infections", "Cold air", "Physical exertion", "Stress"],
    treatments: ["Inhaled corticosteroids", "Bronchodilators", "Leukotriene modifiers", "Allergy management", "Breathing exercises", "Asthma action plan"],
    doctors: ["Dr. David Kim", "Dr. Emily Ross"],
    prevention: "Identify and avoid triggers, keep indoor air clean, use air purifiers, get vaccinated against flu and pneumonia, and follow your asthma action plan.",
  },
  {
    id: "migraine",
    name: "Migraine",
    category: "Neurology",
    severity: "Recurring",
    icon: Brain,
    color: "spec-neurology",
    iconColor: "text-violet-500",
    shortDesc: "A neurological condition causing intense, debilitating headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.",
    symptoms: ["Severe throbbing headache", "Nausea and vomiting", "Light sensitivity", "Sound sensitivity", "Visual disturbances", "Neck stiffness"],
    causes: ["Stress", "Hormonal changes", "Certain foods", "Sleep changes", "Weather changes", "Sensory stimuli"],
    treatments: ["Triptans", "Anti-nausea medications", "Preventive medications", "CGRP inhibitors", "Botox injections", "Biofeedback therapy"],
    doctors: ["Dr. James Chen", "Dr. Maria Santos"],
    prevention: "Maintain a regular sleep schedule, stay hydrated, identify and avoid food triggers, manage stress, and exercise regularly.",
  },
  {
    id: "arthritis",
    name: "Arthritis",
    category: "Orthopedics",
    severity: "Chronic",
    icon: Bone,
    color: "spec-orthopedics",
    iconColor: "text-amber-600",
    shortDesc: "Inflammation of one or more joints causing pain and stiffness, which can worsen with age and affects mobility significantly.",
    symptoms: ["Joint pain", "Swelling", "Reduced range of motion", "Morning stiffness", "Redness around joints", "Fatigue"],
    causes: ["Wear and tear (osteoarthritis)", "Autoimmune response (rheumatoid)", "Genetics", "Age", "Previous injuries", "Obesity"],
    treatments: ["NSAIDs", "Physical therapy", "Joint injections", "Disease-modifying drugs", "Occupational therapy", "Joint replacement surgery"],
    doctors: ["Dr. Michael Park", "Dr. Sarah Mitchell"],
    prevention: "Maintain a healthy weight, protect joints from injury, stay active with low-impact exercises, and eat an anti-inflammatory diet rich in omega-3 fatty acids.",
  },
  {
    id: "common-cold",
    name: "Common Cold",
    category: "General Medicine",
    severity: "Mild",
    icon: Stethoscope,
    color: "spec-general",
    iconColor: "text-teal-600",
    shortDesc: "A viral infection of the upper respiratory tract, usually harmless but can cause discomfort and temporarily affect daily activities.",
    symptoms: ["Runny nose", "Sore throat", "Cough", "Congestion", "Mild body aches", "Low-grade fever"],
    causes: ["Rhinovirus (most common)", "Coronavirus", "RSV", "Close contact with infected person", "Contaminated surfaces", "Weakened immunity"],
    treatments: ["Rest and hydration", "Over-the-counter decongestants", "Pain relievers", "Throat lozenges", "Steam inhalation", "Honey and warm liquids"],
    doctors: ["Dr. Emily Ross", "Dr. Lisa Chang"],
    prevention: "Wash hands frequently, avoid touching your face, maintain distance from sick individuals, get adequate sleep, and support immune health with proper nutrition.",
  },
  {
    id: "cataracts",
    name: "Cataracts",
    category: "Ophthalmology",
    severity: "Progressive",
    icon: Eye,
    color: "spec-ophthalmology",
    iconColor: "text-sky-500",
    shortDesc: "Clouding of the eye's natural lens causing blurred vision, most common in older adults and treatable with surgery.",
    symptoms: ["Blurred vision", "Difficulty seeing at night", "Colors appearing faded", "Sensitivity to light", "Double vision", "Frequent prescription changes"],
    causes: ["Aging", "UV exposure", "Diabetes", "Smoking", "Previous eye surgery", "Prolonged steroid use"],
    treatments: ["Phacoemulsification surgery", "Intraocular lens implant", "Laser-assisted surgery", "New prescription glasses", "Anti-glare coatings", "Surgical lens exchange"],
    doctors: ["Dr. David Kim", "Dr. Anna Fischer"],
    prevention: "Wear UV-protective sunglasses, manage diabetes, avoid smoking, eat a diet rich in vitamins C and E, and get regular comprehensive eye exams.",
  },
  {
    id: "chickenpox",
    name: "Chickenpox",
    category: "Pediatrics",
    severity: "Mild",
    icon: Baby,
    color: "spec-pediatrics",
    iconColor: "text-emerald-600",
    shortDesc: "A highly contagious viral infection causing an itchy, blister-like rash, most common in children and preventable by vaccination.",
    symptoms: ["Itchy rash with fluid-filled blisters", "Fever", "Loss of appetite", "Headache", "Tiredness", "General malaise"],
    causes: ["Varicella-zoster virus", "Direct contact with infected person", "Airborne transmission", "Contaminated objects", "Close household contact", "Unvaccinated individuals"],
    treatments: ["Antiviral medications", "Calamine lotion for itching", "Acetaminophen for fever", "Oatmeal baths", "Rest and fluids", "Antihistamines"],
    doctors: ["Dr. Emily Ross", "Dr. Robert Hayes"],
    prevention: "Get vaccinated (two doses recommended), avoid contact with infected individuals, wash hands frequently, and keep children home from school during the contagious period.",
  },
  {
    id: "leukemia",
    name: "Leukemia",
    category: "Oncology",
    severity: "Serious",
    icon: Syringe,
    color: "spec-oncology",
    iconColor: "text-pink-500",
    shortDesc: "A type of cancer affecting blood and bone marrow, characterized by rapid production of abnormal white blood cells.",
    symptoms: ["Persistent fatigue", "Frequent infections", "Easy bruising or bleeding", "Swollen lymph nodes", "Unexplained weight loss", "Bone pain"],
    causes: ["Genetic mutations", "Exposure to radiation", "Chemical exposure (benzene)", "Previous chemotherapy", "Certain blood disorders", "Family history"],
    treatments: ["Chemotherapy", "Radiation therapy", "Targeted therapy", "Immunotherapy", "Stem cell transplant", "CAR-T cell therapy"],
    doctors: ["Dr. Ananya Gupta", "Dr. James Chen"],
    prevention: "Avoid tobacco, limit exposure to chemicals and radiation, maintain a healthy diet and exercise routine, and attend regular medical checkups for early detection.",
  },
  {
    id: "heart-failure",
    name: "Heart Failure",
    category: "Cardiology",
    severity: "Serious",
    icon: HeartPulse,
    color: "spec-cardiac",
    iconColor: "text-red-500",
    shortDesc: "A chronic condition where the heart cannot pump blood efficiently enough to meet the body's needs, requiring ongoing management.",
    symptoms: ["Shortness of breath", "Swollen legs and ankles", "Rapid heartbeat", "Persistent cough", "Fatigue and weakness", "Reduced exercise tolerance"],
    causes: ["Coronary artery disease", "High blood pressure", "Previous heart attack", "Damaged heart valves", "Cardiomyopathy", "Diabetes"],
    treatments: ["ACE inhibitors", "Beta-blockers", "Diuretics", "Cardiac rehabilitation", "Implantable devices (pacemaker/defibrillator)", "Heart transplant (severe cases)"],
    doctors: ["Dr. Sarah Mitchell", "Dr. Robert Hayes"],
    prevention: "Control blood pressure and cholesterol, maintain a healthy weight, exercise regularly, quit smoking, limit alcohol, and manage diabetes effectively.",
  },
];

const categories = ["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Ophthalmology", "Oncology", "General Medicine", "Pulmonology", "Endocrinology"];
const severities = ["All", "Mild", "Chronic", "Recurring", "Progressive", "Serious"];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [severity, setSeverity] = useState("All");
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const filtered = diseases.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.symptoms.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || d.category === category;
    const matchSev = severity === "All" || d.severity === severity;
    return matchSearch && matchCat && matchSev;
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
            Disease & Condition Library
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our comprehensive guide to medical conditions — search by name, symptom, or specialty to find the information you need.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-strong rounded-2xl p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search diseases, symptoms, departments..."
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
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl bg-white/50 border border-white/60 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                {severities.map((s) => (
                  <option key={s} value={s}>{s === "All" ? "All Severities" : s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  category === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/50 text-foreground/70 hover:bg-white/80 border border-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "condition" : "conditions"} found
        </p>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {filtered.map((disease) => (
            <motion.div
              key={disease.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/disease/${disease.id}`}>
                <div className="glass-card rounded-2xl p-6 group cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${disease.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <disease.icon className={`w-6 h-6 ${disease.iconColor}`} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
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
                  <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">
                    {disease.name}
                  </h3>
                  <p className="text-xs font-medium text-primary mb-2">{disease.category}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {disease.shortDesc}
                  </p>

                  {/* Symptoms preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {disease.symptoms.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-primary/5 text-[11px] font-medium text-primary/80">
                        {s}
                      </span>
                    ))}
                    {disease.symptoms.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-primary/5 text-[11px] font-medium text-muted-foreground">
                        +{disease.symptoms.length - 3} more
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-300">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold mb-2">No conditions match your search</p>
            <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setSeverity("All"); }}
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


