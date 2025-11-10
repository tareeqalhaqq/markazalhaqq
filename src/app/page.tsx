import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-section');
const courseImages = {
  '1': PlaceHolderImages.find(img => img.id === 'course-1'),
  '2': PlaceHolderImages.find(img => img.id === 'course-2'),
  '3': PlaceHolderImages.find(img => img.id === 'course-3'),
};

const features = [
  "Authentic knowledge based on Quran and Sunnah",
  "Taught by qualified and experienced instructors",
  "Flexible learning schedule to fit your life",
  "Interactive community of students and scholars",
];

const featuredCourses = [
  {
    title: 'Foundations of Islamic Belief',
    description: 'A comprehensive introduction to Aqeedah.',
    image: courseImages['1'],
    href: '/courses',
  },
  {
    title: 'The Prophetic Biography (Seerah)',
    description: 'Study the life and character of Prophet Muhammad (ﷺ).',
    image: courseImages['2'],
    href: '/courses',
  },
  {
    title: 'Tajweed for Beginners',
    description: 'Learn to recite the Quran with proper pronunciation.',
    image: courseImages['3'],
    href: '/courses',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl font-headline">
            Your Center for Authentic Islamic Knowledge
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Deepen your understanding of Islam with structured courses from qualified scholars, building upon the foundations of Tareeq Al-Haqq.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/plans">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Why MarkazalHaqq?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We are committed to providing an accessible and authentic learning experience.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-foreground">{feature}</p> outweighed
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 sm:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Featured Courses
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Start your journey of knowledge with our most popular courses.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Card key={course.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  {course.image && (
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={course.image.imageUrl}
                        alt={course.image.description}
                        data-ai-hint={course.image.imageHint}
                        width={600}
                        height={400}
                        className="object-cover w-full h-48"
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 font-headline">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                  <Button asChild className="mt-4 px-0" variant="link" >
                    <Link href={course.href}>Learn More <span aria-hidden="true" className="ml-1">→</span></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
