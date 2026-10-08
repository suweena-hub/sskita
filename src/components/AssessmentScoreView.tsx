import React, { useState } from 'react';
import { useITA } from '../context/ITAContext';
import {
  Award,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building,
  FileCheck2,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface AssessmentScoreViewProps {
  onSelectMOIT: (moitId: string) => void;
}

export const AssessmentScoreView: React.FC<AssessmentScoreViewProps> = ({ onSelectMOIT }) => {
  const { profile, indicators, stats } = useITA();
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'gap_analysis'>('matrix');

  // Indicators needing attention
  const incompleteIndicators = indicators.filter((i) => i.status !== 'compliant');

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Generate CSV data of MOIT 1-22
    const headers = ['MOIT_Code', 'Title', 'Pillar', 'Quarter', 'Department', 'Weight_Score', 'Status', 'Completion_Percent', 'Auditor_Remarks'];
    const rows = indicators.map((ind) => {
      const done = ind.items.filter((it) => it.isCompleted).length;
      const total = ind.items.length;
      const percent = Math.round((done / total) * 100);
      return [
        `"${ind.code}"`,
        `"${ind.title.replace(/"/g, '""')}"`,
        `"${ind.pillar}"`,
        `"${ind.quarter}"`,
        `"${ind.department.replace(/"/g, '""')}"`,
        ind.weightScore,
        `"${ind.status}"`,
        `"${percent}%"`,
        `"${(ind.auditorRemarks || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MOPH_ITA_${profile.name}_FY${profile.fiscalYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Export/Print actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            รายงานผลการประเมินตนเอง (MOPH ITA Evaluation Report)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            สรุปผลคะแนนและสถานะความพร้อมเพื่อส่งมอบข้อมูลต่อ สสจ. และศูนย์ปฏิบัติการต่อต้านการทุจริต สธ.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            ส่งออกไฟล์ CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            พิมพ์รายงานสรุป (Print/PDF)
          </button>
        </div>
      </div>

      {/* 2. Official Evaluation Scoreboard Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Grade Box */}
          <div className="lg:col-span-1 p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs text-slate-500 font-medium">ระดับผลการประเมินคุณธรรมและความโปร่งใส</span>
            <div className="text-5xl font-extrabold text-slate-900 font-mono tracking-tight my-2">
              {stats.evaluationGrade.grade}
            </div>
            <div className="inline-block px-3 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
              {stats.evaluationGrade.text}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {stats.evaluationGrade.desc}
            </p>
          </div>

          {/* Numerical Scores breakdown */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-900">คะแนนประเมินตนเองรวม (Overall Score)</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">
                  {stats.overallScore} / 100 คะแนน
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.overallScore}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">มิติที่ 1: การเปิดเผยข้อมูล (MOIT 1-11)</div>
                <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.openDataScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  ผ่านครบ {indicators.filter((i) => i.pillar === 'open_data' && i.status === 'compliant').length} จาก 11 ข้อ
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">มิติที่ 2: การป้องกันการทุจริต (MOIT 12-22)</div>
                <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                  {stats.antiCorruptionScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  ผ่านครบ {indicators.filter((i) => i.pillar === 'anti_corruption' && i.status === 'compliant').length} จาก 11 ข้อ
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NACC & MOPH Grade Criteria Table Reference */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            เกณฑ์ระดับผลการประเมินตามมาตรฐานสำนักงาน ป.ป.ช. และ ศปท. สธ.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
            <div className={`p-2.5 rounded-lg border ${stats.overallScore >= 95 ? 'bg-emerald-100/70 border-emerald-400 font-bold text-emerald-950' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-mono font-bold">AA (95 - 100)</div>
              <div className="text-[11px] mt-0.5">ยอดเยี่ยม</div>
            </div>
            <div className={`p-2.5 rounded-lg border ${stats.overallScore >= 85 && stats.overallScore < 95 ? 'bg-teal-100/70 border-teal-400 font-bold text-teal-950' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-mono font-bold">A (85 - 94.99)</div>
              <div className="text-[11px] mt-0.5">ดีมาก</div>
            </div>
            <div className={`p-2.5 rounded-lg border ${stats.overallScore >= 75 && stats.overallScore < 85 ? 'bg-amber-100/70 border-amber-400 font-bold text-amber-950' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-mono font-bold">B (75 - 84.99)</div>
              <div className="text-[11px] mt-0.5">ผ่านเกณฑ์</div>
            </div>
            <div className={`p-2.5 rounded-lg border ${stats.overallScore >= 65 && stats.overallScore < 75 ? 'bg-orange-100/70 border-orange-400 font-bold text-orange-950' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-mono font-bold">C (65 - 74.99)</div>
              <div className="text-[11px] mt-0.5">พอใช้</div>
            </div>
            <div className={`p-2.5 rounded-lg border ${stats.overallScore >= 55 && stats.overallScore < 65 ? 'bg-rose-100/70 border-rose-400 font-bold text-rose-950' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-mono font-bold">D (55 - 64.99)</div>
              <div className="text-[11px] mt-0.5">ปรับปรุง</div>
            </div>
            <div className={`p-2.5 rounded-lg border ${stats.overallScore < 55 ? 'bg-rose-200 border-rose-500 font-bold text-rose-950' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              <div className="font-mono font-bold">E (&lt; 55)</div>
              <div className="text-[11px] mt-0.5">เร่งด่วน</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sub Tabs: Matrix vs Gap Analysis */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeSubTab === 'matrix'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ตารางคะแนนรวม 22 ตัวชี้วัด (Score Matrix)
          </button>
          <button
            onClick={() => setActiveSubTab('gap_analysis')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'gap_analysis'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            วิเคราะห์ส่วนขาดเพื่อยกระดับคะแนน (Gap Analysis - {incompleteIndicators.length} รายการ)
          </button>
        </div>

        {activeSubTab === 'matrix' ? (
          /* MATRIX TABLE */
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-20">รหัส</th>
                    <th className="py-3 px-4">ชื่อตัวชี้วัด</th>
                    <th className="py-3 px-4 w-28">มิติการประเมิน</th>
                    <th className="py-3 px-4 w-24">ไตรมาส</th>
                    <th className="py-3 px-4 w-28 text-center">หัวข้อย่อยผ่าน</th>
                    <th className="py-3 px-4 w-28 text-center">สัดส่วนความสำเร็จ</th>
                    <th className="py-3 px-4 w-36">สถานะ</th>
                    <th className="py-3 px-4">ข้อเสนอแนะผู้ตรวจ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {indicators.map((ind) => {
                    const done = ind.items.filter((it) => it.isCompleted).length;
                    const total = ind.items.length;
                    const percent = Math.round((done / total) * 100);

                    return (
                      <tr
                        key={ind.id}
                        onClick={() => onSelectMOIT(ind.id)}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {ind.code}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {ind.title}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {ind.pillar === 'open_data' ? 'เปิดเผยข้อมูล' : 'ป้องกันทุจริต'}
                        </td>
                        <td className="py-3 px-4 font-mono">{ind.quarter}</td>
                        <td className="py-3 px-4 text-center font-mono tabular-nums">
                          {done}/{total}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold tabular-nums">
                          <span
                            className={
                              percent === 100
                                ? 'text-emerald-700'
                                : percent > 0
                                ? 'text-sky-700'
                                : 'text-slate-400'
                            }
                          >
                            {percent}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              ind.status === 'compliant'
                                ? 'bg-emerald-50 text-emerald-800'
                                : ind.status === 'in_progress'
                                ? 'bg-sky-50 text-sky-800'
                                : ind.status === 'needs_revision'
                                ? 'bg-rose-50 text-rose-800'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {ind.status === 'compliant'
                              ? 'ครบถ้วน'
                              : ind.status === 'in_progress'
                              ? 'กำลังดำเนิน'
                              : ind.status === 'needs_revision'
                              ? 'ปรับปรุง'
                              : 'รออัปโหลด'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-xs">
                          {ind.auditorRemarks || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* GAP ANALYSIS LIST */
          <div className="space-y-4">
            {incompleteIndicators.map((ind) => {
              const missingSubItems = ind.items.filter((it) => !it.isCompleted);

              return (
                <div
                  key={ind.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded">
                        {ind.code}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {ind.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => onSelectMOIT(ind.id)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                    >
                      เปิดจัดการตัวชี้วัดนี้
                    </button>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">หน่วยงานรับผิดชอบ:</span> {ind.department} · กำหนดส่ง: {ind.quarter}
                  </div>

                  {ind.auditorRemarks && (
                    <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-900 border border-amber-200/60">
                      <strong>ข้อคิดเห็นผู้ตรวจ:</strong> {ind.auditorRemarks}
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="text-xs font-bold text-slate-700 mb-2">
                      รายการย่อยที่ยังขาดหลักฐาน ({missingSubItems.length} รายการ):
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                      {missingSubItems.map((sub) => (
                        <li key={sub.id} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold shrink-0">✕</span>
                          <span>
                            <strong>ข้อ {sub.itemNumber}:</strong> {sub.name} (รูปแบบที่กำหนด: {sub.requiredFormat})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Official Sign-off & Audit Certification Footer */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-xs text-slate-600">
        <h3 className="text-sm font-bold text-slate-900 mb-2">
          การรับรองข้อมูลเพื่อประกอบการตรวจประเมิน MOPH ITA
        </h3>
        <p className="leading-relaxed text-slate-600 mb-6 max-w-3xl">
          ข้อมูลและเอกสารหลักฐานทั้งหมดที่ปรากฏในระบบนี้ ได้รับการตรวจสอบและกลั่นกรองโดยคณะทำงานขับเคลื่อนการประเมินคุณธรรมและความโปร่งใส (MOPH ITA) ประจำปีงบประมาณ พ.ศ. {profile.fiscalYear} ของ {profile.name} เพื่อแสดงความโปร่งใสและพร้อมรับการตรวจสอบจากประชาชนและหน่วยงานภายนอก
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          <div>
            <div className="text-slate-400 mb-1">ผู้จัดทำและประสานงานข้อมูล</div>
            <div className="font-bold text-slate-800">{profile.coordinatorName}</div>
            <div className="text-slate-500">ผู้ประสานงานหลัก ITA โรงพยาบาลชุมชน</div>
          </div>
          <div className="sm:text-right">
            <div className="text-slate-400 mb-1">ผู้รับรองรายงานการประเมินตนเอง</div>
            <div className="font-bold text-slate-800">{profile.directorName}</div>
            <div className="text-slate-500">ผู้อำนวยการ{profile.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
