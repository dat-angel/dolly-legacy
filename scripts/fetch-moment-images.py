#!/usr/bin/env python3
"""Download Wikimedia Commons photos for Dolly Legacy moments and emit credits JSON."""

from __future__ import annotations

import html
import json
import os
import re
import urllib.parse
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_DIR = os.path.join(ROOT, "public", "images", "moments")
CREDITS_PATH = os.path.join(ROOT, "src", "content", "image-credits.json")
MOMENT_IMAGES_PATH = os.path.join(ROOT, "src", "content", "moment-images.json")
UA = "DollyLegacyBot/1.0 (https://github.com/dat-angel/dolly-legacy; tribute site curation)"

# Unique Commons files to download. Reused chapter/era photos are referenced by creditKey only.
DOWNLOADS = {
    "appalachian-roots": {
        "file": "File:Parton-cemetery-greenbrier2.jpg",
        "ext": "jpg",
        "alt": "Parton Cemetery in Greenbrier, in the Great Smoky Mountains of East Tennessee",
        "caption": "Family ground in the Smokies — the mountain roots she never left behind",
        "year": 2008,
    },
    "first-song": {
        "file": "File:Happy, Happy Birthday Baby - ad 1965.jpg",
        "ext": "jpg",
        "alt": "1965 Monument Records advertisement for Dolly Parton's single Happy, Happy Birthday Baby",
        "caption": "Monument's new star — writing and recording before Nashville fully knew her name",
        "year": 1965,
    },
    "coat-of-many-colors": {
        "file": "File:Coat of Many Colors coat.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton's Coat of Many Colors on display at the Country Music Hall of Fame",
        "caption": "The coat her mother sewed from rags — now in the Country Music Hall of Fame",
        "year": 2018,
    },
    "jolene-and-iwill": {
        "file": "File:Jolene by Dolly Parton US single side-A.png",
        "ext": "png",
        "alt": "Original U.S. vinyl A-side label for Dolly Parton's single Jolene",
        "caption": "Jolene — recorded the same day as I Will Always Love You",
        "year": 1973,
    },
    "i-will-always-love-you": {
        "file": "File:I will always love you by Dolly Parton 1974 US single.png",
        "ext": "png",
        "alt": "Original U.S. vinyl A-side label for I Will Always Love You by Dolly Parton",
        "caption": "The song she wrote as a farewell — and that the world never let go",
        "year": 1974,
    },
    "nine-to-five-film": {
        "file": "File:Dolly Parton Lily Tomlin Jane Fonda (48591893841).jpg",
        "ext": "jpg",
        "alt": "Dolly Parton, Lily Tomlin, and Jane Fonda together at the Kennedy Center",
        "caption": "The Nine to Five trio — Parton, Tomlin, and Fonda, still a matched set",
        "year": 2000,
    },
    "just-because-woman": {
        "file": "File:Porter Wagoner and Dolly Parton, 1971.png",
        "ext": "png",
        "alt": "Porter Wagoner and Dolly Parton in 1971",
        "caption": "1968's Just Because I'm a Woman — refusing to apologize for living a full life",
        "year": 1971,
    },
    "dollywood": {
        "file": "File:Dolly Parton 2014 Dollywood.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton performing at Dollywood in 2014",
        "caption": "Home ground: Dollywood, the park she built in the mountains that raised her",
        "year": 2014,
    },
    "dollywood-foundation": {
        "file": "File:E-dolly.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton accepting the Woodrow Wilson Award",
        "caption": "The Dollywood Foundation — using fame as a tool for the hometown that needed it",
        "year": 2007,
    },
    "imagination-library-milestone": {
        "file": "File:Dolly Parton in 2000.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton speaking at the National Press Club in Washington, D.C., 2000",
        "caption": "A lifetime of putting books in children's hands — past 200 million and counting",
        "year": 2000,
    },
    "gatlinburg-relief": {
        "file": "File:Dolly Parton 2014 2.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton in a Dollywood Fire Department jacket and helmet, speaking into a microphone",
        "caption": "My People Fund — showing up for Sevier County when the mountains burned",
        "year": 2014,
    },
    "covid-vaccine": {
        "file": "File:Dolly Parton for T-Mobile 2022.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton in a white rhinestone dress holding a smartphone, 2022",
        "caption": "2020 — a million dollars toward a vaccine, given without waiting to be asked",
        "year": 2022,
    },
    "blm-support": {
        "file": "File:Dolly Parton 2023.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton in 2023 from the Peace Like a River music video",
        "caption": "Of course Black lives matter — spoken plainly, from someone who meant it",
        "year": 2023,
    },
    "whitney-royalties": {
        "file": "File:Dolly Parton in Nashville april 2005.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton performing on stage at the Grand Ole Opry in Nashville, 2005",
        "caption": "The song Whitney made global — royalties Dolly redirected toward a new generation",
        "year": 2005,
    },
    "lgbtq-allyship": {
        "file": "File:Dolly Parton at 'Blue Smoke World Tour' in Knoxville.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton performing on the Blue Smoke World Tour in Knoxville, 2014",
        "caption": "Love is love — said from the stage, and lived off it",
        "year": 2014,
    },
    "trans-support": {
        "file": "File:Dolly Parton @ Lanxess-Arena (Köln).jpg",
        "ext": "jpg",
        "alt": "Dolly Parton performing at Lanxess Arena in Cologne, 2014",
        "caption": "You cannot help being trans — the same grace she offers anyone finding themselves",
        "year": 2014,
    },
    "songwriters-hall": {
        "file": "File:2006 Kennedy Center Honors · Dolly Parton.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton at the Kennedy Center Honors reception, 2006",
        "caption": "Honored as a songwriter first — the words before the wigs",
        "year": 2006,
    },
    "dolly-parton-day": {
        "file": "File:Dolly parton grand ole opry.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton singing on stage during a Grand Ole Opry live broadcast in Nashville",
        "caption": "Tennessee's own — a state holiday for the woman who never forgot the holler",
        "year": 2005,
    },
    "cup-of-ambition": {
        "file": "File:Dolly Parton with square red earrings.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton at a recording session around 1989, wearing large square red earrings",
        "caption": "Pour yourself a cup of ambition — then get to work",
        "year": 1989,
    },
    "do-it-on-purpose": {
        "file": "File:Quote by Dolly Parton (Grammy Museum) July 2022.JPG",
        "ext": "jpg",
        "alt": "Wall quote at the Grammy Museum: Find out who you are and do it on purpose — Dolly Parton",
        "caption": "Find out who you are and do it on purpose — in her own words, on the museum wall",
        "year": 2022,
    },
    "storm-of-life": {
        "file": "File:Dolly Parton Great Smoky Mountains Park.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton at Great Smoky Mountains National Park",
        "caption": "Storms make trees take deeper roots — she would know, raised in these mountains",
        "year": 2009,
    },
    "dreamer-dream": {
        "file": "File:Dolly Parton 2000.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton at the National Press Club in Washington, D.C., March 2000",
        "caption": "If you don't dream, you can't have a dream come true",
        "year": 2000,
    },
    "everyone-matters": {
        "file": "File:24S HR DollyParton&Crew 10.jpg",
        "ext": "jpg",
        "alt": "Dolly Parton with the Coat of Many Colors film crew at the Movieguide Awards",
        "caption": "Everybody should be treated with respect — a rule she applied to casts, crews, and crowds",
        "year": 2016,
    },
}

