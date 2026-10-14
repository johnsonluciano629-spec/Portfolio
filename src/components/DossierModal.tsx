import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, Printer, Shield, CheckCircle, Mail } from 'lucide-react';

export const DossierModal: React.FC = () => {
  const { data, isDossierOpen, setIsDossierOpen } = usePlayer();

  if (!isDossierOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative my-6 w-full max-w-4xl rounded-2xl border border-zinc-700 bg-zinc-950 p-6 sm:p-10 shadow-2xl print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Header Controls (Hidden during print) */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800 print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-display text-xl font-bold uppercase text-white">
              Official Scouting Dossier & Player Card
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setIsDossierOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOSSIER CONTENT */}
        <div className="mt-6 print:mt-0">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-800 print:border-black">
            <div className="flex items-center gap-5">
              <div className="h-24 w-20 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0 print:border-black flex items-center justify-center">
                {data.heroPortrait ? (
                  <img
                    src={data.heroPortrait}
                    alt={data.fullName}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-amber-400 font-display font-bold text-lg">
                    <span>#28</span>
                    <span className="text-[10px] text-zinc-400 font-sans uppercase">Striker</span>
                  </div>
                )}
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 print:text-black">
                  Official Player Profile
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white print:text-black tracking-tight">
                  {data.fullName}
                </h1>
                <div className="text-sm font-semibold text-zinc-300 print:text-zinc-700">
                  {data.profession} · {data.position}
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 text-xs text-zinc-400 print:text-black">
              <div className="flex items-center sm:justify-end gap-1.5 font-bold text-amber-400 print:text-black">
                <Mail className="w-3.5 h-3.5" />
                <span>{data.email}</span>
              </div>
              <div>Current Club: <strong className="text-white print:text-black">{data.currentClub}</strong></div>
              <div>Status: <span className="text-emerald-400 print:text-black font-semibold">Active Competitive Player</span></div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black mb-3">
              Player Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Position</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">{data.position}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Secondary</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">{data.secondaryPosition}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Nationality</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">{data.nationality}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Preferred Foot</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">{data.preferredFoot}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Height</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">{data.height}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Current Club</div>
                <div className="font-bold text-sm text-amber-400 print:text-black mt-0.5">{data.currentClub}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Jersey Number</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">#{data.squadNumber}</div>
              </div>
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 print:bg-zinc-100 print:border-zinc-300">
                <div className="text-[11px] text-zinc-400 print:text-zinc-600 uppercase font-medium">Clubs Played</div>
                <div className="font-bold text-sm text-white print:text-black mt-0.5">{data.clubs.length} Clubs</div>
              </div>
            </div>
          </div>

          {/* Career Clubs History */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black mb-3">
              Career Experience & Football Clubs
            </h3>
            <div className="space-y-2.5">
              {data.clubs.map((club, idx) => (
                <div
                  key={club.id}
                  className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30 print:border-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-amber-400 print:text-black">
                      0{idx + 1}
                    </span>
                    <div>
                      <strong className="text-white print:text-black text-sm">{club.name}</strong>
                      <span className="text-xs text-zinc-400 print:text-zinc-600 ml-2">
                        · {club.tierOrLeague}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-300 print:text-black flex items-center gap-4">
                    <span>Position: <strong>{club.position}</strong></span>
                    <span>Season: <strong>{club.years}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Strengths & Attributes */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black mb-3">
              Player Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.strengths.map((str, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 print:bg-zinc-100 print:text-black print:border-zinc-300"
                >
                  {str}
                </span>
              ))}
            </div>
          </div>

          {/* Official Biography Statement */}
          <div className="mt-6 pt-5 border-t border-zinc-800 print:border-zinc-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black mb-2">
              Player Statement & Ethos
            </h3>
            <p className="text-xs text-zinc-300 print:text-zinc-800 leading-relaxed">
              {data.bioParagraphs[0]}
            </p>
          </div>

          {/* Confidentiality / Scouting Verification Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 print:border-black flex items-center justify-between text-[11px] text-zinc-500 print:text-zinc-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
              <span>Official Player Representative Document</span>
            </div>
            <span>Contact: {data.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
