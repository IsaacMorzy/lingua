/**
 * Static site data for IJLAPS marketing pages.
 *
 * Languages here drive the public language catalog and dynamic `/languages/[slug]`
 * pages. Tech/business/TVETA programs model the structural experience of
 * comparable Kenyan training providers (e.g. Moringa School) using
 * IJLAPS-authored copy.
 *
 * Nothing here is "live" data; the lingua Frappe DocType `Lingua Language` is
 * still the system of record and can override the catalog at runtime.
 */

export interface CefrLevel {
  code: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  name: string;
  durationWeeks: number;
  summary: string;
  outcomes: string[];
}

export interface LanguageEvent {
  date: string; // ISO date
  label: string;
  type: 'intake' | 'exam' | 'workshop' | 'deadline';
  note?: string;
}

export interface Language {
  slug: string;
  name: string;
  code: string; // ISO 639-1
  flagEmoji: string;
  shortDescription: string;
  longDescription: string;
  whyLearn: string[];
  careerOutcomes: string[];
  examBoards: string[];
  totalWeeks: number;
  cohortsPerYear: number;
  levels: CefrLevel[];
  events: LanguageEvent[];
  heroStat: { label: string; value: string };
  factSheet: { label: string; value: string }[];
}

export interface ProgramMode {
  name: string;
  schedule: string;
  weeks: number;
  fee: string;
  isPopular?: boolean;
}

export interface ProgramModule {
  title: string;
  hours: number;
  topics: string[];
}

export interface ProgramCareer {
  role: string;
  avgSalaryKes: string;
}

export interface Program {
  slug: string;
  title: string;
  category: 'Tech' | 'Business' | 'TVETA' | 'Professional' | 'Vocational';
  tagline: string;
  description: string;
  mode: 'Bootcamp' | 'Short Course' | 'Diploma' | 'Certificate';
  modes: ProgramMode[];
  admissionPrerequisites: string[];
  curriculum: ProgramModule[];
  tools: string[];
  outcomes: { label: string; value: string }[];
  careers: ProgramCareer[];
  certifications?: string[];
}

export interface Faculty {
  name: string;
  title: string;
  department: 'Languages' | 'Technology' | 'Business' | 'TVETA';
  bio: string;
  credentials: string[];
  initials: string;
}

export const CEFR_LEVELS: CefrLevel[] = [
  {
    code: 'A1',
    name: 'Beginner',
    durationWeeks: 8,
    summary: 'Can recognise familiar everyday expressions and introduce themselves.',
    outcomes: ['Greet and introduce themselves', 'Order food and ask for directions', 'Read short notices and signs'],
  },
  {
    code: 'A2',
    name: 'Elementary',
    durationWeeks: 8,
    summary: 'Can communicate in simple routine tasks on familiar topics.',
    outcomes: ['Hold short social exchanges', 'Describe their background and immediate environment', 'Write short personal messages'],
  },
  {
    code: 'B1',
    name: 'Intermediate',
    durationWeeks: 10,
    summary: 'Can deal with most travel situations and produce simple connected text.',
    outcomes: ['Express opinions on familiar subjects', 'Narrate experiences and events', 'Draft emails and short essays'],
  },
  {
    code: 'B2',
    name: 'Upper-Intermediate',
    durationWeeks: 10,
    summary: 'Can interact with fluency and argue a position in familiar contexts.',
    outcomes: ['Participate in technical discussions', 'Read articles on contemporary issues', 'Write clear, detailed reports'],
  },
  {
    code: 'C1',
    name: 'Advanced',
    durationWeeks: 12,
    summary: 'Can express ideas fluently and use language flexibly for professional purposes.',
    outcomes: ['Use language effectively in academic settings', 'Produce well-structured long-form text', 'Negotiate and persuade'],
  },
  {
    code: 'C2',
    name: 'Proficient',
    durationWeeks: 12,
    summary: 'Can summarise information from different sources and express themselves precisely.',
    outcomes: ['Operate near-native in any context', 'Translate and interpret with confidence', 'Lead bilingual or multilingual teams'],
  },
];

