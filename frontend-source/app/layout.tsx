import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Infinity Academy — অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম',
  description:
    'অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম — লাইভ ক্লাস, প্র্যাকটিস কুইজ আর ২৪/৭ ডাউট সলভ।',
  openGraph: {
    title: 'Infinity Academy — অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম',
    description:
      'অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম — লাইভ ক্লাস, প্র্যাকটিস কুইজ আর ২৪/৭ ডাউট সলভ।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinity Academy — অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম',
    description:
      'অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম — লাইভ ক্লাস, প্র্যাকটিস কুইজ আর ২৪/৭ ডাউট সলভ।',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn">
      <body
        suppressHydrationWarning
        className="font-[family-name:var(--font-bengali),var(--font-latin),sans-serif] antialiased bg-[#F8F9FC] text-[#141A38]"
      >
        {children}
      </body>
    </html>
  );
}