REUSES = {
    "porter-wagoner": {
        "creditKey": "chapters/origins",
        "alt": "Porter Wagoner and Dolly Parton in 1969",
        "caption": "The Porter Wagoner Show — the weekly stage that introduced her to America",
        "year": 1969,
    },
    "nine-to-five": {
        "creditKey": "eras/1980s",
        "alt": "Carol Burnett and Dolly Parton in a 1980 publicity photograph",
        "caption": "Working 9 to 5 — the anthem that walked out of a typewriter and into offices everywhere",
        "year": 1980,
    },
    "business-autonomy": {
        "creditKey": "chapters/music",
        "alt": "Dolly Parton publicity portrait, 1977",
        "caption": "Owning the masters — creative control as a business decision, not a slogan",
        "year": 1977,
    },
    "imagination-library": {
        "creditKey": "eras/1990s",
        "alt": "Dolly Parton at the National Press Club, Washington D.C.",
        "caption": "The Imagination Library begins — a book a month, in her father's honor",
        "year": 1995,
    },
    "covid-second-donation": {
        "creditKey": "chapters/standing",
        "alt": "Dolly Parton at the Peabody Awards, 2022",
        "caption": "A second gift for pediatric infectious disease research — because once wasn't the point",
        "year": 2022,
    },
}