export const LANGUAGES: Language[] = [
  {
    slug: 'english',
    name: 'English',
    code: 'EN',
    flagEmoji: '🇬🇧',
    shortDescription: 'Academic, professional, and IELTS preparation pathways.',
    longDescription:
      'English at IJLAPS blends communicative classroom practice with Cambridge and IELTS-aligned exam preparation. Learners progress from foundational literacy through academic and professional proficiency, supported by a multimedia library and weekly conversation clubs.',
    whyLearn: [
      'Required for study and work across East Africa and the global economy',
      'IELTS, TOEFL, and Cambridge exam preparation embedded from B1',
      'Career-ready communication for customer service, journalism, and business',
    ],
    careerOutcomes: ['Bilingual customer support', 'Tourism & hospitality', 'NGO programme roles', 'Journalism and content creation'],
    examBoards: ['Cambridge English', 'IELTS', 'TOEFL', 'Pearson PTE'],
    totalWeeks: 60,
    cohortsPerYear: 4,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-01-13', label: 'A1 & A2 Intake', type: 'intake' },
      { date: '2026-01-25', label: 'IELTS Registration Deadline', type: 'deadline' },
      { date: '2026-02-08', label: 'IELTS Sitting, Academic', type: 'exam' },
      { date: '2026-04-13', label: 'A1 & A2 Intake', type: 'intake' },
      { date: '2026-04-20', label: 'Cambridge B2 First, Registration Closes', type: 'deadline' },
      { date: '2026-05-17', label: 'Cambridge B2 First Sitting', type: 'exam' },
      { date: '2026-07-13', label: 'B1 & B2 Intake', type: 'intake' },
      { date: '2026-08-23', label: 'IELTS Sitting, General', type: 'exam' },
      { date: '2026-09-14', label: 'C1 Intake', type: 'intake' },
      { date: '2026-11-22', label: 'IELTS Sitting, Academic', type: 'exam' },
    ],
    heroStat: { label: 'first sitting pass-rate', value: '94%' },
    factSheet: [
      { label: 'Class size', value: '12 max' },
      { label: 'Contact hours', value: '120 / level' },
      { label: 'Learners enrolled', value: '2,400+' },
    ],
  },
  {
    slug: 'french',
    name: 'French',
    code: 'FR',
    flagEmoji: '🇫🇷',
    shortDescription: 'DELF/DALF preparation and East African professional French.',
    longDescription:
      'Our French pathway is aligned to the CEFR and the French Ministry of Education DELF/DALF examinations. Students combine interactive classes with cultural workshops, francophone cinema, and weekly conversation tables with native speakers from the DRC, Rwanda, and Côte d’Ivoire.',
    whyLearn: [
      'Official language in 29 African countries and key regional trading partner',
      'DELF/DALF certification is internationally recognised and lifelong',
      'Opens careers in diplomacy, NGOs, hospitality, and francophone trade',
    ],
    careerOutcomes: ['Diplomatic service', 'NGO programme roles', 'Francophone trade and logistics', 'Tourism'],
    examBoards: ['DELF / DALF', 'TCF', 'CIEP'],
    totalWeeks: 60,
    cohortsPerYear: 3,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-01-20', label: 'A1 & A2 Intake', type: 'intake' },
      { date: '2026-02-14', label: 'DELF A2 Registration Closes', type: 'deadline' },
      { date: '2026-03-07', label: 'DELF Junior Sitting', type: 'exam' },
      { date: '2026-05-11', label: 'B1 Intake', type: 'intake' },
      { date: '2026-06-06', label: 'DELF B2 Sitting', type: 'exam' },
      { date: '2026-09-15', label: 'A1 & B1 Intake', type: 'intake' },
      { date: '2026-11-14', label: 'DALF C1 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'DELF first-attempt pass-rate', value: '88%' },
    factSheet: [
      { label: 'Native-speaker hours', value: '24 / level' },
      { label: 'Cultural workshops', value: 'Monthly' },
      { label: 'Learners enrolled', value: '720' },
    ],
  },
  {
    slug: 'arabic',
    name: 'Arabic',
    code: 'AR',
    flagEmoji: '🇸🇦',
    shortDescription: 'Modern Standard Arabic with Levantine & Gulf speaking tracks.',
    longDescription:
      'We teach Modern Standard Arabic (MSA) as the foundation, with elective streams in Levantine (widely spoken in business) and Gulf Arabic. Our curriculum covers Arabic script, Quranic literacy optional modules, and prepares students for the ALPT exam administered by the Arabic Language Testing Centre.',
    whyLearn: [
      'Essential for trade, religious tourism, and diplomatic engagement with the Middle East',
      'ALPT certification opens translation and customer-facing roles across the Gulf',
      'Bilingual advantage in Nairobi’s hospitality and aviation sectors',
    ],
    careerOutcomes: ['Translation and interpretation', 'Islamic finance', 'Tourism', 'Customer service for Gulf markets'],
    examBoards: ['ALPT', 'OET Arabic', 'ALPS'],
    totalWeeks: 60,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-02', label: 'A1 & A2 Intake', type: 'intake' },
      { date: '2026-03-15', label: 'ALPT Registration Deadline', type: 'deadline' },
      { date: '2026-04-11', label: 'ALPT Sitting', type: 'exam' },
      { date: '2026-06-15', label: 'B1 Intake', type: 'intake' },
      { date: '2026-10-12', label: 'A1 Intake', type: 'intake' },
    ],
    heroStat: { label: 'script mastery by A2', value: '100%' },
    factSheet: [
      { label: 'Quranic literacy modules', value: 'Optional' },
      { label: 'Levantine / Gulf electives', value: 'From B1' },
      { label: 'Learners enrolled', value: '430' },
    ],
  },
  {
    slug: 'chinese-mandarin',
    name: 'Mandarin Chinese',
    code: 'ZH',
    flagEmoji: '🇨🇳',
    shortDescription: 'HSK-aligned Mandarin for trade, scholarship, and travel.',
    longDescription:
      'Mandarin at IJLAPS follows the HSK framework (levels 1–6) with character writing, Pinyin pronunciation, and cultural immersion weeks. Students preparing for Chinese government scholarships or trade roles get dedicated support.',
    whyLearn: [
      'China is Kenya’s largest bilateral trading partner, Mandarin is a strategic asset',
      'HSK certification unlocks CSC scholarships and Confucius Institute pathways',
      'Business Mandarin for logistics, e-commerce, and hospitality',
    ],
    careerOutcomes: ['Bilateral trade', 'Logistics and customs', 'Hospitality for Chinese visitors', 'Translation'],
    examBoards: ['HSK 1–6', 'HSKK Speaking', 'BCT'],
    totalWeeks: 60,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-09', label: 'HSK 1 Intake', type: 'intake' },
      { date: '2026-03-21', label: 'HSK 1 Sitting', type: 'exam' },
      { date: '2026-05-18', label: 'HSK 2 Intake', type: 'intake' },
      { date: '2026-06-13', label: 'HSK 2 Sitting', type: 'exam' },
      { date: '2026-09-22', label: 'HSK 3 Intake', type: 'intake' },
      { date: '2026-11-15', label: 'HSK 3 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'HSK 1 pass-rate', value: '96%' },
    factSheet: [
      { label: 'Character writing practice', value: 'Daily' },
      { label: 'Cultural immersion weeks', value: 'Per term' },
      { label: 'Learners enrolled', value: '310' },
    ],
  },
  {
    slug: 'german',
    name: 'German',
    code: 'DE',
    flagEmoji: '🇩🇪',
    shortDescription: 'Goethe-Zertifikat preparation and academic German.',
    longDescription:
      'German at IJLAPS uses Goethe-Institut textbooks and prepares students for the Goethe-Zertifikat A1–C1 examinations, plus Deutsch Akademie\'s academic track for students aiming at German universities.',
    whyLearn: [
      'Germany offers strong scholarship pathways for Kenyan professionals',
      'Technical German supports engineering and manufacturing roles',
      'Free university tuition in Germany opens with a B2 certificate',
    ],
    careerOutcomes: ['Skilled migration', 'Engineering and manufacturing', 'Healthcare (with extra module)', 'Academia'],
    examBoards: ['Goethe-Zertifikat', 'TestDaF', 'telc Deutsch'],
    totalWeeks: 60,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-10', label: 'A1 Intake', type: 'intake' },
      { date: '2026-04-18', label: 'Goethe A2 Sitting', type: 'exam' },
      { date: '2026-06-29', label: 'B1 Intake', type: 'intake' },
      { date: '2026-09-20', label: 'TestDaF Registration Deadline', type: 'deadline' },
      { date: '2026-10-10', label: 'TestDaF Sitting', type: 'exam' },
    ],
    heroStat: { label: 'Goethe A2 pass-rate', value: '91%' },
    factSheet: [
      { label: 'University-prep module', value: 'From B2' },
      { label: 'Conversation clubs', value: 'Weekly' },
      { label: 'Learners enrolled', value: '210' },
    ],
  },
  {
    slug: 'swahili',
    name: 'Kiswahili',
    code: 'SW',
    flagEmoji: '🇰🇪',
    shortDescription: 'Standard Kiswahili with media, literature, and diplomacy modules.',
    longDescription:
      'Kiswahili is taught from foundational to professional proficiency, with streams in media Kiswahili (broadcast and journalism) and diplomatic Kiswahili (East African Community protocol).',
    whyLearn: [
      'EAC lingua franca, spoken by 200M+ across East and Central Africa',
      'Required for civil service, journalism, and broadcasting roles',
      'Strong cultural and literary tradition perfect for heritage learners',
    ],
    careerOutcomes: ['Broadcasting', 'Civil service', 'Community organising', 'Cultural tourism'],
    examBoards: ['Kenya National Kiswahili Exam', 'EAC Kiswahili Exam'],
    totalWeeks: 36,
    cohortsPerYear: 4,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-01-27', label: 'A1 Intake', type: 'intake' },
      { date: '2026-04-13', label: 'B1 Intake', type: 'intake' },
      { date: '2026-07-13', label: 'A2 & B2 Intake', type: 'intake' },
      { date: '2026-10-19', label: 'C1 Intake', type: 'intake' },
    ],
    heroStat: { label: '“Sanifu ya Kiswahili” pass-rate', value: '97%' },
    factSheet: [
      { label: 'Media Kiswahili lab', value: 'On campus' },
      { label: 'Vernacular tracks', value: 'Optional' },
      { label: 'Learners enrolled', value: '580' },
    ],
  },
  {
    slug: 'spanish',
    name: 'Spanish',
    code: 'ES',
    flagEmoji: '🇪🇸',
    shortDescription: 'DELE-aligned Spanish with Latin American cultural modules.',
    longDescription:
      'Our Spanish pathway follows the Cervantes Institute curriculum and prepares students for DELE A1–B2. Latin American cultural modules cover business Spanish for trade with Mexico, Colombia, and the wider region.',
    whyLearn: [
      'World’s second-largest language by native speakers',
      'Trade and tourism ties with Latin America are growing',
      'DELE certification is internationally portable',
    ],
    careerOutcomes: ['Hospitality and tourism', 'Diplomacy and NGOs', 'Translation', 'Foreign trade'],
    examBoards: ['DELE', 'SIELE'],
    totalWeeks: 60,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-23', label: 'A1 Intake', type: 'intake' },
      { date: '2026-04-25', label: 'DELE A2 Registration Closes', type: 'deadline' },
      { date: '2026-05-23', label: 'DELE A2 Sitting', type: 'exam' },
      { date: '2026-08-31', label: 'B1 Intake', type: 'intake' },
      { date: '2026-11-14', label: 'DELE B1 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'DELE A2 first-attempt pass-rate', value: '89%' },
    factSheet: [
      { label: 'Latin American culture weeks', value: 'Quarterly' },
      { label: 'Native-speaker conversation', value: 'B2+' },
      { label: 'Learners enrolled', value: '260' },
    ],
  },
  {
    slug: 'japanese',
    name: 'Japanese',
    code: 'JA',
    flagEmoji: '🇯🇵',
    shortDescription: 'JLPT-aligned Japanese for MEXT scholarship applicants.',
    longDescription:
      'Our Japanese pathway prepares students for the JLPT (N5–N3) examinations and supports MEXT scholarship applications. Hiragana, Katakana, and Kanji introduction from week 1.',
    whyLearn: [
      'MEXT and JASSO scholarships for university study in Japan',
      'Japan’s automotive, electronics, and tourism sectors recruit globally',
      'Anime and pop culture cue a growing tourism bridge between Kenya and Japan',
    ],
    careerOutcomes: ['Hospitality and tourism', 'Manufacturing', 'Translation', 'Customer service'],
    examBoards: ['JLPT N5–N3', 'J-TEST', 'NAT-TEST'],
    totalWeeks: 60,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-03-02', label: 'N5 Intake', type: 'intake' },
      { date: '2026-06-14', label: 'JLPT N5 Sitting', type: 'exam' },
      { date: '2026-08-04', label: 'MEXT Scholarship Info Session', type: 'workshop' },
      { date: '2026-09-22', label: 'N4 Intake', type: 'intake' },
      { date: '2026-12-07', label: 'JLPT N4 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'JLPT N5 first-sitting pass-rate', value: '93%' },
    factSheet: [
      { label: 'Kanji progression', value: '100 by N4' },
      { label: 'Cultural exchange weeks', value: 'Termly' },
      { label: 'Learners enrolled', value: '180' },
    ],
  },
  {
    slug: 'portuguese',
    name: 'Portuguese',
    code: 'PT',
    flagEmoji: '🇵🇹',
    shortDescription: 'Brazilian Portuguese for trade and Lusophone Africa.',
    longDescription:
      'Portuguese at IJLAPS focuses on Brazilian Portuguese with Lusophone African context. Designed for trade and humanitarian engagement with Mozambique, Angola, and Brazil.',
    whyLearn: [
      'Official language in Mozambique and Angola, key African trading partners',
      'Brazil hosts technical scholarship programmes for Africans',
      'Bridge for Lusophone trade and humanitarian operations',
    ],
    careerOutcomes: ['Humanitarian operations', 'Logistics & freight', 'Trade', 'Tourism'],
    examBoards: ['CELPE-Bras', 'CAPLE'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-03-09', label: 'A1 Intake', type: 'intake' },
      { date: '2026-06-20', label: 'CELPE-Bras Registration Deadline', type: 'deadline' },
      { date: '2026-09-15', label: 'A2 Intake', type: 'intake' },
    ],
    heroStat: { label: 'A2 completion', value: '90%' },
    factSheet: [
      { label: 'Brazilian cultural lab', value: 'On campus' },
      { label: 'Conversation partner programme', value: 'Bilingual' },
      { label: 'Learners enrolled', value: '110' },
    ],
  },
  {
    slug: 'italian',
    name: 'Italian',
    code: 'IT',
    flagEmoji: '🇮🇹',
    shortDescription: 'CELI-aligned Italian for travel, design, and culture.',
    longDescription:
      'Italian at IJLAPS follows the University for Foreigners of Perugia curriculum with CELI exam preparation. Strong focus on culture, design vocabulary, and tourism-sector Italian.',
    whyLearn: [
      'Diploma supplement for hospitality and tourism degrees',
      'Italy offers generous student visa pathways after B1',
      'Cultural bridge for arts, fashion, and design careers',
    ],
    careerOutcomes: ['Tourism', 'Hospitality', 'Fashion and design', 'Translation'],
    examBoards: ['CELI', 'CILS'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-03-16', label: 'A1 Intake', type: 'intake' },
      { date: '2026-06-21', label: 'CILS B1 Sitting', type: 'exam' },
      { date: '2026-10-12', label: 'A2 Intake', type: 'intake' },
    ],
    heroStat: { label: 'CELI A2 first-attempt pass-rate', value: '92%' },
    factSheet: [
      { label: 'Design and arts vocabulary', value: 'B1+' },
      { label: 'Travel-italian workshop', value: 'Monthly' },
      { label: 'Learners enrolled', value: '95' },
    ],
  },
  {
    slug: 'dutch',
    name: 'Dutch',
    code: 'NL',
    flagEmoji: '🇳🇱',
    shortDescription: 'Practical Dutch for trade, migration, and tourism professionals.',
    longDescription:
      'Dutch at IJLAPS covers everyday communication and professional Dutch for students targeting migration, trade with the Netherlands and Belgium, or roles in hospitality serving European visitors. Our curriculum builds toward the NT2 programme.',
    whyLearn: [
      'Gateway to study and work in the Netherlands and Flanders',
      'Growing trade corridor between Kenya, Netherlands, and Belgium',
      'Useful for hospitality and tourism on the coast',
    ],
    careerOutcomes: ['Trade and logistics', 'Hospitality', 'Migration preparation', 'Customer service'],
    examBoards: ['NT2', 'CNaVT'],
    totalWeeks: 48,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-16', label: 'A1 Intake', type: 'intake' },
      { date: '2026-05-10', label: 'NT2 Registration Deadline', type: 'deadline' },
      { date: '2026-06-07', label: 'NT2 Sitting', type: 'exam' },
      { date: '2026-08-04', label: 'A2 Intake', type: 'intake' },
    ],
    heroStat: { label: 'A1 completion rate', value: '94%' },
    factSheet: [
      { label: 'Class size', value: '10 max' },
      { label: 'Contact hours', value: '96 / level' },
      { label: 'Learners enrolled', value: '85' },
    ],
  },
  {
    slug: 'polish',
    name: 'Polish',
    code: 'PL',
    flagEmoji: '🇵🇱',
    shortDescription: 'Polish for work, migration, and cultural connection.',
    longDescription:
      'Polish at IJLAPS prepares students for everyday communication, work placement preparation, and the Certyfikat Polski exam. With growing labour migration between Kenya and Poland, this course supports both professional and personal goals.',
    whyLearn: [
      'Poland offers work visa pathways for Kenyan professionals',
      'Growing trade and educational exchange between Kenya and Poland',
      'Useful for hospitality and tourism on the coast',
    ],
    careerOutcomes: ['Skilled migration', 'Hospitality', 'Trade', 'Customer service'],
    examBoards: ['Certyfikat Polski', 'TELC'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-03-02', label: 'A1 Intake', type: 'intake' },
      { date: '2026-06-15', label: 'Certyfikat A2 Registration Closes', type: 'deadline' },
      { date: '2026-07-12', label: 'Certyfikat A2 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'A1 completion rate', value: '91%' },
    factSheet: [
      { label: 'Class size', value: '10 max' },
      { label: 'Contact hours', value: '96 / level' },
      { label: 'Learners enrolled', value: '65' },
    ],
  },
  {
    slug: 'korean',
    name: 'Korean',
    code: 'KO',
    flagEmoji: '🇰🇷',
    shortDescription: 'TOPIK-aligned Korean for K-culture, scholarship, and trade.',
    longDescription:
      'Korean at IJLAPS follows the TOPIK framework from beginner to intermediate. Students benefit from K-culture immersion activities, Korean drama listening labs, and support for Korean government scholarship applications.',
    whyLearn: [
      'Korean government scholarships (GKS) for degree programmes',
      'K-culture and entertainment industries create tourism and business bridges',
      'Growing Korean investment in East African manufacturing',
    ],
    careerOutcomes: ['Tourism and hospitality', 'Trade', 'Entertainment and media', 'Scholarship preparation'],
    examBoards: ['TOPIK 1–2', 'TOPIK 3–4 prep'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-03-09', label: 'TOPIK 1 Intake', type: 'intake' },
      { date: '2026-04-19', label: 'TOPIK 1 Registration Closes', type: 'deadline' },
      { date: '2026-05-18', label: 'TOPIK 1 Sitting', type: 'exam' },
      { date: '2026-09-14', label: 'TOPIK 2 Intake', type: 'intake' },
    ],
    heroStat: { label: 'TOPIK 1 pass-rate', value: '89%' },
    factSheet: [
      { label: 'K-culture lab', value: 'Weekly' },
      { label: 'Drama listening hours', value: '4 / week' },
      { label: 'Learners enrolled', value: '55' },
    ],
  },
  {
    slug: 'turkish',
    name: 'Turkish',
    code: 'TR',
    flagEmoji: '🇹🇷',
    shortDescription: 'Turkish for business, diplomacy, and cultural exchange.',
    longDescription:
      'Turkish at IJLAPS focuses on communicative competence for business and diplomacy, with modules on Turkish culture, cinema, and cuisine. The curriculum prepares students for the TÖMER exam at A1–B2 levels.',
    whyLearn: [
      'Turkey is a key trade and tourism partner for Kenya',
      'Türkiye Burslari scholarship programme for university study',
      'Growing business ties in construction, textiles, and hospitality',
    ],
    careerOutcomes: ['Trade and logistics', 'Diplomacy', 'Hospitality', 'Tourism'],
    examBoards: ['TÖMER', 'TELC Turkish'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-03-23', label: 'A1 Intake', type: 'intake' },
      { date: '2026-06-21', label: 'TÖMER A2 Sitting', type: 'exam' },
      { date: '2026-10-05', label: 'A2 Intake', type: 'intake' },
    ],
    heroStat: { label: 'TÖMER A2 pass-rate', value: '87%' },
    factSheet: [
      { label: 'Cultural workshops', value: 'Monthly' },
      { label: 'Business Turkish track', value: 'From B1' },
      { label: 'Learners enrolled', value: '45' },
    ],
  },
  {
    slug: 'norwegian',
    name: 'Norwegian',
    code: 'NO',
    flagEmoji: '🇳🇴',
    shortDescription: 'Bergenstest-aligned Norwegian for migration and tourism.',
    longDescription:
      'Norwegian at IJLAPS follows the Bergenstest framework and prepares students for the Norskprøven exam. Designed for students targeting skilled migration, au pair placement, or hospitality roles serving Scandinavian visitors.',
    whyLearn: [
      'Norway offers skilled migration pathways for certified professionals',
      'Strong labour demand in healthcare, hospitality, and engineering',
      'Growing Scandinavian tourism on the Kenyan coast',
    ],
    careerOutcomes: ['Skilled migration', 'Healthcare support', 'Hospitality', 'Tourism'],
    examBoards: ['Bergenstest', 'Norskprøven'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-04-06', label: 'A1 Intake', type: 'intake' },
      { date: '2026-07-26', label: 'Norskprøven A2 Registration Closes', type: 'deadline' },
      { date: '2026-08-23', label: 'Norskprøven A2 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'A1 completion rate', value: '93%' },
    factSheet: [
      { label: 'Class size', value: '8 max' },
      { label: 'Conversation practice', value: 'Weekly' },
      { label: 'Learners enrolled', value: '35' },
    ],
  },
  {
    slug: 'latin',
    name: 'Latin',
    code: 'LA',
    flagEmoji: '🏛️',
    shortDescription: 'Classical Latin for law, medicine, theology, and history.',
    longDescription:
      'Latin at IJLAPS is taught as a living language with reading, composition, and spoken Latin for students in law, medicine, theology, and historical research. The curriculum follows the Cambridge Latin Course and Lingua Latina Per Se Illustrata.',
    whyLearn: [
      'Essential for law, medicine, pharmacy, and theology studies',
      'Strengthens English vocabulary and comprehension for academic exams',
      'Unique offering on the coast for classical literature enthusiasts',
    ],
    careerOutcomes: ['Law and paralegal', 'Medicine and healthcare', 'Theology and religious studies', 'Academia and research'],
    examBoards: ['Cambridge Latin', 'Lingua Latina certificate'],
    totalWeeks: 36,
    cohortsPerYear: 2,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-02', label: 'Beginner Intake', type: 'intake' },
      { date: '2026-07-13', label: 'Intermediate Intake', type: 'intake' },
    ],
    heroStat: { label: 'Intermediate completion', value: '95%' },
    factSheet: [
      { label: 'Reading-based curriculum', value: 'Cambridge' },
      { label: 'Spoken Latin sessions', value: 'Optional' },
      { label: 'Learners enrolled', value: '25' },
    ],
  },
  {
    slug: 'greek',
    name: 'Greek',
    code: 'EL',
    flagEmoji: '🇬🇷',
    shortDescription: 'Modern Greek for tourism, trade, and cultural heritage.',
    longDescription:
      'Greek at IJLAPS covers Modern Greek for everyday communication, with modules on Greek shipping terminology, tourism vocabulary, and cultural heritage. Students prepare for the Ellinomatheia exam.',
    whyLearn: [
      'Greece is a major shipping partner and tourist origin market',
      'Eleáda scholarship programme for Greek language and culture',
      'Useful for hospitality, tourism, and maritime careers',
    ],
    careerOutcomes: ['Tourism and hospitality', 'Maritime and shipping', 'Cultural heritage', 'Customer service'],
    examBoards: ['Ellinomatheia'],
    totalWeeks: 48,
    cohortsPerYear: 1,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-02-09', label: 'A1 Intake', type: 'intake' },
      { date: '2026-05-04', label: 'Ellinomatheia A1 Registration Closes', type: 'deadline' },
      { date: '2026-05-25', label: 'Ellinomatheia A1 Sitting', type: 'exam' },
    ],
    heroStat: { label: 'A1 pass-rate', value: '88%' },
    factSheet: [
      { label: 'Maritime vocabulary module', value: 'B1+' },
      { label: 'Cultural weeks', value: 'Termly' },
      { label: 'Learners enrolled', value: '20' },
    ],
  },
  {
    slug: 'sign-language',
    name: 'Sign Language',
    code: 'KSL',
    flagEmoji: '🤟',
    shortDescription: 'Kenyan Sign Language for communication and inclusion.',
    longDescription:
      'Kenyan Sign Language (KSL) at IJLAPS teaches visual-spatial communication for hearing and deaf students. Our curriculum covers fingerspelling, everyday conversation, interpreting ethics, and deaf culture awareness. Taught by deaf instructors.',
    whyLearn: [
      'Official language of Kenya deaf community, recognised in the constitution',
      'Required for interpreters, educators, healthcare workers, and customer service',
      'Growing demand for KSL interpreters in government, media, and education',
    ],
    careerOutcomes: ['Sign language interpreting', 'Special needs education', 'Healthcare and social work', 'Customer service'],
    examBoards: ['KSL Certificate', 'KSLIA accreditation prep'],
    totalWeeks: 36,
    cohortsPerYear: 3,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-01-20', label: 'Beginner Intake', type: 'intake' },
      { date: '2026-04-21', label: 'Intermediate Intake', type: 'intake' },
      { date: '2026-09-08', label: 'Advanced Intake', type: 'intake' },
    ],
    heroStat: { label: 'Beginner-to-intermediate transition', value: '90%' },
    factSheet: [
      { label: 'Taught by deaf instructors', value: 'Yes' },
      { label: 'Deaf culture immersion', value: 'Integrated' },
      { label: 'Learners enrolled', value: '120' },
    ],
  },
  {
    slug: 'local-languages',
    name: 'Local Languages',
    code: 'LL',
    flagEmoji: '🌍',
    shortDescription: 'Dholuo, Gikuyu, Luhya, Kikamba, and more Kenyan heritage languages.',
    longDescription:
      'IJLAPS offers instruction in major Kenyan heritage languages for heritage learners, researchers, and professionals. Courses are tailored to each language and focus on oral proficiency, cultural context, and basic literacy. Languages offered on demand include Dholuo, Gikuyu, Luhya (various dialects), Kikamba, Kalenjin, Kimeru, and Kisii.',
    whyLearn: [
      'Reconnect with cultural and family heritage',
      'Required for community development and social work roles',
      'Academic research in linguistics, anthropology, and oral literature',
    ],
    careerOutcomes: ['Community development', 'Research and academia', 'Social work', 'Cultural tourism'],
    examBoards: ['IJLAPS Proficiency Assessment'],
    totalWeeks: 24,
    cohortsPerYear: 4,
    levels: CEFR_LEVELS,
    events: [
      { date: '2026-01-13', label: 'Term 1 Intake', type: 'intake' },
      { date: '2026-04-13', label: 'Term 2 Intake', type: 'intake' },
      { date: '2026-07-13', label: 'Term 3 Intake', type: 'intake' },
      { date: '2026-10-12', label: 'Term 4 Intake', type: 'intake' },
    ],
    heroStat: { label: 'Heritage learner satisfaction', value: '96%' },
    factSheet: [
      { label: 'Languages offered', value: '8+' },
      { label: 'Custom curriculum', value: 'Per language' },
      { label: 'Learners enrolled', value: '200+' },
    ],
  },
];

export const TECH_PROGRAMS: Program[] = [
  {
    slug: 'full-stack-software-engineering',
    title: 'Full Stack Software Engineering',
    category: 'Tech',
    tagline: 'Launch a tech career with a 27–35 week intensive bootcamp.',
    description:
      'A career-launching bootcamp covering HTML, CSS, JavaScript, React, Python, Flask, SQL, REST APIs, Git, and deployment. Graduates leave with a portfolio of live web applications and 12 months of career support including CV reviews, mock interviews, and a job-readiness toolkit.',
    mode: 'Bootcamp',
    modes: [
      { name: 'Full-time Hybrid', schedule: 'Mon–Fri · 9am–4pm', weeks: 27, fee: 'KES 185,000', isPopular: true },
      { name: 'Full-time Remote', schedule: 'Mon–Fri · 9am–4pm', weeks: 27, fee: 'KES 165,000' },
      { name: 'Part-time Remote', schedule: 'Tue/Thu evenings + Sat', weeks: 35, fee: 'KES 150,000' },
    ],
    admissionPrerequisites: ['KCSE C+ or equivalent', 'Basic computer literacy', 'Logic & problem-solving assessment'],
    curriculum: [
      { title: 'Web Foundations', hours: 80, topics: ['HTML5 semantics', 'CSS3 layout', 'Responsive design', 'Accessibility basics'] },
      { title: 'JavaScript Essentials', hours: 120, topics: ['ES6+ syntax', 'DOM manipulation', 'Fetch & async', 'Testing with Jest'] },
      { title: 'React Frontend', hours: 140, topics: ['Components & state', 'Hooks', 'Routing', 'Forms & validation'] },
      { title: 'Python & Flask', hours: 140, topics: ['Python idioms', 'Flask REST APIs', 'SQLAlchemy', 'Auth & sessions'] },
      { title: 'Databases & SQL', hours: 80, topics: ['Relational modelling', 'PostgreSQL', 'Migrations', 'Indexing basics'] },
      { title: 'DevOps & Deployment', hours: 60, topics: ['Git workflows', 'CI/CD with GitHub Actions', 'Docker', 'Cloud deployment'] },
      { title: 'Capstone & Career', hours: 80, topics: ['Capstone project', 'CV & portfolio', 'Mock interviews', '12-month career support'] },
    ],
    tools: ['VS Code', 'Node.js', 'React', 'Flask', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    outcomes: [
      { label: 'Capstone apps shipped', value: '3+' },
      { label: 'Career support', value: '12 months' },
      { label: 'Job placement rate', value: '78% within 6 months' },
    ],
    careers: [
      { role: 'Junior Frontend Developer', avgSalaryKes: '90,000–150,000 / month' },
      { role: 'Junior Full-Stack Developer', avgSalaryKes: '120,000–180,000 / month' },
      { role: 'QA Engineer', avgSalaryKes: '80,000–130,000 / month' },
    ],
    certifications: ['IJLAPS Full Stack Certificate'],
  },
  {
    slug: 'data-science',
    title: 'Data Science Bootcamp',
    category: 'Tech',
    tagline: 'Become a data expert in 23–27 weeks.',
    description:
      'A project-driven data science bootcamp covering Python, pandas, NumPy, scikit-learn, machine learning, neural networks, large language models, and model deployment. Capstones include real Kenyan datasets for credit scoring, agricultural yield forecasting, and NLP on Swahili text.',
    mode: 'Bootcamp',
    modes: [
      { name: 'Full-time Hybrid', schedule: 'Mon–Fri · 9am–4pm', weeks: 23, fee: 'KES 195,000', isPopular: true },
      { name: 'Full-time Remote', schedule: 'Mon–Fri · 9am–4pm', weeks: 23, fee: 'KES 175,000' },
      { name: 'Part-time Remote', schedule: 'Tue/Thu evenings + Sat', weeks: 27, fee: 'KES 160,000' },
    ],
    admissionPrerequisites: ['KCSE C+ or equivalent', 'Comfortable with a laptop and basic algebra', 'Introductory week assessment'],
    curriculum: [
      { title: 'Python for Data', hours: 100, topics: ['Python idioms', 'Pandas', 'NumPy', 'Data cleaning'] },
      { title: 'Statistics & Probability', hours: 80, topics: ['Distributions', 'Hypothesis testing', 'Bayes basics'] },
      { title: 'Machine Learning', hours: 160, topics: ['Linear & logistic regression', 'Tree models', 'Clustering', 'Evaluation'] },
      { title: 'Deep Learning', hours: 100, topics: ['Neural networks', 'CNNs', 'RNNs', 'Transformers in practice'] },
      { title: 'LLMs & Applied AI', hours: 80, topics: ['Prompt engineering', 'OpenAI APIs', 'Embeddings', 'RAG patterns'] },
      { title: 'Deployment & MLOps', hours: 80, topics: ['Model serving', 'Monitoring', 'Airflow basics'] },
      { title: 'Capstone & Career', hours: 100, topics: ['Real Kenyan dataset project', 'Portfolio', 'Career support'] },
    ],
    tools: ['Python', 'Jupyter', 'Pandas', 'scikit-learn', 'TensorFlow', 'Hugging Face', 'Streamlit'],
    outcomes: [
      { label: 'Capstones shipped', value: '2+' },
      { label: 'Career support', value: '12 months' },
      { label: 'Lucrative switch rate', value: '74% within 6 months' },
    ],
    careers: [
      { role: 'Junior Data Analyst', avgSalaryKes: '90,000–140,000 / month' },
      { role: 'Junior Data Scientist', avgSalaryKes: '130,000–200,000 / month' },
      { role: 'ML Engineer (entry)', avgSalaryKes: '150,000–240,000 / month' },
    ],
    certifications: ['IJLAPS Data Science Certificate'],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity Bootcamp',
    category: 'Tech',
    tagline: 'thorough cyber defence training for IT professionals.',
    description:
      'Anchored in industry frameworks (NIST, CIS Controls, ISO 27001), this bootcamp covers defensive and offensive security, networking, cryptography, secure cloud architecture, and incident response. Includes a live red-team/blue-team capstone and access to a cyber range.',
    mode: 'Bootcamp',
    modes: [
      { name: 'Full-time Hybrid', schedule: 'Mon–Fri · 9am–4pm', weeks: 24, fee: 'KES 200,000', isPopular: true },
      { name: 'Full-time Remote', schedule: 'Mon–Fri · 9am–4pm', weeks: 24, fee: 'KES 180,000' },
      { name: 'Part-time Remote', schedule: 'Tue/Thu evenings + Sat', weeks: 32, fee: 'KES 165,000' },
    ],
    admissionPrerequisites: ['Networking basics (CompTIA A+ recommended)', 'Linux fundamentals', 'Logic assessment'],
    curriculum: [
      { title: 'Networking & Systems', hours: 120, topics: ['TCP/IP', 'Subnetting', 'Linux admin', 'Windows hardening'] },
      { title: 'Cryptography', hours: 80, topics: ['Symmetric & asymmetric', 'PKI', 'TLS', 'Hashing'] },
      { title: 'Defensive Security', hours: 120, topics: ['SIEM', 'Threat modelling', 'Vulnerability management'] },
      { title: 'Offensive Security', hours: 120, topics: ['Penetration testing', 'Web app security', 'OWASP Top 10'] },
      { title: 'Cloud & Application Security', hours: 80, topics: ['AWS security', 'IAM', 'Container security'] },
      { title: 'Incident Response', hours: 80, topics: ['Forensics basics', 'IR playbooks', 'Reporting'] },
      { title: 'Capstone & Career', hours: 100, topics: ['Red vs Blue team', 'Capture-the-flag', 'Career support'] },
    ],
    tools: ['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'Splunk', 'AWS', 'Kali Linux'],
    outcomes: [
      { label: 'CTFs solved', value: '20+' },
      { label: 'Career support', value: '12 months' },
      { label: 'Job placement rate', value: '72% within 6 months' },
    ],
    careers: [
      { role: 'SOC Analyst (Tier 1)', avgSalaryKes: '100,000–160,000 / month' },
      { role: 'Junior Penetration Tester', avgSalaryKes: '150,000–220,000 / month' },
      { role: 'Security Engineer', avgSalaryKes: '180,000–280,000 / month' },
    ],
    certifications: ['IJLAPS Cybersecurity Certificate', 'CompTIA Security+ prep track'],
  },
  {
    slug: 'aws-devops-engineering',
    title: 'AWS DevOps Engineering',
    category: 'Tech',
    tagline: 'Master cloud automation and become career-ready.',
    description:
      'A four-month intensive on AWS, Terraform, Docker, Kubernetes, CI/CD, observability, and infrastructure-as-code. Includes guided preparation for the AWS Solutions Architect Associate certification.',
    mode: 'Bootcamp',
    modes: [
      { name: 'Full-time Hybrid', schedule: 'Mon–Fri · 9am–4pm', weeks: 16, fee: 'KES 175,000', isPopular: true },
      { name: 'Full-time Remote', schedule: 'Mon–Fri · 9am–4pm', weeks: 16, fee: 'KES 155,000' },
    ],
    admissionPrerequisites: ['Linux command line comfort', 'Basic networking', 'Prior exposure to any cloud (free tier ok)'],
    curriculum: [
      { title: 'AWS Core Services', hours: 80, topics: ['EC2, S3, VPC, IAM', 'Cost optimisation', 'Well-architected framework'] },
      { title: 'Infrastructure-as-Code', hours: 80, topics: ['Terraform', 'CloudFormation basics', 'Modular IaC'] },
      { title: 'Containers & Orchestration', hours: 80, topics: ['Docker', 'Kubernetes', 'Helm', 'Service meshes overview'] },
      { title: 'CI/CD & Observability', hours: 80, topics: ['GitHub Actions', 'Blue/green deploys', 'Prometheus', 'Grafana'] },
      { title: 'Capstone & Exam Prep', hours: 80, topics: ['Live project', 'AWS SAA-C03 mock-track', 'Career support'] },
    ],
    tools: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
    outcomes: [
      { label: 'AWS SAA exam ready', value: 'Yes' },
      { label: 'CI/CD pipelines shipped', value: '4+' },
      { label: 'Career switch rate', value: '68% within 6 months' },
    ],
    careers: [
      { role: 'Junior DevOps Engineer', avgSalaryKes: '130,000–200,000 / month' },
      { role: 'Cloud Engineer', avgSalaryKes: '150,000–220,000 / month' },
      { role: 'Site Reliability Engineer (entry)', avgSalaryKes: '180,000–260,000 / month' },
    ],
    certifications: ['AWS Solutions Architect Associate prep'],
  },
  {
    slug: 'introduction-to-data-science',
    title: 'Introduction to Data Science',
    category: 'Tech',
    tagline: 'A 6-week beginner-friendly short course, no coding experience required.',
    description:
      'Designed for curious professionals with no prior coding background. Learn to ask the right questions of data, use spreadsheets programmatically, read dashboards, and communicate findings.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 6, fee: 'KES 25,000', isPopular: true },
      { name: 'Weekend Cohort', schedule: 'Sat · 9am–3pm', weeks: 6, fee: 'KES 22,000' },
    ],
    admissionPrerequisites: ['KCSE C- or equivalent', 'Basic spreadsheet skills'],
    curriculum: [
      { title: 'Data Literacy', hours: 12, topics: ['Data types', 'Sampling', 'Bias'] },
      { title: 'Spreadsheets as a Tool', hours: 12, topics: ['Pivot tables', 'Lookups', 'Charts'] },
      { title: 'Statistical Thinking', hours: 12, topics: ['Mean, median, variance', 'Distributions'] },
      { title: 'Storytelling with Data', hours: 12, topics: ['Narrative', 'Dashboards', 'Advocacy'] },
    ],
    tools: ['Excel', 'Google Sheets', 'Looker Studio'],
    outcomes: [
      { label: 'Capstone dashboards', value: '2' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Data-aware operator in current role', avgSalaryKes: 'Depends on industry' },
    ],
  },
  {
    slug: 'data-analytics-excel-powerbi',
    title: 'Data Analytics with Excel and Power BI',
    category: 'Tech',
    tagline: 'Beginner-friendly analytics for working professionals.',
    description:
      'A practical 8-week course teaching spreadsheets, Power Query, DAX in Power BI, and dashboard design. Build a portfolio of dashboards on citizen data topics.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 8, fee: 'KES 35,000', isPopular: true },
      { name: 'Weekend Cohort', schedule: 'Sat · 9am–3pm', weeks: 8, fee: 'KES 32,000' },
    ],
    admissionPrerequisites: ['KCSE C- or equivalent', 'Basic Excel'],
    curriculum: [
      { title: 'Excel Advanced', hours: 20, topics: ['Pivot tables', 'XLOOKUP', 'Power Pivot'] },
      { title: 'Power BI Foundations', hours: 24, topics: ['Modelling', 'DAX', 'Visualisations'] },
      { title: 'Data Preparation', hours: 16, topics: ['Power Query', 'Data sources', 'Cleaning'] },
      { title: 'Capstone Dashboard', hours: 20, topics: ['Live dataset', 'Story', 'Presentation'] },
    ],
    tools: ['Excel', 'Power BI', 'Power Query'],
    outcomes: [
      { label: 'Dashboards shipped', value: '3' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Junior Analyst', avgSalaryKes: '70,000–120,000 / month' },
    ],
  },
  {
    slug: 'applied-business-intelligence',
    title: 'Applied Business Intelligence',
    category: 'Tech',
    tagline: 'Project-based BI for analysts and mid-level professionals.',
    description:
      'Advanced, project-based course on business intelligence, data modelling, and stakeholder communication. Students finish with a polished BI product on a real client project.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 10, fee: 'KES 55,000' },
    ],
    admissionPrerequisites: ['Prior analytics experience or Introduction to Data Science graduate'],
    curriculum: [
      { title: 'Data Modelling', hours: 30, topics: ['Star schema', 'Slowly changing dims', 'Surrogate keys'] },
      { title: 'Advanced DAX', hours: 30, topics: ['Time intelligence', 'Filter context', 'Optimisation'] },
      { title: 'Stakeholder Communication', hours: 20, topics: ['Tell the story', 'Pitches', 'Operating cadence'] },
      { title: 'Client Capstone', hours: 40, topics: ['Real client project', 'Presentations'] },
    ],
    tools: ['Power BI', 'SQL Server', 'Azure (basics)'],
    outcomes: [
      { label: 'Client project shipped', value: '1' },
      { label: 'Career support', value: '6 months' },
    ],
    careers: [
      { role: 'BI Analyst', avgSalaryKes: '120,000–200,000 / month' },
    ],
  },
  {
    slug: 'introduction-to-devops',
    title: 'Introduction to DevOps Engineering',
    category: 'Tech',
    tagline: 'A 4-week developer upskilling course in DevOps principles.',
    description:
      'A focused course for developers looking to step into platform engineering. Covers CI/CD pipelines, containerisation, infrastructure-as-code basics, and deployment workflows.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 4, fee: 'KES 30,000' },
    ],
    admissionPrerequisites: ['Some software development experience', 'Comfortable with command line'],
    curriculum: [
      { title: 'CI/CD Foundations', hours: 14, topics: ['GitHub Actions', 'Tests as gate', 'Artifacts'] },
      { title: 'Containers', hours: 14, topics: ['Docker', 'Compose', 'Image registries'] },
      { title: 'Infrastructure-as-Code', hours: 14, topics: ['Terraform basics', 'State', 'Modules'] },
      { title: 'Capstone Pipeline', hours: 14, topics: ['End-to-end pipeline', 'Deployment'] },
    ],
    tools: ['GitHub Actions', 'Docker', 'Terraform'],
    outcomes: [
      { label: 'Pipelines shipped', value: '2' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Developer with DevOps skills', avgSalaryKes: '120,000–180,000 / month' },
    ],
  },
  {
    slug: 'generative-ai-essentials',
    title: 'Generative AI Essentials',
    category: 'Tech',
    tagline: 'A 2-week course to master prompt engineering and AI productivity.',
    description:
      'A focused, fast-moving course for working professionals who want to integrate generative AI into their work. Covers models, prompting patterns, evaluations, and safety.',
    mode: 'Short Course',
    modes: [
      { name: 'Live Online', schedule: 'Mon–Fri · 2pm–5pm', weeks: 2, fee: 'KES 18,000', isPopular: true },
    ],
    admissionPrerequisites: ['KCSE C-', 'Working professional or student'],
    curriculum: [
      { title: 'Models & APIs', hours: 10, topics: ['OpenAI', 'Anthropic', 'Open models', 'Cost & latency'] },
      { title: 'Prompt Engineering', hours: 10, topics: ['Patterns', 'Few-shot', 'Tool use', 'Evals'] },
      { title: 'AI Productivity', hours: 10, topics: ['Document workflows', 'Spreadsheets', 'Email', 'Research'] },
      { title: 'Ethics & Safety', hours: 6, topics: ['Hallucinations', 'Bias', 'Privacy', 'Policy'] },
    ],
    tools: ['ChatGPT', 'Claude', 'Open-source LLMs (Ollama / LM Studio)'],
    outcomes: [
      { label: 'Workflow case studies', value: '3' },
      { label: 'Career support', value: 'Self-paced' },
    ],
    careers: [
      { role: 'AI-augmented operator in current role', avgSalaryKes: 'Depends on industry' },
    ],
  },
  {
    slug: 'applied-ai-engineering',
    title: 'Applied AI Engineering',
    category: 'Tech',
    tagline: 'Build production-grade AI systems.',
    description: 'Production patterns for LLM and ML systems, including LLMOps, RAG, agent orchestration, vector stores, evaluation, observability, and cost engineering. Optional NVIDIA NCA-GENL preparation in the final week.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 8, fee: 'KES 60,000' },
    ],
    admissionPrerequisites: ['Comfortable with Python', 'Some software engineering background'],
    curriculum: [
      { title: 'Foundations of LLMs', hours: 16, topics: ['Embeddings', 'Tokenisation', 'Inference'] },
      { title: 'Retrieval-Augmented Generation', hours: 16, topics: ['Vector stores', 'Chunking', 'Evaluation'] },
      { title: 'Agents & Tools', hours: 16, topics: ['Function calling', 'Tool selection', 'Memory'] },
      { title: 'Productionisation', hours: 16, topics: ['Observability', 'Cost', 'Evals', 'CI for AI'] },
      { title: 'Capstone Project', hours: 16, topics: ['End-to-end AI app', 'Deployment'] },
    ],
    tools: ['Python', 'LangChain', 'LlamaIndex', 'OpenAI', 'Vector DBs', 'Weights & Biases'],
    outcomes: [
      { label: 'Apps shipped', value: '2' },
      { label: 'Career support', value: '6 months' },
    ],
    careers: [
      { role: 'Applied AI Engineer', avgSalaryKes: '180,000–280,000 / month' },
    ],
    certifications: ['NVIDIA NCA-GENL prep track (optional)'],
  },
  {
    slug: 'digital-marketing-ai',
    title: 'Digital Marketing with AI',
    category: 'Tech',
    tagline: 'Modern digital marketing powered by generative AI.',
    description:
      'A practical 6-week course teaching SEO, paid acquisition, social media, content, and analytics, augmented with AI tools for ideation, production, and optimisation.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 6, fee: 'KES 28,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Marketing interest or current marketing role'],
    curriculum: [
      { title: 'SEO Foundations', hours: 16, topics: ['Keyword research', 'On-page', 'Technical basics'] },
      { title: 'Paid Acquisition', hours: 16, topics: ['Google Ads', 'Meta Ads', 'Budgets', 'Measurement'] },
      { title: 'Content & Social', hours: 16, topics: ['Brand voice', 'Calendars', 'AI-assisted production'] },
      { title: 'Analytics & Optimisation', hours: 12, topics: ['GA4', 'Tagging', 'Reporting'] },
    ],
    tools: ['Google Ads', 'GA4', 'Meta Ads Manager', 'ChatGPT', 'Canva AI'],
    outcomes: [
      { label: 'Campaign case studies', value: '3' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Digital Marketing Coordinator', avgSalaryKes: '60,000–110,000 / month' },
    ],
  },
  {
    slug: 'certified-data-protection-officer',
    title: 'Certified Data Protection Officer (CDPO)',
    category: 'Tech',
    tagline: 'Kickstart a data protection career in 4 weeks.',
    description:
      'A focused 4-week certification preparing professionals for Kenya’s Data Protection Act 2019 and operational DPO duties: audits, breach response, DPIAs, vendor management.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 4, fee: 'KES 40,000', isPopular: true },
    ],
    admissionPrerequisites: ['Working professional in compliance, IT, HR, or legal'],
    curriculum: [
      { title: 'Kenya Data Protection Act', hours: 10, topics: ['Law', 'Rights', 'Obligations'] },
      { title: 'DPIA & Risk', hours: 12, topics: ['DPIA template', 'Risk register'] },
      { title: 'Breach Response', hours: 10, topics: ['Playbook', 'Notifications', 'OESC reporting'] },
      { title: 'Programme Management', hours: 10, topics: ['Policies', 'Training', 'Vendor diligence'] },
    ],
    tools: ['Templates', 'Sample DPIA', 'Reporting tools'],
    outcomes: [
      { label: 'Programme artefacts shipped', value: '4' },
      { label: 'Career support', value: '6 months' },
    ],
    careers: [
      { role: 'Junior Data Protection Officer', avgSalaryKes: '110,000–180,000 / month' },
    ],
    certifications: ['IJLAPS CDPO Certificate'],
  },
  {
    slug: 'ai-agents-automation',
    title: 'AI Agents & Workflow Automation',
    category: 'Tech',
    tagline: 'Build no-code smart agents and workflows.',
    description:
      'A 3-week course focused on AI-powered automation using n8n and other low-code platforms. Build payroll reminders, customer support triage, social posting bots, and more.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 3, fee: 'KES 22,000' },
    ],
    admissionPrerequisites: ['Working professional or founder', 'Basic spreadsheet skills'],
    curriculum: [
      { title: 'Workflow Foundations', hours: 10, topics: ['Triggers', 'Actions', 'Conditions'] },
      { title: 'AI in Automations', hours: 10, topics: ['LLM nodes', 'Guardrails', 'Cost'] },
      { title: 'Capstone Automation', hours: 10, topics: ['Real workflow', 'Production deploy'] },
    ],
    tools: ['n8n', 'OpenAI', 'Zapier (intro)'],
    outcomes: [
      { label: 'Automations shipped', value: '2' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Operations / founder with automation skills', avgSalaryKes: 'Depends on context' },
    ],
  },
  {
    slug: 'high-school-tech-bootcamp',
    title: 'High School Holiday Tech Bootcamp',
    category: 'Tech',
    tagline: 'A seasonal introduction to technology for high school students.',
    description:
      'Tiered holiday programmes (Pathfinder, Trailblazer) that introduce teens to web development, data analysis, and digital creativity. Mentored by industry professionals.',
    mode: 'Short Course',
    modes: [
      { name: 'Pathfinder (April)', schedule: 'Mon–Fri · 9am–3pm', weeks: 2, fee: 'KES 12,000' },
      { name: 'Trailblazer (August)', schedule: 'Mon–Fri · 9am–3pm', weeks: 3, fee: 'KES 18,000' },
    ],
    admissionPrerequisites: ['Aged 14–18', 'Currently in high school'],
    curriculum: [
      { title: 'Build a Web Page', hours: 16, topics: ['HTML', 'CSS', 'Deployment'] },
      { title: 'Make a Game', hours: 16, topics: ['JavaScript', 'Logic', 'Animations'] },
      { title: 'Tell a Data Story', hours: 16, topics: ['Spreadsheets', 'Charts', 'Presentation'] },
    ],
    tools: ['Replit', 'VS Code', 'Google Sheets'],
    outcomes: [
      { label: 'Projects shipped', value: '3' },
      { label: 'Career support', value: 'Self-paced' },
    ],
    careers: [
      { role: 'Builds a foundation for future tech study', avgSalaryKes: 'N/A' },
    ],
  },
];

export const BUSINESS_PROGRAMS: Program[] = [
  {
    slug: 'business-management',
    title: 'Business Management Certificate',
    category: 'Business',
    tagline: 'A 12-month foundation in entrepreneurship and management.',
    description:
      'Foundational business skills across entrepreneurship, accounting, marketing, and people management.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 48, fee: 'KES 75,000' },
      { name: 'Part-time', schedule: 'Evenings + Sat', weeks: 60, fee: 'KES 65,000' },
    ],
    admissionPrerequisites: ['KCSE C- or equivalent'],
    curriculum: [
      { title: 'Entrepreneurship', hours: 120, topics: ['Business model canvas', 'Customer discovery', 'MVP'] },
      { title: 'Accounting', hours: 120, topics: ['Bookkeeping', 'Financial statements', 'Budgeting'] },
      { title: 'Marketing', hours: 120, topics: ['Digital marketing', 'Branding', 'Content'] },
      { title: 'People Management', hours: 80, topics: ['HR fundamentals', 'Performance'] },
    ],
    tools: ['QuickBooks', 'Google Workspace', 'Canva'],
    outcomes: [
      { label: 'Business plans shipped', value: '2' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Junior Business Associate', avgSalaryKes: '50,000–90,000 / month' },
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing Certificate',
    category: 'Business',
    tagline: '6-month professional certificate in modern marketing.',
    description:
      'Paid acquisition, SEO, content, social, and analytics, built around campaigns run on behalf of real local businesses.',
    mode: 'Certificate',
    modes: [
      { name: 'Part-time Evening', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 24, fee: 'KES 40,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Marketing role or strong interest'],
    curriculum: [
      { title: 'SEO', hours: 50, topics: ['On-page', 'Technical', 'Local'] },
      { title: 'Paid Acquisition', hours: 60, topics: ['Google Ads', 'Meta Ads', 'Budgets'] },
      { title: 'Content & Social', hours: 60, topics: ['Brand voice', 'Calendars'] },
      { title: 'Analytics', hours: 30, topics: ['GA4', 'Reporting'] },
    ],
    tools: ['Google Ads', 'GA4', 'Meta Ads Manager', 'HubSpot'],
    outcomes: [
      { label: 'Capstone campaigns', value: '3' },
      { label: 'Career support', value: '6 months' },
    ],
    careers: [
      { role: 'Digital Marketing Coordinator', avgSalaryKes: '60,000–110,000 / month' },
    ],
  },
  {
    slug: 'business-analytics',
    title: 'Business Analytics',
    category: 'Business',
    tagline: 'Practical analytics for business decision-makers.',
    description:
      'Spreadsheets, SQL, Power BI, and a capstone analytics project on a real client dataset.',
    mode: 'Certificate',
    modes: [
      { name: 'Part-time', schedule: 'Evenings + Sat', weeks: 16, fee: 'KES 45,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Basic Excel'],
    curriculum: [
      { title: 'Excel Advanced', hours: 30, topics: ['Pivot tables', 'Power Query'] },
      { title: 'SQL Foundations', hours: 30, topics: ['SELECT/JOIN', 'Aggregation'] },
      { title: 'Power BI', hours: 30, topics: ['Modelling', 'DAX', 'Visualisations'] },
      { title: 'Capstone', hours: 30, topics: ['Client dataset', 'Story'] },
    ],
    tools: ['Excel', 'SQL', 'Power BI'],
    outcomes: [
      { label: 'Dashboards shipped', value: '3' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Junior Analyst', avgSalaryKes: '70,000–120,000 / month' },
    ],
  },
  {
    slug: 'entrepreneurship',
    title: 'Entrepreneurship Accelerator',
    category: 'Business',
    tagline: 'Build a business during the cohort, not after.',
    description:
      'A 12-week intensive with weekly customer interviews, mentorship, and a demo day at the end of the cohort.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 12, fee: 'KES 60,000', isPopular: true },
    ],
    admissionPrerequisites: ['A working idea', 'Time to commit'],
    curriculum: [
      { title: 'Customer Discovery', hours: 30, topics: ['Interviews', 'Personas', 'JTBD'] },
      { title: 'Business Modelling', hours: 30, topics: ['Pricing', 'Channels', 'Costs'] },
      { title: 'MVP Build', hours: 60, topics: ['No-code', 'Pilot', 'Iteration'] },
      { title: 'Demo Day', hours: 20, topics: ['Pitch', 'Storytelling', 'Follow-up'] },
    ],
    tools: ['No-code stack', 'Notion', 'Stripe'],
    outcomes: [
      { label: 'Live businesses', value: '70%' },
      { label: 'Demo Day', value: 'Yes' },
      { label: 'Career support', value: '6 months' },
    ],
    careers: [
      { role: 'Founder', avgSalaryKes: 'Variable' },
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    category: 'Business',
    tagline: 'Practical PM for cross-functional teams.',
    description:
      'A certified foundation in agile and waterfall delivery, requirements, risk, stakeholder communication, and PM tooling.',
    mode: 'Short Course',
    modes: [
      { name: 'Evening Cohort', schedule: 'Tue/Thu · 6pm–9pm + Sat', weeks: 8, fee: 'KES 35,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Some team experience'],
    curriculum: [
      { title: 'Frameworks', hours: 20, topics: ['Agile', 'Waterfall', 'Hybrid'] },
      { title: 'Planning & Risk', hours: 20, topics: ['Schedules', 'Budgets', 'Risk register'] },
      { title: 'PM Tooling', hours: 20, topics: ['Jira', 'Asana', 'Confluence'] },
      { title: 'Capstone', hours: 20, topics: ['Live project', 'Replan', 'Reporting'] },
    ],
    tools: ['Jira', 'Asana', 'MS Project (intro)'],
    outcomes: [
      { label: 'Capstone artefacts', value: '5' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Junior Project Coordinator', avgSalaryKes: '70,000–120,000 / month' },
    ],
  },
  {
    slug: 'supply-chain-procurement',
    title: 'Supply Chain & Procurement',
    category: 'Business',
    tagline: 'Practical procurement skills for the public & private sector.',
    description:
      'Procurement best practice for Kenya (PPADA 2015), supplier evaluation, contract management, and inventory planning.',
    mode: 'Certificate',
    modes: [
      { name: 'Part-time', schedule: 'Evenings + Sat', weeks: 16, fee: 'KES 50,000' },
    ],
    admissionPrerequisites: ['Working in supply chain or procurement context'],
    curriculum: [
      { title: 'Procurement Law', hours: 30, topics: ['PPADA 2015', 'Tendering'] },
      { title: 'Supplier Management', hours: 30, topics: ['Evaluation', 'Contracts'] },
      { title: 'Inventory & Logistics', hours: 30, topics: ['Planning', 'Warehousing'] },
      { title: 'Capstone', hours: 30, topics: ['Live procurement case'] },
    ],
    tools: ['ERP simulations', 'Spreadsheets'],
    outcomes: [
      { label: 'Capstone cases', value: '2' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'Junior Procurement Officer', avgSalaryKes: '70,000–120,000 / month' },
    ],
  },
  {
    slug: 'human-resources',
    title: 'Human Resources Practice',
    category: 'Business',
    tagline: 'A 6-month practitioner-oriented HR certificate.',
    description:
      'Recruitment, onboarding, performance, payroll fundamentals, and Kenya labour law essentials.',
    mode: 'Certificate',
    modes: [
      { name: 'Part-time', schedule: 'Evenings + Sat', weeks: 24, fee: 'KES 50,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Interest in HR or current admin role'],
    curriculum: [
      { title: 'Recruitment & Onboarding', hours: 40, topics: ['Job analysis', 'Interviews', 'Induction'] },
      { title: 'Performance & Talent', hours: 40, topics: ['Frameworks', 'Reviews'] },
      { title: 'Payroll & Law', hours: 40, topics: ['PAYE basics', 'KENIA labour law'] },
      { title: 'Capstone', hours: 40, topics: ['Live HR case'] },
    ],
    tools: ['HRIS simulations', 'Spreadsheets'],
    outcomes: [
      { label: 'Capstone artefacts', value: '3' },
      { label: 'Career support', value: '3 months' },
    ],
    careers: [
      { role: 'HR Assistant', avgSalaryKes: '50,000–90,000 / month' },
    ],
  },
];

export const TVETA_PROGRAMS: Program[] = [
  {
    slug: 'electrical-installation',
    title: 'Electrical Installation',
    category: 'TVETA',
    tagline: 'TVETA-certified hands-on training in domestic and commercial wiring.',
    description:
      'Operative competency training aligned with KS-EAS standards for electrical installation. Includes practical wiring labs and on-site apprenticeships.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 8am–5pm', weeks: 52, fee: 'KES 65,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Basic numeracy assessment'],
    curriculum: [
      { title: 'Electrical theory', hours: 240, topics: ['KS-EAS standards', 'Ohm’s law', 'AC/DC'] },
      { title: 'Domestic wiring', hours: 240, topics: ['Consumer units', 'Earthing', 'Inspection'] },
      { title: 'Industrial wiring', hours: 240, topics: ['Three-phase', 'Cable sizing'] },
      { title: 'Apprenticeship', hours: 320, topics: ['Live site', 'Mentored'] },
    ],
    tools: ['Multimeters', 'Hand tools', 'Cable kits'],
    outcomes: [
      { label: 'TVETA exam ready', value: 'Yes' },
      { label: 'Artisan placements', value: '85%' },
    ],
    careers: [
      { role: 'Electrician (artisan)', avgSalaryKes: '40,000–80,000 / month' },
    ],
    certifications: ['TVETA Certificate'],
  },
  {
    slug: 'plumbing-pipe-fitting',
    title: 'Plumbing & Pipe Fitting',
    category: 'TVETA',
    tagline: 'Practical plumbing systems training with apprenticeships.',
    description:
      'Operative competency training for plumbing, including domestic water systems, drainage, and pipe fitting.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 8am–5pm', weeks: 52, fee: 'KES 65,000' },
    ],
    admissionPrerequisites: ['KCSE C-', 'Basic numeracy assessment'],
    curriculum: [
      { title: 'Domestic plumbing', hours: 280, topics: ['Hot/cold water', 'Sanitation'] },
      { title: 'Drainage', hours: 240, topics: ['Soil', 'Waste', 'Vent'] },
      { title: 'Pipe fitting', hours: 240, topics: ['Methods', 'Tools'] },
      { title: 'Apprenticeship', hours: 280, topics: ['Live site', 'Mentored'] },
    ],
    tools: ['Pipe wrenches', 'Soldering', 'PVC kits'],
    outcomes: [
      { label: 'TVETA exam ready', value: 'Yes' },
      { label: 'Artisan placements', value: '82%' },
    ],
    careers: [
      { role: 'Plumber (artisan)', avgSalaryKes: '40,000–80,000 / month' },
    ],
    certifications: ['TVETA Certificate'],
  },
  {
    slug: 'ict-diploma',
    title: 'Diploma in Information Communication Technology',
    category: 'TVETA',
    tagline: '2-year TVETA diploma in ICT, networking, and software.',
    description:
      'A thorough 2-year diploma covering ICT fundamentals, networking, hardware, software, and cyber hygiene.',
    mode: 'Diploma',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 8am–4pm', weeks: 96, fee: 'KES 110,000' },
    ],
    admissionPrerequisites: ['KCSE C+', 'Mathematics C+'],
    curriculum: [
      { title: 'ICT Fundamentals', hours: 320, topics: ['Hardware', 'OS', 'Office'] },
      { title: 'Networking', hours: 320, topics: ['TCP/IP', 'Routing', 'Wireless'] },
      { title: 'Software & Web', hours: 320, topics: ['HTML/CSS/JS', 'Databases'] },
      { title: 'Industrial Attachment', hours: 480, topics: ['Live industry', 'Mentored'] },
    ],
    tools: ['Cisco Packet Tracer', 'Linux', 'VS Code'],
    outcomes: [{ label: 'TVETA diploma ready', value: 'Yes' }],
    careers: [
      { role: 'ICT Officer (entry)', avgSalaryKes: '60,000–110,000 / month' },
    ],
    certifications: ['TVETA Diploma'],
  },
  {
    slug: 'welding-fabrication',
    title: 'Welding & Metal Fabrication',
    category: 'TVETA',
    tagline: 'Hands-on welding and fabrication training with industry placement.',
    description:
      'Operative competency in arc, MIG, TIG welding and metal fabrication safety.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 8am–5pm', weeks: 52, fee: 'KES 70,000' },
    ],
    admissionPrerequisites: ['KCSE C-'],
    curriculum: [
      { title: 'Welding techniques', hours: 320, topics: ['Arc', 'MIG', 'TIG'] },
      { title: 'Fabrication safety', hours: 240, topics: ['PPE', 'Ventilation'] },
      { title: 'Industry practice', hours: 320, topics: ['Live workshop', 'Mentored'] },
    ],
    tools: ['Welding kits', 'Grinders', 'Safety gear'],
    outcomes: [{ label: 'TVETA certificate ready', value: 'Yes' }],
    careers: [
      { role: 'Welder (artisan)', avgSalaryKes: '40,000–90,000 / month' },
    ],
    certifications: ['TVETA Certificate'],
  },
  {
    slug: 'graphics-design',
    title: 'Graphic Design',
    category: 'TVETA',
    tagline: 'Visual design and branding, portfolio-driven certificate.',
    description:
      'Hands-on graphic design with industry-standard creative tools and a portfolio of real brand projects.',
    mode: 'Certificate',
    modes: [
      { name: 'Part-time', schedule: 'Evenings + Sat', weeks: 26, fee: 'KES 40,000' },
    ],
    admissionPrerequisites: ['KCSE C-'],
    curriculum: [
      { title: 'Design principles', hours: 80, topics: ['Typography', 'Colour', 'Layout'] },
      { title: 'Tools', hours: 160, topics: ['Figma', 'Adobe Suite'] },
      { title: 'Brand projects', hours: 120, topics: ['Identity', 'Print', 'Digital'] },
    ],
    tools: ['Figma', 'Adobe Suite', 'Canva'],
    outcomes: [{ label: 'Portfolio pieces', value: '5' }],
    careers: [
      { role: 'Junior Graphic Designer', avgSalaryKes: '50,000–90,000 / month' },
    ],
  },
];

export const PROFESSIONAL_PROGRAMS: Program[] = [
  {
    slug: 'tour-guiding-administration',
    title: 'Tour Guiding & Administration',
    category: 'Professional',
    tagline: 'IJLAPS flagship qualification for Diani tourism.',
    description:
      'Our flagship professional course, built around Diani tourism economy. Graduates work as licensed guides, tour office administrators, and operations leads across the South Coast and beyond. Combines classroom theory with field practice.',
    mode: 'Diploma',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 26, fee: 'KES 55,000', isPopular: true },
      { name: 'Part-time', schedule: 'Tue/Thu + Sat', weeks: 34, fee: 'KES 45,000' },
    ],
    admissionPrerequisites: ['KCSE C- or equivalent', 'Interest in tourism'],
    curriculum: [
      { title: 'Tourism Foundations', hours: 80, topics: ['Kenyan tourism landscape', 'South Coast attractions', 'Customer service'] },
      { title: 'Tour Guiding', hours: 120, topics: ['Site interpretation', 'Wildlife guiding', 'Cultural tourism'] },
      { title: 'Office Administration', hours: 80, topics: ['Reservations', 'Billing', 'Correspondence'] },
      { title: 'Field Attachment', hours: 160, topics: ['Guided tours', 'Industry placement'] },
    ],
    tools: ['Reservation systems', 'GPS', 'First aid kit'],
    outcomes: [
      { label: 'Guided tours led', value: '10+' },
      { label: 'Placement rate', value: '85%' },
    ],
    careers: [
      { role: 'Tour Guide', avgSalaryKes: '40,000–70,000 / month' },
      { role: 'Tour Office Administrator', avgSalaryKes: '45,000–80,000 / month' },
    ],
    certifications: ['IJLAPS Tour Guiding Certificate'],
  },
  {
    slug: 'front-office-administration',
    title: 'Front Office & Administration',
    category: 'Professional',
    tagline: 'Professional reception and office management skills.',
    description:
      'Prepares students for front desk, reception, and administrative roles in hotels, clinics, corporate offices, and government facilities. Covers communication, records management, and customer service.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 16, fee: 'KES 35,000' },
      { name: 'Part-time', schedule: 'Evenings + Sat', weeks: 24, fee: 'KES 28,000' },
    ],
    admissionPrerequisites: ['KCSE D+ or equivalent'],
    curriculum: [
      { title: 'Office Procedures', hours: 60, topics: ['Reception', 'Correspondence', 'Filing'] },
      { title: 'Communication Skills', hours: 60, topics: ['Professional writing', 'Phone etiquette', 'Email'] },
      { title: 'Records Management', hours: 40, topics: ['Filing systems', 'Digital records'] },
      { title: 'Customer Service', hours: 40, topics: ['Hospitality mindset', 'Complaint handling'] },
    ],
    tools: ['MS Office', 'Email', 'Booking systems'],
    outcomes: [
      { label: 'Office-ready', value: 'Yes' },
      { label: 'Placement support', value: '6 months' },
    ],
    careers: [
      { role: 'Receptionist', avgSalaryKes: '30,000–55,000 / month' },
      { role: 'Admin Assistant', avgSalaryKes: '35,000–60,000 / month' },
    ],
  },
  {
    slug: 'tours-travel-operations',
    title: 'Tours & Travel Operations',
    category: 'Professional',
    tagline: 'End-to-end tour operations for the travel industry.',
    description:
      'Covers tour packaging, reservations, transport logistics, itinerary planning, and client management for inbound and outbound tour operations.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 16, fee: 'KES 40,000', isPopular: true },
    ],
    admissionPrerequisites: ['KCSE C- or equivalent'],
    curriculum: [
      { title: 'Tour Packaging', hours: 60, topics: ['Itinerary design', 'Pricing', 'Supplier contracts'] },
      { title: 'Reservations & Ticketing', hours: 60, topics: ['Booking systems', 'Ticketing', 'Visa logistics'] },
      { title: 'Transport & Logistics', hours: 60, topics: ['Vehicle management', 'Route planning', 'Safety'] },
      { title: 'Industry Attachment', hours: 120, topics: ['Tour office placement', 'Live operations'] },
    ],
    tools: ['Booking systems', 'Spreadsheets', 'Maps'],
    outcomes: [
      { label: 'Tours coordinated', value: '5+' },
      { label: 'Placement rate', value: '80%' },
    ],
    careers: [
      { role: 'Tour Coordinator', avgSalaryKes: '40,000–70,000 / month' },
      { role: 'Travel Consultant', avgSalaryKes: '45,000–80,000 / month' },
    ],
  },
  {
    slug: 'airline-cabin-crew',
    title: 'Airline Cabin Crew',
    category: 'Professional',
    tagline: 'Prepare for a career in aviation as cabin crew.',
    description:
      'A focused programme covering aviation safety, emergency procedures, customer service, grooming, interview preparation, and regulatory knowledge for students targeting airline cabin crew positions.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 12, fee: 'KES 45,000', isPopular: true },
    ],
    admissionPrerequisites: ['KCSE C-', 'Height and medical requirements', 'Fluency in English'],
    curriculum: [
      { title: 'Aviation Safety', hours: 50, topics: ['Emergency procedures', 'Fire fighting', 'First aid'] },
      { title: 'Customer Service', hours: 40, topics: ['Service standards', 'Passenger handling', 'Complaint resolution'] },
      { title: 'Grooming & Etiquette', hours: 30, topics: ['Professional appearance', 'Cultural sensitivity'] },
      { title: 'Interview Prep', hours: 30, topics: ['Airline interview process', 'Assessment day', 'CV coaching'] },
    ],
    tools: ['Safety equipment', 'Mock cabin', 'Interview materials'],
    outcomes: [
      { label: 'Interview-ready', value: 'Yes' },
      { label: 'Airline contacts', value: '5+' },
    ],
    careers: [
      { role: 'Cabin Crew (entry)', avgSalaryKes: '80,000–150,000 / month' },
    ],
  },
];

