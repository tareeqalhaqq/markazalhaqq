import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is MarkazalHaqq?",
    answer: "MarkazalHaqq is an online learning platform dedicated to providing authentic Islamic education. It's an extension of the work done by Tareeqalhaqq.org, presented in a structured, course-based format."
  },
  {
    question: "Who are the instructors?",
    answer: "Our instructors are qualified scholars and teachers from various backgrounds, vetted for their knowledge, adherence to the Quran and Sunnah, and teaching ability. You can learn more about them on our Instructors page."
  },
  {
    question: "What is the source of the teachings?",
    answer: "All teachings are based on the Quran and the Sunnah of Prophet Muhammad (ﷺ) as understood by the companions and the righteous early generations of Muslims (As-Salaf as-Salih)."
  },
  {
    question: "Can I try a course for free?",
    answer: "We may offer introductory lessons or free courses from time to time. Please check our Courses page or sign up for our newsletter to stay updated on new offerings."
  },
  {
    question: "How do the subscription plans work?",
    answer: "Our subscription plans give you access to all courses on the platform. You can choose a monthly or yearly plan for ongoing access, or a lifetime plan for a one-time payment. You can cancel your subscription at any time."
  },
  {
    question: "Is this suitable for beginners?",
    answer: "Yes! We have a wide range of courses designed for all levels, from absolute beginners to advanced students. Each course description specifies the intended level."
  }
];

export default function FAQPage() {
  return (
    <div className="container max-w-3xl mx-auto py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our platform and courses.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
