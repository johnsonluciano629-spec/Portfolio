/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlayerProvider } from './context/PlayerContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Career } from './components/Career';
import { Profile } from './components/Profile';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { EditProfileModal } from './components/EditProfileModal';
import { DossierModal } from './components/DossierModal';

export default function App() {
  return (
    <PlayerProvider>
      <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col font-sans selection:bg-amber-400/25 selection:text-amber-200">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Career />
          <Profile />
          <Gallery />
          <Contact />
        </main>
        <Footer />

        {/* Global Portals & Modals */}
        <LightboxModal />
        <EditProfileModal />
        <DossierModal />
      </div>
    </PlayerProvider>
  );
}
