import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Menu, X, FileText, Edit3 } from 'lucide-react';

export const Header: React.FC = () => {
  const { setIsDossierOpen, setIsEditModalOpen } = usePlayer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="group flex items-center gap-3 shrink-0 whitespace-nowrap focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/40 bg-zinc-900/90 text-amber-400 font-bold tracking-wider transition-all duration-200 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black">
            LJ
          </div>
          <span className="font-display text-2xl font-black uppercase tracking-wider text-white transition-colors group-hover:text-amber-400">
            Luciano Johnson
          </span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-zinc-300">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('career')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Career Clubs
          </button>
          <button
            onClick={() => scrollToSection('profile')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Player Profile
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Gallery
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700/80 rounded-lg hover:border-amber-400/50 transition-all cursor-pointer whitespace-nowrap"
            title="Edit Player Data"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700/80 rounded-lg hover:border-amber-400/50 transition-all cursor-pointer whitespace-nowrap"
            title="View Official Scouting Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Scouting Dossier</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact Scout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 text-zinc-400 hover:text-amber-400 border border-zinc-800 rounded-md"
            aria-label="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-md border border-zinc-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-[#0c0c0e] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-base font-medium">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-zinc-200 hover:text-amber-400 transition-colors py-1"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('career')}
              className="text-left text-zinc-200 hover:text-amber-400 transition-colors py-1"
            >
              Career Clubs
            </button>
            <button
              onClick={() => scrollToSection('profile')}
              className="text-left text-zinc-200 hover:text-amber-400 transition-colors py-1"
            >
              Player Profile
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-left text-zinc-200 hover:text-amber-400 transition-colors py-1"
            >
              Gallery
            </button>
            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDossierOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Download Player Dossier</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 text-sm font-bold uppercase tracking-wider text-black bg-amber-400 rounded-lg text-center"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
