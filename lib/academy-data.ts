export type PageId =
  | 'home'
  | 'classes'
  | 'batch-details'
  | 'skills'
  | 'course-details'
  | 'admission'
  | 'free-classes'
  | 'teachers'
  | 'about'
  | 'contact'
  | 'blog'
  | 'faq'
  | 'legal'
  | 'login'
  | 'checkout'
  | 'student-dashboard'
  | 'admin-dashboard'
  | 'admin-manage';

export type BatchStatus = 'ভর্তি চলছে' | 'শীঘ্রই আসছে' | 'ভর্তি বন্ধ';

export interface AcademicBatch {
  id: string;
  title: string;
  classLevel: 'এইচএসসি' | 'এসএসসি' | 'নবম শ্রেণি' | 'ষষ্ঠ–অষ্টম শ্রেণি';
  group: string;
  subject: string;
  fee: number;
  oldFee?: number;
  schedule: string;
  duration: string;
  liveClassesCount: string;
  status: BatchStatus;
  teachers: string[];
  syllabus: {chapter: string; topics: string[]; lectures: number}[];
}

export interface SkillCourse {
  id: string;
  title: string;
  category: 'ইংরেজি' | 'আইইএলটিএস' | 'কিডস' | 'মক টেস্ট';
  instructor: string;
  instructorRole: string;
  fee: number;
  rating: string;
  studentsCount: string;
  lessonsCount: string;
  image: string;
  status: BatchStatus;
  curriculum: {module: string; lessons: string[]}[];
}

export interface TeacherProfile {
  id: string;
  name: string;
  designation: string;
  subject: string;
  institution: string;
  experience: string;
  studentsTaught: string;
  bio: string;
  initials: string;
  batches: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  institution: string;
  batch: string;
  quote: string;
  initials: string;
}

export interface BlogNoticeItem {
  id: string;
  title: string;
  category: 'নোটিশ' | 'পরীক্ষার রুটিন' | 'প্রস্তুতি গাইড';
  date: string;
  summary: string;
  content: string;
}

export const ALL_PAGES: {id: PageId; num: number; label: string; group: string}[] = [
  {id: 'home', num: 1, label: 'হোম', group: 'পাবলিক পেজ'},
  {id: 'classes', num: 2, label: 'ক্লাস ৬–১২', group: 'পাবলিক পেজ'},
  {id: 'batch-details', num: 3, label: 'ব্যাচ ডিটেইলস', group: 'পাবলিক পেজ'},
  {id: 'skills', num: 4, label: 'ইংরেজি ও স্কিল', group: 'পাবলিক পেজ'},
  {id: 'course-details', num: 5, label: 'কোর্স ডিটেইলস', group: 'পাবলিক পেজ'},
  {id: 'admission', num: 6, label: 'ভর্তি প্রস্তুতি', group: 'পাবলিক পেজ'},
  {id: 'free-classes', num: 7, label: 'ফ্রি ক্লাস', group: 'পাবলিক পেজ'},
  {id: 'teachers', num: 8, label: 'শিক্ষক পরিচিতি', group: 'পাবলিক পেজ'},
  {id: 'about', num: 9, label: 'আমাদের সম্পর্কে', group: 'পাবলিক পেজ'},
  {id: 'contact', num: 10, label: 'যোগাযোগ', group: 'পাবলিক পেজ'},
  {id: 'blog', num: 11, label: 'ব্লগ ও নোটিশ', group: 'পাবলিক পেজ'},
  {id: 'faq', num: 12, label: 'FAQ / হেল্প', group: 'পাবলিক পেজ'},
  {id: 'legal', num: 13, label: 'প্রাইভেসি ও নীতি', group: 'পাবলিক পেজ'},
  {id: 'login', num: 14, label: 'লগইন / রেজিস্টার', group: 'অ্যাকাউন্ট ও ভর্তি'},
  {id: 'checkout', num: 15, label: 'ভর্তি / চেকআউট', group: 'অ্যাকাউন্ট ও ভর্তি'},
  {id: 'student-dashboard', num: 16, label: 'স্টুডেন্ট ড্যাশবোর্ড', group: 'অ্যাকাউন্ট ও ভর্তি'},
  {id: 'admin-dashboard', num: 17, label: 'অ্যাডমিন ড্যাশবোর্ড', group: 'অ্যাডমিন প্যানেল'},
  {id: 'admin-manage', num: 18, label: 'কোর্স ও সাইট ম্যানেজ', group: 'অ্যাডমিন প্যানেল'},
];

