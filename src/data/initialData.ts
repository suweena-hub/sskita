import { MOITIndicator, HospitalProfile, AuditLogItem } from '../types/ita';

export const initialHospitalProfile: HospitalProfile = {
  name: 'โรงพยาบาลชุมชนบ้านแพ้วพัฒนา',
  hospitalType: 'โรงพยาบาลชุมชน (รพช.) ขนาด 60 เตียง',
  bedCount: 60,
  district: 'อำเภอบ้านแพ้ว',
  province: 'จังหวัดสมุทรสาคร',
  affiliation: 'สำนักงานสาธารณสุขจังหวัดสมุทรสาคร กระทรวงสาธารณสุข',
  directorName: 'นายแพทย์กิตติศักดิ์ พรหมมินทร์',
  fiscalYear: '2568',
  targetScore: 96.50,
  coordinatorName: 'นางสาววลัยลักษณ์ สุขสวัสดิ์ (นักจัดการงานทั่วไปชำนาญการ)',
  phone: '034-481-224 ต่อ 102',
  email: 'ita-hospital@moph.mail.go.th',
  website: 'https://banphaeo-hosp.moph.go.th'
};

export const initialIndicators: MOITIndicator[] = [
  {
    id: 'moit-1',
    code: 'MOIT 1',
    title: 'ข้อมูลพื้นฐานของโรงพยาบาล',
    description: 'การเปิดเผยข้อมูลพื้นฐาน โครงสร้างการบริหาร อำนาจหน้าที่ นโยบาย แผนยุทธศาสตร์ และช่องทางการติดต่อสื่อสารของโรงพยาบาล',
    pillar: 'open_data',
    quarter: 'Q1',
    department: 'กลุ่มงานบริหารทั่วไป / ศูนย์ข้อมูลข่าวสาร',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-15',
    auditorRemarks: 'เปิดเผยข้อมูลครบถ้วนทั้ง 7 รายการ ลิงก์เข้าถึงได้และเป็นปัจจุบัน',
    items: [
      {
        id: 'moit-1-1',
        itemNumber: '1.1',
        name: 'โครงสร้างการแบ่งส่วนราชการและสายการบังคับบัญชาของโรงพยาบาล',
        requiredFormat: 'PDF / Infographic',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-1-1',
            title: 'แผนผังโครงสร้างการบริหารงานโรงพยาบาลชุมชน ประจำปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '1.8 MB',
            url: '#',
            uploadDate: '2567-10-10',
            docNumber: 'สธ 0312/045',
            uploadedBy: 'งานสารบรรณ'
          }
        ]
      },
      {
        id: 'moit-1-2',
        itemNumber: '1.2',
        name: 'ทำเนียบผู้บริหาร และข้อมูลผู้บริหารสูงสุดของโรงพยาบาล',
        requiredFormat: 'หน้าเว็บ / PDF',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-2-1',
            title: 'ทำเนียบผู้อำนวยการและหัวหน้ากลุ่มงานโรงพยาบาล',
            fileType: 'pdf',
            fileSize: '2.4 MB',
            url: '#',
            uploadDate: '2567-10-12',
            uploadedBy: 'กลุ่มงานบริหารทั่วไป'
          }
        ]
      },
      {
        id: 'moit-1-3',
        itemNumber: '1.3',
        name: 'อำนาจหน้าที่ของโรงพยาบาลตามกฎหมายจัดตั้งหรือกฎกระทรวง',
        requiredFormat: 'หน้าเว็บ / PDF',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-3-1',
            title: 'อำนาจหน้าที่และพันธกิจโรงพยาบาลชุมชนตามกฎกระทรวง',
            fileType: 'pdf',
            fileSize: '850 KB',
            url: '#',
            uploadDate: '2567-10-15',
            uploadedBy: 'นิติกร'
          }
        ]
      },
      {
        id: 'moit-1-4',
        itemNumber: '1.4',
        name: 'แผนยุทธศาสตร์และแผนปฏิบัติราชการประจำปีของโรงพยาบาล',
        requiredFormat: 'เอกสารแผนงาน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-4-1',
            title: 'แผนยุทธศาสตร์พัฒนาสุขภาพ รพช. ระยะ 5 ปี (2566-2570) ฉบับทบทวน 2568',
            fileType: 'pdf',
            fileSize: '5.2 MB',
            url: '#',
            uploadDate: '2567-10-20',
            docNumber: 'คำสั่ง รพ. ที่ 189/2567',
            uploadedBy: 'กลุ่มงานยุทธศาสตร์'
          }
        ]
      },
      {
        id: 'moit-1-5',
        itemNumber: '1.5',
        name: 'ข้อมูลการติดต่อ หมายเลขโทรศัพท์ แผนที่ และช่องทาง Social Network',
        requiredFormat: 'หน้าเว็บ / ช่องทางออนไลน์',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-5-1',
            title: 'ช่องทางการติดต่อสื่อสารและแผนที่ตั้งโรงพยาบาล',
            fileType: 'link',
            url: 'https://banphaeo-hosp.moph.go.th/contact',
            uploadDate: '2567-10-05',
            uploadedBy: 'งานเทคโนโลยีสารสนเทศ'
          }
        ]
      },
      {
        id: 'moit-1-6',
        itemNumber: '1.6',
        name: 'กฎหมาย ระเบียบ ข้อบังคับที่เกี่ยวข้องกับการปฏิบัติงานของโรงพยาบาล',
        requiredFormat: 'รวมลิงก์ / PDF',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-6-1',
            title: 'รวมกฎหมายและระเบียบกระทรวงสาธารณสุขว่าด้วยการบริการสาธารณสุข',
            fileType: 'pdf',
            fileSize: '3.1 MB',
            url: '#',
            uploadDate: '2567-10-25',
            uploadedBy: 'นิติกร'
          }
        ]
      },
      {
        id: 'moit-1-7',
        itemNumber: '1.7',
        name: 'ช่องทางถาม-ตอบ (Q&A) และช่องทางรับฟังความคิดเห็นของประชาชน',
        requiredFormat: 'ระบบสนทนา / Google Form / กระดานถามตอบ',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-1-7-1',
            title: 'กระดานรับฟังความคิดเห็นและระบบ Q&A ประชาชนผ่านเว็บไซต์',
            fileType: 'link',
            url: 'https://banphaeo-hosp.moph.go.th/qa',
            uploadDate: '2567-10-08',
            uploadedBy: 'งานประชาสัมพันธ์'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-2',
    code: 'MOIT 2',
    title: 'นโยบายและแผนการบริหารทรัพยากรบุคคล',
    description: 'การเปิดเผยนโยบายการบริหารทรัพยากรบุคคล แผนอัตรากำลัง และแผนพัฒนาบุคลากรประจำปีของโรงพยาบาล',
    pillar: 'open_data',
    quarter: 'Q1',
    department: 'กลุ่มงานบริหารทั่วไป (งานการเจ้าหน้าที่/HR)',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-20',
    auditorRemarks: 'เอกสารนโยบายผ่านความเห็นชอบจาก ผอ.รพ. มีแผนพัฒนาสมรรถนะบุคลากรชัดเจน',
    items: [
      {
        id: 'moit-2-1',
        itemNumber: '2.1',
        name: 'นโยบายและทิศทางการบริหารทรัพยากรบุคคลของผู้อำนวยการโรงพยาบาล',
        requiredFormat: 'ประกาศนโยบาย (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-2-1-1',
            title: 'ประกาศนโยบายการบริหารทรัพยากรบุคคล ประจำปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '1.2 MB',
            url: '#',
            uploadDate: '2567-10-18',
            docNumber: 'ประกาศ รพ. ลงวันที่ 15 ต.ค. 2567',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      },
      {
        id: 'moit-2-2',
        itemNumber: '2.2',
        name: 'แผนอัตรากำลังบุคลากรทางการแพทย์และเจ้าหน้าที่สนับสนุน (Workforce Plan)',
        requiredFormat: 'แผนอัตรากำลัง (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-2-2-1',
            title: 'แผนอัตรากำลัง 3 ปี (2567-2569) โรงพยาบาลชุมชน',
            fileType: 'pdf',
            fileSize: '2.7 MB',
            url: '#',
            uploadDate: '2567-10-22',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      },
      {
        id: 'moit-2-3',
        itemNumber: '2.3',
        name: 'แผนพัฒนาบุคลากรและฝึกอบรมประจำปี (HRD Plan)',
        requiredFormat: 'เอกสารแผนงาน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-2-3-1',
            title: 'แผนพัฒนาความรู้และทักษะวิชาชีพบุคลากรประจำปี 2568',
            fileType: 'pdf',
            fileSize: '3.4 MB',
            url: '#',
            uploadDate: '2567-10-25',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-3',
    code: 'MOIT 3',
    title: 'รายงานผลการดำเนินงานตามแผนปฏิบัติการและการใช้จ่ายงบประมาณ',
    description: 'การเปิดเผยแผนปฏิบัติการประจำปี รายงานความก้าวหน้ารอบ 6 เดือน และรายงานสรุปผลการใช้จ่ายงบประมาณ',
    pillar: 'open_data',
    quarter: 'Q2',
    department: 'กลุ่มงานยุทธศาสตร์และแผนงาน / งานการเงินและบัญชี',
    weightScore: 4.5,
    status: 'in_progress',
    lastUpdated: '2568-03-25',
    auditorRemarks: 'รออัปโหลดรายงานผลการใช้จ่ายงบประมาณรอบ 6 เดือน (ไตรมาส 2)',
    items: [
      {
        id: 'moit-3-1',
        itemNumber: '3.1',
        name: 'แผนปฏิบัติการประจำปีงบประมาณ 2568 ที่ได้รับอนุมัติจากผู้ว่าฯ/สสจ.',
        requiredFormat: 'เอกสารเล่มแผน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-3-1-1',
            title: 'เล่มแผนปฏิบัติการประจำปีงบประมาณ 2568 โรงพยาบาลชุมชน',
            fileType: 'pdf',
            fileSize: '6.8 MB',
            url: '#',
            uploadDate: '2567-10-30',
            docNumber: 'สธ 0312.2/112',
            uploadedBy: 'งานแผนงาน'
          }
        ]
      },
      {
        id: 'moit-3-2',
        itemNumber: '3.2',
        name: 'รายงานผลการดำเนินงานตามแผนปฏิบัติการรอบ 6 เดือน (ต.ค. 67 - มี.ค. 68)',
        requiredFormat: 'รายงานผล (PDF)',
        isCompleted: false,
        evidenceFiles: []
      },
      {
        id: 'moit-3-3',
        itemNumber: '3.3',
        name: 'รายงานการกำกับติดตามการใช้จ่ายงบประมาณ (เงินงบประมาณและเงินบำรุง) รอบ 6 เดือน',
        requiredFormat: 'ตารางสรุปงบประมาณ (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  },
  {
    id: 'moit-4',
    code: 'MOIT 4',
    title: 'แผนการจัดซื้อจัดจ้างและการจัดหาพัสดุประจำปี',
    description: 'การเปิดเผยแผนการจัดซื้อจัดจ้างงบลงทุนและงบดำเนินงาน ประกาศเผยแพร่แผน และรายงานความก้าวหน้าการจัดหา',
    pillar: 'open_data',
    quarter: 'Q1',
    department: 'กลุ่มงานบริหารทั่วไป (งานพัสดุและอาคารสถานที่)',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-10',
    auditorRemarks: 'ประกาศแผนบนระบบ e-GP และเว็บไซต์โรงพยาบาลครบถ้วน',
    items: [
      {
        id: 'moit-4-1',
        itemNumber: '4.1',
        name: 'แผนการจัดซื้อจัดจ้างงบลงทุนและครุภัณฑ์ทางการแพทย์ประจำปี 2568',
        requiredFormat: 'ประกาศแผนงาน (PDF / e-GP)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-4-1-1',
            title: 'ประกาศแผนจัดซื้อจัดจ้างงบลงทุน ประจำปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '1.9 MB',
            url: '#',
            uploadDate: '2567-10-15',
            docNumber: 'ประกาศ รพ. เลขที่ 14/2567',
            uploadedBy: 'งานพัสดุ'
          }
        ]
      },
      {
        id: 'moit-4-2',
        itemNumber: '4.2',
        name: 'แผนการจัดซื้อยาและเวชภัณฑ์มิใช่ยาประจำปีงบประมาณ 2568',
        requiredFormat: 'เอกสารแผน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-4-2-1',
            title: 'แผนจัดซื้อยาและเวชภัณฑ์มิใช่ยา ประจำปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '2.1 MB',
            url: '#',
            uploadDate: '2567-10-18',
            uploadedBy: 'กลุ่มงานเภสัชกรรมฯ'
          }
        ]
      },
      {
        id: 'moit-4-3',
        itemNumber: '4.3',
        name: 'หนังสือขออนุมัติเผยแพร่แผนจัดซื้อจัดจ้างผ่านเว็บไซต์โรงพยาบาล',
        requiredFormat: 'บันทึกข้อความขออนุมัติ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-4-3-1',
            title: 'บันทึกข้อความขออนุมัติเผยแพร่แผนจัดซื้อจัดจ้างบนเว็บไซต์ รพ.',
            fileType: 'pdf',
            fileSize: '650 KB',
            url: '#',
            uploadDate: '2567-10-16',
            docNumber: 'สธ 0312/พศ 204',
            uploadedBy: 'งานพัสดุ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-5',
    code: 'MOIT 5',
    title: 'สรุปผลการจัดซื้อจัดจ้างในรอบเดือน (แบบ สขร. 1)',
    description: 'การเปิดเผยสรุปผลการดำเนินการจัดซื้อจัดจ้างในรอบเดือนตามแบบ สขร. 1 ทุกเดือนอย่างสม่ำเสมอ',
    pillar: 'open_data',
    quarter: 'Q2',
    department: 'กลุ่มงานบริหารทั่วไป (งานพัสดุ)',
    weightScore: 5.0,
    status: 'in_progress',
    lastUpdated: '2568-03-05',
    auditorRemarks: 'อัปโหลดครบถึงเดือน ก.พ. 2568 (รอรอบ มี.ค. 2568)',
    items: [
      {
        id: 'moit-5-1',
        itemNumber: '5.1',
        name: 'แบบ สขร. 1 ประจำไตรมาสที่ 1 (ตุลาคม - ธันวาคม 2567)',
        requiredFormat: 'แบบ สขร. 1 รายเดือน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-5-1-1',
            title: 'สรุปผลการจัดซื้อจัดจ้าง แบบ สขร.1 เดือน ตุลาคม 2567',
            fileType: 'pdf',
            fileSize: '1.4 MB',
            url: '#',
            uploadDate: '2567-11-05',
            uploadedBy: 'งานพัสดุ'
          },
          {
            id: 'ev-5-1-2',
            title: 'สรุปผลการจัดซื้อจัดจ้าง แบบ สขร.1 เดือน พฤศจิกายน 2567',
            fileType: 'pdf',
            fileSize: '1.5 MB',
            url: '#',
            uploadDate: '2567-12-04',
            uploadedBy: 'งานพัสดุ'
          },
          {
            id: 'ev-5-1-3',
            title: 'สรุปผลการจัดซื้อจัดจ้าง แบบ สขร.1 เดือน ธันวาคม 2567',
            fileType: 'pdf',
            fileSize: '1.3 MB',
            url: '#',
            uploadDate: '2568-01-08',
            uploadedBy: 'งานพัสดุ'
          }
        ]
      },
      {
        id: 'moit-5-2',
        itemNumber: '5.2',
        name: 'แบบ สขร. 1 ประจำไตรมาสที่ 2 (มกราคม - มีนาคม 2568)',
        requiredFormat: 'แบบ สขร. 1 รายเดือน (PDF)',
        isCompleted: false,
        evidenceFiles: [
          {
            id: 'ev-5-2-1',
            title: 'สรุปผลการจัดซื้อจัดจ้าง แบบ สขร.1 เดือน มกราคม 2568',
            fileType: 'pdf',
            fileSize: '1.4 MB',
            url: '#',
            uploadDate: '2568-02-06',
            uploadedBy: 'งานพัสดุ'
          },
          {
            id: 'ev-5-2-2',
            title: 'สรุปผลการจัดซื้อจัดจ้าง แบบ สขร.1 เดือน กุมภาพันธ์ 2568',
            fileType: 'pdf',
            fileSize: '1.2 MB',
            url: '#',
            uploadDate: '2568-03-05',
            uploadedBy: 'งานพัสดุ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-6',
    code: 'MOIT 6',
    title: 'นโยบายการบริหารทรัพยากรบุคคลและการดำเนินการตามนโยบาย',
    description: 'การเปิดเผยนโยบายการบริหารและพัฒนาทรัพยากรบุคคล การปฏิบัติตามนโยบาย และแนวทางการสร้างแรงจูงใจในการทำงาน',
    pillar: 'open_data',
    quarter: 'Q2',
    department: 'กลุ่มงานบริหารทั่วไป (งานการเจ้าหน้าที่)',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-02-14',
    auditorRemarks: 'มีคู่มือแนวทางและหลักเกณฑ์การประเมินผลชัดเจน',
    items: [
      {
        id: 'moit-6-1',
        itemNumber: '6.1',
        name: 'ประกาศเจตนารมณ์การบริหารงานบุคคลด้วยความโปร่งใสและเป็นธรรม',
        requiredFormat: 'ประกาศ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-6-1-1',
            title: 'ประกาศเจตนารมณ์การบริหารทรัพยากรบุคคลด้วยความโปร่งใส รพช.',
            fileType: 'pdf',
            fileSize: '950 KB',
            url: '#',
            uploadDate: '2567-11-12',
            docNumber: 'ประกาศ รพ. ที่ 22/2567',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      },
      {
        id: 'moit-6-2',
        itemNumber: '6.2',
        name: 'แนวทางการสร้างขวัญกำลังใจและการให้รางวัลแก่บุคลากรที่มีผลงานดีเด่น',
        requiredFormat: 'แนวปฏิบัติ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-6-2-1',
            title: 'ระเบียบหลักเกณฑ์การคัดเลือกคนดีศรียาสูบ/คนดีศรีโรงพยาบาลชุมชน',
            fileType: 'pdf',
            fileSize: '1.1 MB',
            url: '#',
            uploadDate: '2567-12-05',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-7',
    code: 'MOIT 7',
    title: 'หลักเกณฑ์การบริหารและพัฒนาทรัพยากรบุคคล',
    description: 'การเปิดเผยหลักเกณฑ์การสรรหา บรรจุแต่งตั้ง โยกย้าย การประเมินผลการปฏิบัติงาน และการให้รางวัลหรือลงโทษทางวินัย',
    pillar: 'open_data',
    quarter: 'Q1',
    department: 'กลุ่มงานบริหารทั่วไป (งานการเจ้าหน้าที่)',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-12',
    auditorRemarks: 'เอกสารระเบียบการประเมินผลงานและเกณฑ์การให้เงินเพิ่มพิเศษ พ.ต.ส. ครบถ้วน',
    items: [
      {
        id: 'moit-7-1',
        itemNumber: '7.1',
        name: 'หลักเกณฑ์การประเมินผลการปฏิบัติงานของข้าราชการ ลูกจ้างประจำ และพนักงานกระทรวงสาธารณสุข (พกส.)',
        requiredFormat: 'ประกาศหลักเกณฑ์ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-7-1-1',
            title: 'ประกาศหลักเกณฑ์การประเมินผลการปฏิบัติงาน รอบปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '2.3 MB',
            url: '#',
            uploadDate: '2567-10-28',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      },
      {
        id: 'moit-7-2',
        itemNumber: '7.2',
        name: 'หลักเกณฑ์การคัดเลือกและจ้างเหมาบริการ/ลูกจ้างชั่วคราว',
        requiredFormat: 'ระเบียบประกาศ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-7-2-1',
            title: 'หลักเกณฑ์และวิธีการคัดเลือกลูกจ้างชั่วคราวเงินบำรุง',
            fileType: 'pdf',
            fileSize: '1.4 MB',
            url: '#',
            uploadDate: '2567-11-02',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-8',
    code: 'MOIT 8',
    title: 'รายงานผลการบริหารและพัฒนาทรัพยากรบุคคลประจำปี',
    description: 'การเปิดเผยรายงานผลการดำเนินงานด้านทรัพยากรบุคคล สถิติการพัฒนาฝึกอบรม และผลการประเมินผลการปฏิบัติราชการ',
    pillar: 'open_data',
    quarter: 'Q4',
    department: 'กลุ่มงานบริหารทั่วไป (งานการเจ้าหน้าที่)',
    weightScore: 4.5,
    status: 'pending',
    lastUpdated: '2567-12-01',
    auditorRemarks: 'กำหนดการจัดทำและเผยแพร่ในไตรมาสที่ 4',
    items: [
      {
        id: 'moit-8-1',
        itemNumber: '8.1',
        name: 'รายงานผลการบริหารและพัฒนาทรัพยากรบุคคล ประจำปีงบประมาณ 2567 (ย้อนหลัง)',
        requiredFormat: 'รายงานประจำปี (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-8-1-1',
            title: 'รายงานสรุปผลการบริหารงานบุคคล รพช. ประจำปีงบประมาณ 2567',
            fileType: 'pdf',
            fileSize: '4.6 MB',
            url: '#',
            uploadDate: '2567-11-15',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      },
      {
        id: 'moit-8-2',
        itemNumber: '8.2',
        name: 'รายงานผลการดำเนินงานด้านการพัฒนาบุคลากรประจำปี 2568 (รอบ 12 เดือน)',
        requiredFormat: 'รายงานสรุป (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  },
  {
    id: 'moit-9',
    code: 'MOIT 9',
    title: 'คู่มือและแนวปฏิบัติการจัดการเรื่องร้องเรียน',
    description: 'การเปิดเผยแนวปฏิบัติการจัดการเรื่องร้องเรียนการทุจริตประพฤติมิชอบ และเรื่องร้องเรียนทั่วไป พร้อมแผนผังขั้นตอนและช่องทางการร้องเรียน',
    pillar: 'open_data',
    quarter: 'Q1',
    department: 'กลุ่มงานบริหารทั่วไป / ศูนย์รับเรื่องร้องเรียน',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-08',
    auditorRemarks: 'มีช่องทางออนไลน์และตู้รับความคิดเห็นที่จุดบริการผู้ป่วยนอก (OPD) ครบถ้วน',
    items: [
      {
        id: 'moit-9-1',
        itemNumber: '9.1',
        name: 'คู่มือการปฏิบัติงานการรับเรื่องร้องเรียนการทุจริตและประพฤติมิชอบ',
        requiredFormat: 'คู่มือ SOP (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-9-1-1',
            title: 'คู่มือแนวทางรับเรื่องร้องเรียนร้องทุกข์และการคุ้มครองผู้ร้องเรียน รพช.',
            fileType: 'pdf',
            fileSize: '3.1 MB',
            url: '#',
            uploadDate: '2567-10-15',
            docNumber: 'คู่มือปฏิบัติงานฉบับปรับปรุง 2568',
            uploadedBy: 'นิติกร'
          }
        ]
      },
      {
        id: 'moit-9-2',
        itemNumber: '9.2',
        name: 'แผนผังขั้นตอนกระบวนการจัดการเรื่องร้องเรียน (Flow Chart)',
        requiredFormat: 'แผนผัง / Infographic',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-9-2-1',
            title: 'แผนผังขั้นตอนการรับและส่งต่อเรื่องร้องเรียนโรงพยาบาล',
            fileType: 'image',
            fileSize: '920 KB',
            url: '#',
            uploadDate: '2567-10-16',
            uploadedBy: 'งานประชาสัมพันธ์'
          }
        ]
      },
      {
        id: 'moit-9-3',
        itemNumber: '9.3',
        name: 'ช่องทางรับเรื่องร้องเรียนทางออนไลน์และตู้รับเรื่องร้องเรียน',
        requiredFormat: 'ลิงก์ระบบ / ภาพถ่ายตู้รับเรื่อง',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-9-3-1',
            title: 'ระบบแจ้งเบาะแสการทุจริตออนไลน์ (Whistleblower Channel)',
            fileType: 'link',
            url: 'https://banphaeo-hosp.moph.go.th/complaint',
            uploadDate: '2567-10-10',
            uploadedBy: 'งานสารสนเทศ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-10',
    code: 'MOIT 10',
    title: 'สรุปผลการดำเนินการเรื่องร้องเรียน',
    description: 'การเปิดเผยรายงานสรุปผลการดำเนินการเรื่องร้องเรียนการทุจริตและเรื่องร้องเรียนการให้บริการรอบ 6 เดือนและรอบปี',
    pillar: 'open_data',
    quarter: 'Q2',
    department: 'ศูนย์รับเรื่องร้องเรียน / งานนิติการ',
    weightScore: 4.5,
    status: 'in_progress',
    lastUpdated: '2568-03-20',
    auditorRemarks: 'สรุปผลเรื่องร้องเรียนทั่วไปรอบ Q1 เรียบร้อย ไม่มีข้อร้องเรียนการทุจริต',
    items: [
      {
        id: 'moit-10-1',
        itemNumber: '10.1',
        name: 'รายงานสรุปผลการดำเนินการเรื่องร้องเรียนรอบไตรมาสที่ 1-2 (ต.ค. 67 - มี.ค. 68)',
        requiredFormat: 'สรุปสถิติ (PDF)',
        isCompleted: false,
        evidenceFiles: [
          {
            id: 'ev-10-1-1',
            title: 'สรุปสถิติเรื่องร้องเรียนการให้บริการผู้ป่วยนอก-ใน ไตรมาส 1/2568',
            fileType: 'pdf',
            fileSize: '1.2 MB',
            url: '#',
            uploadDate: '2568-01-12',
            uploadedBy: 'นิติกร'
          }
        ]
      },
      {
        id: 'moit-10-2',
        itemNumber: '10.2',
        name: 'รายงานสรุปข้อร้องเรียนการทุจริตและประพฤติมิชอบในหน่วยงาน',
        requiredFormat: 'รายงานสรุป (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-10-2-1',
            title: 'รายงานผลการตรวจสอบข้อร้องเรียนด้านการทุจริต (กรณีเรื่อง = 0 เรื่อง)',
            fileType: 'pdf',
            fileSize: '780 KB',
            url: '#',
            uploadDate: '2568-01-10',
            uploadedBy: 'นิติกร'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-11',
    code: 'MOIT 11',
    title: 'การเปิดโอกาสให้ผู้มีส่วนได้ส่วนเสียมีส่วนร่วม',
    description: 'การเปิดโอกาสให้ประชาชน คณะกรรมการพัฒนาคุณภาพชีวิตระดับอำเภอ (พชอ.) และผู้รับบริการเข้ามามีส่วนร่วมในการวางแผนและเสนอแนะ',
    pillar: 'open_data',
    quarter: 'Q2',
    department: 'กลุ่มงานบริการด้านปฐมภูมิและองค์รวม / กลุ่มงานยุทธศาสตร์',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-02-28',
    auditorRemarks: 'มีการประชุมรับฟังความคิดเห็นจากเครือข่าย อสม. และภาคประชาชนชัดเจน',
    items: [
      {
        id: 'moit-11-1',
        itemNumber: '11.1',
        name: 'รายงานการประชุมร่วมกับภาคีเครือข่ายสุขภาพ/อสม./คณะกรรมการ พชอ.',
        requiredFormat: 'รายงานการประชุมและภาพถ่าย (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-11-1-1',
            title: 'รายงานการประชุมรับฟังความคิดเห็นเพื่อพัฒนาบริการสุขภาพ รพช. ครั้งที่ 1/2568',
            fileType: 'pdf',
            fileSize: '3.8 MB',
            url: '#',
            uploadDate: '2567-12-18',
            uploadedBy: 'งานปฐมภูมิ'
          }
        ]
      },
      {
        id: 'moit-11-2',
        itemNumber: '11.2',
        name: 'การนำข้อเสนอแนะของประชาชนไปสู่การปฏิบัติและปรับปรุงการให้บริการ',
        requiredFormat: 'รายงานสรุปการปรับปรุง (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-11-2-1',
            title: 'สรุปการปรับปรุงระบบคิวและห้องตรวจตามข้อเสนอแนะของภาคประชาชน',
            fileType: 'pdf',
            fileSize: '2.5 MB',
            url: '#',
            uploadDate: '2568-01-25',
            uploadedBy: 'งานพัฒนาคุณภาพ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-12',
    code: 'MOIT 12',
    title: 'มาตรการป้องกันการรับสินบนทุกรูปแบบ (No Gift Policy)',
    description: 'การประกาศนโยบาย No Gift Policy จากการปฏิบัติหน้าที่ การลงนามประกาศเจตนารมณ์ และการจัดกิจกรรมขับเคลื่อนนโยบาย',
    pillar: 'anti_corruption',
    quarter: 'Q1',
    department: 'คณะทำงาน ITA โรงพยาบาล / กลุ่มงานบริหารทั่วไป',
    weightScore: 5.0,
    status: 'compliant',
    lastUpdated: '2568-01-05',
    auditorRemarks: 'ผอ.รพ. ประกาศเจตนารมณ์ No Gift Policy พร้อมติดป้ายรณรงค์ทั่วทั้งโรงพยาบาล',
    items: [
      {
        id: 'moit-12-1',
        itemNumber: '12.1',
        name: 'ประกาศเจตนารมณ์นโยบาย No Gift Policy โดยผู้อำนวยการโรงพยาบาล',
        requiredFormat: 'ประกาศภาษาไทยและภาษาอังกฤษ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-12-1-1',
            title: 'ประกาศโรงพยาบาล เรื่อง นโยบายไม่รับของขวัญและของกำนัลทุกชนิด (No Gift Policy)',
            fileType: 'pdf',
            fileSize: '1.4 MB',
            url: '#',
            uploadDate: '2567-10-11',
            docNumber: 'ประกาศ รพ. ลงวันที่ 10 ต.ค. 2567',
            uploadedBy: 'เลขานุการ ผอ.'
          }
        ]
      },
      {
        id: 'moit-12-2',
        itemNumber: '12.2',
        name: 'ภาพถ่ายกิจกรรมประกาศเจตนารมณ์ต่อต้านการทุจริตและการรับสินบน',
        requiredFormat: 'รายงานภาพกิจกรรม (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-12-2-1',
            title: 'ภาพพิธีปฏิญาณตนและประกาศเจตนารมณ์ No Gift Policy ของบุคลากร รพช.',
            fileType: 'pdf',
            fileSize: '4.2 MB',
            url: '#',
            uploadDate: '2567-10-18',
            uploadedBy: 'งานประชาสัมพันธ์'
          }
        ]
      },
      {
        id: 'moit-12-3',
        itemNumber: '12.3',
        name: 'รายงานการรับของขวัญและของกำนัลตามแบบรายงานที่ ป.ป.ช. กำหนด',
        requiredFormat: 'แบบฟอร์มรายงาน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-12-3-1',
            title: 'แบบรายงานสรุปการรับของขวัญและของกำนัลรอบ 6 เดือน',
            fileType: 'pdf',
            fileSize: '820 KB',
            url: '#',
            uploadDate: '2568-01-04',
            uploadedBy: 'งานนิติการ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-13',
    code: 'MOIT 13',
    title: 'การดำเนินการจัดการความเสี่ยงการทุจริตและประพฤติมิชอบ',
    description: 'การประเมินความเสี่ยงการทุจริต การจัดทำเมทริกซ์ความเสี่ยง และแผนบริหารความเสี่ยงการทุจริตในกระบวนการทำงานหลักของโรงพยาบาล',
    pillar: 'anti_corruption',
    quarter: 'Q2',
    department: 'คณะทำงาน ITA / กลุ่มงานควบคุมภายใน',
    weightScore: 5.0,
    status: 'compliant',
    lastUpdated: '2568-02-20',
    auditorRemarks: 'วิเคราะห์ความเสี่ยงครอบคลุมงานจัดซื้อจัดจ้าง การเบิกจ่ายยา และการรับบริจาคเงินบำรุง',
    items: [
      {
        id: 'moit-13-1',
        itemNumber: '13.1',
        name: 'รายงานการประเมินความเสี่ยงการทุจริตในกระบวนการจัดซื้อจัดจ้างและการเบิกจ่ายยา',
        requiredFormat: 'เอกสารประเมินความเสี่ยง (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-13-1-1',
            title: 'รายงานผลการประเมินความเสี่ยงการทุจริตประจำปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '3.6 MB',
            url: '#',
            uploadDate: '2567-11-20',
            docNumber: 'สธ 0312/คท 04',
            uploadedBy: 'คณะทำงาน ITA'
          }
        ]
      },
      {
        id: 'moit-13-2',
        itemNumber: '13.2',
        name: 'แผนบริหารจัดการความเสี่ยงการทุจริต (Risk Mitigation Plan)',
        requiredFormat: 'แผนจัดการความเสี่ยง (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-13-2-1',
            title: 'แผนปฏิบัติการจัดการความเสี่ยงการทุจริตและควบคุมภายใน รพช. 2568',
            fileType: 'pdf',
            fileSize: '2.4 MB',
            url: '#',
            uploadDate: '2567-11-25',
            uploadedBy: 'งานตรวจสอบภายใน'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-14',
    code: 'MOIT 14',
    title: 'รายงานผลการดำเนินการเพื่อจัดการความเสี่ยงการทุจริต',
    description: 'รายงานผลการดำเนินงานตามมาตรการจัดการความเสี่ยงการทุจริตและการติดตามผลการควบคุมภายใน',
    pillar: 'anti_corruption',
    quarter: 'Q3',
    department: 'คณะทำงาน ITA / งานตรวจสอบภายใน',
    weightScore: 4.5,
    status: 'pending',
    lastUpdated: '2568-01-15',
    auditorRemarks: 'กำหนดส่งรายงานรอบ 6 เดือนในเดือนเมษายน 2568',
    items: [
      {
        id: 'moit-14-1',
        itemNumber: '14.1',
        name: 'รายงานผลการดำเนินงานตามแผนจัดการความเสี่ยงการทุจริตรอบ 6 เดือน',
        requiredFormat: 'รายงานผล (PDF)',
        isCompleted: false,
        evidenceFiles: []
      },
      {
        id: 'moit-14-2',
        itemNumber: '14.2',
        name: 'รายงานการประเมินและทบทวนประสิทธิผลมาตรการควบคุมความเสี่ยง',
        requiredFormat: 'รายงานผล (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  },
  {
    id: 'moit-15',
    code: 'MOIT 15',
    title: 'การส่งเสริมคุณธรรม จริยธรรม และวัฒนธรรมองค์กร',
    description: 'การขับเคลื่อนองค์กรคุณธรรมต้นแบบ การปฏิบัติตามประมวลจริยธรรมข้าราชการสาธารณสุข และข้อพึงปฏิบัติ Do\'s & Don\'ts',
    pillar: 'anti_corruption',
    quarter: 'Q1',
    department: 'ชมรมจริยธรรมโรงพยาบาล / กลุ่มงานบริหารทั่วไป',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-22',
    auditorRemarks: 'มีการจัดทำคู่มือ Do\'s & Don\'ts และจัดบอร์ดรณรงค์ประมวลจริยธรรม',
    items: [
      {
        id: 'moit-15-1',
        itemNumber: '15.1',
        name: 'แผนปฏิบัติการส่งเสริมคุณธรรมและจริยธรรมของโรงพยาบาล ประจำปี 2568',
        requiredFormat: 'เอกสารแผน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-15-1-1',
            title: 'แผนการดำเนินงานชมรมจริยธรรมและองค์กรคุณธรรม รพช. 2568',
            fileType: 'pdf',
            fileSize: '1.8 MB',
            url: '#',
            uploadDate: '2567-10-25',
            uploadedBy: 'ชมรมจริยธรรม'
          }
        ]
      },
      {
        id: 'moit-15-2',
        itemNumber: '15.2',
        name: 'คู่มือข้อพึงปฏิบัติและข้อห้าม (Do\'s & Don\'ts) ในการให้บริการสาธารณสุข',
        requiredFormat: 'คู่มือ / Infographic (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-15-2-1',
            title: 'คู่มือ Do\'s & Don\'ts จริยธรรมเจ้าหน้าที่โรงพยาบาลชุมชน',
            fileType: 'pdf',
            fileSize: '2.9 MB',
            url: '#',
            uploadDate: '2567-11-05',
            uploadedBy: 'ชมรมจริยธรรม'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-16',
    code: 'MOIT 16',
    title: 'รายงานผลการส่งเสริมจริยธรรมและการประเมินองค์กรคุณธรรม',
    description: 'การเปิดเผยรายงานผลการปฏิบัติตามประมวลจริยธรรมและผลการประเมินตนเองตามเกณฑ์องค์กรคุณธรรมต้นแบบ',
    pillar: 'anti_corruption',
    quarter: 'Q3',
    department: 'ชมรมจริยธรรมโรงพยาบาล',
    weightScore: 4.0,
    status: 'in_progress',
    lastUpdated: '2568-02-18',
    auditorRemarks: 'อัปโหลดรายงานการดำเนินงานระยะที่ 1 เรียบร้อย รอการประเมินระดับกระทรวง',
    items: [
      {
        id: 'moit-16-1',
        itemNumber: '16.1',
        name: 'รายงานความก้าวหน้าการดำเนินงานตามแผนส่งเสริมคุณธรรมรอบ 6 เดือน',
        requiredFormat: 'รายงานผล (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-16-1-1',
            title: 'รายงานผลกิจกรรมส่งเสริมความซื่อสัตย์และจิตสาธารณะ ไตรมาส 1-2',
            fileType: 'pdf',
            fileSize: '2.1 MB',
            url: '#',
            uploadDate: '2568-02-15',
            uploadedBy: 'ชมรมจริยธรรม'
          }
        ]
      },
      {
        id: 'moit-16-2',
        itemNumber: '16.2',
        name: 'ผลการประเมินตนเองตามเกณฑ์การประเมินองค์กรคุณธรรม 9 ขั้นตอน',
        requiredFormat: 'แบบประเมิน (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  },
  {
    id: 'moit-17',
    code: 'MOIT 17',
    title: 'การประเมินคุณธรรมและความโปร่งใส (ITA) ในหน่วยงาน',
    description: 'การประเมินตนเอง ผลการสำรวจ IIT และ EIT และแผนการยกระดับผลคะแนน ITA ของโรงพยาบาล',
    pillar: 'anti_corruption',
    quarter: 'Q3',
    department: 'คณะทำงาน ITA โรงพยาบาล',
    weightScore: 4.5,
    status: 'in_progress',
    lastUpdated: '2568-03-01',
    auditorRemarks: 'อยู่ระหว่างเปิดให้บุคลากรตอบแบบสำรวจ IIT และผู้รับบริการตอบ EIT',
    items: [
      {
        id: 'moit-17-1',
        itemNumber: '17.1',
        name: 'คำสั่งแต่งตั้งคณะทำงานขับเคลื่อนการประเมิน ITA โรงพยาบาลชุมชน',
        requiredFormat: 'คำสั่ง รพ. (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-17-1-1',
            title: 'คำสั่งแต่งตั้งคณะทำงานประเมินคุณธรรมและความโปร่งใส (MOPH ITA) ปี 2568',
            fileType: 'pdf',
            fileSize: '1.3 MB',
            url: '#',
            uploadDate: '2567-10-12',
            docNumber: 'คำสั่ง รพ. ที่ 205/2567',
            uploadedBy: 'งานสารบรรณ'
          }
        ]
      },
      {
        id: 'moit-17-2',
        itemNumber: '17.2',
        name: 'ช่องทางและ QR Code สำหรับการตอบแบบวัด IIT (เจ้าหน้าที่) และ EIT (ประชาชน)',
        requiredFormat: 'สื่อประชาสัมพันธ์ / ลิงก์ระบบ',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-17-2-1',
            title: 'โปสเตอร์ QR Code ประชาสัมพันธ์การตอบแบบวัด IIT และ EIT',
            fileType: 'pdf',
            fileSize: '2.6 MB',
            url: '#',
            uploadDate: '2568-01-15',
            uploadedBy: 'คณะทำงาน ITA'
          }
        ]
      },
      {
        id: 'moit-17-3',
        itemNumber: '17.3',
        name: 'แผนปฏิบัติการยกระดับคะแนนการประเมิน ITA ประจำปีงบประมาณ 2568',
        requiredFormat: 'เอกสารแผนงาน (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  },
  {
    id: 'moit-18',
    code: 'MOIT 18',
    title: 'แผนปฏิบัติการป้องกัน ปราบปรามการทุจริตและประพฤติมิชอบ',
    description: 'การจัดทำแผนปฏิบัติการป้องกันและปราบปรามการทุจริตของโรงพยาบาล พร้อมกำหนดตัวชี้วัดและงบประมาณรองรับ',
    pillar: 'anti_corruption',
    quarter: 'Q1',
    department: 'คณะทำงาน ITA / กลุ่มงานยุทธศาสตร์',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-05',
    auditorRemarks: 'แผนได้รับการอนุมัติและเผยแพร่ตามกรอบระยะเวลาที่ สป.สธ. กำหนด',
    items: [
      {
        id: 'moit-18-1',
        itemNumber: '18.1',
        name: 'แผนปฏิบัติการป้องกัน ปราบปรามการทุจริตและประพฤติมิชอบ ประจำปี 2568',
        requiredFormat: 'เล่มแผนงาน (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-18-1-1',
            title: 'เล่มแผนปฏิบัติการป้องกัน ปราบปรามการทุจริต รพช. ปีงบประมาณ 2568',
            fileType: 'pdf',
            fileSize: '3.4 MB',
            url: '#',
            uploadDate: '2567-10-24',
            docNumber: 'สธ 0312/แผน 18',
            uploadedBy: 'คณะทำงาน ITA'
          }
        ]
      },
      {
        id: 'moit-18-2',
        itemNumber: '18.2',
        name: 'หนังสือขออนุมัติแผนและเผยแพร่ผ่านเว็บไซต์โรงพยาบาล',
        requiredFormat: 'บันทึกข้อความ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-18-2-1',
            title: 'บันทึกข้อความขออนุมัติเผยแพร่แผนป้องกันทุจริตบนเว็บไซต์',
            fileType: 'pdf',
            fileSize: '540 KB',
            url: '#',
            uploadDate: '2567-10-25',
            uploadedBy: 'งานสารบรรณ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-19',
    code: 'MOIT 19',
    title: 'รายงานผลการปฏิบัติตามแผนปฏิบัติการป้องกันการทุจริต',
    description: 'การรายงานความก้าวหน้าผลการดำเนินงานตามแผนปฏิบัติการป้องกันและปราบปรามการทุจริตในรอบ 6 เดือนและรอบปี',
    pillar: 'anti_corruption',
    quarter: 'Q2',
    department: 'คณะทำงาน ITA',
    weightScore: 4.5,
    status: 'needs_revision',
    lastUpdated: '2568-03-22',
    auditorRemarks: 'รายงานรอบ 6 เดือนต้องแนบหลักฐานภาพกิจกรรมและเอกสารการเบิกจ่ายเพิ่มเติม',
    items: [
      {
        id: 'moit-19-1',
        itemNumber: '19.1',
        name: 'รายงานผลการดำเนินงานตามแผนป้องกันปราบปรามการทุจริตรอบ 6 เดือน',
        requiredFormat: 'รายงานผล (PDF)',
        isCompleted: false,
        evidenceFiles: [
          {
            id: 'ev-19-1-1',
            title: 'ร่างรายงานความก้าวหน้าโครงการป้องกันทุจริตรอบ 6 เดือน (รอปรับปรุง)',
            fileType: 'doc',
            fileSize: '1.1 MB',
            url: '#',
            uploadDate: '2568-03-15',
            uploadedBy: 'คณะทำงาน ITA'
          }
        ]
      },
      {
        id: 'moit-19-2',
        itemNumber: '19.2',
        name: 'การประเมินผลสัมฤทธิ์และปัญหาอุปสรรคในการดำเนินงานตามแผน',
        requiredFormat: 'รายงานสรุป (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  },
  {
    id: 'moit-20',
    code: 'MOIT 20',
    title: 'มาตรการป้องกันการขัดกันระหว่างประโยชน์ส่วนบุคคลกับประโยชน์ส่วนรวม',
    description: 'การจัดทำคู่มือและแนวปฏิบัติเพื่อป้องกันผลประโยชน์ทับซ้อน (Conflict of Interest - COI) ของโรงพยาบาลชุมชน',
    pillar: 'anti_corruption',
    quarter: 'Q1',
    department: 'กลุ่มงานนิติการ / คณะทำงาน ITA',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-01-18',
    auditorRemarks: 'คู่มือครอบคลุมกรณีการจัดหายาและเวชภัณฑ์ การใช้ทรัพย์สินของทางราชการ',
    items: [
      {
        id: 'moit-20-1',
        itemNumber: '20.1',
        name: 'คู่มือและแนวทางปฏิบัติการป้องกันผลประโยชน์ทับซ้อนในโรงพยาบาล',
        requiredFormat: 'คู่มือ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-20-1-1',
            title: 'คู่มือการป้องกันการขัดกันแห่งผลประโยชน์ รพช. 2568',
            fileType: 'pdf',
            fileSize: '2.8 MB',
            url: '#',
            uploadDate: '2567-10-29',
            docNumber: 'คู่มือแนวปฏิบัติ สธ 0312/นต 11',
            uploadedBy: 'นิติกร'
          }
        ]
      },
      {
        id: 'moit-20-2',
        itemNumber: '20.2',
        name: 'ระเบียบการใช้ทรัพย์สิน ยานพาหนะ และอุปกรณ์ทางการแพทย์ของทางราชการ',
        requiredFormat: 'ระเบียบปฏิบัติ (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-20-2-1',
            title: 'ระเบียบการยืม-คืนและการใช้รถพยาบาล/ทรัพย์สินโรงพยาบาล',
            fileType: 'pdf',
            fileSize: '1.5 MB',
            url: '#',
            uploadDate: '2567-11-04',
            uploadedBy: 'งานยานพาหนะ'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-21',
    code: 'MOIT 21',
    title: 'การดำเนินการตามมาตรการป้องกันการขัดกันแห่งผลประโยชน์',
    description: 'การลงนามหนังสือแสดงเจตจำนง แบบแสดงตนการไม่มีผลประโยชน์ทับซ้อนของเจ้าหน้าที่จัดซื้อจัดจ้าง และการตรวจรับพัสดุ',
    pillar: 'anti_corruption',
    quarter: 'Q2',
    department: 'งานพัสดุ / คณะทำงานตรวจรับพัสดุ / งานการเจ้าหน้าที่',
    weightScore: 4.5,
    status: 'compliant',
    lastUpdated: '2568-02-10',
    auditorRemarks: 'เจ้าหน้าที่พัสดุและกรรมการตรวจรับทุกชุดลงนามแบบแสดงตนไม่มีส่วนได้เสียครบ 100%',
    items: [
      {
        id: 'moit-21-1',
        itemNumber: '21.1',
        name: 'แบบแสดงตนการไม่มีผลประโยชน์ทับซ้อนของคณะกรรมการจัดซื้อจัดจ้างและตรวจรับพัสดุ',
        requiredFormat: 'แบบฟอร์มลงนาม (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-21-1-1',
            title: 'รวมแบบแสดงตนไม่เป็นผู้มีส่วนได้เสียในการจัดซื้อจัดจ้าง ไตรมาส 1-2',
            fileType: 'pdf',
            fileSize: '3.7 MB',
            url: '#',
            uploadDate: '2568-01-28',
            uploadedBy: 'งานพัสดุ'
          }
        ]
      },
      {
        id: 'moit-21-2',
        itemNumber: '21.2',
        name: 'ภาพการอบรมชี้แจงแนวทางป้องกันผลประโยชน์ทับซ้อนแก่บุคลากรทางการแพทย์',
        requiredFormat: 'รายงานภาพอบรม (PDF)',
        isCompleted: true,
        evidenceFiles: [
          {
            id: 'ev-21-2-1',
            title: 'ภาพกิจกรรมบรรยายเรื่อง COI และระเบียบวินัยข้าราชการ',
            fileType: 'pdf',
            fileSize: '2.2 MB',
            url: '#',
            uploadDate: '2568-02-05',
            uploadedBy: 'งานการเจ้าหน้าที่'
          }
        ]
      }
    ]
  },
  {
    id: 'moit-22',
    code: 'MOIT 22',
    title: 'รายงานผลการดำเนินการป้องกันการขัดกันแห่งผลประโยชน์',
    description: 'การเปิดเผยรายงานผลการตรวจสอบและมาตรการแก้ไขปัญหาผลประโยชน์ทับซ้อนในรอบปีงบประมาณ',
    pillar: 'anti_corruption',
    quarter: 'Q4',
    department: 'กลุ่มงานนิติการ / คณะทำงาน ITA',
    weightScore: 4.5,
    status: 'pending',
    lastUpdated: '2567-11-20',
    auditorRemarks: 'กำหนดการจัดทำและรายงานผลในรอบไตรมาสที่ 4',
    items: [
      {
        id: 'moit-22-1',
        itemNumber: '22.1',
        name: 'รายงานสรุปผลการปฏิบัติตามมาตรการป้องกันการขัดกันแห่งผลประโยชน์รอบปี',
        requiredFormat: 'รายงานประจำปี (PDF)',
        isCompleted: false,
        evidenceFiles: []
      },
      {
        id: 'moit-22-2',
        itemNumber: '22.2',
        name: 'ข้อเสนอแนะและแนวทางปรับปรุงเพื่อป้องกันผลประโยชน์ทับซ้อนในปีถัดไป',
        requiredFormat: 'รายงานสรุป (PDF)',
        isCompleted: false,
        evidenceFiles: []
      }
    ]
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'log-1',
    action: 'อัปเดตไฟล์หลักฐาน',
    moitCode: 'MOIT 5',
    detail: 'อัปโหลด สรุปผลจัดซื้อจัดจ้าง สขร.1 เดือน กุมภาพันธ์ 2568',
    user: 'นายนครินทร์ (งานพัสดุ)',
    timestamp: '2568-03-05 10:24 น.'
  },
  {
    id: 'log-2',
    action: 'ตรวจสอบตัวชี้วัด',
    moitCode: 'MOIT 12',
    detail: 'ตรวจผ่านเกณฑ์ (Compliant) เอกสาร No Gift Policy ครบถ้วน',
    user: 'นางสาววลัยลักษณ์ (ผู้ประสานงาน ITA)',
    timestamp: '2568-01-05 14:10 น.'
  },
  {
    id: 'log-3',
    action: 'แก้ไขสถานะ',
    moitCode: 'MOIT 19',
    detail: 'ปรับเป็น "ปรับปรุงแก้ไข" เนื่องจากขาดภาพกิจกรรมประกอบ',
    user: 'นายกิตติศักดิ์ (ประธานคณะทำงาน ITA)',
    timestamp: '2568-03-22 09:45 น.'
  },
  {
    id: 'log-4',
    action: 'เพิ่มเอกสารหลักฐาน',
    moitCode: 'MOIT 11',
    detail: 'อัปโหลดรายงานการประชุมภาคีเครือข่าย พชอ. และ อสม.',
    user: 'พยาบาลวิชาชีพชำนาญการ (งานปฐมภูมิ)',
    timestamp: '2568-01-25 16:30 น.'
  }
];

export const hospitalAssets = {
  emblem: '/src/assets/images/hospital_moph_emblem_1791432162638.jpg',
  campus: '/src/assets/images/hospital_campus_aerial_1791432175892.jpg'
};