export const VOCATIONAL_PROGRAMS: Program[] = [
  {
    slug: 'hairdressing',
    title: 'Hairdressing',
    category: 'Vocational',
    tagline: 'Practical hairdressing skills for salon careers.',
    description:
      'Hands-on training in hairdressing techniques including cutting, styling, braiding, colouring, chemical treatments, and salon management. Students work on real clients under supervision.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 24, fee: 'KES 30,000', isPopular: true },
      { name: 'Part-time', schedule: 'Tue/Thu + Sat', weeks: 36, fee: 'KES 25,000' },
    ],
    admissionPrerequisites: ['KCSE D+ or equivalent'],
    curriculum: [
      { title: 'Hair Cutting & Styling', hours: 120, topics: ['Basic cuts', 'Blow-drying', 'Braiding'] },
      { title: 'Colouring & Chemicals', hours: 80, topics: ['Colour theory', 'Perming', 'Relaxing'] },
      { title: 'Salon Management', hours: 60, topics: ['Client booking', 'Hygiene', 'Product knowledge'] },
      { title: 'Salon Attachment', hours: 160, topics: ['Live salon', 'Client work'] },
    ],
    tools: ['Salon equipment', 'Colour kits', 'Styling tools'],
    outcomes: [
      { label: 'Salon-ready', value: 'Yes' },
      { label: 'Attachment placements', value: '90%' },
    ],
    careers: [
      { role: 'Junior Hairdresser', avgSalaryKes: '20,000–45,000 / month' },
    ],
  },
  {
    slug: 'computer-packages',
    title: 'Computer Packages',
    category: 'Vocational',
    tagline: 'Essential computer skills for the modern workplace.',
    description:
      'A foundational course covering computer literacy, MS Office applications, internet skills, and typing. Ideal for students and professionals who need practical computer skills for office environments.',
    mode: 'Certificate',
    modes: [
      { name: 'Full-time', schedule: 'Mon–Fri · 9am–4pm', weeks: 8, fee: 'KES 15,000', isPopular: true },
      { name: 'Part-time', schedule: 'Sat only', weeks: 12, fee: 'KES 12,000' },
    ],
    admissionPrerequisites: ['Basic literacy and numeracy'],
    curriculum: [
      { title: 'Computer Basics', hours: 40, topics: ['Hardware', 'Windows OS', 'File management'] },
      { title: 'MS Word', hours: 40, topics: ['Document creation', 'Formatting', 'Tables'] },
      { title: 'MS Excel', hours: 40, topics: ['Spreadsheets', 'Formulas', 'Charts'] },
      { title: 'MS PowerPoint & Internet', hours: 40, topics: ['Presentations', 'Email', 'Internet research'] },
    ],
    tools: ['Windows', 'MS Office', 'Typing software'],
    outcomes: [
      { label: 'Computer literate', value: 'Yes' },
      { label: 'Exam ready', value: 'ICDL aligned' },
    ],
    careers: [
      { role: 'Office Assistant', avgSalaryKes: '25,000–40,000 / month' },
    ],
  },
  {
    slug: 'madrasa',
    title: 'Madrasa',
    category: 'Vocational',
    tagline: 'Islamic studies for moral and spiritual development.',
    description:
      'A programme covering Quranic studies, Islamic history, Arabic literacy, and moral education for students seeking foundational Islamic knowledge alongside other IJLAPS programmes.',
    mode: 'Certificate',
    modes: [
      { name: 'Weekend', schedule: 'Sat only · 9am–3pm', weeks: 48, fee: 'KES 12,000' },
      { name: 'Daily', schedule: 'Mon–Fri · 4pm–6pm', weeks: 48, fee: 'KES 18,000' },
    ],
    admissionPrerequisites: ['Open to all ages', 'Basic Arabic reading preferred'],
    curriculum: [
      { title: 'Quranic Studies', hours: 160, topics: ['Recitation', 'Tajweed', 'Memorisation'] },
      { title: 'Islamic History', hours: 80, topics: ['Prophets', 'Islamic civilisation'] },
      { title: 'Arabic Literacy', hours: 80, topics: ['Arabic script', 'Basic grammar'] },
      { title: 'Moral Education', hours: 80, topics: ['Character building', 'Community service'] },
    ],
    tools: ['Quran texts', 'Arabic workbooks'],
    outcomes: [
      { label: 'Quran completion', value: 'Juz Amma' },
      { label: 'Moral development', value: 'Integrated' },
    ],
    careers: [
      { role: 'Religious instructor (community)', avgSalaryKes: 'Voluntary or stipend' },
    ],
  },
];

