import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const courses = [
  {
    title: 'Foundations of Islamic Belief',
    category: 'Aqeedah',
    level: 'Beginner',
    instructor: 'Dr. Ahmad Salah',
    description: 'A comprehensive introduction to the fundamental tenets of Islamic creed (Aqeedah), based on classical sources.',
    image: PlaceHolderImages.find(img => img.id === 'course-1'),
  },
  {
    title: 'The Prophetic Biography (Seerah)',
    category: 'History',
    level: 'Beginner',
    instructor: 'Ustadha Fatima Ali',
    description: 'An inspiring journey through the life and character of Prophet Muhammad (ﷺ), deriving timeless lessons.',
    image: PlaceHolderImages.find(img => img.id === 'course-2'),
  },
  {
    title: 'Tajweed for Beginners',
    category: 'Quranic Sciences',
    level: 'Beginner',
    instructor: 'Qari Yusuf Ahmed',
    description: 'Learn to recite the Quran with proper pronunciation and articulation as taught by the Prophet (ﷺ).',
    image: PlaceHolderImages.find(img => img.id === 'course-3'),
  },
  {
    title: 'Principles of Islamic Jurisprudence',
    category: 'Fiqh',
    level: 'Intermediate',
    instructor: 'Dr. Ahmad Salah',
    description: 'Explore the methodology used by scholars to derive rulings from the primary sources of Islamic law.',
    image: PlaceHolderImages.find(img => img.id === 'course-4'),
  },
  {
    title: 'Introduction to Hadith Studies',
    category: 'Hadith',
    level: 'Intermediate',
    instructor: 'Ustadha Fatima Ali',
    description: 'Learn about the preservation, collection, and sciences of the sayings and traditions of the Prophet (ﷺ).',
    image: PlaceHolderImages.find(img => img.id === 'course-5'),
  },
  {
    title: 'Arabic Language Level 1',
    category: 'Language',
    level: 'Beginner',
    instructor: 'Qari Yusuf Ahmed',
    description: 'Begin your journey to understand the Quran by learning the fundamentals of the Arabic language.',
    image: PlaceHolderImages.find(img => img.id === 'course-6'),
  },
];

export default function CoursesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Our Courses</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore a wide range of subjects to deepen your Islamic knowledge.
        </p>
      </div>

      <div className="mb-8 max-w-lg mx-auto">
        <Input type="search" placeholder="Search for courses..." className="w-full bg-card" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {course.image && (
              <CardHeader className="p-0">
                <Image
                  src={course.image.imageUrl}
                  alt={course.image.description}
                  data-ai-hint={course.image.imageHint}
                  width={600}
                  height={340}
                  className="object-cover w-full h-48"
                />
              </CardHeader>
            )}
            <CardContent className="p-6 flex-grow">
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <CardTitle className="text-xl mb-2 font-headline">{course.title}</CardTitle>
              <CardDescription className="mb-4 text-sm">{course.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center bg-card">
              <p className="text-sm font-medium text-muted-foreground">{course.instructor}</p>
              <Button asChild variant="default">
                <Link href="#">Enroll Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
