import React from 'react';
import { useITA } from '../context/ITAContext';
import { hospitalAssets } from '../data/initialData';
import {
  ShieldCheck,
  FileCheck2,
  Clock,
  AlertTriangle,
  Calendar,
  Building,
  UserCheck,
  TrendingUp,
  ArrowRight,
  FolderOpen,
  ChevronRight,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface DashboardViewProps {
  onSelectMOIT: (moitId: string) => void;
  onNavigateToTab: (tab: 'dashboard' | 'indicators' | 'public' | 'assessment') => void;
  onOpenSettings: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectMOIT,
  onNavigateToTab,
  onOpenSettings
}) => {
  const { profile, indicators, stats, auditLogs } = useITA();

  // Quarter breakdown
  const quarters = [
    {
      code: 'Q1',
      name: 'ไตรมาสที่ 1',
      period: 'ต.ค. - ธ.ค.',
      indicators: indicators.filter((i) => i.quarter === 'Q1')
    },
    {
      code: 'Q2',
      name: 'ไตรมาสที่ 2',
      period: 'ม.ค. - มี.ค.',
      indicators: indicators.filter((i) => i.quarter === 'Q2')
    },
    {
      code: 'Q3',
      name: 'ไตรมาสที่ 3',
      period: 'เม.ย. - มิ.ย.',
      indicators: indicators.filter((i) => i.quarter === 'Q3')
    },
    {
      code: 'Q4',
      name: 'ไตรมาสที่ 4',
      period: 'ก.ค. - ก.ย.',
      indicators: indicators.filter((i) => i.quarter === 'Q4')
    }
  ];

  // Urgent items needing action (needs_revision or in_progress)
  const urgentItems = indicators.filter(
    (i) => i.status === 'needs_revision' || (i.status === 'in_progress' && i.quarter === 'Q2')
  );

  return (
    <div className="space-y-8">
      {/* 1. Hospital Identity Banner (Subdued, official, authoritative) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-emerald-200/80 bg-emerald-50 shrink-0 flex items-center justify-center">
              <img
                src={hospitalAssets.emblem}
                alt="ตราสัญลักษณ์โรงพยาบาลและกระทรวงสาธารณสุข"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>{profile.affiliation}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-emerald-800">ปีงบประมาณ พ.ศ. {profile.fiscalYear}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {profile.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                <span>{profile.hospitalType}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.district} {profile.province}</span>
                <span aria-hidden="true">·</span>
                <span>ผู้อำนวยการ: {profile.directorName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={onOpenSettings}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              แก้ไขข้อมูล รพ. / ปีงบฯ
            </button>
            <button
              onClick={() => onNavigateToTab('indicators')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              จัดการตัวชี้วัด MOIT <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards (Tabular figures, clean unboxed metadata) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>คะแนนประเมินตนเอง</span>
            <span className="font-medium text-emerald-700">เป้าหมาย {profile.targetScore}%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {stats.overallScore}
            </span>
            <span className="text-sm font-medium text-slate-500">/ 100</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-600">ระดับผลการประเมิน</span>
            <span className={`font-semibold px-2 py-0.5 rounded text-xs ${stats.evaluationGrade.color}`}>
              {stats.evaluationGrade.text}
            </span>
          </div>
        </div>

        {/* Metric 2: Open Data Pillar (MOIT 1 - 11) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>มิติที่ 1: การเปิดเผยข้อมูล</span>
            <span>MOIT 1 - 11</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {stats.openDataScore}%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-600">
            <span>ผ่านเกณฑ์ครบถ้วน</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {indicators.filter((i) => i.pillar === 'open_data' && i.status === 'compliant').length} จาก 11 ตัวชี้วัด
            </span>
          </div>
        </div>

        {/* Metric 3: Anti-Corruption Pillar (MOIT 12 - 22) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>มิติที่ 2: การป้องกันการทุจริต</span>
            <span>MOIT 12 - 22</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {stats.antiCorruptionScore}%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-600">
            <span>ผ่านเกณฑ์ครบถ้วน</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {indicators.filter((i) => i.pillar === 'anti_corruption' && i.status === 'compliant').length} จาก 11 ตัวชี้วัด
            </span>
          </div>
        </div>

        {/* Metric 4: Evidence Files Uploaded */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>เอกสารหลักฐานที่เปิดเผย</span>
            <span>คลังเอกสาร ITA</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {stats.totalEvidenceFiles}
            </span>
            <span className="text-sm font-medium text-slate-500">ไฟล์</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-600">
            <span>หัวข้อย่อยที่เปิดเผยแล้ว</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {stats.completedSubItems} / {stats.totalSubItems} รายการ
            </span>
          </div>
        </div>
      </div>

      {/* 3. Indicators Status Distribution Bar & Quarter Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Summary */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">
              สถานะการดำเนินงาน MOIT 1 - 22
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              จำแนกตามสถานะการเปิดเผยและการตรวจประเมิน
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span className="font-medium text-slate-700">ผ่านเกณฑ์ / ครบถ้วน (Compliant)</span>
                </div>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {stats.compliantCount} ({Math.round((stats.compliantCount / stats.totalIndicators) * 100)}%)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="font-medium text-slate-700">กำลังดำเนินการ (In Progress)</span>
                </div>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {stats.inProgressCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="font-medium text-slate-700">รอเปิดเผย / รอรอบเวลา (Pending)</span>
                </div>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {stats.pendingCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="font-medium text-slate-700">ต้องปรับปรุงแก้ไข (Needs Revision)</span>
                </div>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {stats.needsRevisionCount}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <button
              onClick={() => onNavigateToTab('indicators')}
              className="w-full py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              ดูรายละเอียดตัวชี้วัดทั้งหมด 22 ข้อ <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quarter Progress Matrix */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                กรอบระยะเวลาการส่งมอบข้อมูลรายไตรมาส (MOPH ITA Cycle)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                กำหนดส่งผลงานและหลักฐานตามรอบปีงบประมาณ {profile.fiscalYear}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
              รอบปัจจุบัน: ไตรมาส 2
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quarters.map((q) => {
              const qCompliant = q.indicators.filter((i) => i.status === 'compliant').length;
              const qTotal = q.indicators.length;
              const qPercent = qTotal > 0 ? Math.round((qCompliant / qTotal) * 100) : 0;

              return (
                <div
                  key={q.code}
                  className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{q.name}</span>
                        <span className="text-slate-400 text-xs">({q.period})</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700 tabular-nums">
                        {qCompliant}/{qTotal} ผ่าน
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full ${
                          qPercent === 100 ? 'bg-emerald-600' : qPercent > 0 ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                        style={{ width: `${qPercent}%` }}
                      ></div>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                      {q.indicators.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => onSelectMOIT(ind.id)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                            ind.status === 'compliant'
                              ? 'bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200'
                              : ind.status === 'needs_revision'
                              ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                          title={`${ind.code}: ${ind.title}`}
                        >
                          {ind.code}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Action Queue & Recent Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Attention Items */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                รายการที่ต้องเร่งดำเนินการ / ปรับปรุงแก้ไข
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ตัวชี้วัดที่มีข้อเสนอแนะจากผู้ตรวจประเมิน หรืออยู่ระหว่างรวบรวมหลักฐานไตรมาสปัจจุบัน
              </p>
            </div>
            <span className="text-xs text-slate-500 tabular-nums">
              {urgentItems.length} รายการ
            </span>
          </div>

          {urgentItems.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {urgentItems.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-md transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {item.code}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.auditorRemarks || item.description}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        <span>ผู้รับผิดชอบ: {item.department}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectMOIT(item.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg shrink-0 cursor-pointer"
                  >
                    เปิดตรวจ
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              ไม่มีรายการเร่งด่วนที่ค้างการปรับปรุงในขณะนี้
            </div>
          )}
        </div>

        {/* Recent Audit / Upload Logs */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">
              ประวัติกิจกรรมล่าสุด
            </h2>
            <span className="text-xs text-slate-400">ระบบบันทึกงาน</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-emerald-700">{log.moitCode}</span>
                  <span className="tabular-nums">{log.timestamp}</span>
                </div>
                <div className="font-medium text-slate-800 text-xs">
                  {log.action}: {log.detail}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  โดย {log.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
