import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOITIndicator, HospitalProfile, AuditLogItem, IndicatorStatus, EvidenceFile } from '../types/ita';
import { initialIndicators, initialHospitalProfile, initialAuditLogs } from '../data/initialData';

interface ITAContextType {
  profile: HospitalProfile;
  indicators: MOITIndicator[];
  auditLogs: AuditLogItem[];
  currentRole: 'staff' | 'public';
  setCurrentRole: (role: 'staff' | 'public') => void;
  updateProfile: (updated: Partial<HospitalProfile>) => void;
  toggleSubItemCompleted: (indicatorId: string, subItemId: string) => void;
  addEvidenceFile: (indicatorId: string, subItemId: string, file: Omit<EvidenceFile, 'id' | 'uploadDate'>) => void;
  deleteEvidenceFile: (indicatorId: string, subItemId: string, fileId: string) => void;
  updateIndicatorStatus: (indicatorId: string, status: IndicatorStatus, remarks?: string) => void;
  resetToDefaultData: () => void;
  stats: {
    totalIndicators: number;
    compliantCount: number;
    inProgressCount: number;
    pendingCount: number;
    needsRevisionCount: number;
    totalSubItems: number;
    completedSubItems: number;
    totalEvidenceFiles: number;
    overallScore: number;
    openDataScore: number;
    antiCorruptionScore: number;
    evaluationGrade: { grade: string; text: string; color: string; desc: string };
  };
}

const STORAGE_KEY_INDICATORS = 'moph_ita_indicators_v1';
const STORAGE_KEY_PROFILE = 'moph_ita_profile_v1';
const STORAGE_KEY_LOGS = 'moph_ita_logs_v1';

const ITAContext = createContext<ITAContextType | undefined>(undefined);

