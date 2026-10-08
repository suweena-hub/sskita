import React, { useState, useMemo } from 'react';
import { useITA } from '../context/ITAContext';
import { MOITIndicator, PillarType, QuarterType, IndicatorStatus } from '../types/ita';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ChevronRight,
  Upload,
  Building,
  RotateCcw
} from 'lucide-react';

interface MOITListViewProps {
  onSelectMOIT: (moitId: string) => void;
}

export const MOITListView: React.FC<MOITListViewProps> = ({ onSelectMOIT }) => {
  const { indicators, currentRole } = useITA();

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<'all' | PillarType>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | QuarterType>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | IndicatorStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  // Filtered indicators
  const filteredIndicators = useMemo(() => {
    return indicators.filter((ind) => {
      // Search filter
      const matchesSearch =
        ind.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.department.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Pillar filter
      if (selectedPillar !== 'all' && ind.pillar !== selectedPillar) return false;

      // Quarter filter
      if (selectedQuarter !== 'all' && ind.quarter !== selectedQuarter) return false;

      // Status filter
      if (selectedStatus !== 'all' && ind.status !== selectedStatus) return false;

      return true;
    });
  }, [indicators, searchTerm, selectedPillar, selectedQuarter, selectedStatus]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPillar('all');
    setSelectedQuarter('all');
    setSelectedStatus('all');
  };

  const getStatusBadge = (status: IndicatorStatus) => {
    switch (status) {
      case 'compliant':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            เปิดเผยครบถ้วน (Compliant)
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            กำลังดำเนินการ (In Progress)
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            รออัปโหลด (Pending)
          </span>
        );
      case 'needs_revision':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            ปรับปรุงแก้ไข (Needs Revision)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            ตัวชี้วัด MOIT 1 - MOIT 22 โรงพยาบาลชุมชน
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            เกณฑ์การประเมินคุณธรรมและความโปร่งใส (MOPH ITA) ประจำปีงบประมาณ กระทรวงสาธารณสุข
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented view switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              มุมมองตาราง (Table)
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              มุมมองการ์ด (Grid)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Search controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาตัวชี้วัด เช่น MOIT 5, สขร.1, จัดซื้อจัดจ้าง, No Gift Policy, บุคลากร..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white"
            />
          </div>

          {/* Reset button if filtered */}
          {(searchTerm || selectedPillar !== 'all' || selectedQuarter !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 self-start cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Pillar Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setSelectedPillar('all')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                selectedPillar === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              ทุกลำดับ
            </button>
            <button
              onClick={() => setSelectedPillar('open_data')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                selectedPillar === 'open_data' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              มิติเปิดเผยข้อมูล (MOIT 1-11)
            </button>
            <button
              onClick={() => setSelectedPillar('anti_corruption')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                selectedPillar === 'anti_corruption' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              มิติป้องกันการทุจริต (MOIT 12-22)
            </button>
          </div>

          {/* Quarter Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['all', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-2 py-1 rounded font-medium cursor-pointer ${
                  selectedQuarter === q ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                }`}
              >
                {q === 'all' ? 'ทุกไตรมาส' : q}
              </button>
            ))}
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                selectedStatus === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              ทุกสถานะ
            </button>
            <button
              onClick={() => setSelectedStatus('compliant')}
              className={`px-2 py-1 rounded font-medium cursor-pointer ${
                selectedStatus === 'compliant' ? 'bg-white text-emerald-800 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              ครบถ้วน
            </button>
            <button
              onClick={() => setSelectedStatus('in_progress')}
              className={`px-2 py-1 rounded font-medium cursor-pointer ${
                selectedStatus === 'in_progress' ? 'bg-white text-sky-800 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              กำลังดำเนินการ
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-2 py-1 rounded font-medium cursor-pointer ${
                selectedStatus === 'pending' ? 'bg-white text-amber-800 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              รออัปโหลด
            </button>
            <button
              onClick={() => setSelectedStatus('needs_revision')}
              className={`px-2 py-1 rounded font-medium cursor-pointer ${
                selectedStatus === 'needs_revision' ? 'bg-white text-rose-800 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              ปรับปรุงแก้ไข
            </button>
          </div>
        </div>
      </div>

      {/* 3. Indicators Display: Table or Grid */}
      {filteredIndicators.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">ไม่พบตัวชี้วัดที่ตรงตามเงื่อนไข</h3>
          <p className="text-xs text-slate-500 mt-1">
            ลองปรับเปลี่ยนคำค้นหา หรือล้างตัวกรองเพื่อดูตัวชี้วัดทั้งหมด
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer"
          >
            แสดงตัวชี้วัดทั้งหมด 22 ข้อ
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-24">รหัส</th>
                  <th className="py-3 px-4">ชื่อตัวชี้วัด / รายละเอียด</th>
                  <th className="py-3 px-4 w-32">ไตรมาส</th>
                  <th className="py-3 px-4 w-48">กลุ่มงานรับผิดชอบ</th>
                  <th className="py-3 px-4 w-32 text-center">ความสมบูรณ์</th>
                  <th className="py-3 px-4 w-44">สถานะ</th>
                  <th className="py-3 px-4 w-28 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredIndicators.map((ind) => {
                  const doneItems = ind.items.filter((it) => it.isCompleted).length;
                  const totalItems = ind.items.length;
                  const percent = Math.round((doneItems / totalItems) * 100);
                  const filesCount = ind.items.reduce((acc, it) => acc + it.evidenceFiles.length, 0);

                  return (
                    <tr
                      key={ind.id}
                      onClick={() => onSelectMOIT(ind.id)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Code */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        <span className="bg-slate-100 group-hover:bg-emerald-100 text-slate-800 group-hover:text-emerald-900 px-2 py-1 rounded">
                          {ind.code}
                        </span>
                      </td>

                      {/* Title & Description */}
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {ind.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {ind.description}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                          <span>{filesCount} ไฟล์เอกสารแนบ</span>
                          <span>·</span>
                          <span>ปรับปรุง {ind.lastUpdated}</span>
                        </div>
                      </td>

                      {/* Quarter */}
                      <td className="py-3.5 px-4 font-medium text-slate-800 whitespace-nowrap">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {ind.quarter}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="truncate max-w-[180px] font-medium" title={ind.department}>
                          {ind.department}
                        </div>
                      </td>

                      {/* Completion Ratio */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="font-mono font-semibold tabular-nums text-slate-800">
                          {doneItems}/{totalItems}
                        </div>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 mx-auto mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              percent === 100 ? 'bg-emerald-600' : percent > 0 ? 'bg-sky-500' : 'bg-slate-300'
                            }`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(ind.status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectMOIT(ind.id);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          ตรวจดู <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIndicators.map((ind) => {
            const doneItems = ind.items.filter((it) => it.isCompleted).length;
            const totalItems = ind.items.length;
            const percent = Math.round((doneItems / totalItems) * 100);
            const filesCount = ind.items.reduce((acc, it) => acc + it.evidenceFiles.length, 0);

            return (
              <div
                key={ind.id}
                onClick={() => onSelectMOIT(ind.id)}
                className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-emerald-100 group-hover:text-emerald-900 px-2 py-0.5 rounded">
                      {ind.code}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                      {ind.quarter}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate max-w-[150px]">{ind.department}</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-700">
                      {doneItems}/{totalItems} ({percent}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        percent === 100 ? 'bg-emerald-600' : percent > 0 ? 'bg-sky-500' : 'bg-slate-300'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>{getStatusBadge(ind.status)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {filesCount} ไฟล์แนบ
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
