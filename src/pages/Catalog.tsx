import { rooms } from "@/pages/Landing";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CursorGlow } from "@/components/CursorGlow";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Star,
  BedDouble,
  Maximize,
  Eye,
  SlidersHorizontal,
  X,
  ArrowLeft,
} from "lucide-react";

const categories = ["All", "Room", "Suite", "Penthouse"];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating">("rating");
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const filtered = rooms
    .filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.amenities.some((a) => a.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === "All" || r.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen">
      <CursorGlow />

      {/* Sticky header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
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
        {/* Header */}
        <div ref={headerRef} className="reveal-up mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy-900">
            Browse Our Collection
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find the perfect space for your next stay — filter by type, search by amenity, or sort to find what matters most.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="glass-strong rounded-2xl p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search rooms, amenities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-white/60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900/15 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-navy-900/10 flex items-center justify-center hover:bg-navy-900/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="pl-10 pr-8 py-3 rounded-xl bg-white/50 border border-white/60 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-navy-900/10 transition-all cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  category === cat
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-white/50 text-navy-700 hover:bg-white/80 border border-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "room" : "rooms"} found
        </p>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {filtered.map((room) => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/room/${room.id}`}>
                <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer">
                  <div className={`h-48 ${room.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent" />
                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-semibold text-navy-900">
                      {room.category}
                    </div>
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 text-navy-900" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                        <span className="text-sm font-semibold">{room.rating}</span>
                        <span className="text-xs text-muted-foreground">({room.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {room.description}
                    </p>

                    {/* Amenities chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 rounded-md bg-navy-900/4 text-[11px] font-medium text-navy-700"
                        >
                          {a}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-navy-900/4 text-[11px] font-medium text-navy-500">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5" /> {room.capacity}
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
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-navy-900 mb-2">No rooms match your search</p>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="glass px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-800 hover:bg-white/70 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