export const FACULTY: Faculty[] = [
  {
    name: 'Dr. Wanjiru Mwangi',
    title: 'Director of Languages',
    department: 'Languages',
    bio: 'Applied linguist with 18 years of teaching French and English across East Africa. PhD in bilingual education from the University of Nairobi.',
    credentials: ['PhD Bilingual Education', 'Cambridge DELTA', 'DELF/DALF examiner'],
    initials: 'WM',
  },
  {
    name: 'Patrick Otieno',
    title: 'Head of Technology',
    department: 'Technology',
    bio: 'Full-stack engineer turned educator with a decade of experience shipping production code across fintech and edtech in Nairobi.',
    credentials: ['BSc Computer Science', 'AWS Solutions Architect', 'Andela alumni'],
    initials: 'PO',
  },
  {
    name: 'Aisha Hassan',
    title: 'Lead Instructor, Arabic',
    department: 'Languages',
    bio: 'Native Arabic speaker with 12 years teaching Arabic to adult learners and a focus on integration with East African business contexts.',
    credentials: ['MA Arabic Linguistics', 'ALPT certified', 'Author of Arabic primer (2022)'],
    initials: 'AH',
  },
  {
    name: 'Brian Kipchoge',
    title: 'Senior Instructor, Data Science',
    department: 'Technology',
    bio: 'Data scientist with experience at a leading Kenyan fintech and a passion for applying ML to local problems in agriculture and education.',
    credentials: ['MSc Data Science', 'TensorFlow certified', 'Published Kaggle competitions specialist'],
    initials: 'BK',
  },
  {
    name: 'Susan Kariuki',
    title: 'Head of Business Programs',
    department: 'Business',
    bio: 'Twenty-year practitioner across SME development, marketing, and procurement. Teaches the Business Management certificate and Entrepreneurship accelerator.',
    credentials: ['MBA Strathmore', 'CIPD Member', 'Founder of two SMEs'],
    initials: 'SK',
  },
  {
    name: 'Tom Odhiambo',
    title: 'Lead Instructor, Cybersecurity',
    department: 'Technology',
    bio: 'Offensive-security practitioner with experience across telecom and banking penetration tests. Maintains the IJLAPS cyber range.',
    credentials: ['OSCP', 'CEH', '10 years in security operations'],
    initials: 'TO',
  },
];

