import { CursorGlow } from "@/components/CursorGlow";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Clock,
  MapPin,
  Send,
  Star,
  ChevronRight,
  CheckCircle,
  Bell,
  FileText,
  Phone,
  Heart,
  Pill,
  Activity,
} from "lucide-react";

const sampleAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    date: "2026-09-12",
    time: "10:00 AM",
    type: "Follow-up",
    status: "upcoming" as const,
  },
  {
    id: 2,
    doctor: "Dr. Emily Ross",
    specialty: "Pediatrics",
    date: "2026-08-01",
    time: "2:30 PM",
    type: "Annual Checkup",
    status: "completed" as const,
  },
  {
    id: 3,
    doctor: "Dr. James Chen",
    specialty: "Neurology",
    date: "2026-07-15",
    time: "11:00 AM",
    type: "Consultation",
    status: "completed" as const,
  },
];

const sampleMessages = [
  {
    id: 1,
    from: "Dr. Mitchell's Office",
    subject: "Your lab results are ready",
    preview: "Your recent blood work results are available for review. Please schedule a follow-up to discuss the findings with Dr. Mitchell.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    from: "Pharmacy",
    subject: "Prescription refill reminder",
    preview: "Your prescription for Lisinopril 10mg is due for refill. You can pick up your medication at the hospital pharmacy or request delivery.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    from: "Front Desk",
    subject: "Appointment confirmed — Sep 12",
    preview: "Your follow-up appointment with Dr. Sarah Mitchell has been confirmed for September 12 at 10:00 AM. Please arrive 15 minutes early.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 4,
    from: "Insurance",
    subject: "Claim processed successfully",
    preview: "Your insurance claim for the July 15 consultation has been processed. The covered amount has been credited to your account.",
    time: "1 week ago",
    unread: false,
  },
];

