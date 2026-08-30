import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  BedDouble,
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
  XCircle,
  Bell,
  CreditCard,
} from "lucide-react";

/* ── placeholder bookings ────────────────────────────────────── */
const sampleBookings = [
  {
    id: 1,
    room: "Deluxe Suite",
    checkIn: "2026-09-12",
    checkOut: "2026-09-15",
    guests: 2,
    total: 867,
    status: "upcoming" as const,
  },
  {
    id: 2,
    room: "Executive Room",
    checkIn: "2026-08-01",
    checkOut: "2026-08-03",
    guests: 1,
    total: 398,
    status: "completed" as const,
  },
  {
    id: 3,
    room: "Premium Family",
    checkIn: "2026-07-10",
    checkOut: "2026-07-14",
    guests: 4,
    total: 1396,
    status: "completed" as const,
  },
];

/* ── placeholder messages ────────────────────────────────────── */
const sampleMessages = [
  {
    id: 1,
    from: "Concierge",
    subject: "Your upcoming reservation — special requests?",
    preview: "Hello! We noticed your Deluxe Suite reservation for Sep 12. Let us know if you have any preferences for room temperature, pillows, or dietary needs.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    from: "Spa & Wellness",
    subject: "Exclusive offer for returning guests",
    preview: "As a valued returning guest, enjoy 20% off any 60-minute treatment during your next stay. Book now to secure your preferred time slot.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    from: "Front Desk",
    subject: "Reservation confirmed — Aug 1–3",
    preview: "Your Executive Room reservation has been confirmed. Check-in is available from 3:00 PM. We look forward to welcoming you.",
    time: "3 days ago",
    unread: false,
  },
];

type Tab = "bookings" | "messages" | "profile";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("bookings");
  const [messages, setMessages] = useState(sampleMessages);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const headerRef = useScrollReveal();

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
    { key: "bookings", label: "Bookings", icon: Calendar, count: sampleBookings.filter((b) => b.status === "upcoming").length },
    { key: "messages", label: "Messages", icon: MessageSquare, count: messages.filter((m) => m.unread).length },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />

      {/* Dashboard Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center text-white font-bold text-sm tracking-tight">
              D
            </div>
            <span className="text-lg font-bold tracking-tight text-navy-900">
              DMC <span className="font-light text-navy-600">Hospitality</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center relative hover:bg-white/60 transition-colors">
              <Bell className="w-4 h-4 text-navy-800" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-gold-400 text-[8px] font-bold text-white flex items-center justify-center">
                {messages.filter((m) => m.unread).length || ""}
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-bold">
              YO
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="reveal-up mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-navy-900">Guest Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your stays, messages, and profile all in one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Upcoming", value: sampleBookings.filter((b) => b.status === "upcoming").length, icon: Calendar, color: "bg-navy-900" },
            { label: "Completed", value: sampleBookings.filter((b) => b.status === "completed").length, icon: CheckCircle, color: "bg-teal-600" },
            { label: "Unread", value: messages.filter((m) => m.unread).length, icon: MessageSquare, color: "bg-gold-400" },
            { label: "Points", value: "2,480", icon: Star, color: "bg-navy-600" },
          ].map((s) => (
            <div key={s.label} className="glass-strong rounded-2xl p-5">
              <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-navy-900">{s.value}</p>
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
                  ? "bg-navy-900 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/40"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span
                  className={`ml-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    tab === t.key ? "bg-white/20 text-white" : "bg-navy-900/10 text-navy-800"
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
          {tab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <BookingsTab bookings={sampleBookings} />
            </motion.div>
          )}
          {tab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <MessagesTab
                messages={messages}
                activeMessage={activeMessage}
                setActiveMessage={(id) => {
                  setActiveMessage(id);
                  if (id !== null) markRead(id);
                }}
                replyText={replyText}
                setReplyText={setReplyText}
                sendReply={sendReply}
              />
            </motion.div>
          )}
          {tab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   BOOKINGS TAB
   ────────────────────────────────────────────────────────────── */
function BookingsTab({
  bookings,
}: {
  bookings: typeof sampleBookings;
}) {
  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="glass-card rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy-900/5 flex items-center justify-center shrink-0">
                <BedDouble className="w-6 h-6 text-navy-800" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900">{b.room}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(b.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    {" – "}
                    {new Date(b.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {b.guests}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:text-right">
              <div>
                <p className="font-bold text-navy-900">${b.total}</p>
                <p className="text-xs text-muted-foreground">total</p>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  b.status === "upcoming"
                    ? "bg-navy-900/8 text-navy-800"
                    : "bg-teal-50 text-teal-700"
                }`}
              >
                {b.status === "upcoming" ? "Upcoming" : "Completed"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MESSAGES TAB
   ────────────────────────────────────────────────────────────── */
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
        <button
          onClick={() => setActiveMessage(null)}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to inbox
        </button>
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {active.from[0]}
            </div>
            <div>
              <p className="font-bold text-navy-900">{active.from}</p>
              <p className="text-sm font-medium text-navy-800">{active.subject}</p>
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
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all"
            />
            <button
              onClick={sendReply}
              disabled={!replyText.trim()}
              className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-white disabled:opacity-40 hover:bg-navy-800 transition-colors shrink-0"
            >
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
            <div className="w-11 h-11 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {m.from[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-navy-900">{m.from}</p>
                  {m.unread && (
                    <span className="w-2 h-2 rounded-full bg-gold-400" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{m.time}</span>
              </div>
              <p className="text-sm font-medium text-navy-800 mb-1">{m.subject}</p>
              <p className="text-xs text-muted-foreground truncate">{m.preview}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
          </div>
        </button>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PROFILE TAB
   ────────────────────────────────────────────────────────────── */
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState("guest@example.com");
  const [phone, setPhone] = useState("+1 555-0123");

  const ref = useScrollReveal();

  return (
    <div ref={ref} className="reveal-up max-w-2xl">
      <div className="glass-strong rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center text-white font-bold text-xl">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-900">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="ml-auto glass px-4 py-2 rounded-xl text-xs font-semibold text-navy-800 hover:bg-white/60 transition-colors"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-navy-800 mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all disabled:opacity-60"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy-800 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editing}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all disabled:opacity-60"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy-800 mb-1 block">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editing}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all disabled:opacity-60"
            />
          </div>
        </div>

        {editing && (
          <button
            onClick={() => setEditing(false)}
            className="mt-6 glass-btn px-6 py-3 rounded-xl text-sm font-semibold text-white"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Quick Links */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="font-bold text-navy-900 mb-4">Account</h3>
        <div className="space-y-2">
          {[
            { icon: CreditCard, label: "Payment Methods" },
            { icon: Settings, label: "Preferences" },
            { icon: Bell, label: "Notifications" },
            { icon: LogOut, label: "Sign Out", danger: true },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-navy-800 hover:bg-white/50"
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