export interface NavItem {
  label: string;
  href?: string;
  description?: string;
  meta?: string;
  children?: NavItem[];
}

export interface NavSection {
  label: string;
  wide?: boolean;
  intro?: string;
  children: NavItem[];
}

export const LANGUAGES_COUNT = LANGUAGES.length;
export const PROGRAMS_COUNT = TECH_PROGRAMS.length + BUSINESS_PROGRAMS.length + TVETA_PROGRAMS.length + PROFESSIONAL_PROGRAMS.length + VOCATIONAL_PROGRAMS.length;

export function programCountLabel(category: Program['category']): string {
  const map: Record<Program['category'], { value: string; noun: string }> = {
    Tech: { value: String(TECH_PROGRAMS.length), noun: TECH_PROGRAMS.length === 1 ? 'tech programme' : 'tech programmes' },
    Business: { value: String(BUSINESS_PROGRAMS.length), noun: 'business programmes' },
    TVETA: { value: String(TVETA_PROGRAMS.length), noun: 'TVETA programmes' },
    Professional: { value: String(PROFESSIONAL_PROGRAMS.length), noun: 'professional courses' },
    Vocational: { value: String(VOCATIONAL_PROGRAMS.length), noun: 'vocational courses' },
  };
  return `${map[category].value} ${map[category].noun}`;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Academics',
    intro: 'Pathways, schools, and faculty.',
    children: [
      { label: 'Overview', href: '/academics', description: 'Academic model, calendar, and policies.' },
      { label: 'Undergraduate', href: '/undergraduate', description: 'Diploma and certificate pathways.' },
      { label: 'Graduate Programs', href: '/graduate', description: 'Bootcamps and short courses.' },
      { label: 'Schools', href: '/schools', description: 'Languages, Tech, Business, TVETA.' },
      { label: 'Online Education', href: '/online-education', description: 'Live online cohorts.' },
      { label: 'Off-Campus Learning', href: '/off-campus-learning', description: 'Satellite centres and employer embed.' },
      { label: 'Faculty', href: '/faculty', description: `${FACULTY.length}+ lead instructors.` },
    ],
  },
  {
    label: 'Languages',
    wide: true,
    intro: `${LANGUAGES_COUNT} languages. CEFR A1–C2.`,
    children: [
      ...LANGUAGES.filter((l) => ['english', 'french', 'swahili', 'arabic', 'chinese-mandarin', 'spanish', 'german', 'japanese', 'sign-language', 'italian'].includes(l.slug)).map((l) => ({
        label: l.name,
        href: `/languages/${l.slug}`,
        meta: `${l.cohortsPerYear}×/yr`,
        description: l.shortDescription,
      })),
      { label: 'See all 19 languages', href: '/languages', description: 'Including Portuguese, Dutch, Korean, Turkish, Latin, Greek, and 4 more.' },
    ],
  },
  {
    label: 'Programs',
    wide: true,
    intro: `${PROGRAMS_COUNT} programmes across 5 schools.`,
    children: [
      { label: 'All Programs', href: '/courses', description: 'Filter by school, level, mode.' },
      { label: 'Tech Bootcamps', href: '/programs/tech', description: 'Career-launch 16–35 week bootcamps' },
      { label: 'Business Programs', href: '/programs/business', description: 'Practice-led certificates' },
      { label: 'Professional Courses', href: '/programs/professional', description: 'Diani tourism economy focus' },
      { label: 'Vocational Training', href: '/programs/vocational', description: 'Hands-on trade skills' },
      { label: 'TVETA Programs', href: '/programs/tveta', description: 'TVETA-certified tracks' },
      { label: 'Departments', href: '/departments', description: 'Browse by academic department.' },
    ],
  },
  {
    label: 'About',
    intro: 'The institution, mission, and leadership.',
    children: [
      { label: 'University Overview', href: '/about', description: 'TVETA-certified, Nairobi campus.' },
      { label: 'Our Campus', href: '/campus', description: 'Westlands facilities and labs.' },
      { label: 'Mission & Values', href: '/mission-values', description: 'Learner-first principles.' },
      { label: 'History', href: '/history', description: 'From a language house to four schools.' },
      { label: 'Our Leadership', href: '/leadership', description: 'Directors and heads of school.' },
    ],
  },
  {
    label: 'Admissions',
    intro: 'Apply, fees, aid, and intake dates.',
    children: [
      { label: 'Admissions Overview', href: '/admissions', description: 'What we look for.' },
      { label: 'How to Apply', href: '/how-to-apply', description: '4 steps, 5–10 working days.' },
      { label: 'Tuition & Fees', href: '/tuition-fees', description: 'Per-programme fee schedule.' },
      { label: 'Financial Aid', href: '/financial-aid', description: 'Bursaries and payment plans.' },
      { label: 'Dates & Deadlines', href: '/dates-deadlines', description: '6 intakes per year.' },
    ],
  },
  {
    label: 'Campus Life',
    intro: 'Events, instructors, and news.',
    children: [
      { label: 'Events', href: '/events', description: 'Open days, workshops, career fairs.' },
      { label: 'Instructors', href: '/instructors', description: 'Faculty and visiting practitioners.' },
      { label: 'FAQ', href: '/faq', description: 'Common questions from applicants.' },
      { label: 'Blog & News', href: '/blog', description: 'Programme news and student stories.' },
    ],
  },
  {
    label: 'Contact',
    intro: 'Reach admissions or partnerships.',
    children: [
      { label: 'Contact Us', href: '/contact', description: 'Reach admissions and partnerships.' },
    ],
  },
];

/**
 * Top-level "simple" links (no dropdown).
 * Used in addition to NAV_SECTIONS for the most prominent CTAs.
 */
export const TOP_LEVEL_LINKS: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
];

export function getLanguage(slug: string): Language | undefined {
  return LANGUAGES.find((l) => l.slug === slug);
}

export function getProgram(slug: string): Program | undefined {
  return [...TECH_PROGRAMS, ...BUSINESS_PROGRAMS, ...TVETA_PROGRAMS, ...PROFESSIONAL_PROGRAMS, ...VOCATIONAL_PROGRAMS].find((p) => p.slug === slug);
}

export function programsByCategory(category: Program['category']): Program[] {
  return [...TECH_PROGRAMS, ...BUSINESS_PROGRAMS, ...TVETA_PROGRAMS, ...PROFESSIONAL_PROGRAMS, ...VOCATIONAL_PROGRAMS].filter((p) => p.category === category);
}

export function facultyByDepartment(department: Faculty['department']): Faculty[] {
  return FACULTY.filter((f) => f.department === department);
}
