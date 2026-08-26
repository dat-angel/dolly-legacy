export const COMMUNITY_FILTER_TAGS = ["Black community", "LGBTQ+", "Home state"] as const;

export type CommunityFilterTag = (typeof COMMUNITY_FILTER_TAGS)[number];

export interface CommunityFilterMeta {
  tag: CommunityFilterTag;
  title: string;
  intro: string;
  highlights: { id: string; label: string }[];
  filterHref: string;
}

export const COMMUNITY_FILTERS: Record<CommunityFilterTag, CommunityFilterMeta> = {
  "Black community": {
    tag: "Black community",
    title: "Standing with Black communities",
    intro:
      "From booking Black artists on her 1970s variety show — when country television was overwhelmingly white — to investing Whitney Houston royalties in a Nashville neighborhood, renaming Dixie Stampede, and welcoming Beyoncé into country when radio gatekept her, Dolly put her platform and money where her values were.",
    highlights: [
      { id: "dolly-variety-show", label: "Diverse TV guests" },
      { id: "whitney-royalties", label: "The house Whitney built" },
      { id: "beyonce-welcome", label: "Welcoming Beyoncé" },
      { id: "blm-support", label: "Black Lives Matter" },
      { id: "dixie-stampede-rename", label: "Renaming Dixie Stampede" },
    ],
    filterHref: "/moments?tag=Black%20community",
  },
  "LGBTQ+": {
    tag: "LGBTQ+",
    title: "Standing with LGBTQ+ folks",
    intro:
      "Long before Pride became corporate, Dolly showed up during the AIDS crisis, wrote gay relatives into a country song in 1991, embraced drag culture, backed marriage equality, and defended trans people in her home state — all while refusing to weaponize her Christian faith against queer people.",
    highlights: [
      { id: "common-threads-aids", label: "AIDS documentary" },
      { id: "family-song", label: "\"Family\" (1991)" },
      { id: "drag-queen-following", label: "Drag queen icon" },
      { id: "lgbtq-allyship", label: "Lifetime allyship" },
      { id: "heartstrings-queer-story", label: "Heartstrings episode" },
    ],
    filterHref: "/moments?tag=LGBTQ%2B",
  },
  "Home state": {
    tag: "Home state",
    title: "Standing with Tennessee",
    intro:
      "She never really left the Smokies — she built Dollywood into one of the state's largest employers, seeded the Imagination Library in Sevier County, funded Vanderbilt's COVID research in Nashville, and wrote checks for six months when Gatlinburg burned. Tennessee made her; she kept showing up for it.",
    highlights: [
      { id: "dollywood", label: "Dollywood opens" },
      { id: "imagination-library", label: "Imagination Library" },
      { id: "gatlinburg-relief", label: "Gatlinburg wildfire relief" },
      { id: "covid-vaccine", label: "Vanderbilt COVID fund" },
      { id: "dolly-parton-day", label: "Dolly Parton Day" },
    ],
    filterHref: "/moments?tag=Home%20state",
  },
};

export function getCommunityFilter(
  tag: string | null | undefined,
): CommunityFilterMeta | undefined {
  if (!tag) return undefined;
  return COMMUNITY_FILTERS[tag as CommunityFilterTag];
}