def api(params: dict) -> dict:
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.loads(response.read().decode())


def strip_html(value: str) -> str:
    cleaned = re.sub(r"<[^>]+>", "", value or "")
    return html.unescape(cleaned).replace("\n", " ").strip()


def fetch_info(title: str) -> dict:
    data = api(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|mime",
            "iiurlwidth": 1200,
            "format": "json",
        }
    )
    page = next(iter(data["query"]["pages"].values()))
    if "imageinfo" not in page:
        raise SystemExit(f"Missing imageinfo for {title}")
    info = page["imageinfo"][0]
    meta = info.get("extmetadata", {})
    return {
        "commonsTitle": title.replace("File:", ""),
        "commonsUrl": info.get("descriptionurl") or f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title)}",
        "license": strip_html(meta.get("LicenseShortName", {}).get("value", "")),
        "author": strip_html(meta.get("Artist", {}).get("value", "Unknown")),
        "description": strip_html(meta.get("ImageDescription", {}).get("value", ""))[:400],
        "download": (info.get("thumburl") or info.get("url", "")).split("?")[0],
        "fullUrl": info.get("url", "").split("?")[0],
    }


def download(url: str, dest: str) -> None:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as response, open(dest, "wb") as handle:
        handle.write(response.read())


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(CREDITS_PATH, encoding="utf-8") as handle:
        credits = json.load(handle)

    moment_images: dict[str, dict] = {}

    for moment_id, spec in DOWNLOADS.items():
        print(f"fetch {moment_id}: {spec['file']}")
        info = fetch_info(spec["file"])
        local_name = f"{moment_id}.{spec['ext']}"
        dest = os.path.join(OUT_DIR, local_name)
        download(info["download"] or info["fullUrl"], dest)
        key = f"moments/{moment_id}"
        credits[key] = {
            "commonsTitle": info["commonsTitle"],
            "commonsUrl": info["commonsUrl"],
            "license": info["license"],
            "author": info["author"],
            "description": info["description"],
            "localPath": f"/images/moments/{local_name}",
        }
        moment_images[moment_id] = {
            "alt": spec["alt"],
            "caption": spec["caption"],
            "year": spec["year"],
            "creditKey": key,
        }
        print(f"  saved {dest} ({os.path.getsize(dest)} bytes) {info['license']}")

    for moment_id, spec in REUSES.items():
        moment_images[moment_id] = {
            "alt": spec["alt"],
            "caption": spec["caption"],
            "year": spec["year"],
            "creditKey": spec["creditKey"],
        }

    with open(CREDITS_PATH, "w", encoding="utf-8") as handle:
        json.dump(credits, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    with open(MOMENT_IMAGES_PATH, "w", encoding="utf-8") as handle:
        json.dump({"moments": moment_images}, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    print(f"Wrote {len(moment_images)} moment image mappings")


if __name__ == "__main__":
    main()
