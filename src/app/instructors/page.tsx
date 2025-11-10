import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const instructors = [
  {
    name: 'Dr. Ahmad Salah',
    title: 'Senior Instructor, Aqeedah & Fiqh',
    bio: 'Dr. Ahmad Salah holds a PhD in Islamic Theology and has been teaching for over 15 years. He specializes in creed and jurisprudence.',
    image: PlaceHolderImages.find(img => img.id === 'instructor-1'),
  },
  {
    name: 'Ustadha Fatima Ali',
    title: 'Instructor, Seerah & Tafsir',
    bio: 'Ustadha Fatima Ali is a graduate of Al-Azhar University and a specialist in Quranic Exegesis and Prophetic History. She is known for her engaging teaching style.',
    image: PlaceHolderImages.find(img => img.id === 'instructor-2'),
  },
  {
    name: 'Qari Yusuf Ahmed',
    title: 'Instructor, Quranic Sciences',
    bio: 'Qari Yusuf Ahmed has memorized the Quran with multiple ijazahs in recitation. He is passionate about helping students beautify their recitation.',
    image: PlaceHolderImages.find(img => img.id === 'instructor-3'),
  },
];

export default function InstructorsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Meet Our Instructors</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Learn from qualified scholars and teachers dedicated to authentic knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <Card key={instructor.name} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              {instructor.image && (
                <Image
                  src={instructor.image.imageUrl}
                  alt={instructor.image.description}
                  data-ai-hint={instructor.image.imageHint}
                  width={128}
                  height={128}
                  className="rounded-full mx-auto mb-4 border-4 border-primary/10"
                />
              )}
              <CardTitle className="text-xl mb-1 font-headline">{instructor.name}</CardTitle>
              <CardDescription className="text-primary font-semibold mb-4">{instructor.title}</CardDescription>
              <p className="text-muted-foreground text-sm">{instructor.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