export const INITIAL_BATCHES: AcademicBatch[] = [
  {
    id: 'hsc-2026-sci',
    title: 'এইচএসসি ২০২৬ পূর্ণাঙ্গ একাডেমিক ব্যাচ (বিজ্ঞান)',
    classLevel: 'এইচএসসি',
    group: 'বিজ্ঞান · মানবিক · ব্যবসায় শিক্ষা',
    subject: 'পদার্থ, রসায়ন, উচ্চতর গণিত, জীববিজ্ঞান',
    fee: 3500,
    oldFee: 5000,
    schedule: 'রবি, মঙ্গল, বৃহস্পতি (রাত ৮:০০ - ১০:০০)',
    duration: '১০ মাস (পূর্ণাঙ্গ সিলেবাস)',
    liveClassesCount: '১৮০+ লাইভ ক্লাস',
    status: 'ভর্তি চলছে',
    teachers: ['ড. তানভীর আহমেদ (BUET)', 'মাহমুদুল হাসান (DU)', 'রাফসান জানি (DMC)'],
    syllabus: [
      {
        chapter: 'পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ও গতিবিদ্যা',
        topics: ['ভেক্টর যোজন ও বিয়োজন', 'নদী-নৌকা ও বৃষ্টির অংক', 'প্রাসের গতি ও লেখচিত্র'],
        lectures: 14,
      },
      {
        chapter: 'রসায়ন ১ম পত্র: গুণগত রসায়ন ও পর্যায়বৃত্ত ধর্ম',
        topics: ['বোর পরমাণু মডেল', 'দ্রাব্যতা ও দ্রাব্যতা গুণফল', 'সংকরায়ন ও রাসায়নিক বন্ধন'],
        lectures: 12,
      },
      {
        chapter: 'উচ্চতর গণিত ১ম পত্র: ম্যাট্রিক্স, নির্ণায়ক ও ক্যালকুলাস',
        topics: ['বিপরীত ম্যাট্রিক্স নির্ণয়', 'লিমিট ও অন্তরীকরণ', 'যোগজীকরণ ও ক্ষেত্রফল'],
        lectures: 18,
      },
    ],
  },
  {
    id: 'ssc-class10-rev',
    title: 'এসএসসি (দশম শ্রেণি) ফাইনাল রিভিশন ও মডেল টেস্ট',
    classLevel: 'এসএসসি',
    group: 'পূর্ণাঙ্গ প্রস্তুতি ও রিভিশন',
    subject: 'গণিত, উচ্চতর গণিত, পদার্থ, রসায়ন, ইংরেজি',
    fee: 2500,
    oldFee: 3500,
    schedule: 'শনি, সোম, বুধ (সন্ধ্যা ৭:৩০ - ৯:৩০)',
    duration: '৬ মাস',
    liveClassesCount: '১২০+ লাইভ ক্লাস',
    status: 'ভর্তি চলছে',
    teachers: ['মাহমুদুল হাসান (DU)', 'সাদিয়া ইসলাম (DU)', 'আরিফুল ইসলাম (BUET)'],
    syllabus: [
      {
        chapter: 'সাধারণ গণিত: ত্রিকোণমিতি, পরিমিতি ও জ্যামিতি',
        topics: ['ত্রিকোণমিতিক অনুপাত ও দূরত্ব-উচ্চতা', 'বৃত্ত সংক্রান্ত উপপাদ্য', 'সৃজনশীল প্রশ্ন সমাধান'],
        lectures: 15,
      },
      {
        chapter: 'পদার্থ ও রসায়ন: গাণিতিক সমস্যা ও সৃজনশীল',
        topics: ['গতি ও বলের গাণিতিক সমস্যা', 'চলতড়িৎ সার্কিট সমাধান', 'মোল সংখ্যা ও রাসায়নিক গণনা'],
        lectures: 16,
      },
    ],
  },
  {
    id: 'class9-core',
    title: 'নবম শ্রেণি একাডেমিক ফাউন্ডেশন ব্যাচ',
    classLevel: 'নবম শ্রেণি',
    group: 'বিজ্ঞান ও সাধারণ গ্রুপ',
    subject: 'গণিত, বিজ্ঞান, ইংরেজি ও আইসিটি',
    fee: 2200,
    oldFee: 3000,
    schedule: 'রবি, মঙ্গল, বৃহস্পতি (সন্ধ্যা ৬:৩০ - ৮:০০)',
    duration: '৮ মাস',
    liveClassesCount: '১০০+ লাইভ ক্লাস',
    status: 'ভর্তি চলছে',
    teachers: ['আরিফুল ইসলাম (BUET)', 'ফারহানা ইয়াসমিন (JU)'],
    syllabus: [
      {
        chapter: 'গণিত ও বিজ্ঞান মূল ভিত্তি',
        topics: ['সেট ও ফাংশন', 'বীজগাণিতিক রাশি', 'ভৌত রাশি ও পরিমাপ'],
        lectures: 20,
      },
    ],
  },
  {
    id: 'class6-8-junior',
    title: 'ষষ্ঠ–অষ্টম শ্রেণি অলিম্পিয়াড ও একাডেমিক ব্যাচ',
    classLevel: 'ষষ্ঠ–অষ্টম শ্রেণি',
    group: 'ভিত্তি মজবুত করার ক্লাস',
    subject: 'গণিত, বিজ্ঞান ও ইংরেজি গ্রামার',
    fee: 1800,
    oldFee: 2500,
    schedule: 'শুক্র ও শনি (বিকেল ৪:০০ - ৫:৩০)',
    duration: '৬ মাস',
    liveClassesCount: '৮০+ লাইভ ক্লাস',
    status: 'শীঘ্রই আসছে',
    teachers: ['ফারহানা ইয়াসমিন (JU)', 'সাদিয়া ইসলাম (DU)'],
    syllabus: [
      {
        chapter: 'জুনিয়র গণিত ও বিজ্ঞান ফাউন্ডেশন',
        topics: ['পাটিগণিত ও জ্যামিতির মৌলিক ধারণা', 'দৈনন্দিন বিজ্ঞান ও পরীক্ষণ', 'ইংরেজি রিডিং ও রাইটিং স্কিল'],
        lectures: 16,
      },
    ],
  },
  {
    id: 'hsc-humanities',
    title: 'এইচএসসি মানবিক ও ব্যবসায় শিক্ষা স্পেশাল ব্যাচ',
    classLevel: 'এইচএসসি',
    group: 'মানবিক ও ব্যবসায় শিক্ষা',
    subject: 'ইংরেজি, আইসিটি, অর্থনীতি, হিসাববিজ্ঞান',
    fee: 2800,
    oldFee: 3800,
    schedule: 'শনি, সোম, বুধ (রাত ৮:৩০ - ১০:০০)',
    duration: '৮ মাস',
    liveClassesCount: '১১০+ লাইভ ক্লাস',
    status: 'ভর্তি চলছে',
    teachers: ['সাদিয়া ইসলাম (DU)', 'তানভীর হাসান (IBA, DU)'],
    syllabus: [
      {
        chapter: 'আইসিটি ও ইংরেজি আবশ্যিক',
        topics: ['সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস', 'HTML ও C প্রোগ্রামিং', 'English 1st & 2nd Paper Grammar'],
        lectures: 22,
      },
    ],
  },
  {
    id: 'ssc-crash-winter',
    title: 'এসএসসি টেস্ট পেপার সলভ ইনটেনসিভ ব্যাচ (১ম পর্ব)',
    classLevel: 'এসএসসি',
    group: 'বিজ্ঞান ও সাধারণ',
    subject: 'সব আবশ্যিক বিষয়',
    fee: 1500,
    schedule: 'প্রতিদিন রাত ৯:০০টা',
    duration: '৩ মাস',
    liveClassesCount: '৬০+ লাইভ ক্লাস',
    status: 'ভর্তি বন্ধ',
    teachers: ['মাহমুদুল হাসান (DU)', 'আরিফুল ইসলাম (BUET)'],
    syllabus: [
      {
        chapter: 'বোর্ড প্রশ্ন বিশ্লেষণ (২০১৮–২০২৫)',
        topics: ['সকল বোর্ডের MCQ ও CQ সমাধান', 'সময় ব্যবস্থাপনা ও মডেল টেস্ট'],
        lectures: 25,
      },
    ],
  },
];

