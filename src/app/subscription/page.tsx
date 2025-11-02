'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Crown } from 'lucide-react';

const subscriptionTiers = [
  {
    name: 'Free',
    price: '0€',
    priceDescription: 'forever',
    features: ['Access to all recipes', 'Limited AI recipe generation'],
    cta: 'You are on this plan',
    current: true,
  },
  {
    name: 'Premium (AI Plan)',
    price: '4.99€',
    priceDescription: '/month',
    features: [
      'Personal daily meal plan',
      'Calorie tracking',
      'Unlimited AI advice',
      'Nutrition history',
    ],
    cta: 'Upgrade to Premium',
    paymentLink: 'https://revolut.me/mock-payment',
    pro: true,
  },
  {
    name: 'Pro (Annual)',
    price: '39.99€',
    priceDescription: '/year',
    features: [
      'All Premium features',
      '~30% discount for annual payment',
      'Priority support',
    ],
    cta: 'Go Pro',
    paymentLink: 'https://paypal.me/mock-payment',
    pro: true,
  },
];

export default function SubscriptionPage() {
  const { toast } = useToast();

  const handleSubscription = (tier: (typeof subscriptionTiers)[number]) => {
    if (tier.paymentLink) {
        // In a real app, you would redirect to the payment link.
        // Here we'll just simulate it.
        toast({
            title: `Redirecting to ${tier.name} payment...`,
            description: "This is a simulation. No real payment will be processed.",
        });
        
        // Simulate a successful payment and subscription update after a delay
        setTimeout(() => {
             toast({
                title: 'Payment Successful!',
                description: `You have subscribed to the ${tier.name} plan.`,
            });
            // Here you would update the user's subscription status in your database.
        }, 3000);
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header title="Subscription" />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
              Choose Your Plan
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Unlock powerful features to achieve your health goals with a NutriChef subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {subscriptionTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`flex flex-col ${tier.name === 'Premium (AI Plan)' ? 'border-primary shadow-lg' : ''}`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
                    {tier.pro && <Crown className="text-yellow-400" />}
                    {tier.name}
                  </CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.priceDescription}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={tier.current}
                    onClick={() => handleSubscription(tier)}
                    variant={tier.pro ? 'default' : 'outline'}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
