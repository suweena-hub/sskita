import React, { useState } from 'react';
import { useITA } from '../context/ITAContext';
import { EvidenceFile, MOITIndicator } from '../types/ita';
import { hospitalAssets } from '../data/initialData';
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  ShieldCheck,
  Building,
  HeartHandshake,
  ShoppingBag,
  FileSpreadsheet,
  AlertOctagon,
  Users,
  Award
} from 'lucide-react';

interface PublicPortalViewProps {
  onPreviewFile: (file: EvidenceFile, moitCode: string, moitTitle: string) => void;
  onSelectMOIT: (moitId: string) => void;
}

export const PublicPortalView: React.FC<PublicPortalViewProps> = ({
  onPreviewFile,
  onSelectMOIT
}) => {
  const { profile, indicators, stats } = useITA();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Categories mapping
  const categories = [
    {
      id: 'all',
      title: 'เอกสารทั้งหมด',
      icon: FileText
    },
    {
      id: 'procurement',
      title: 'การจัดซื้อจัดจ้าง & สขร.1',
      icon: ShoppingBag,
      moitCodes: ['MOIT 4', 'MOIT 5']
    },
    {
      id: 'nogift_integrity',
      title: 'No Gift Policy & ต้านทุจริต',
      icon: ShieldCheck,
      moitCodes: ['MOIT 12', 'MOIT 13', 'MOIT 18', 'MOIT 20', 'MOIT 21']
    },
    {
      id: 'hospital_info',
      title: 'ข้อมูลองค์กร & แผนยุทธศาสตร์',
      icon: Building,
      moitCodes: ['MOIT 1', 'MOIT 2', 'MOIT 3', 'MOIT 6', 'MOIT 7']
    },
    {
      id: 'complaint_public',
      title: 'เรื่องร้องเรียน & การมีส่วนร่วม',
      icon: Users,
      moitCodes: ['MOIT 9', 'MOIT 10', 'MOIT 11']
    },
    {
      id: 'ethics',
      title: 'จริยธรรม & คุณธรรมองค์กร',
      icon: Award,
      moitCodes: ['MOIT 15', 'MOIT 16', 'MOIT 17']
    }
  ];

  // Flatten all uploaded evidence files across all indicators
  const allDisclosedFiles = indicators.flatMap((ind) =>
    ind.items.flatMap((item) =>
      item.evidenceFiles.map((file) => ({
        ...file,
        moitCode: ind.code,
        moitTitle: ind.title,
        moitId: ind.id,
        subItemNumber: item.itemNumber
      }))
    )
  );

  // Filter files
  const filteredFiles = allDisclosedFiles.filter((item) => {
    // Search
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.moitCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.moitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.docNumber && item.docNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    // Category
    if (selectedCategory !== 'all') {
      const activeCat = categories.find((c) => c.id === selectedCategory);
      if (activeCat && activeCat.moitCodes) {
        return activeCat.moitCodes.includes(item.moitCode);
      }
    }

    return true;
  });

  return (
    <div className="space-y-8">
      {/* 1. Official Citizen Portal Header */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white p-7 sm:p-9 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>ศูนย์ข้อมูลข่าวสารเพื่อความโปร่งใสและการเปิดเผยข้อมูลสาธารณะ (MOPH Open Data)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            ช่องทางเปิดเผยข้อมูลการประเมินคุณธรรมและความโปร่งใส (MOPH ITA) ประจำปีงบประมาณ พ.ศ. {profile.fiscalYear} ตามเกณฑ์ศูนย์ปฏิบัติการต่อต้านการทุจริต กระทรวงสาธารณสุข และสำนักงาน ป.ป.ช. เพื่อให้ประชาชนสามารถเข้าถึงและตรวจสอบได้โดยสะดวก
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
            <div>
              <span className="text-slate-400">ผู้อำนวยการ:</span> <strong className="text-white">{profile.directorName}</strong>
            </div>
            <div>
              <span className="text-slate-400">ระดับผลประเมิน:</span> <strong className="text-emerald-400">{stats.evaluationGrade.text}</strong>
            </div>
            <div>
              <span className="text-slate-400">เอกสารเปิดเผย:</span> <strong className="text-white font-mono tabular-nums">{allDisclosedFiles.length} รายการ</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาเอกสารสาธารณะ เช่น สขร.1, No Gift Policy, แผนจัดซื้อจัดจ้าง, ประกาศรับสมัครงาน..."
            className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white"
          />
        </div>

        {/* Categories tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Document Cards Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>พบเอกสารเปิดเผย {filteredFiles.length} รายการ</span>
          <span>ข้อมูลปรับปรุงล่าสุด: ปีงบประมาณ {profile.fiscalYear}</span>
        </div>

        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <button
                      onClick={() => onSelectMOIT(item.moitId)}
                      className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded cursor-pointer"
                    >
                      {item.moitCode}
                    </button>
                    <span className="text-[11px] text-slate-400 font-medium tabular-nums">
                      {item.uploadDate}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.moitTitle} (ข้อ {item.subItemNumber})
                  </p>

                  {item.docNumber && (
                    <div className="mt-2 text-[11px] text-slate-500 font-mono">
                      เลขที่: {item.docNumber}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold">
                    {item.fileType} {item.fileSize ? `(${item.fileSize})` : ''}
                  </span>

                  <button
                    onClick={() => onPreviewFile(item, item.moitCode, item.moitTitle)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    เปิดอ่านเอกสาร
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            ไม่พบเอกสารตามเงื่อนไขที่ค้นหา กรุณาลองเลือกหมวดหมู่อื่น
          </div>
        )}
      </div>

      {/* 4. Anti-Corruption Hotlines & Complaint Channels Footer Callout */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-emerald-700" />
              ช่องทางแจ้งเบาะแสการทุจริตและรับฟังความคิดเห็นผู้รับบริการ
            </h4>
            <p className="text-xs text-emerald-800 max-w-2xl leading-relaxed">
              หากพบเห็นการทุจริต การเรียกรับสินบน หรือต้องการร้องเรียนการให้บริการ สามารถแจ้งเรื่องผ่านศูนย์รับเรื่องร้องเรียน {profile.name} โทร. {profile.phone} หรือทางอีเมล {profile.email}
            </p>
          </div>

          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            เข้าสู่ระบบร้องเรียนออนไลน์ <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