export const INITIAL_SKILL_COURSES: SkillCourse[] = [
  {
    id: 'spoken-english',
    title: 'স্পোকেন ইংলিশ ও প্রেজেন্টেশন মাস্টারক্লাস',
    category: 'ইংরেজি',
    instructor: 'সাদিয়া ইসলাম',
    instructorRole: 'প্রভাষক, ঢাকা বিশ্ববিদ্যালয় (IBA)',
    fee: 1250,
    rating: '৪.৯ (১,৪২০ রিভিউ)',
    studentsCount: '৮,৫০০+ শিক্ষার্থী',
    lessonsCount: '৪৫টি ভিডিও লেসন + ১২টি লাইভ প্র্যাকটিস',
    image: '/images/course_spoken_english.jpg',
    status: 'ভর্তি চলছে',
    curriculum: [
      {
        module: 'মডিউল ১: জড়তা কাটানো ও দৈনন্দিন কথোপকথন',
        lessons: ['নিজের পরিচয় ও স্মার্ট গ্রিটিংস', 'দৈনন্দিন জীবনের ৫০টি জরুরি বাক্য গঠন', 'সঠিক উচ্চারণ ও ফ্লুয়েন্সি প্র্যাকটিস'],
      },
      {
        module: 'মডিউল ২: অফিসিয়াল ও একাডেমিক প্রেজেন্টেশন',
        lessons: ['ইংরেজিতে ইন্টারভিউ ফেস করার কৌশল', 'পাবলিক স্পিকিং ও গ্রুপ ডিসকাশন', 'ইমেইল রাইটিং ও প্রফেশনাল কমিউনিকেশন'],
      },
    ],
  },
  {
    id: 'ielts-prep',
    title: 'আইইএলটিএস (IELTS) ৭.৫+ ব্যান্ড টার্গেট কোর্স',
    category: 'আইইএলটিএস',
    instructor: 'তানভীর হাসান',
    instructorRole: 'IELTS Band 8.5, সার্টিফাইড ট্রেইনার',
    fee: 2200,
    rating: '৪.৮ (৯৮০ রিভিউ)',
    studentsCount: '৫,২০০+ শিক্ষার্থী',
    lessonsCount: '৬০টি লেসন + ১০টি ফুল মক টেস্ট',
    image: '/images/course_ielts_prep.jpg',
    status: 'ভর্তি চলছে',
    curriculum: [
      {
        module: 'মডিউল ১: Listening & Reading Strategies',
        lessons: ['Skimming & Scanning কৌশল', 'True/False/Not Given সহজে মেলানোর নিয়ম', 'Listening Part 3 & 4 ট্র্যাপ চেনার উপায়'],
      },
      {
        module: 'মডিউল ২: Writing Task 1, Task 2 & Speaking',
        lessons: ['Band 7.5+ Essay লেখার ফ্রেমওয়ার্ক', 'Speaking Cue Card ২ মিনিট কথা বলার কৌশল', '১-টু-১ স্পিকিং মক টেস্ট রিভিউ'],
      },
    ],
  },
  {
    id: 'kids-english',
    title: 'কিডস ইংলিশ ও ফনিক্স ফাউন্ডেশন (বয়স ৬–১২)',
    category: 'কিডস',
    instructor: 'ফারহানা ইয়াসমিন',
    instructorRole: 'চাইল্ড এডুকেশন স্পেশালিস্ট',
    fee: 990,
    rating: '৪.৯ (৭৫০ রিভিউ)',
    studentsCount: '৩,৮০০+ শিক্ষার্থী',
    lessonsCount: '৩৬টি অ্যানিমেটেড ও ইন্টারেক্টিভ ক্লাস',
    image: '/images/course_kids_english.jpg',
    status: 'ভর্তি চলছে',
    curriculum: [
      {
        module: 'মডিউল ১: ফনিক্স ও শব্দ তৈরির খেলা',
        lessons: ['৪২টি ফনিক্স সাউন্ড পরিচিতি', 'গল্পে গল্পে নতুন ভোকাবুলারি শেখা', 'ছোটদের স্পোকেন ইংলিশ রোল-প্লে'],
      },
    ],
  },
  {
    id: 'mock-test',
    title: 'একাডেমিক ও IELTS ফুল অনলাইন মক টেস্ট সিরিজ',
    category: 'মক টেস্ট',
    instructor: 'ইনফিনিটি এক্সাম প্যানেল',
    instructorRole: 'বোর্ড ও আন্তর্জাতিক মানের প্রশ্ন প্রণেতা',
    fee: 650,
    rating: '৪.৮ (১,১০০ রিভিউ)',
    studentsCount: '১২,০০০+ পরীক্ষার্থী',
    lessonsCount: '৩০টি পূর্ণাঙ্গ মডেল টেস্ট ও সমাধান',
    image: '/images/course_mock_test.jpg',
    status: 'শীঘ্রই আসছে',
    curriculum: [
      {
        module: 'মডিউল ১: বিষয়ভিত্তিক ও পূর্ণাঙ্গ মডেল টেস্ট',
        lessons: ['তাৎক্ষণিক রেজাল্ট ও লিডারবোর্ড র‍্যাংকিং', 'প্রতিটি ভুল প্রশ্নের বিস্তারিত লিখিত ও ভিডিও ব্যাখ্যা'],
      },
    ],
  },
];