type Tab = "appointments" | "messages" | "profile";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("appointments");
  const [messages, setMessages] = useState(sampleMessages);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const markRead = (id: number) => {
    setMessages((ms) =>
      ms.map((m) => (m.id === id ? { ...m, unread: false } : m))
    );
  };

  const sendReply = () => {
    if (!replyText.trim() || activeMessage === null) return;
    setReplyText("");
    setActiveMessage(null);
  };

  const tabs: { key: Tab; label: string; icon: typeof Calendar; count?: number }[] = [
    { key: "appointments", label: "Appointments", icon: Calendar, count: sampleAppointments.filter((a) => a.status === "upcoming").length },
    { key: "messages", label: "Messages", icon: MessageSquare, count: messages.filter((m) => m.unread).length },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />

      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-primary">DMC</span>{" "}
              <span className="text-foreground/70 font-light">Hospital</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center relative hover:bg-white/60 transition-colors">
              <Bell className="w-4 h-4 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">
                {messages.filter((m) => m.unread).length || ""}
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
              YO
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your appointments, messages, and medical profile.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Upcoming", value: sampleAppointments.filter((a) => a.status === "upcoming").length, icon: Calendar, bg: "bg-primary" },
            { label: "Completed", value: sampleAppointments.filter((a) => a.status === "completed").length, icon: CheckCircle, bg: "bg-teal-600" },
            { label: "Unread", value: messages.filter((m) => m.unread).length, icon: MessageSquare, bg: "bg-amber-500" },
            { label: "Records", value: "12", icon: FileText, bg: "bg-sky-500" },
          ].map((s) => (
            <div key={s.label} className="glass-strong rounded-2xl p-5">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 glass-strong rounded-xl p-1 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                tab === t.key
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/40"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span
                  className={`ml-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    tab === t.key ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {tab === "appointments" && (
            <motion.div key="appointments" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <AppointmentsTab appointments={sampleAppointments} />
            </motion.div>
          )}
          {tab === "messages" && (
            <motion.div key="messages" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <MessagesTab
                messages={messages}
                activeMessage={activeMessage}
                setActiveMessage={(id) => { setActiveMessage(id); if (id !== null) markRead(id); }}
                replyText={replyText}
                setReplyText={setReplyText}
                sendReply={sendReply}
              />
            </motion.div>
          )}
          {tab === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <ProfileTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Appointments ─────────────────────────────────────────── */
function AppointmentsTab({ appointments }: { appointments: typeof sampleAppointments }) {
  return (
    <div className="space-y-4">
      {appointments.map((a) => (
        <div key={a.id} className="glass-card rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">{a.doctor}</h3>
                <p className="text-sm text-primary font-medium">{a.specialty}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {a.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:text-right">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  a.status === "upcoming"
                    ? "bg-primary/10 text-primary"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                {a.status === "upcoming" ? "Upcoming" : "Completed"}
              </span>
              {a.status === "upcoming" && (
                <Link to="/auth" className="text-xs font-semibold text-primary hover:underline">
                  Reschedule
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Messages ─────────────────────────────────────────────── */
function MessagesTab({
  messages,
  activeMessage,
  setActiveMessage,
  replyText,
  setReplyText,
  sendReply,
}: {
  messages: typeof sampleMessages;
  activeMessage: number | null;
  setActiveMessage: (id: number | null) => void;
  replyText: string;
  setReplyText: (v: string) => void;
  sendReply: () => void;
}) {
  const active = messages.find((m) => m.id === activeMessage);

  if (activeMessage !== null && active) {
    return (
      <div>
        <button onClick={() => setActiveMessage(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 transition-colors">
          ← Back to inbox
        </button>
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              {active.from[0]}
            </div>
            <div>
              <p className="font-bold">{active.from}</p>
              <p className="text-sm font-medium">{active.subject}</p>
              <p className="text-xs text-muted-foreground mt-1">{active.time}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{active.preview}</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendReply()}
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button onClick={sendReply} disabled={!replyText.trim()} className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <button
          key={m.id}
          onClick={() => setActiveMessage(m.id)}
          className="w-full text-left glass-card rounded-2xl p-5 group"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              {m.from[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{m.from}</p>
                  {m.unread && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </div>
                <span className="text-xs text-muted-foreground">{m.time}</span>
              </div>
              <p className="text-sm font-medium mb-1">{m.subject}</p>
              <p className="text-xs text-muted-foreground truncate">{m.preview}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
          </div>
        </button>
      ))}
    </div>
  );
}

/* ── Profile ──────────────────────────────────────────────── */
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Patient User");
  const [email, setEmail] = useState("patient@example.com");
  const [phone, setPhone] = useState("+1 555-0123");
  const [dob, setDob] = useState("1990-05-15");

  return (
    <div className="max-w-2xl">
      <div className="glass-strong rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl">
            {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="ml-auto glass px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/60 transition-colors"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60" />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">Date of Birth</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} disabled={!editing} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60" />
            </div>
          </div>
        </div>

        {editing && (
          <button onClick={() => setEditing(false)} className="mt-6 glass-btn px-6 py-3 rounded-xl text-sm font-semibold text-white">
            Save Changes
          </button>
        )}
      </div>

      {/* Medical Info */}
      <div className="glass-strong rounded-2xl p-6 mb-6">
        <h3 className="font-bold mb-4">Medical Information</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Blood Type", value: "O+" },
            { label: "Allergies", value: "Penicillin" },
            { label: "Insurance", value: "HealthPlus #4821" },
            { label: "Emergency Contact", value: "+1 555-0456" },
          ].map((item) => (
            <div key={item.label} className="px-4 py-3 rounded-xl bg-white/50 border border-white/60">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-semibold mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="font-bold mb-4">Account</h3>
        <div className="space-y-2">
          {[
            { icon: FileText, label: "Medical Records" },
            { icon: Pill, label: "Prescriptions" },
            { icon: Settings, label: "Preferences" },
            { icon: Bell, label: "Notifications" },
            { icon: LogOut, label: "Sign Out", danger: true },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.danger ? "text-red-600 hover:bg-red-50" : "hover:bg-white/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {!item.danger && <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
