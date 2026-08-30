import { rooms } from "@/pages/Landing";
import { CursorGlow } from "@/components/CursorGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  BedDouble,
  Maximize,
  Users,
  Check,
  Send,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ── placeholder comments ────────────────────────────────────── */
const sampleComments = [
  {
    id: 1,
    name: "Victoria C.",
    date: "2 weeks ago",
    text: "Absolutely stunning room. The attention to detail is remarkable — from the linens to the view. We will definitely be returning.",
    rating: 5,
    initials: "VC",
  },
  {
    id: 2,
    name: "James H.",
    date: "1 month ago",
    text: "Perfect for our anniversary trip. The concierge arranged everything and the room was more beautiful than the photos suggest.",
    rating: 5,
    initials: "JH",
  },
  {
    id: 3,
    name: "Anika S.",
    date: "2 months ago",
    text: "Spacious, elegant, and incredibly comfortable. Minor note: the elevator can be slow during peak hours, but the room itself is flawless.",
    rating: 4,
    initials: "AS",
  },
];

export default function RoomDetail() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id);
  const headerRef = useScrollReveal();
  const detailsRef = useScrollReveal();

  /* booking form state */
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);

  /* comments state */
  const [comments, setComments] = useState(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const commentInputRef = useScrollReveal();

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-navy-900 mb-2">Room not found</p>
          <Link to="/catalog" className="text-sm text-primary underline">
            Browse all rooms
          </Link>
        </div>
      </div>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 0;
  const total = nights * room.price;

  const handleBook = () => {
    if (!checkIn || !checkOut || nights <= 0) return;
    setBooked(true);
    setTimeout(() => setBooked(false), 4000);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    const c = {
      id: Date.now(),
      name: "You",
      date: "Just now",
      text: newComment,
      rating: newRating,
      initials: "YO",
    };
    setComments([c, ...comments]);
    setNewComment("");
    setNewRating(5);
  };

  return (
    <div className="min-h-screen">
      <CursorGlow />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/catalog"
              className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-navy-800" />
            </Link>
            <span className="text-lg font-bold tracking-tight text-navy-900">
              DMC <span className="font-light text-navy-600">Hospitality</span>
            </span>
          </div>
          <Link
            to="/auth"
            className="glass-btn px-4 py-2 rounded-xl text-xs font-semibold text-white"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/catalog" className="hover:text-foreground transition-colors">Rooms</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{room.name}</span>
        </div>

        {/* Hero Image */}
        <div ref={headerRef} className="reveal-up">
          <div className={`${room.gradient} rounded-3xl h-64 sm:h-80 lg:h-96 relative overflow-hidden mb-8`}>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full text-sm font-semibold text-navy-900">
              {room.category}
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="glass-strong rounded-2xl px-5 py-3">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(room.rating) ? "text-gold-400 fill-gold-400" : "text-navy-200"}`}
                    />
                  ))}
                  <span className="text-sm font-bold text-navy-900 ml-2">{room.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{room.reviews} verified reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left – Details */}
          <div ref={detailsRef} className="reveal-left lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-2">{room.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{room.description}</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BedDouble, label: room.amenities[0] || "Bed" },
                { icon: Users, label: `${room.capacity} Guests` },
                { icon: Maximize, label: room.size },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <s.icon className="w-5 h-5 text-navy-800 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-navy-900">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-white/60">
                    <Check className="w-4 h-4 text-gold-500 shrink-0" />
                    <span className="text-sm font-medium text-navy-800">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-4">Guest Reviews</h2>

              {/* Add comment */}
              <div ref={commentInputRef} className="reveal-up glass-strong rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-navy-800">Your rating:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setNewRating(r)}
                        aria-label={`Rate ${r} stars`}
                      >
                        <Star
                          className={`w-4 h-4 transition-colors ${
                            r <= newRating ? "text-gold-400 fill-gold-400" : "text-navy-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Share your experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleComment()}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all"
                  />
                  <button
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-white disabled:opacity-40 hover:bg-navy-800 transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Comment list */}
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="glass-card rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-sm text-navy-900">{c.name}</p>
                          <span className="text-xs text-muted-foreground">{c.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: c.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-6 sticky top-24">
              <div className="flex items-baseline justify-between mb-6">
                <p className="text-2xl font-bold text-navy-900">
                  ${room.price}
                  <span className="text-sm font-normal text-muted-foreground"> / night</span>
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  <span className="text-sm font-semibold">{room.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs font-semibold text-navy-800 mb-1 block">Check In</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-navy-800 mb-1 block">Check Out</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-navy-800 mb-1 block">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all"
                    >
                      {Array.from({ length: room.capacity }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price summary */}
              {nights > 0 && (
                <div className="border-t border-black/5 pt-4 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${room.price} × {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-medium">${total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="font-medium">${Math.round(total * 0.08)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-black/5">
                    <span>Total</span>
                    <span>${total + Math.round(total * 0.08)}</span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {booked ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full py-3.5 rounded-xl bg-teal-600 text-white text-sm font-semibold text-center"
                  >
                    ✓ Booking Confirmed
                  </motion.div>
                ) : (
                  <motion.button
                    key="book"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBook}
                    disabled={!checkIn || !checkOut || nights <= 0}
                    className="w-full py-3.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {nights > 0 ? `Reserve — $${total + Math.round(total * 0.08)}` : "Select Dates to Reserve"}
                  </motion.button>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground text-center mt-3">
                No charge until check-in. Free cancellation within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
