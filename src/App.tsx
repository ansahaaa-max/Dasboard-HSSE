/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MainNavSection, 
  K3Submenu, 
  KeamananSubmenu, 
  AnggaranSubmenu,
  MaturityOverview,
  ApdItem,
  FireEquipmentItem,
  ProgramK3Item,
  CctvCamera,
  SarprasKeamananItem,
  PortalKeamananItem,
  SatpamPersonel,
  AnggaranItem
} from './types/dashboard';

import { 
  INITIAL_MATURITY_K3, 
  INITIAL_MATURITY_KEAMANAN,
  INITIAL_APD_LIST,
  INITIAL_FIRE_EQUIPMENT,
  INITIAL_PROGRAM_K3,
  INITIAL_CCTV_LIST,
  INITIAL_SARPRAS_LIST,
  INITIAL_PORTAL_LIST,
  INITIAL_SATPAM_LIST,
  INITIAL_ANGGARAN_LIST
} from './data/initialData';

import { INITIAL_JOBS, INITIAL_INCIDENTS } from './data/mockHsseData';

import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardOverview } from './components/DashboardOverview';
import { K3View } from './components/K3View';
import { KeamananView } from './components/KeamananView';
import { AnggaranView } from './components/AnggaranView';
import { UnifiedDataModal } from './components/UnifiedDataModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ExportReportModal } from './components/ExportReportModal';

