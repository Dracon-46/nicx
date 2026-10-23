import { Shell } from '../components/Shell';
import { Faq } from './home/Faq';
import { Features } from './home/Features';
import { FinalCta } from './home/FinalCta';
import { Hero } from './home/Hero';
import { HowItWorks } from './home/HowItWorks';
import { MoodDemo } from './home/MoodDemo';
import { Pillars } from './home/Pillars';
import { Privacy } from './home/Privacy';
import { Requirements } from './home/Requirements';

export function HomePage() {
  return (
    <Shell page="home">
      <Hero />
      <Pillars />
      <Features />
      <MoodDemo />
      <HowItWorks />
      <Privacy />
      <Requirements />
      <Faq />
      <FinalCta />
    </Shell>
  );
}
