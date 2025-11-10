import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Monthly',
    price: '$15',
    frequency: '/month',
    description: 'Flexible access to all our content, renewed monthly.',
    features: [
      'Access to all current and future courses',
      'Join interactive Q&A sessions',
      'Access to student community forum',
      'Cancel anytime',
    ],
    cta: 'Choose Monthly',
    isPrimary: false,
  },
  {
    name: 'Yearly',
    price: '$150',
    frequency: '/year',
    description: 'Save with an annual subscription and commit to your learning.',
    features: [
      'All features of the Monthly plan',
      'Get 2 months free',
      'Priority support',
      'Early access to new courses',
    ],
    cta: 'Choose Yearly',
    isPrimary: true,
  },
  {
    name: 'Lifetime',
    price: '$500',
    frequency: 'one-time',
    description: 'A single payment for lifetime access to all content.',
    features: [
      'All features of the Yearly plan',
      'Never worry about renewals again',
      'Exclusive lifetime member badge',
      'Special invitations to events',
    ],
    cta: 'Choose Lifetime',
    isPrimary: false,
  },
];

export default function PlansPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Our Plans</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Choose a plan that fits your learning goals and budget.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-start">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col shadow-lg transition-transform duration-300 ${plan.isPrimary ? 'border-primary shadow-primary/20 md:scale-105' : 'shadow-md hover:scale-105'}`}>
            <CardHeader className="text-center p-6">
              <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
              <CardDescription className="pt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.frequency}</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <Button className="w-full" size="lg" variant={plan.isPrimary ? 'default' : 'outline'}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
