import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { MomentPortrait } from "@/components/MomentPortrait";
import { ShareMenuClient } from "@/components/ShareMenuClient";
import { StitchDivider } from "@/components/decorative";
import { getMomentImage } from "@/lib/images";
import { createPageMetadata, getMomentMetaDescription, getMomentOgAlt } from "@/lib/metadata";
import { getMomentById, getRelatedMoments, moments } from "@/lib/moments";
import { getMomentShareText, getMomentShareUrl } from "@/lib/share";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return moments.map((moment) => ({ id: moment.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/moment/[id]">): Promise<Metadata> {
  const { id } = await params;
  const moment = getMomentById(id);
  if (!moment) return { title: "Moment — Dolly Legacy" };

  const description = getMomentMetaDescription(moment);

  return createPageMetadata({
    title: moment.title,
    description,
    path: `/moment/${moment.id}`,
    keywords: [...moment.tags, moment.category, moment.era, "Dolly Parton moment"],
    ogType: "article",
    ogImage: {
      url: `/moment/${moment.id}/opengraph-image`,
      alt: getMomentOgAlt(moment),
    },
  });
}

export default async function MomentPage({ params }: PageProps<"/moment/[id]">) {
  const { id } = await params;
  const moment = getMomentById(id);
  if (!moment) notFound();

  const related = getRelatedMoments(moment);
  const shareUrl = getMomentShareUrl(moment.id);
  const shareText = getMomentShareText(moment);
  const image = getMomentImage(moment.id);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: moment.title,
    description: moment.summary,
    url: shareUrl,
    image: absoluteUrl(image?.src ?? `/moment/${moment.id}/opengraph-image`),
    inLanguage: "en-US",
    about: {
      "@type": "Person",
      name: "Dolly Parton",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Dolly Legacy",
      url: absoluteUrl("/"),
    },
    ...(moment.year ? { datePublished: `${moment.year}-01-01` } : {}),
    ...(moment.quote
      ? {
          citation: moment.quote,
        }
      : {}),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={articleJsonLd} />
      <Link href="/moments" className="text-sm font-semibold text-hot-pink hover:text-burgundy">
        ← All moments
      </Link>

      <div className="mt-8 flex flex-wrap gap-2">
        {moment.year && (
          <span className="rounded-full bg-blush/50 px-2.5 py-0.5 text-xs font-medium">
            {moment.year}
          </span>
        )}
        <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs capitalize">
          {moment.category}
        </span>
      </div>

      <h1 className="mt-4 font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        {moment.title}
      </h1>

      {image && (
        <MomentPortrait
          image={image}
          showCaption
          priority
          className="mt-8 aspect-[3/2] w-full"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      )}

      {moment.quote && (
        <blockquote className="mt-8 font-serif text-2xl italic leading-snug text-burgundy rhinestone md:text-3xl">
          &ldquo;{moment.quote}&rdquo;
        </blockquote>
      )}

      <p className="mt-8 text-lg leading-relaxed text-burgundy/85">
        {moment.body ?? moment.summary}
      </p>

      {moment.hiddenFact && (
        <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-5">
          <p className="text-sm font-medium text-gold">Between the rhinestones</p>
          <p className="mt-2 italic text-burgundy/75">{moment.hiddenFact}</p>
        </div>
      )}

      <ShareMenuClient
        title={moment.title}
        text={shareText}
        url={shareUrl}
        className="mt-10"
      />

      {moment.source && (
        <a
          href={moment.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm text-gold hover:underline"
        >
          Source →
        </a>
      )}

      {related.length > 0 && (
        <>
          <StitchDivider className="my-10" />
          <h2 className="font-serif text-xl font-bold text-burgundy-deep">
            Related moments
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/moment/${r.id}`}
                  className="font-semibold text-hot-pink hover:text-burgundy"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
