import { sanityFetch } from "./sanity/client";
import { sizedImage } from "./sanity/image";
import {
  defaultHome,
  type HomeContent,
  type NarrativeBlock,
  type SectionHeaderContent,
  type SplitContent,
} from "./homeDefaults";

export { defaultHome };
export type { HomeContent, NarrativeBlock, SectionHeaderContent, SplitContent };

/* ---------- Sanity query + safe merge ---------- */

const HEADER = `{ eyebrow, titleWhite, titleGold, lead }`;
const SPLIT = `{ eyebrow, titleWhite, titleGold, text, buttonLabel, "imageUrl": image.asset->url, "imageAlt": image.alt }`;

const HOME_QUERY = `*[_id == "homePage"][0]{
  heroChapters[]{ eyebrow, titleWhite, titleGold, body, buttonLabel },
  statementText, statementGold, statementNarrative,
  collectionHeader ${HEADER},
  finale{ titleWhite, titleGold, buttonLabel, noteOne, noteTwo },
  marqueeText,
  philosophy ${SPLIT},
  valuesHeader ${HEADER},
  values[]{ title, text },
  experience ${SPLIT},
  faqHeader ${HEADER},
  contact{ title, submitLabel, successTitle, successText },
  footerHeading, footerText
}`;

type Loose = Record<string, unknown> | null | undefined;

/** A value from Sanity only wins when it is a non-empty string. */
const str = (value: unknown, fallback: string): string =>
  typeof value === "string" && value.trim() ? value : fallback;

const optStr = (value: unknown, fallback?: string): string | undefined =>
  typeof value === "string" && value.trim() ? value : fallback;

function mergeHeader(base: SectionHeaderContent, src: Loose): SectionHeaderContent {
  return {
    eyebrow: str(src?.eyebrow, base.eyebrow),
    titleWhite: str(src?.titleWhite, base.titleWhite),
    titleGold: str(src?.titleGold, base.titleGold),
    lead: optStr(src?.lead, base.lead),
  };
}

function mergeSplit(base: SplitContent, src: Loose): SplitContent {
  return {
    eyebrow: str(src?.eyebrow, base.eyebrow),
    titleWhite: str(src?.titleWhite, base.titleWhite),
    titleGold: str(src?.titleGold, base.titleGold),
    text: str(src?.text, base.text),
    buttonLabel: str(src?.buttonLabel, base.buttonLabel),
    image: sizedImage(optStr(src?.imageUrl), 1600) ?? base.image,
    imageAlt: str(src?.imageAlt, base.imageAlt),
  };
}

/** Merge whatever the Studio returned over the built-in content. Never throws. */
export function mergeHome(src: Loose): HomeContent {
  const d = defaultHome;
  if (!src) return d;

  const chapters = Array.isArray(src.heroChapters) ? (src.heroChapters as Loose[]) : [];
  const heroChapters =
    chapters.length === d.heroChapters.length
      ? d.heroChapters.map((base, i) => ({
          eyebrow: str(chapters[i]?.eyebrow, base.eyebrow),
          titleWhite: str(chapters[i]?.titleWhite, base.titleWhite),
          titleGold: str(chapters[i]?.titleGold, base.titleGold),
          body: optStr(chapters[i]?.body, base.body),
          buttonLabel: optStr(chapters[i]?.buttonLabel, base.buttonLabel),
        }))
      : d.heroChapters;

  const values = (Array.isArray(src.values) ? (src.values as Loose[]) : [])
    .filter((v) => typeof v?.title === "string" && (v.title as string).trim())
    .slice(0, 4)
    .map((v) => ({ title: v!.title as string, text: str(v?.text, "") }));

  const narrative = Array.isArray(src.statementNarrative)
    ? (src.statementNarrative as NarrativeBlock[]).filter((b) => b?._type === "block" && b.children?.length)
    : [];

  const finale = src.finale as Loose;
  const contact = src.contact as Loose;

  return {
    heroChapters,
    statementText: str(src.statementText, d.statementText),
    statementGold: str(src.statementGold, d.statementGold),
    statementNarrative: narrative.length > 0 ? narrative : d.statementNarrative,
    collectionHeader: mergeHeader(d.collectionHeader, src.collectionHeader as Loose),
    finale: {
      titleWhite: str(finale?.titleWhite, d.finale.titleWhite),
      titleGold: str(finale?.titleGold, d.finale.titleGold),
      buttonLabel: str(finale?.buttonLabel, d.finale.buttonLabel),
      noteOne: str(finale?.noteOne, d.finale.noteOne),
      noteTwo: str(finale?.noteTwo, d.finale.noteTwo),
    },
    marqueeText: str(src.marqueeText, d.marqueeText),
    philosophy: mergeSplit(d.philosophy, src.philosophy as Loose),
    valuesHeader: mergeHeader(d.valuesHeader, src.valuesHeader as Loose),
    values: values.length > 0 ? values : d.values,
    experience: mergeSplit(d.experience, src.experience as Loose),
    faqHeader: mergeHeader(d.faqHeader, src.faqHeader as Loose),
    contact: {
      title: str(contact?.title, d.contact.title),
      submitLabel: str(contact?.submitLabel, d.contact.submitLabel),
      successTitle: str(contact?.successTitle, d.contact.successTitle),
      successText: str(contact?.successText, d.contact.successText),
    },
    footerHeading: str(src.footerHeading, d.footerHeading),
    footerText: str(src.footerText, d.footerText),
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    return mergeHome(await sanityFetch<Record<string, unknown> | null>(HOME_QUERY));
  } catch {
    return defaultHome;
  }
}
