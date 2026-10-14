import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { ArrowUp, Mail, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsEditModalOpen, setIsDossierOpen } = usePlayer();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-zinc-800 bg-[#050507] py-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-850">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/40 bg-zinc-900 text-amber-400 font-bold text-xs">
                LJ
              </div>
              <span className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                {data.fullName}
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400 max-w-md">
              Official digital football portfolio and player dossier. Verified record including ONE FC, Old Mutual FC, Cape Umoya FC, Clarewood FC, Antalyaspor FC, and Vasco FC.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-zinc-300">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('career')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Career Clubs
            </button>
            <button
              onClick={() => scrollToSection('profile')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Player Profile
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Luciano Johnson. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">{data.email}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Admin / Edit Data
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Scouting Report
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
