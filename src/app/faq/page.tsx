import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is MarkazalHaqq?",
    answer:
      "MarkazalHaqq is the official academy of Tareeq Al-Haqq. It extends the lessons found on TareeqAlHaqq.org into structured, live-guided study. Our current release focuses entirely on the Seerah through Al Aurjuzah Al Miyyah.",
  },
  {
    question: "Who are the instructors?",
    answer:
      "Teachers are members of the Tareeq Al-Haqq network. Each instructor is vetted for methodology, ijazaat, and ability to deliver lessons with clarity and sincerity.",
  },
  {
    question: "What is the source of the teachings?",
    answer:
      "All content is rooted in the Quran and authentic Sunnah upon the understanding of the Companions and the righteous early generations (As-Salaf as-Salih).",
  },
  {
    question: "Can I preview the materials?",
    answer:
      "Yes. After creating an account you will receive a sample lesson and a selection of memorisation resources so you can experience the course format before the first live class.",
  },
  {
    question: "How much does enrolment cost?",
    answer:
      "The full 12-week programme is a one-time payment of $120. This includes all live sessions, replays, memorisation trackers, and downloadable notes. Scholarships are available upon request.",
  },
  {
    question: "What level of study is required?",
    answer:
      "The course is suitable for motivated beginners and intermediate students. Familiarity with basic Islamic terminology helps, and we provide vocabulary glossaries alongside each set of lines.",
  },
  {
    question: "Will replays and resources remain available?",
    answer:
      "Absolutely. All replays, slides, and memorisation tools remain accessible in your account so you can review at your own pace after the live cohort concludes.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-sky-200" />
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="bg-primary/10 text-primary">FAQ</Badge>
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Questions & answers
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about the Al Aurjuzah Al Miyyah cohort—pricing, access, and how the live sessions run.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-6 pb-20">
        <Accordion type="single" collapsible className="w-full rounded-3xl bg-white/80 p-8 shadow-xl shadow-primary/10 backdrop-blur">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-primary via-sky-500 to-sky-300 p-10 text-center text-primary-foreground shadow-lg shadow-primary/15">
          <h2 className="font-headline text-3xl font-bold">Need more details?</h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Explore the course overview or reach out to the MarkazalHaqq support team for assistance with enrolment.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
              <Link href="/courses">View course details</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/plans">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
