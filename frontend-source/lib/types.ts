export type BatchStatus = 'ভর্তি চলছে' | 'শীঘ্রই আসছে' | 'ভর্তি বন্ধ';
export type ApplicationStatus = 'পেন্ডিং' | 'ভর্তি কনফার্মড' | 'বাতিল';
export interface CourseItem {
  id: string; title: string; subtitle?: string; category?: string; className?: string;
  fee?: string; duration?: string; schedule?: string; liveClasses?: string;
  status?: BatchStatus; image?: string | null; imagePath?: string | null; instructor?: string; description?: string;
  syllabus: string[];
}
export interface AdmissionApplication {
  id: number | string; studentName: string; phone: string; guardianPhone?: string;
  courseTitle?: string; courseId?: string; className?: string; institution?: string;
  address?: string; createdAt?: string; status?: ApplicationStatus;
}
export interface RegisteredUser { id: number | string; name: string; phone: string; email?: string | null; className?: string; institution?: string; }
export interface TeacherItem {
  id: number | string; name: string; subject?: string; institution?: string;
  experience?: string; qualification?: string; bio?: string; image?: string | null; imagePath?: string | null;
  courseIds: string[];
}
export interface FreeClassItem {
  id: number | string; title: string; teacher?: string; duration?: string; tag?: string;
  image?: string | null; imagePath?: string | null; courseTitle?: string; description?: string; videoUrl?: string;
}
export interface TestimonialItem { id: number | string; name: string; institution?: string; message: string; role?: string; }
export interface SiteSettings { phone?: string; secondary_phone?: string; email?: string; address?: string; facebook_url?: string; youtube_url?: string; instagram_url?: string; [key: string]: string | undefined; }
export interface ApiList<T> { data: T[]; }
