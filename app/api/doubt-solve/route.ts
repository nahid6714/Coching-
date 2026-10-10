import {NextResponse} from 'next/server';
import {GoogleGenAI, ThinkingLevel} from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {question, subject, grade} = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        {error: 'অনুগ্রহ করে তোমার প্রশ্নটি লেখো।'},
        {status: 400}
      );
    }

    const prompt = `তুমি INFINITY ACADEMY-এর ২৪/৭ ডাউট সলভার ও অভিজ্ঞ শিক্ষক।
শিক্ষার্থীর শ্রেণি: ${grade || 'উল্লেখ নেই'}
বিষয়: ${subject || 'সাধারণ'}
শিক্ষার্থীর প্রশ্ন: ${question}

অনুগ্রহ করে সহজ, স্পষ্ট এবং ধাপে ধাপে (step-by-step) বাংলায় উত্তর দাও যাতে শিক্ষার্থী খুব সহজেই মূল ধারণাটি বুঝতে পারে। প্রয়োজনে উদাহরণ ও সূত্র উল্লেখ করো।`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return NextResponse.json({
      answer: response.text || 'দুঃখিত, এই মুহূর্তে উত্তর তৈরি করা সম্ভব হয়নি।',
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'ডাউট সলভ সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করো।';
    return NextResponse.json({error: message}, {status: 500});
  }
}