export const ITAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<'staff' | 'public'>('staff');

  const [profile, setProfile] = useState<HospitalProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : initialHospitalProfile;
    } catch {
      return initialHospitalProfile;
    }
  });

  const [indicators, setIndicators] = useState<MOITIndicator[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INDICATORS);
      return saved ? JSON.parse(saved) : initialIndicators;
    } catch {
      return initialIndicators;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : initialAuditLogs;
    } catch {
      return initialAuditLogs;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save profile failed', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INDICATORS, JSON.stringify(indicators));
    } catch (e) {
      console.warn('LocalStorage save indicators failed', e);
    }
  }, [indicators]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('LocalStorage save logs failed', e);
    }
  }, [auditLogs]);

  const addLog = (action: string, moitCode: string, detail: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      action,
      moitCode,
      detail,
      user: currentRole === 'staff' ? `${profile.coordinatorName.split(' ')[0]} (จนท. รพ.)` : 'ผู้ประเมินภายนอก',
      timestamp: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }) + ' น.'
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 40)]);
  };

  const updateProfile = (updated: Partial<HospitalProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      addLog('ปรับปรุงข้อมูลโรงพยาบาล', 'การตั้งค่า', `อัปเดตข้อมูล รพ. ปีงบประมาณ ${next.fiscalYear}`);
      return next;
    });
  };

  const toggleSubItemCompleted = (indicatorId: string, subItemId: string) => {
    setIndicators((prev) =>
      prev.map((ind) => {
        if (ind.id !== indicatorId) return ind;

        const updatedItems = ind.items.map((item) => {
          if (item.id !== subItemId) return item;
          const nextCompleted = !item.isCompleted;
          return { ...item, isCompleted: nextCompleted };
        });

        const allCompleted = updatedItems.every((it) => it.isCompleted);
        const someCompleted = updatedItems.some((it) => it.isCompleted);
        const nextStatus: IndicatorStatus = allCompleted
          ? 'compliant'
          : someCompleted
          ? 'in_progress'
          : 'pending';

        addLog(
          'แก้ไขรายการย่อย',
          ind.code,
          `ปรับสถานะหัวข้อการประเมินใน ${ind.code}`
        );

        return {
          ...ind,
          items: updatedItems,
          status: ind.status === 'needs_revision' && !allCompleted ? 'needs_revision' : nextStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      })
    );
  };

  const addEvidenceFile = (
    indicatorId: string,
    subItemId: string,
    file: Omit<EvidenceFile, 'id' | 'uploadDate'>
  ) => {
    const newFile: EvidenceFile = {
      ...file,
      id: `ev-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setIndicators((prev) =>
      prev.map((ind) => {
        if (ind.id !== indicatorId) return ind;

        const updatedItems = ind.items.map((it) => {
          if (it.id !== subItemId) return it;
          return {
            ...it,
            isCompleted: true,
            evidenceFiles: [...it.evidenceFiles, newFile]
          };
        });

        const allCompleted = updatedItems.every((it) => it.isCompleted);
        const nextStatus: IndicatorStatus = allCompleted ? 'compliant' : 'in_progress';

        addLog(
          'แนบไฟล์หลักฐาน',
          ind.code,
          `เพิ่มเอกสาร "${newFile.title}" (${newFile.fileType.toUpperCase()})`
        );

        return {
          ...ind,
          items: updatedItems,
          status: nextStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      })
    );
  };

  const deleteEvidenceFile = (indicatorId: string, subItemId: string, fileId: string) => {
    setIndicators((prev) =>
      prev.map((ind) => {
        if (ind.id !== indicatorId) return ind;

        const updatedItems = ind.items.map((it) => {
          if (it.id !== subItemId) return it;
          const nextFiles = it.evidenceFiles.filter((f) => f.id !== fileId);
          return {
            ...it,
            isCompleted: nextFiles.length > 0,
            evidenceFiles: nextFiles
          };
        });

        const allDone = updatedItems.every((it) => it.isCompleted);
        const someDone = updatedItems.some((it) => it.isCompleted);
        const nextStatus: IndicatorStatus = allDone
          ? 'compliant'
          : someDone
          ? 'in_progress'
          : 'pending';

        addLog('ลบไฟล์หลักฐาน', ind.code, `ลบเอกสารหลักฐานออกจากหัวข้อย่อย`);

        return {
          ...ind,
          items: updatedItems,
          status: nextStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      })
    );
  };

  const updateIndicatorStatus = (
    indicatorId: string,
    status: IndicatorStatus,
    remarks?: string
  ) => {
    setIndicators((prev) =>
      prev.map((ind) => {
        if (ind.id !== indicatorId) return ind;
        addLog(
          'ปรับปรุงสถานะตัวชี้วัด',
          ind.code,
          `เปลี่ยนสถานะเป็น "${status}" ${remarks ? `(ข้อเสนอแนะ: ${remarks})` : ''}`
        );
        return {
          ...ind,
          status,
          auditorRemarks: remarks !== undefined ? remarks : ind.auditorRemarks,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      })
    );
  };

  const resetToDefaultData = () => {
    setProfile(initialHospitalProfile);
    setIndicators(initialIndicators);
    setAuditLogs(initialAuditLogs);
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_INDICATORS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    addLog('รีเซ็ตข้อมูล', 'ระบบ', 'คืนค่าเริ่มต้นตามเกณฑ์ MOPH ITA โรงพยาบาลชุมชน');
  };

  // Stats calculation
  const totalIndicators = indicators.length;
  const compliantCount = indicators.filter((i) => i.status === 'compliant').length;
  const inProgressCount = indicators.filter((i) => i.status === 'in_progress').length;
  const pendingCount = indicators.filter((i) => i.status === 'pending').length;
  const needsRevisionCount = indicators.filter((i) => i.status === 'needs_revision').length;

  let totalSubItems = 0;
  let completedSubItems = 0;
  let totalEvidenceFiles = 0;

  indicators.forEach((ind) => {
    ind.items.forEach((it) => {
      totalSubItems += 1;
      if (it.isCompleted) completedSubItems += 1;
      totalEvidenceFiles += it.evidenceFiles.length;
    });
  });

  // Calculate scores (out of 100)
  const openDataInds = indicators.filter((i) => i.pillar === 'open_data');
  const antiCorrInds = indicators.filter((i) => i.pillar === 'anti_corruption');

  const calcPillarScore = (list: MOITIndicator[]) => {
    if (list.length === 0) return 0;
    let sumCompletionRatio = 0;
    list.forEach((ind) => {
      const done = ind.items.filter((it) => it.isCompleted).length;
      const total = ind.items.length;
      sumCompletionRatio += total > 0 ? done / total : 0;
    });
    return (sumCompletionRatio / list.length) * 100;
  };

  const openDataScore = Number(calcPillarScore(openDataInds).toFixed(2));
  const antiCorruptionScore = Number(calcPillarScore(antiCorrInds).toFixed(2));
  const overallScore = Number(((openDataScore + antiCorruptionScore) / 2).toFixed(2));

  // Determine ITA Grade Level
  let evaluationGrade = {
    grade: 'AA',
    text: 'ยอดเยี่ยม (AA)',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    desc: 'ผ่านเกณฑ์ระดับยอดเยี่ยม มีความโปร่งใสและเปิดเผยข้อมูลระดับสูงมาก'
  };

  if (overallScore >= 95) {
    evaluationGrade = {
      grade: 'AA',
      text: 'ยอดเยี่ยม (AA)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      desc: 'ผ่านเกณฑ์ระดับยอดเยี่ยม มีความโปร่งใสและเปิดเผยข้อมูลระดับสูงมาก'
    };
  } else if (overallScore >= 85) {
    evaluationGrade = {
      grade: 'A',
      text: 'ดีมาก (A)',
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      desc: 'ผ่านเกณฑ์ระดับดีมาก เปิดเผยข้อมูลครบถ้วนส่วนใหญ่'
    };
  } else if (overallScore >= 75) {
    evaluationGrade = {
      grade: 'B',
      text: 'ผ่านเกณฑ์ (B)',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      desc: 'ผ่านเกณฑ์ขั้นต่ำ ควรเร่งปรับปรุงตัวชี้วัดที่มีสถานะรออัปโหลด'
    };
  } else if (overallScore >= 65) {
    evaluationGrade = {
      grade: 'C',
      text: 'พอใช้ (C)',
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      desc: 'ยังไม่ผ่านเกณฑ์เป้าหมาย ต้องเร่งรัดการเปิดเผยข้อมูลตามแผน'
    };
  } else {
    evaluationGrade = {
      grade: 'D',
      text: 'ต้องปรับปรุง (D)',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      desc: 'ยังไม่ผ่านเกณฑ์ ต้องปรับปรุงกระบวนการและเอกสารโดยด่วน'
    };
  }

  return (
    <ITAContext.Provider
      value={{
        profile,
        indicators,
        auditLogs,
        currentRole,
        setCurrentRole,
        updateProfile,
        toggleSubItemCompleted,
        addEvidenceFile,
        deleteEvidenceFile,
        updateIndicatorStatus,
        resetToDefaultData,
        stats: {
          totalIndicators,
          compliantCount,
          inProgressCount,
          pendingCount,
          needsRevisionCount,
          totalSubItems,
          completedSubItems,
          totalEvidenceFiles,
          overallScore,
          openDataScore,
          antiCorruptionScore,
          evaluationGrade
        }
      }}
    >
      {children}
    </ITAContext.Provider>
  );
};

export const useITA = () => {
  const context = useContext(ITAContext);
  if (!context) {
    throw new Error('useITA must be used within an ITAProvider');
  }
  return context;
};
