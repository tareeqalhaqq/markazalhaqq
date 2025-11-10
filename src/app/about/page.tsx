import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Users, BookOpen, Heart } from 'lucide-react';

const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-image');

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">About MarkazalHaqq</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Your trusted online center for authentic Islamic knowledge, building upon the legacy of Tareeq Al-Haqq to make learning accessible to all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-4 text-lg text-foreground/90">
            <h2 className="text-3xl font-bold text-foreground font-headline">Our Story</h2>
            <p>MarkazalHaqq was born from a desire to extend the valuable resources of Tareeqalhaqq.org to a global audience through a structured, interactive, and modern e-learning platform.</p>
            <p>We recognized the growing need for reliable Islamic education that is both deeply rooted in authentic scholarship and accessible in today's digital world.</p>
            <p>Our mission is to empower Muslims with the knowledge to practice their faith with clarity and confidence. We believe in fostering a learning environment that is supportive, engaging, and spiritually uplifting.</p>
          </div>
          <div>
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                width={800}
                height={600}
                className="rounded-xl shadow-2xl"
              />
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <BookOpen className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">To provide authentic, accessible, and comprehensive Islamic education based on the Quran and the Sunnah.</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">To become a leading online resource for Muslims worldwide seeking to deepen their faith and knowledge.</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Heart className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">Our Values</h3>
              <p className="mt-2 text-muted-foreground">Authenticity, sincerity, excellence, and community are the pillars that guide our commitment to our students.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
