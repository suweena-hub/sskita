import React from 'react';
import { EvidenceFile } from '../types/ita';
import { X, FileText, Download, CheckCircle, Calendar, User, Hash, ExternalLink } from 'lucide-react';

interface DocumentViewerModalProps {
  file: EvidenceFile | null;
  moitCode?: string;
  moitTitle?: string;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  file,
  moitCode,
  moitTitle,
  onClose
}) => {
  if (!file) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{moitCode || 'MOPH ITA'}</span>
                <span aria-hidden="true">·</span>
                <span>เอกสารหลักฐานเปิดเผย</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 line-clamp-1">
                {file.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Document Preview Sheet */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/30">
          {/* Metadata bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border border-slate-200/80 rounded-lg text-xs">
            <div>
              <div className="text-slate-400 font-medium mb-0.5">ประเภทเอกสาร</div>
              <div className="font-semibold text-slate-800 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {file.fileType} {file.fileSize ? `(${file.fileSize})` : ''}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-0.5">เลขที่หนังสือ / คำสั่ง</div>
              <div className="font-semibold text-slate-800 truncate">
                {file.docNumber || 'ตามระเบียบ สป.สธ.'}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-0.5">วันที่เผยแพร่</div>
              <div className="font-semibold text-slate-800 tabular-nums">
                {file.uploadDate}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium mb-0.5">หน่วยงานผู้จัดทำ</div>
              <div className="font-semibold text-slate-800 truncate">
                {file.uploadedBy}
              </div>
            </div>
          </div>

          {/* Official Document Sheet Preview */}
          <div className="border border-slate-200 rounded-lg bg-white p-8 shadow-xs min-h-[320px] flex flex-col justify-between relative">
            {/* Top Thai Garuda / Hospital Header Simulator */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-2 font-serif font-bold text-lg">
                สธ
              </div>
              <h4 className="text-sm font-bold text-slate-900 tracking-wide">
                บันทึกข้อความ / เอกสารหลักฐานประกอบการประเมิน MOPH ITA
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                กระทรวงสาธารณสุข · ศูนย์ปฏิบัติการต่อต้านการทุจริต (ศปท. สธ.)
              </p>
            </div>

            <div className="my-6 space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 bg-emerald-50/60 rounded-md border border-emerald-100 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-900 mb-0.5">
                    สถานะการตรวจสอบความสมบูรณ์ของเอกสาร
                  </div>
                  <div className="text-emerald-700">
                    เอกสารนี้ได้รับการเปิดเผยสู่สาธารณะผ่านระบบ MOPH ITA ของโรงพยาบาลชุมชน
                    เป็นไปตามเกณฑ์ตัวชี้วัด {moitCode} {moitTitle ? `(${moitTitle})` : ''}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-slate-600">
                <p>
                  <strong>เรื่อง:</strong> {file.title}
                </p>
                <p>
                  <strong>อ้างถึง:</strong> ประกาศเกณฑ์การประเมินคุณธรรมและความโปร่งใสในการดำเนินงานของหน่วยงานในสังกัดกระทรวงสาธารณสุข ประจำปีงบประมาณ พ.ศ. 2568
                </p>
                <p>
                  <strong>สาระสำคัญ:</strong> เอกสารฉบับนี้เป็นหลักฐานแสดงความโปร่งใสและการเปิดเผยข้อมูลสาธารณะ (Open Data Integrity and Transparency) เพื่อให้ประชาชน เจ้าหน้าที่ และผู้ประเมินภายนอกสามารถตรวจสอบขั้นตอน นโยบาย และรายงานผลการดำเนินงานได้อย่างมีประสิทธิภาพ
                </p>
              </div>
            </div>

            {/* Document Signature simulator */}
            <div className="pt-6 border-t border-slate-100 flex items-end justify-between text-xs text-slate-500">
              <div>
                <span>ตรวจสอบข้อมูลโดย: คณะทำงาน ITA โรงพยาบาลชุมชน</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-800">ผู้รับรองข้อมูล: {file.uploadedBy}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">ปรับปรุงล่าสุด {file.uploadDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-white">
          <div className="text-xs text-slate-500">
            {file.url !== '#' ? (
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline inline-flex items-center gap-1 font-medium"
              >
                เปิดในแท็บใหม่ <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span>เอกสารพร้อมจัดเก็บในระบบคลัง ITA</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`กำลังดาวน์โหลดเอกสาร: ${file.title}`);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              ดาวน์โหลดเอกสาร ({file.fileType.toUpperCase()})
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
