import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Shield, User, Globe, Ruler, Award, CheckCircle, Edit3, Sparkles } from 'lucide-react';

export const Profile: React.FC = () => {
  const { data, setIsEditModalOpen } = usePlayer();

  const profileAttributes = [
    {
      label: 'Playing Position',
      value: data.position,
      icon: Shield,
      isPending: false,
      note: 'Primary tactical role'
    },
    {
      label: 'Secondary Position',
      value: data.secondaryPosition,
      icon: Shield,
      isPending: false,
      note: 'Attacking versatility'
    },
    {
      label: 'Current Club',
      value: data.currentClub,
      icon: Award,
      isPending: false,
      note: 'Active club record'
    },
    {
      label: 'Squad Number',
      value: `#${data.squadNumber}`,
      icon: Award,
      isPending: false,
      note: 'Jersey number'
    },
    {
      label: 'Nationality',
      value: data.nationality,
      icon: Globe,
      isPending: false,
      note: 'Passport / Eligibility'
    },
    {
      label: 'Height',
      value: data.height,
      icon: Ruler,
      isPending: false,
      note: 'Physical metrics'
    },
    {
      label: 'Preferred Foot',
      value: data.preferredFoot,
      icon: User,
      isPending: false,
      note: 'Ball delivery preference'
    }
  ];

  return (
    <section id="profile" className="relative py-20 lg:py-28 bg-[#0a0a0c] border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Technical Dossier & Attributes
            </div>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Player Profile
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Verified metrics and athletic specifications for Luciano Johnson. Position: <strong className="text-amber-400">{data.position} (#{data.squadNumber})</strong> at <strong className="text-white">{data.currentClub}</strong>.
            </p>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Update Profile Details</span>
          </button>
        </div>

        {/* Grid of Profile Metrics & Tactical Pitch */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: 8 Technical Metric Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profileAttributes.map((attr, idx) => {
              const Icon = attr.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 sm:p-5 transition-all ${
                    attr.isPending
                      ? 'border-dashed border-zinc-700/80 bg-zinc-950/40'
                      : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{attr.label}</span>
                    </div>
                    {attr.isPending ? (
                      <span className="text-[10px] font-mono uppercase text-amber-400/90 font-medium">
                        Click to edit
                      </span>
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>

                  <div className="mt-2.5">
                    <div
                      className={`text-base sm:text-lg font-bold ${
                        attr.isPending ? 'text-zinc-400 italic font-mono text-sm' : 'text-white'
                      }`}
                    >
                      {attr.value}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">{attr.note}</div>
                  </div>
                </div>
              );
            })}

            {/* Tactical Pitch Visualizer: ONLY 9 ADDED, 8 AND 10 REMOVED */}
            <div className="sm:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 mt-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Tactical Pitch Heatmap & Role Adaptation
                </span>
                <span className="text-xs text-zinc-400 font-mono">Central Attacking Focus</span>
              </div>

              {/* Pitch Diagram */}
              <div className="relative aspect-[2.1/1] w-full rounded-lg border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-zinc-950 to-emerald-950/30 overflow-hidden flex items-center justify-center p-4">
                {/* Center circle & Pitch lines */}
                <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/25" />
                <div className="absolute h-24 w-24 rounded-full border border-emerald-500/25" />
                <div className="absolute left-0 top-1/4 bottom-1/4 w-14 border-r border-t border-b border-emerald-500/25" />
                <div className="absolute right-0 top-1/4 bottom-1/4 w-14 border-l border-t border-b border-emerald-500/25" />
                <div className="absolute right-0 top-1/3 bottom-1/3 w-6 border-l border-t border-b border-emerald-500/30" />

                {/* Tactical Heatmap Glow in Attacking Box */}
                <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-36 h-36 rounded-full bg-amber-500/15 blur-xl pointer-events-none" />

                {/* ONLY STRIKER NUMBER 9 PIN (8 and 10 REMOVED) */}
                <div className="absolute top-1/2 left-[78%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-black text-base shadow-xl shadow-amber-400/60 ring-4 ring-amber-400/30 animate-pulse">
                    9
                  </div>
                  <span className="mt-2 text-xs font-black text-amber-300 bg-black/90 px-3 py-1 rounded-md border border-amber-400/60 uppercase tracking-wider shadow-lg">
                    Striker / Number 9
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Player Strengths & Football Achievements */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Player Strengths Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Striker Core Strengths</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-xs sm:text-sm font-semibold text-zinc-200"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Football Achievements Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Football Achievements & Milestones</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {data.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`rounded-xl border p-4 ${
                        ach.isConfirmed
                          ? 'border-zinc-800 bg-zinc-950/70'
                          : 'border-dashed border-zinc-700 bg-zinc-950/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                          <div className="text-xs text-amber-400 mt-0.5">{ach.organization}</div>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {ach.year}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Ready to link verified tournament documentation
                </span>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  Edit Achievements
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
