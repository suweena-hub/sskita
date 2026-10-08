import React from 'react';
import { useITA } from '../context/ITAContext';
import { Settings, Shield, Globe, Award } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'indicators' | 'public' | 'assessment';
  setCurrentTab: (tab: 'dashboard' | 'indicators' | 'public' | 'assessment') => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSettings
}) => {
  const { profile, currentRole, setCurrentRole, stats } = useITA();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ZONE 1: Brand title, single line text element */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="text-left cursor-pointer group"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                MOPH-ITA โรงพยาบาลชุมชน
              </span>
            </button>
          </div>

          {/* ZONE 2: 4 Nav links with clean typography */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-1 mt-1'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              ภาพรวมเดชบอร์ด
            </button>

            <button
              onClick={() => setCurrentTab('indicators')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'indicators'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-1 mt-1'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              ตัวชี้วัด MOIT 1 - MOIT 22
            </button>

            <button
              onClick={() => setCurrentTab('public')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'public'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-1 mt-1'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              ศูนย์ข้อมูลข่าวสารสาธารณะ
            </button>

            <button
              onClick={() => setCurrentTab('assessment')}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'assessment'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700 pb-1 mt-1'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              ประเมินคะแนน & สรุปผล
            </button>
          </nav>

          {/* ZONE 3: 1-2 Primary actions */}
          <div className="flex items-center gap-3">
            {/* Role switcher segmented button */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setCurrentRole('staff')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  currentRole === 'staff'
                    ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="โหมดเจ้าหน้าที่โรงพยาบาล: จัดการ อัปโหลด และตรวจประเมิน"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">โหมดเจ้าหน้าที่</span>
                <span className="sm:hidden">จนท.</span>
              </button>

              <button
                onClick={() => {
                  setCurrentRole('public');
                  setCurrentTab('public');
                }}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  currentRole === 'public'
                    ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="มุมมองประชาชน: สำหรับผู้รับบริการและผู้ตรวจประเมินภายนอก"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">มุมมองประชาชน</span>
                <span className="sm:hidden">ประชาชน</span>
              </button>
            </div>

            {/* Hospital Settings / Fiscal Year button */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="ตั้งค่าข้อมูลโรงพยาบาลและปีงบประมาณ"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 border-t border-slate-100 gap-4 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`whitespace-nowrap ${currentTab === 'dashboard' ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}
          >
            ภาพรวม
          </button>
          <button
            onClick={() => setCurrentTab('indicators')}
            className={`whitespace-nowrap ${currentTab === 'indicators' ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}
          >
            MOIT 1-22
          </button>
          <button
            onClick={() => setCurrentTab('public')}
            className={`whitespace-nowrap ${currentTab === 'public' ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}
          >
            ศูนย์ข้อมูลข่าวสาร
          </button>
          <button
            onClick={() => setCurrentTab('assessment')}
            className={`whitespace-nowrap ${currentTab === 'assessment' ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}
          >
            ประเมินคะแนน
          </button>
        </div>
      </div>
    </header>
  );
};
