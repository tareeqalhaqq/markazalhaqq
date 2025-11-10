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
      "MarkazalHaqq is the official academy of Tareeq Al-Haqq. It extends the lessons found on TareeqAlHaqq.org into structured courses with live mentorship and community support.",
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
    question: "Can I try a course for free?",
    answer:
      "We periodically release introductory lessons or complimentary modules. Subscribe to updates when you create an account to be notified first.",
  },
  {
    question: "How do the subscription plans work?",
    answer:
      "The Student of Knowledge Program unlocks every course for $40 per month. You may also pre-pay $240 for the year (equivalent to $20 per month) or purchase courses individually with lifetime access.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Yes. Tracks are organized by level so you can start from foundational material and grow into intermediate and advanced studies.",
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
              Everything about MarkazalHaqq’s programs, pricing, and learning experience in one place.
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
            Browse our course catalog, review program plans, or reach out to the MarkazalHaqq support team for specific questions.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
              <Link href="/courses">Explore courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/plans">Review plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
