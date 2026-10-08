import React, { useState } from 'react';
import { useITA } from '../context/ITAContext';
import { HospitalProfile } from '../types/ita';
import { X, Building2, Save, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface HospitalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HospitalSettingsModal: React.FC<HospitalSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { profile, updateProfile, resetToDefaultData } = useITA();

  const [formData, setFormData] = useState<HospitalProfile>({ ...profile });
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setShowSavedMsg(true);
    setTimeout(() => {
      setShowSavedMsg(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    resetToDefaultData();
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ข้อมูลหน่วยงาน & ปีงบประมาณ MOPH ITA
              </h3>
              <p className="text-xs text-slate-500">
                ตั้งค่าข้อมูลโรงพยาบาลชุมชนและรอบปีงบประมาณการประเมิน
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {showSavedMsg && (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              บันทึกข้อมูลเรียบร้อยแล้ว
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ชื่อโรงพยาบาลชุมชน *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ขนาดโรงพยาบาล (เตียง)
              </label>
              <input
                type="number"
                value={formData.bedCount}
                onChange={(e) => setFormData({ ...formData, bedCount: Number(e.target.value) })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ปีงบประมาณที่ประเมิน *
              </label>
              <select
                value={formData.fiscalYear}
                onChange={(e) => setFormData({ ...formData, fiscalYear: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600 font-semibold text-emerald-800"
              >
                <option value="2569">ปีงบประมาณ 2569</option>
                <option value="2568">ปีงบประมาณ 2568 (ปัจจุบัน)</option>
                <option value="2567">ปีงบประมาณ 2567</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                อำเภอ / ที่ตั้ง
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                จังหวัด
              </label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              สังกัดหน่วยงาน
            </label>
            <input
              type="text"
              value={formData.affiliation}
              onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อผู้อำนวยการโรงพยาบาล
              </label>
              <input
                type="text"
                value={formData.directorName}
                onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เป้าหมายคะแนน ITA (เต็ม 100)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.targetScore}
                onChange={(e) => setFormData({ ...formData, targetScore: Number(e.target.value) })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ผู้ประสานงานหลัก ITA โรงพยาบาล
              </label>
              <input
                type="text"
                value={formData.coordinatorName}
                onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                เบอร์โทรศัพท์ติดต่อ
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Reset zone */}
          <div className="pt-4 border-t border-slate-200">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                รีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นตามเกณฑ์ ป.ป.ช.
              </button>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  ยืนยันการคืนค่าข้อมูลเริ่มต้น?
                </div>
                <p className="text-rose-700">
                  การกระทำนี้จะล้างข้อมูลที่คุณเพิ่มและคืนค่าเป็นข้อมูลตัวอย่างเริ่มต้น
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded cursor-pointer"
                  >
                    ยืนยันรีเซ็ต
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
