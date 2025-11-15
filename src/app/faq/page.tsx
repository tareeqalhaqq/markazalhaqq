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
    question: "What is Markaz al-Haqq Academy?",
    answer:
      "Markaz al-Haqq is the official academy of Tareeq Al-Haqq. We extend trusted lessons into structured, live-guided study with polished resources and mentorship.",
  },
  {
    question: "Who teaches the programmes?",
    answer:
      "Classes are delivered by teachers within the Tareeq Al-Haqq network—each vetted for ijazaat, clarity, and alignment with the methodology of the Salaf.",
  },
  {
    question: "What sources are used?",
    answer:
      "All materials are rooted in the Qur'an and authentic Sunnah upon the understanding of the Companions and the righteous early generations.",
  },
  {
    question: "Can I preview the learning experience?",
    answer:
      "Yes. After creating an account you'll receive a sample lesson, memorisation trackers, and a walkthrough of our sokacademy-inspired interface.",
  },
  {
    question: "What are the fees?",
    answer:
      "Our flagship cohort is a one-time payment that includes live sessions, replays, memorisation support, and downloadable workbooks. Scholarships are available.",
  },
  {
    question: "Do I need prior study?",
    answer:
      "We design cohorts for motivated beginners and intermediate seekers. Glossaries and mentor support ensure you stay on track.",
  },
  {
    question: "How long do I keep access?",
    answer:
      "Replays, slides, and assignments remain in your dashboard indefinitely so you can review at your own pace.",
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-purple-50/70 to-blue-50/60" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full border border-primary/20 bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              FAQ
            </Badge>
            <h1 className="mt-6 font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Questions & answers
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get clarity on our programmes, pricing, and the polished learning journey you can expect inside the academy.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-6">
        <Accordion type="single" collapsible className="w-full rounded-3xl border border-muted bg-white/90 p-8 shadow-xl shadow-primary/5">
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

        <div className="mt-12 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 p-10 text-center shadow-lg shadow-primary/10">
          <h2 className="font-headline text-3xl font-semibold text-foreground">Need more details?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the course catalog or reach out to our team for a personalised recommendation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/courses">View courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 px-8 text-primary hover:bg-primary/10">
              <Link href="/plans">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