export const TEACHERS_LIST: TeacherProfile[] = [
  {
    id: 't1',
    name: 'ড. তানভীর আহমেদ',
    designation: 'সিনিয়র ফিজিক্স ইন্সট্রাক্টর',
    subject: 'পদার্থবিজ্ঞান',
    institution: 'বিএসসি ইঞ্জিনিয়ারিং, বুয়েট (BUET)',
    experience: '৮+ বছরের অভিজ্ঞতা',
    studentsTaught: '৪৫,০০০+ শিক্ষার্থী',
    bio: 'পদার্থবিজ্ঞানের জটিল সূত্র ও গাণিতিক সমস্যাগুলো বাস্তব উদাহরণ ও ভিজ্যুয়ালাইজেশনের মাধ্যমে সহজ করে তোলায় তিনি শিক্ষার্থীদের কাছে অত্যন্ত জনপ্রিয়।',
    initials: 'তাআ',
    batches: ['এইচএসসি ২০২৬ পূর্ণাঙ্গ একাডেমিক ব্যাচ', 'ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি ব্যাচ'],
  },
  {
    id: 't2',
    name: 'রাফসান জানি',
    designation: 'হেড অব বায়োলজি ও মেডিকেল মেন্টর',
    subject: 'জীববিজ্ঞান ও রসায়ন',
    institution: 'এমবিবিএস, ঢাকা মেডিকেল কলেজ (DMC)',
    experience: '৬+ বছরের অভিজ্ঞতা',
    studentsTaught: '৩৮,০০০+ শিক্ষার্থী',
    bio: 'মেডিকেল ভর্তি প্রস্তুতি এবং এইচএসসি জীববিজ্ঞানের চিত্রভিত্তিক মনে রাখার কৌশল শিখিয়ে শত শত শিক্ষার্থীকে মেডিকেলে চান্স পেতে সাহায্য করেছেন।',
    initials: 'রাজা',
    batches: ['মেডিকেল ভর্তি প্রস্তুতি ব্যাচ', 'এইচএসসি ২০২৬ বিজ্ঞান ব্যাচ'],
  },
  {
    id: 't3',
    name: 'সাদিয়া ইসলাম',
    designation: 'ইংরেজি ও কমিউনিকেশন লিড',
    subject: 'ইংরেজি ও স্পোকেন ইংলিশ',
    institution: 'এমবিএ, আইবিএ, ঢাকা বিশ্ববিদ্যালয় (IBA, DU)',
    experience: '৭+ বছরের অভিজ্ঞতা',
    studentsTaught: '৫০,০০০+ শিক্ষার্থী',
    bio: 'ইংরেজি গ্রামার ভীতি দূর করা এবং সাবলীল স্পোকেন ইংলিশ ও আইইএলটিএস প্রস্তুতিতে তারের সাজানো কারিকুলাম হাজারো শিক্ষার্থীর আত্মবিশ্বাস বাড়িয়েছে।',
    initials: 'সাই',
    batches: ['স্পোকেন ইংলিশ মাস্টারক্লাস', 'এসএসসি ও এইচএসসি ইংলিশ ব্যাচ'],
  },
  {
    id: 't4',
    name: 'মাহমুদুল হাসান',
    designation: 'সিনিয়র ম্যাথমেটিক্স ইন্সট্রাক্টর',
    subject: 'উচ্চতর গণিত',
    institution: 'ফলিত গণিত, ঢাকা বিশ্ববিদ্যালয় (DU)',
    experience: '৭+ বছরের অভিজ্ঞতা',
    studentsTaught: '৪২,০০০+ শিক্ষার্থী',
    bio: 'ক্যালকুলাস, ত্রিকোণমিতি ও বীজগণিতের ভীতি দূর করে শর্টকাট ও বিস্তারিত উভয় পদ্ধতিতে অংক শেখানোর জন্য সুপরিচিত।',
    initials: 'মাহা',
    batches: ['এইচএসসি উচ্চতর গণিত ব্যাচ', 'এসএসসি ফাইনাল রিভিশন ব্যাচ'],
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev1',
    name: 'নাফিস ইকবাল',
    institution: 'নটর ডেম কলেজ, ঢাকা',
    batch: 'এইচএসসি বিজ্ঞান ব্যাচ',
    quote:
      'ইনফিনিটি একাডেমির লাইভ ক্লাস আর ২৪/৭ ডাউট সলভ ফিচারের কারণে পদার্থবিজ্ঞান ও উচ্চতর গণিতের ভীতি পুরোপুরি কেটে গেছে। যেকোনো সময়ে প্রশ্ন করলেই ধাপে ধাপে সমাধান পেয়েছি।',
    initials: 'নাই',
  },
  {
    id: 'rev2',
    name: 'তাসনিম জারিন',
    institution: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
    batch: 'এসএসসি দশম শ্রেণি ব্যাচ',
    quote:
      'প্রতিটি অধ্যায় শেষ হওয়ার পর কুইজ এবং মডেল টেস্ট দেওয়ার সুযোগ থাকায় বোর্ড পরীক্ষার আগে নিজের প্রস্তুতি ১০০% যাচাই করতে পেরেছি। প্রিন্টেড লেকচার শিটগুলোও অসাধারণ!',
    initials: 'তাজা',
  },
  {
    id: 'rev3',
    name: 'মেহেদী হাসান রাকিব',
    institution: 'রাজশাহী সরকারি কলেজ',
    batch: 'স্পোকেন ও আইইএলটিএস কোর্স',
    quote:
      'স্পোকেন ইংলিশ ও আইইএলটিএস কোর্সে ভর্তি হওয়ার পর মাত্র ৩ মাসে আমার স্পিকিং ফ্লুয়েন্সি অনেক উন্নত হয়েছে এবং মক টেস্ট দিয়ে ৭.৫ ব্যান্ড স্কোর অর্জন করেছি।',
    initials: 'মেরা',
  },
];

