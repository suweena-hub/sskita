import React, { useState } from 'react';
import { ITAProvider, useITA } from './context/ITAContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MOITListView } from './components/MOITListView';
import { PublicPortalView } from './components/PublicPortalView';
import { AssessmentScoreView } from './components/AssessmentScoreView';
import { MOITDetailModal } from './components/MOITDetailModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { HospitalSettingsModal } from './components/HospitalSettingsModal';
import { EvidenceFile } from './types/ita';
import { Shield, ExternalLink, CheckCircle } from 'lucide-react';

function AppContent() {
  const { indicators, profile, currentRole, setCurrentRole } = useITA();
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'indicators' | 'public' | 'assessment'>('dashboard');

  // Selected MOIT for modal
  const [selectedMOITId, setSelectedMOITId] = useState<string | null>(null);

  // Selected file for preview modal
  const [previewFile, setPreviewFile] = useState<{
    file: EvidenceFile;
    moitCode: string;
    moitTitle: string;
  } | null>(null);

  // Settings modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const selectedIndicator = selectedMOITId
    ? indicators.find((i) => i.id === selectedMOITId) || null
    : null;

  const handleSelectMOIT = (moitId: string) => {
    setSelectedMOITId(moitId);
  };

  const handlePreviewFile = (file: EvidenceFile, moitCode: string, moitTitle: string) => {
    setPreviewFile({ file, moitCode, moitTitle });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            onSelectMOIT={handleSelectMOIT}
            onNavigateToTab={setCurrentTab}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentTab === 'indicators' && (
          <MOITListView onSelectMOIT={handleSelectMOIT} />
        )}

        {currentTab === 'public' && (
          <PublicPortalView
            onPreviewFile={handlePreviewFile}
            onSelectMOIT={handleSelectMOIT}
          />
        )}

        {currentTab === 'assessment' && (
          <AssessmentScoreView onSelectMOIT={handleSelectMOIT} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">MOPH-ITA</span>
            <span>·</span>
            <span>{profile.name}</span>
            <span>·</span>
            <span>ปีงบประมาณ พ.ศ. {profile.fiscalYear}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>ศูนย์ปฏิบัติการต่อต้านการทุจริต กระทรวงสาธารณสุข (ศปท. สธ.)</span>
            <span>·</span>
            <span>สำนักงาน ป.ป.ช.</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedIndicator && (
        <MOITDetailModal
          indicator={selectedIndicator}
          onClose={() => setSelectedMOITId(null)}
          onPreviewFile={handlePreviewFile}
        />
      )}

      {previewFile && (
        <DocumentViewerModal
          file={previewFile.file}
          moitCode={previewFile.moitCode}
          moitTitle={previewFile.moitTitle}
          onClose={() => setPreviewFile(null)}
        />
      )}

      <HospitalSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ITAProvider>
      <AppContent />
    </ITAProvider>
  );
}