export default function App() {
  // Theme state: dark or light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('pln_upt_madiun_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Sync theme to localStorage and html tag
  useEffect(() => {
    try {
      localStorage.setItem('pln_upt_madiun_theme', theme);
    } catch (err) {
      console.error(err);
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
      document.body.classList.remove('bg-slate-100', 'text-slate-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-slate-100', 'text-slate-900');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
    }
  }, [theme]);

  // Navigation State
  const [currentSection, setCurrentSection] = useState<MainNavSection>('dashboard');
  const [k3Submenu, setK3Submenu] = useState<K3Submenu>('maturity');
  const [keamananSubmenu, setKeamananSubmenu] = useState<KeamananSubmenu>('cctv');
  const [anggaranSubmenu, setAnggaranSubmenu] = useState<AnggaranSubmenu>('all');
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);

  // Filter & Search State
  const [selectedLocation, setSelectedLocation] = useState<string>('Semua Lokasi (UPT Madiun)');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Telemetry Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Baru saja');

  // Datasets with LocalStorage persistence
  const [maturityK3, setMaturityK3] = useState<MaturityOverview>(() => {
    try {
      const saved = localStorage.getItem('pln_k3_maturity');
      return saved ? JSON.parse(saved) : INITIAL_MATURITY_K3;
    } catch {
      return INITIAL_MATURITY_K3;
    }
  });

  const [maturityKeamanan, setMaturityKeamanan] = useState<MaturityOverview>(() => {
    try {
      const saved = localStorage.getItem('pln_sec_maturity');
      return saved ? JSON.parse(saved) : INITIAL_MATURITY_KEAMANAN;
    } catch {
      return INITIAL_MATURITY_KEAMANAN;
    }
  });

  const [apdList, setApdList] = useState<ApdItem[]>(() => {
    try {
      const saved = localStorage.getItem('pln_apd_list');
      return saved ? JSON.parse(saved) : INITIAL_APD_LIST;
    } catch {
      return INITIAL_APD_LIST;
    }
  });

  const [fireList, setFireList] = useState<FireEquipmentItem[]>(() => {
    try {
      // Clear legacy hydrant / fire data so the user can input clean new data
      const clearedFlag = localStorage.getItem('pln_hydrant_cleared_v2');
      if (!clearedFlag) {
        localStorage.removeItem('pln_fire_list');
        localStorage.removeItem('pln_upt_madiun_hydrants');
        localStorage.setItem('pln_hydrant_cleared_v2', 'true');
        return [];
      }
      const saved = localStorage.getItem('pln_fire_list');
      return saved ? JSON.parse(saved) : INITIAL_FIRE_EQUIPMENT;
    } catch {
      return INITIAL_FIRE_EQUIPMENT;
    }
  });

  const [programK3List, setProgramK3List] = useState<ProgramK3Item[]>(() => {
    try {
      const saved = localStorage.getItem('pln_prog_k3_list');
      return saved ? JSON.parse(saved) : INITIAL_PROGRAM_K3;
    } catch {
      return INITIAL_PROGRAM_K3;
    }
  });

  const [cctvList, setCctvList] = useState<CctvCamera[]>(() => {
    try {
      const saved = localStorage.getItem('pln_cctv_list');
      return saved ? JSON.parse(saved) : INITIAL_CCTV_LIST;
    } catch {
      return INITIAL_CCTV_LIST;
    }
  });

  const [sarprasList, setSarprasList] = useState<SarprasKeamananItem[]>(() => {
    try {
      const saved = localStorage.getItem('pln_sarpras_list');
      return saved ? JSON.parse(saved) : INITIAL_SARPRAS_LIST;
    } catch {
      return INITIAL_SARPRAS_LIST;
    }
  });

  const [portalList, setPortalList] = useState<PortalKeamananItem[]>(() => {
    try {
      const saved = localStorage.getItem('pln_portal_list');
      return saved ? JSON.parse(saved) : INITIAL_PORTAL_LIST;
    } catch {
      return INITIAL_PORTAL_LIST;
    }
  });

  const [satpamList, setSatpamList] = useState<SatpamPersonel[]>(() => {
    try {
      const saved = localStorage.getItem('pln_satpam_list');
      return saved ? JSON.parse(saved) : INITIAL_SATPAM_LIST;
    } catch {
      return INITIAL_SATPAM_LIST;
    }
  });

  const [anggaranList, setAnggaranList] = useState<AnggaranItem[]>(() => {
    try {
      const saved = localStorage.getItem('pln_anggaran_list');
      return saved ? JSON.parse(saved) : INITIAL_ANGGARAN_LIST;
    } catch {
      return INITIAL_ANGGARAN_LIST;
    }
  });

  // Save states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pln_k3_maturity', JSON.stringify(maturityK3));
      localStorage.setItem('pln_sec_maturity', JSON.stringify(maturityKeamanan));
      localStorage.setItem('pln_apd_list', JSON.stringify(apdList));
      localStorage.setItem('pln_fire_list', JSON.stringify(fireList));
      localStorage.setItem('pln_prog_k3_list', JSON.stringify(programK3List));
      localStorage.setItem('pln_cctv_list', JSON.stringify(cctvList));
      localStorage.setItem('pln_sarpras_list', JSON.stringify(sarprasList));
      localStorage.setItem('pln_portal_list', JSON.stringify(portalList));
      localStorage.setItem('pln_satpam_list', JSON.stringify(satpamList));
      localStorage.setItem('pln_anggaran_list', JSON.stringify(anggaranList));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  }, [maturityK3, maturityKeamanan, apdList, fireList, programK3List, cctvList, sarprasList, portalList, satpamList, anggaranList]);

  // Real-time telemetry simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
    }, 12000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Modal Control States
  const [modalEntityType, setModalEntityType] = useState<'apd' | 'fire' | 'program' | 'cctv' | 'sarpras' | 'portal' | 'satpam' | 'anggaran' | 'indicator' | 'indicator-sec' | null>(null);
  const [modalEditItem, setModalEditItem] = useState<any | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Handlers for Add / Edit / Delete
  const handleOpenAddModal = (type?: string) => {
    const determinedType = (type || (currentSection === 'k3' ? 'program' : currentSection === 'keamanan' ? 'cctv' : currentSection === 'anggaran' ? 'anggaran' : 'program')) as any;
    setModalEditItem(null);
    setModalEntityType(determinedType);
  };

  const handleEditItem = (type: string, item: any) => {
    setModalEntityType(type as any);
    setModalEditItem(item);
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    if (type === 'apd') {
      setApdList(prev => prev.filter(x => x.id !== id));
    } else if (type === 'fire') {
      setFireList(prev => prev.filter(x => x.id !== id));
    } else if (type === 'program') {
      setProgramK3List(prev => prev.filter(x => x.id !== id));
    } else if (type === 'cctv') {
      setCctvList(prev => prev.filter(x => x.id !== id));
    } else if (type === 'sarpras') {
      setSarprasList(prev => prev.filter(x => x.id !== id));
    } else if (type === 'portal') {
      setPortalList(prev => prev.filter(x => x.id !== id));
    } else if (type === 'satpam') {
      setSatpamList(prev => prev.filter(x => x.id !== id));
    } else if (type === 'anggaran') {
      setAnggaranList(prev => prev.filter(x => x.id !== id));
    }
  };

  const handleSaveModal = (entityType: string, data: any) => {
    const isEdit = Boolean(modalEditItem);

    if (entityType === 'apd') {
      setApdList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'fire') {
      setFireList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'program') {
      setProgramK3List(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'cctv') {
      setCctvList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'sarpras') {
      setSarprasList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'portal') {
      setPortalList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'satpam') {
      setSatpamList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'anggaran') {
      setAnggaranList(prev => isEdit ? prev.map(x => x.id === data.id ? data : x) : [data, ...prev]);
    } else if (entityType === 'indicator') {
      setMaturityK3(prev => ({
        ...prev,
        indicators: isEdit ? prev.indicators.map(x => x.id === data.id ? data : x) : [data, ...prev.indicators]
      }));
    } else if (entityType === 'indicator-sec') {
      setMaturityKeamanan(prev => ({
        ...prev,
        indicators: isEdit ? prev.indicators.map(x => x.id === data.id ? data : x) : [data, ...prev.indicators]
      }));
    }
  };

  // Direct navigation handler from overview cards
  const handleDirectNavigate = (section: MainNavSection, submenu?: string) => {
    setCurrentSection(section);
    if (section === 'k3' && submenu) {
      setK3Submenu(submenu as K3Submenu);
    } else if (section === 'keamanan' && submenu) {
      setKeamananSubmenu(submenu as KeamananSubmenu);
    } else if (section === 'anggaran' && submenu) {
      setAnggaranSubmenu(submenu as AnggaranSubmenu);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* 1. SIDEBAR NAVIGASI DI SEBELAH KIRI (POIN 1 & 4 PROMPT) */}
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        k3Submenu={k3Submenu}
        setK3Submenu={setK3Submenu}
        keamananSubmenu={keamananSubmenu}
        setKeamananSubmenu={setKeamananSubmenu}
        anggaranSubmenu={anggaranSubmenu}
        setAnggaranSubmenu={setAnggaranSubmenu}
        isOpenMobile={isOpenMobileSidebar}
        setIsOpenMobile={setIsOpenMobileSidebar}
        theme={theme}
        setTheme={setTheme}
        onOpenExport={() => setIsExportOpen(true)}
        badgeCounts={{
          k3Issues: programK3List.filter(p => p.status === 'Terkendala').length,
          keamananIssues: cctvList.filter(c => c.statusOperasional !== 'Aktif Online').length,
          satpamTotal: satpamList.length,
          cctvTotal: cctvList.length,
        }}
      />

      {/* 2. AREA KONTEN UTAMA DI SEBELAH KANAN (POIN 1 PROMPT) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        
        {/* Top Navbar */}
        <TopNavbar
          currentSection={currentSection}
          k3Submenu={k3Submenu}
          keamananSubmenu={keamananSubmenu}
          anggaranSubmenu={anggaranSubmenu}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileSidebar={() => setIsOpenMobileSidebar(true)}
          onOpenNewItem={() => handleOpenAddModal()}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          notificationCount={3}
          theme={theme}
          setTheme={setTheme}
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          lastSyncTime={lastSyncTime}
        />

        {/* Content Body Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* View Routing */}
          {currentSection === 'dashboard' && (
            <DashboardOverview
              maturityK3={maturityK3}
              maturityKeamanan={maturityKeamanan}
              apdList={apdList}
              fireList={fireList}
              programK3List={programK3List}
              cctvList={cctvList}
              sarprasList={sarprasList}
              portalList={portalList}
              satpamList={satpamList}
              anggaranList={anggaranList}
              onNavigate={handleDirectNavigate}
              onOpenNewItem={() => handleOpenAddModal()}
              theme={theme}
              selectedLocation={selectedLocation}
            />
          )}

          {currentSection === 'k3' && (
            <K3View
              submenu={k3Submenu}
              setSubmenu={setK3Submenu}
              maturityK3={maturityK3}
              apdList={apdList}
              fireList={fireList}
              programList={programK3List}
              onOpenAddModal={(type) => handleOpenAddModal(type)}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              searchQuery={searchQuery}
              selectedLocation={selectedLocation}
              theme={theme}
            />
          )}

          {currentSection === 'keamanan' && (
            <KeamananView
              submenu={keamananSubmenu}
              setSubmenu={setKeamananSubmenu}
              maturityKeamanan={maturityKeamanan}
              cctvList={cctvList}
              sarprasList={sarprasList}
              portalList={portalList}
              satpamList={satpamList}
              onOpenAddModal={(type) => handleOpenAddModal(type)}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              searchQuery={searchQuery}
              selectedLocation={selectedLocation}
              theme={theme}
            />
          )}

          {currentSection === 'anggaran' && (
            <AnggaranView
              submenu={anggaranSubmenu}
              setSubmenu={setAnggaranSubmenu}
              anggaranList={anggaranList}
              onOpenAddModal={() => handleOpenAddModal('anggaran')}
              onEditItem={(item) => handleEditItem('anggaran', item)}
              onDeleteItem={(id) => handleDeleteItem('anggaran', id)}
              searchQuery={searchQuery}
              theme={theme}
            />
          )}

        </main>

        {/* Quiet Corporate Footer */}
        <footer className={`border-t py-5 px-6 text-xs transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
                BPI Danantara &middot; PT PLN (Persero) UPT Madiun
              </span>
              <span>&bull;</span>
              <span>Sistem Monitoring HSSE & Obvitnas Terintegrasi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-500 font-semibold">Zero Accident 2026</span>
              <span>&bull;</span>
              <span>SMK3 PP 50/2012 & Perpol 07/2019</span>
            </div>
          </div>
        </footer>

      </div>

      {/* MODALS */}
      <UnifiedDataModal
        isOpen={Boolean(modalEntityType)}
        onClose={() => {
          setModalEntityType(null);
          setModalEditItem(null);
        }}
        entityType={modalEntityType}
        editItem={modalEditItem}
        onSave={handleSaveModal}
        theme={theme}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleDirectNavigate}
        theme={theme}
      />

      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        jobs={INITIAL_JOBS}
        incidents={INITIAL_INCIDENTS}
        safeHours={3095920}
        daysWithoutLti={1428}
      />

    </div>
  );
}
