import React, { useState } from 'react';
import { MOITIndicator, EvidenceFile, IndicatorStatus } from '../types/ita';
import { useITA } from '../context/ITAContext';
import {
  X,
  CheckCircle2,
  Circle,
  FileText,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building,
  Calendar
} from 'lucide-react';

interface MOITDetailModalProps {
  indicator: MOITIndicator | null;
  onClose: () => void;
  onPreviewFile: (file: EvidenceFile, moitCode: string, moitTitle: string) => void;
}

export const MOITDetailModal: React.FC<MOITDetailModalProps> = ({
  indicator,
  onClose,
  onPreviewFile
}) => {
  const {
    currentRole,
    toggleSubItemCompleted,
    addEvidenceFile,
    deleteEvidenceFile,
    updateIndicatorStatus,
    profile
  } = useITA();

  const [activeTab, setActiveTab] = useState<'checklist' | 'add_evidence' | 'audit_review'>('checklist');
  const [selectedSubItemId, setSelectedSubItemId] = useState<string>('');

  // Add evidence form state
  const [formTitle, setFormTitle] = useState('');
  const [formDocNumber, setFormDocNumber] = useState('');
  const [formFileType, setFormFileType] = useState<'pdf' | 'doc' | 'link' | 'excel' | 'image'>('pdf');
  const [formFileSize, setFormFileSize] = useState('1.5 MB');
  const [formUrl, setFormUrl] = useState('#');
  const [formUploader, setFormUploader] = useState('');

  // Auditor remarks state
  const [auditorStatus, setAuditorStatus] = useState<IndicatorStatus>(
    indicator?.status || 'in_progress'
  );
  const [auditorNotes, setAuditorNotes] = useState(indicator?.auditorRemarks || '');
  const [statusSaveSuccess, setStatusSaveSuccess] = useState(false);

  if (!indicator) return null;

  const completedSubItemsCount = indicator.items.filter((i) => i.isCompleted).length;
  const totalSubItemsCount = indicator.items.length;
  const completionPercentage = Math.round((completedSubItemsCount / totalSubItemsCount) * 100);

  const handleAddFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !selectedSubItemId) return;

    addEvidenceFile(indicator.id, selectedSubItemId, {
      title: formTitle.trim(),
      fileType: formFileType,
      fileSize: formFileSize,
      url: formUrl.trim() || '#',
      docNumber: formDocNumber.trim() || undefined,
      uploadedBy: formUploader.trim() || profile.coordinatorName
    });

    // Reset form
    setFormTitle('');
    setFormDocNumber('');
    setFormUrl('#');
    setActiveTab('checklist');
  };

  const handleSaveAuditorReview = () => {
    updateIndicatorStatus(indicator.id, auditorStatus, auditorNotes);
    setStatusSaveSuccess(true);
    setTimeout(() => setStatusSaveSuccess(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded">
              {indicator.code}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{indicator.pillar === 'open_data' ? 'มิติที่ 1: การเปิดเผยข้อมูล' : 'มิติที่ 2: การป้องกันการทุจริต'}</span>
                <span aria-hidden="true">·</span>
                <span>กำหนดส่ง: {indicator.quarter}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">ค่าน้ำหนัก {indicator.weightScore} คะแนน</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {indicator.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Indicator Description & Progress bar */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            {indicator.description}
            <div className="mt-1 flex items-center gap-2 text-slate-500 font-medium">
              <Building className="w-3.5 h-3.5" />
              <span>หน่วยงานรับผิดชอบ: {indicator.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-500">ความก้าวหน้า</div>
              <div className="text-sm font-bold text-slate-900 tabular-nums">
                {completedSubItemsCount}/{totalSubItemsCount} รายการ ({completionPercentage}%)
              </div>
            </div>
            <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  completionPercentage === 100
                    ? 'bg-emerald-600'
                    : completionPercentage > 0
                    ? 'bg-sky-600'
                    : 'bg-slate-300'
                }`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'checklist'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            รายการตรวจสอบและไฟล์หลักฐาน ({totalSubItemsCount})
          </button>
          {currentRole === 'staff' && (
            <button
              onClick={() => {
                setSelectedSubItemId(indicator.items[0]?.id || '');
                setActiveTab('add_evidence');
              }}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'add_evidence'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              + อัปโหลด / แนบหลักฐานใหม่
            </button>
          )}
          <button
            onClick={() => setActiveTab('audit_review')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'audit_review'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ผลการตรวจประเมิน & ข้อเสนอแนะ
          </button>
        </div>

        {/* Modal Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: CHECKLIST & EVIDENCE */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              {indicator.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    item.isCompleted
                      ? 'border-slate-200 bg-white'
                      : 'border-dashed border-amber-300 bg-amber-50/30'
                  }`}
                >
                  {/* SubItem Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {currentRole === 'staff' ? (
                        <button
                          onClick={() => toggleSubItemCompleted(indicator.id, item.id)}
                          className="mt-0.5 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                          title={item.isCompleted ? 'คลิกเพื่อเปลี่ยนเป็นยังไม่ผ่าน' : 'คลิกเพื่อทำเครื่องหมายว่าผ่าน'}
                        >
                          {item.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </button>
                      ) : (
                        <div className="mt-0.5">
                          {item.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                          <span className="font-semibold text-slate-700">ข้อ {item.itemNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>รูปแบบกำหนด: {item.requiredFormat}</span>
                          <span aria-hidden="true">·</span>
                          <span className={item.isCompleted ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
                            {item.isCompleted ? 'เปิดเผยแล้ว' : 'รอข้อมูล'}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    {currentRole === 'staff' && (
                      <button
                        onClick={() => {
                          setSelectedSubItemId(item.id);
                          setActiveTab('add_evidence');
                        }}
                        className="text-xs font-medium text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 hover:underline cursor-pointer shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        แนบไฟล์ข้อนี้
                      </button>
                    )}
                  </div>

                  {/* Evidence Files List */}
                  {item.evidenceFiles.length > 0 ? (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        เอกสารหลักฐานที่แนบ ({item.evidenceFiles.length} ฉบับ)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.evidenceFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-md transition-colors"
                          >
                            <button
                              onClick={() => onPreviewFile(file, indicator.code, indicator.title)}
                              className="flex items-center gap-2 text-left truncate flex-1 cursor-pointer"
                              title="คลิกเพื่อตรวจสอบเอกสาร"
                            >
                              <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                              <div className="truncate">
                                <div className="text-xs font-semibold text-slate-900 truncate">
                                  {file.title}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                  <span className="uppercase">{file.fileType}</span>
                                  {file.fileSize && <span>· {file.fileSize}</span>}
                                  <span>· {file.uploadDate}</span>
                                </div>
                              </div>
                            </button>

                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              <button
                                onClick={() => onPreviewFile(file, indicator.code, indicator.title)}
                                className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-white rounded cursor-pointer"
                                title="ดูเอกสาร"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              {currentRole === 'staff' && (
                                <button
                                  onClick={() => deleteEvidenceFile(indicator.id, item.id, file.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-white rounded cursor-pointer"
                                  title="ลบเอกสาร"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 pt-2 border-t border-slate-100/60 text-xs text-amber-700/80 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>ยังไม่มีการแนบไฟล์หลักฐานสำหรับข้อกำหนดนี้</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: ADD EVIDENCE FORM */}
          {activeTab === 'add_evidence' && currentRole === 'staff' && (
            <form onSubmit={handleAddFileSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-800">
                เลือกหัวข้อย่อยและกรอกข้อมูลเอกสารเพื่อนำขึ้นเผยแพร่ในระบบ MOPH ITA ของโรงพยาบาลชุมชน
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  เลือกหัวข้อการประเมินย่อย *
                </label>
                <select
                  value={selectedSubItemId}
                  onChange={(e) => setSelectedSubItemId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  required
                >
                  {indicator.items.map((it) => (
                    <option key={it.id} value={it.id}>
                      ข้อ {it.itemNumber}: {it.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อเอกสาร / รายการหลักฐาน *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="เช่น ประกาศโรงพยาบาลชุมชน เรื่อง..."
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    เลขที่หนังสือ / คำสั่ง / ประกาศ
                  </label>
                  <input
                    type="text"
                    value={formDocNumber}
                    onChange={(e) => setFormDocNumber(e.target.value)}
                    placeholder="เช่น สธ 0312/045 หรือ คำสั่ง รพ. ที่ 25/2568"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ประเภทไฟล์
                  </label>
                  <select
                    value={formFileType}
                    onChange={(e) => setFormFileType(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="pdf">PDF Document (.pdf)</option>
                    <option value="link">Web Link / ระบบออนไลน์ (URL)</option>
                    <option value="doc">Word Document (.docx)</option>
                    <option value="excel">Excel Spreadsheet (.xlsx)</option>
                    <option value="image">รูปภาพ / Infographic (.png/.jpg)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    หน่วยงาน / ผู้รับผิดชอบจัดทำ
                  </label>
                  <input
                    type="text"
                    value={formUploader}
                    onChange={(e) => setFormUploader(e.target.value)}
                    placeholder={indicator.department}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ลิงก์ภายนอก / URL เผยแพร่
                  </label>
                  <input
                    type="text"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('checklist')}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                >
                  บันทึกและเผยแพร่เอกสาร
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: AUDITOR REVIEW & NOTES */}
          {activeTab === 'audit_review' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900">เกณฑ์การตรวจประเมินของ สป.สธ. / ป.ป.ช.:</span>
                  <p className="mt-0.5 text-slate-600">
                    ต้องมีหลักฐานครบถ้วนทุกข้อย่อย ลิงก์เข้าถึงได้จริง เอกสารต้องลงนามโดยผู้มีอำนาจและเป็นปีงบประมาณปัจจุบัน
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ปรับสถานะตัวชี้วัด (Indicator Status)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setAuditorStatus('compliant')}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left cursor-pointer transition-colors ${
                      auditorStatus === 'compliant'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ✓ ครบถ้วน (Compliant)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuditorStatus('in_progress')}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left cursor-pointer transition-colors ${
                      auditorStatus === 'in_progress'
                        ? 'bg-sky-50 border-sky-500 text-sky-800 ring-1 ring-sky-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ⋯ กำลังดำเนินการ
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuditorStatus('pending')}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left cursor-pointer transition-colors ${
                      auditorStatus === 'pending'
                        ? 'bg-amber-50 border-amber-500 text-amber-800 ring-1 ring-amber-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ⏳ รออัปโหลด
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuditorStatus('needs_revision')}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left cursor-pointer transition-colors ${
                      auditorStatus === 'needs_revision'
                        ? 'bg-rose-50 border-rose-500 text-rose-800 ring-1 ring-rose-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ⚠ ปรับปรุงแก้ไข
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ข้อเสนอแนะของคณะทำงาน / ผู้ตรวจประเมิน สสจ.
                </label>
                <textarea
                  rows={4}
                  value={auditorNotes}
                  onChange={(e) => setAuditorNotes(e.target.value)}
                  placeholder="ระบุข้อสังเกต เช่น ลิงก์เอกสารเปิดไม่ได้ ขาดเอกสารแนบไตรมาส 2 หรือผ่านเกณฑ์เรียบร้อย..."
                  className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              {statusSaveSuccess && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  บันทึกสถานะและข้อเสนอแนะตัวชี้วัดเรียบร้อยแล้ว
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAuditorReview}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                >
                  บันทึกผลการตรวจสอบ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-white">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>ปรับปรุงล่าสุด: {indicator.lastUpdated}</span>
            <span aria-hidden="true">·</span>
            <span>ปีงบประมาณ {profile.fiscalYear}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