export const INITIAL_BLOGS: BlogNoticeItem[] = [
  {
    id: 'b1',
    title: 'এইচএসসি ২০২৬ ব্যাচের সাপ্তাহিক লাইভ ক্লাস ও মডেল টেস্ট রুটিন প্রকাশিত',
    category: 'পরীক্ষার রুটিন',
    date: '১০ অক্টোবর ২০২৬',
    summary: 'বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা বিভাগের নতুন সপ্তাহের ক্লাস ও অধ্যায়ভিত্তিক পরীক্ষার সময়সূচি দেখে নাও।',
    content:
      'এইচএসসি ২০২৬ ব্যাচের সকল শিক্ষার্থীর অবগতির জন্য জানানো যাচ্ছে যে, আগামী রবিবার থেকে নতুন রুটিন অনুযায়ী পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিত ক্লাস অনুষ্ঠিত হবে। প্রতি শুক্রবার সকাল ১০টায় সাপ্তাহিক মডেল টেস্ট নেওয়া হবে এবং স্টুডেন্ট ড্যাশবোর্ডে ফলাফল ও মেধাতালিকা প্রকাশিত হবে।',
  },
  {
    id: 'b2',
    title: 'এসএসসি পরীক্ষার্থীদের শেষ মুহূর্তের ৬০ দিনের পূর্ণাঙ্গ রিভিশন গাইডলাইন',
    category: 'প্রস্তুতি গাইড',
    date: '০৫ অক্টোবর ২০২৬',
    summary: 'বোর্ড পরীক্ষায় A+ নিশ্চিত করতে গণিত, ইংরেজি ও বিজ্ঞান বিষয়ে কীভাবে প্রতিদিন রুটিন করে পড়বে তার বিস্তারিত কৌশল।',
    content:
      'পরীক্ষার আগের ৬০ দিন প্রতিটি শিক্ষার্থীর জন্য সবচেয়ে গুরুত্বপূর্ণ। প্রতিদিন অন্তত ২টি করে বিগত বছরের বোর্ড প্রশ্ন ঘড়ি ধরে সমাধান করতে হবে। যেসব অধ্যায়ে দুর্বলতা রয়েছে সেগুলোর রেকর্ডেড ক্লাস ও নোট রিভিশন দিয়ে ২৪/৭ ডাউট সলভ প্যানেলে শিক্ষকদের কাছ থেকে সমাধান বুঝে নিতে হবে।',
  },
  {
    id: 'b3',
    title: 'মেডিকেল ও ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি ২০২৬ ব্যাচে আর্লি বার্ড ভর্তি শুরু',
    category: 'নোটিশ',
    date: '০১ অক্টোবর ২০২৬',
    summary: 'প্রথম ৫০০ জন শিক্ষার্থীর জন্য বিশেষ বৃত্তি ও প্রিন্টেড প্রশ্নব্যাংক ফ্রি পাওয়ার সুযোগ।',
    content:
      'ইনফিনিটি একাডেমির মেডিকেল ও ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি ব্যাচে ভর্তি কার্যক্রম শুরু হয়েছে। আর্লি বার্ড শিক্ষার্থীদের জন্য থাকছে ফ্রি প্রিন্টেড মাস্টার প্রশ্নব্যাংক এবং সরাসরি বুয়েট ও ঢাকা মেডিকেলের মেন্টরদের গাইডলাইন সেশন।',
  },
];
