import React, { useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Shield, ArrowRight, Mail, Upload, Camera, Trash2, User } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, updateProfile } = usePlayer();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          updateProfile({ heroPortrait: uploadEvent.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemovePhoto = () => {
    updateProfile({ heroPortrait: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden border-b border-zinc-800">
      {/* Stadium Background with Film Noir / High Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.stadiumBg}
          alt="Football Arena Stadium Floodlights"
          className="h-full w-full object-cover object-center filter brightness-[0.28] contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#080808]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.12),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
        {/* Split Screen 2-Column Desktop Baseline */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Metadata with Typographic Separator */}
            <div className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-widest text-amber-400 uppercase">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Professional Football Player</span>
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Position: {data.position}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-amber-300 font-bold">Current Club: {data.currentClub}</span>
            </div>

            {/* Main Headline strictly matching requirements */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] text-balance">
              LUCIANO JOHNSON <span className="text-amber-400">—</span> BUILT FOR THE GAME.
            </h1>

            {/* Official Introduction paragraph */}
            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {data.heroIntro}
            </p>

            {/* Action Buttons: Explore My Career & Contact Me */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('career')}
                className="group flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore My Career</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-zinc-900/90 border border-zinc-700/80 rounded-lg hover:border-amber-400 hover:text-amber-400 hover:bg-zinc-850 transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Key Information Badges */}
            <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400">Current Club:</span>
                <span className="text-white font-semibold">{data.currentClub}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400">Squad Role:</span>
                <span className="text-white font-semibold">#{data.squadNumber} · {data.position}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">{data.email}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container / Custom Picture Upload */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Backing Gold Glow Accent */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-amber-400/30 via-zinc-800/50 to-amber-600/20 blur-md opacity-80" />

              <div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950 shadow-2xl">
                {/* Photo Display or Upload Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative aspect-[3/4] w-full overflow-hidden transition-all ${
                    data.heroPortrait ? 'bg-zinc-900' : 'bg-gradient-to-b from-zinc-900 via-zinc-950 to-black'
                  } ${isDragging ? 'ring-2 ring-amber-400 bg-amber-400/10' : ''}`}
                >
                  {data.heroPortrait ? (
                    <>
                      <img
                        src={data.heroPortrait}
                        alt="Luciano Johnson — Striker"
                        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Subtle Gradient Scrim at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded bg-black/85 px-2.5 py-1 text-xs font-mono font-bold tracking-wider text-amber-400 border border-amber-400/40 backdrop-blur-sm">
                          #{data.squadNumber}
                        </span>
                        <span className="rounded bg-black/85 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white border border-zinc-700 backdrop-blur-sm">
                          {data.position}
                        </span>
                      </div>

                      {/* Top Action Buttons: Change or Remove */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 rounded bg-black/85 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-amber-400 border border-zinc-700 hover:border-amber-400/60 transition-all cursor-pointer backdrop-blur-sm"
                          title="Change to another picture"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Change</span>
                        </button>
                        <button
                          onClick={handleRemovePhoto}
                          className="flex items-center justify-center rounded bg-black/85 p-1 text-zinc-400 hover:text-rose-400 border border-zinc-700 hover:border-rose-400/60 transition-all cursor-pointer backdrop-blur-sm"
                          title="Remove picture"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Clean Athlete Silhouette & Immediate Upload UI */
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="h-full w-full flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                    >
                      {/* Top Badges on placeholder */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded bg-black/85 px-2.5 py-1 text-xs font-mono font-bold tracking-wider text-amber-400 border border-amber-400/40">
                          #{data.squadNumber}
                        </span>
                        <span className="rounded bg-black/85 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white border border-zinc-700">
                          {data.position}
                        </span>
                      </div>

                      {/* Player Silhouette & Upload Icon */}
                      <div className="relative mb-6">
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-amber-400/50 bg-amber-400/10 text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-400/20 group-hover:scale-105 transition-all shadow-lg shadow-amber-500/10">
                          <User className="w-14 h-14 text-amber-400" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-black font-bold shadow-md">
                          <Upload className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white group-hover:text-amber-300 transition-colors">
                        Add Your Picture
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 max-w-xs leading-relaxed">
                        Click here or drag and drop your football match, training, or official portrait photo.
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 text-black font-bold uppercase text-xs tracking-wider group-hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20">
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo</span>
                      </div>
                      <span className="mt-3 text-[11px] text-zinc-500">
                        PNG, JPG, WEBP supported
                      </span>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhotoUpload}
                    className="hidden"
                  />

                  {/* Bottom Player Card Identity */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/90 border border-zinc-800 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                          #{data.squadNumber} · {data.position}
                        </div>
                        <div className="font-display text-2xl font-black uppercase text-white tracking-wide">
                          {data.fullName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Club</div>
                        <div className="text-xs font-bold text-amber-400">
                          {data.currentClub}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Metric Strip Below the Hero Split */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-zinc-800 pt-8">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Position</div>
            <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">STRIKER</div>
            <div className="mt-1 text-xs text-zinc-400">Jersey #{data.squadNumber} · Center Forward</div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Current Club</div>
            <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-amber-300 truncate">
              {data.currentClub}
            </div>
            <div className="mt-1 text-xs text-zinc-400">Active Competitive Squad</div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Career Clubs</div>
            <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">6 CLUBS</div>
            <div className="mt-1 text-xs text-zinc-400 truncate">ONE FC, Old Mutual, Umoya, Clarewood, Antalyaspor, Vasco</div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Direct Inquiries</div>
            <div className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-white">DIRECT</div>
            <div className="mt-1 text-xs text-zinc-400 truncate">{data.email}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
