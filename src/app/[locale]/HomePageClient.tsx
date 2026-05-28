"use client";

import { Suspense, lazy } from "react";
import {
  BookOpen,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.minathehollowerwiki.wiki";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Mina the Hollower Wiki",
      },
      {
        "@type": "VideoObject",
        name: "Mina the Hollower - Official Release Window Trailer",
        embedUrl: "https://www.youtube.com/embed/hcWeTKhpGrg",
        url: "https://www.youtube.com/watch?v=hcWeTKhpGrg",
      },
    ],
  };

  const mobileBannerAd = getPreferredMobileBannerSelection();
  const sectionIds = [
    "release-date-and-platforms",
    "reviews-and-scores",
    "beginner-guide",
    "weapons-guide",
    "sidearms-trinkets-guide",
    "bosses-areas-guide",
    "randomizer-new-game-plus",
    "story-characters",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <BookOpen className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a href="https://www.yachtclubgames.com/games/mina-the-hollower/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors">
                <ExternalLink className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a href="https://store.steampowered.com/app/1875580/Mina_the_Hollower/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors">
                {t.hero.playOnSteamCTA}
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId="hcWeTKhpGrg" title="Mina the Hollower - Official Release Window Trailer" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <a href="#release-date-and-platforms" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[0]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "0ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[0].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>
            <a href="#reviews-and-scores" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[1]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "50ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[1].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>
            <a href="#beginner-guide" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[2]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "100ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[2].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>
            <a href="#weapons-guide" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[3]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "150ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[3].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>
            <a href="#sidearms-trinkets-guide" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[4]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "200ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[4].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>
            <a href="#bosses-areas-guide" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[5]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "250ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[5].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>
            <a href="#randomizer-new-game-plus" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[6]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "300ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[6].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>
            <a href="#story-characters" onClick={(event) => { event.preventDefault(); scrollToSection(sectionIds[7]); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "350ms" }}>
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[7].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section id="release-date-and-platforms" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaReleaseDateAndPlatforms.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaReleaseDateAndPlatforms.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.minaReleaseDateAndPlatforms.items.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">{item.topic}</p>
                <p className="font-semibold mb-2">{item.status}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews-and-scores" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaReviewsAndScores.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaReviewsAndScores.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.minaReviewsAndScores.items.map((item: any, i: number) => (
              <div key={i} className="p-6 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{item.source}</h3>
                  <span className="text-sm px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.score}</span>
                </div>
                <p className="text-sm font-medium mb-2">{item.verdict}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaBeginnerGuide.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaBeginnerGuide.intro}</p>
          </div>
          <div className="space-y-3">
            {t.modules.minaBeginnerGuide.items.map((step: any, i: number) => (
              <div key={i} className="flex gap-4 p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</div>
                <div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="weapons-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaWeaponsGuide.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaWeaponsGuide.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.minaWeaponsGuide.items.map((weapon: any, i: number) => (
              <div key={i} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2">{weapon.weapon}</h3>
                <p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">{weapon.playstyle}</p>
                <p className="text-sm text-muted-foreground">{weapon.best_for}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sidearms-trinkets-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaSidearmsAndTrinketsGuide.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaSidearmsAndTrinketsGuide.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.minaSidearmsAndTrinketsGuide.items.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">{item.role}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bosses-areas-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaBossesAndAreasGuide.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaBossesAndAreasGuide.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.minaBossesAndAreasGuide.items.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">{item.type}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="randomizer-new-game-plus" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaRandomizerAndNewGamePlus.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaRandomizerAndNewGamePlus.intro}</p>
          </div>
          <div className="space-y-3">
            {t.modules.minaRandomizerAndNewGamePlus.faqs.map((faq: any, i: number) => (
              <details key={i} className="border border-border rounded-xl p-4 bg-white/5 group">
                <summary className="cursor-pointer font-semibold list-none">{faq.question}</summary>
                <p className="text-sm text-muted-foreground mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="story-characters" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.minaStoryAndCharacters.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.minaStoryAndCharacters.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.minaStoryAndCharacters.items.map((item: any, i: number) => (
              <div key={i} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">{item.type}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection title={t.cta.title} description={t.cta.description} joinCommunity={t.cta.joinCommunity} joinGame={t.cta.joinGame} />
      </Suspense>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://discord.gg/khzjjZNdvf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.discord}</a></li>
                <li><a href="https://x.com/YachtClubGames" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.twitter}</a></li>
                <li><a href="https://www.reddit.com/r/MinaTheHollower/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.steamCommunity}</a></li>
                <li><a href="https://store.steampowered.com/app/1875580/Mina_the_Hollower/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.steamStore}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.about}</Link></li>
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.privacy}</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.terms}</Link></li>
                <li><Link href="/copyright" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.copyrightNotice}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
