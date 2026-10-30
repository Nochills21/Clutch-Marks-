// Seed OxfordAQA International GCSE Chemistry (9202) into the live database.
//
// Phase 4, item 1: the first non-Cambridge, non-Edexcel science qualification,
// built from the board's specification rather than from memory. Generated once
// by .freebuff-tmp/oxfordaqa/extract-9202.cjs, which reads the official PDF and
// emits the section/subsection headings verbatim; only the two headings the
// spec prints in odd casing are normalised (3.6.4, 3.8.3).
//
//   node .freebuff/seed-oxfordaqa-9202.cjs            # writes the .sql, changes nothing
//   node .freebuff/seed-oxfordaqa-9202.cjs --apply    # runs it through the Management API
//
// Idempotent on the natural keys the schema already has: subjects.slug,
// subject_levels(subject_id, level), topics(subject_level_id, slug) and
// syllabus_statements(board, spec_code, code).
//
// The subject and its level are inserted **inactive**: a qualification with no
// notes, no papers and no questions must not appear in the catalogue, the
// sitemap or a student's subject picker. Flip is_active once the content gates
// pass (see docs/oxfordaqa-9202.md).
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "seed-oxfordaqa-9202.sql");

const SPEC_URL =
  "https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf";
const SPEC_VERSION = "6.2";
const SYLLABUS_YEARS = "2018 onwards";
const BOARD = "OxfordAQA";
const SPEC_CODE = "9202";
const SUBJECT_SLUG = "chemistry-oxfordaqa";

const SUBJECT = {
  name: "Chemistry (OxfordAQA)",
  description:
    "OxfordAQA International GCSE Chemistry (9202): atomic structure and bonding, chemical changes and analysis, quantitative chemistry, rates, energy changes and organic chemistry.",
  icon: "BookOpen",
  color: "primary",
  sort_order: 21,
};

const LEVEL = {
  level: "IGCSE",
  description: "OxfordAQA International GCSE Chemistry 9202",
  sort_order: 1,
};

const STRUCTURE = [
  {
    "area": "3.1",
    "name": "Atomic Structure and the Periodic Table",
    "slug": "atomic-structure-and-the-periodic-table",
    "description": "Atoms are the building blocks of all materials and knowledge of atomic structure and the periodic table are fundamental to the learning associated with all the following sections.",
    "sort_order": 1,
    "statements": [
      {
        "code": "3.1.1",
        "title": "Solids, liquids and gases",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.1.2",
        "title": "A simple model of the atom",
        "sort_order": 2,
        "chemOnly": false
      },
      {
        "code": "3.1.3",
        "title": "The Periodic Table",
        "sort_order": 3,
        "chemOnly": false
      }
    ]
  },
  {
    "area": "3.2",
    "name": "Structure, Bonding and the Properties of Matter",
    "slug": "structure-bonding-and-the-properties-of-matter",
    "description": "This section examines how atoms interact to form chemical bonds and how these bonds determine the properties and uses of",
    "sort_order": 2,
    "statements": [
      {
        "code": "3.2.1",
        "title": "Chemical bonds: ionic, covalent and metallic",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.2.2",
        "title": "How bonding and structure are related to the properties of substances",
        "sort_order": 2,
        "chemOnly": false
      },
      {
        "code": "3.2.3",
        "title": "Structure and bonding of carbon",
        "sort_order": 3,
        "chemOnly": false
      },
      {
        "code": "3.2.4",
        "title": "Nanoparticles",
        "sort_order": 4,
        "chemOnly": true
      }
    ]
  },
  {
    "area": "3.3",
    "name": "Chemical Changes",
    "slug": "chemical-changes",
    "description": "The group of materials known as metals are explored in more detail, including how atoms are rearranged to form new",
    "sort_order": 3,
    "statements": [
      {
        "code": "3.3.1",
        "title": "Metals",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.3.2",
        "title": "Electrolysis",
        "sort_order": 2,
        "chemOnly": false
      }
    ]
  },
  {
    "area": "3.4",
    "name": "Chemical Analysis",
    "slug": "chemical-analysis",
    "description": "This section focuses on developing practical skills in chemistry which identify substances, and reinforces the idea of a pure substance as consisting of one substance only.",
    "sort_order": 4,
    "statements": [
      {
        "code": "3.4.1",
        "title": "Purity and chromatography",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.4.2",
        "title": "Identification of common gases",
        "sort_order": 2,
        "chemOnly": true
      },
      {
        "code": "3.4.3",
        "title": "Identification of ions",
        "sort_order": 3,
        "chemOnly": false
      }
    ]
  },
  {
    "area": "3.5",
    "name": "Acids, Bases and Salts",
    "slug": "acids-bases-and-salts",
    "description": "This section looks in greater detail at the properties and applications of acids and bases.",
    "sort_order": 5,
    "statements": [
      {
        "code": "3.5.1",
        "title": "The properties of acids and bases",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.5.2",
        "title": "Preparation of salts",
        "sort_order": 2,
        "chemOnly": false
      }
    ]
  },
  {
    "area": "3.6",
    "name": "Quantitative Chemistry",
    "slug": "quantitative-chemistry",
    "description": "Conservation of mass is a key concept in chemistry and this is developed during this section. This is then used to develop a quantitative approach to chemical reactions, leading to many opportunities to develop experimental skills through practical",
    "sort_order": 6,
    "statements": [
      {
        "code": "3.6.1",
        "title": "Conservation of mass including the quantitative interpretation of chemical equations",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.6.2",
        "title": "Use of amount of substance in relation to masses of pure substances",
        "sort_order": 2,
        "chemOnly": false
      },
      {
        "code": "3.6.3",
        "title": "The mole concept",
        "sort_order": 3,
        "chemOnly": false
      },
      {
        "code": "3.6.4",
        "title": "Molar concentrations",
        "sort_order": 4,
        "chemOnly": false
      }
    ]
  },
  {
    "area": "3.7",
    "name": "Trends within the Periodic Table",
    "slug": "trends-within-the-periodic-table",
    "description": "This section looks to both describe and explain trends within the periodic table along with more detailed knowledge and",
    "sort_order": 7,
    "statements": [
      {
        "code": "3.7.1",
        "title": "Group properties",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.7.2",
        "title": "Transition metals",
        "sort_order": 2,
        "chemOnly": true
      }
    ]
  },
  {
    "area": "3.8",
    "name": "The Rate and Extent of Chemical Change",
    "slug": "the-rate-and-extent-of-chemical-change",
    "description": null,
    "sort_order": 8,
    "statements": [
      {
        "code": "3.8.1",
        "title": "Rate of reaction",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.8.2",
        "title": "Factors affecting equilibrium",
        "sort_order": 2,
        "chemOnly": true
      },
      {
        "code": "3.8.3",
        "title": "Production of ammonia and sulfuric acid",
        "sort_order": 3,
        "chemOnly": true
      },
      {
        "code": "3.8.4",
        "title": "Redox reactions",
        "sort_order": 4,
        "chemOnly": true
      }
    ]
  },
  {
    "area": "3.9",
    "name": "Energy Changes",
    "slug": "energy-changes",
    "description": "This section highlights that chemical reactions involve changes which require energy to make them happen. This is a fundamental concept that links to key ideas in biology and physics. The section also involves developing mathematical skills",
    "sort_order": 9,
    "statements": [
      {
        "code": "3.9.1",
        "title": "Exothermic and endothermic reactions",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.9.2",
        "title": "Calculating and explaining energy change",
        "sort_order": 2,
        "chemOnly": false
      },
      {
        "code": "3.9.3",
        "title": "Chemical cells and fuel cells",
        "sort_order": 3,
        "chemOnly": true
      }
    ]
  },
  {
    "area": "3.10",
    "name": "Organic Chemistry",
    "slug": "organic-chemistry",
    "description": null,
    "sort_order": 10,
    "statements": [
      {
        "code": "3.10.1",
        "title": "Carbon compounds as fuels",
        "sort_order": 1,
        "chemOnly": false
      },
      {
        "code": "3.10.2",
        "title": "Synthetic and naturally occurring polymers",
        "sort_order": 2,
        "chemOnly": false
      },
      {
        "code": "3.10.3",
        "title": "Organic compounds - their structure and reactions",
        "sort_order": 3,
        "chemOnly": false
      }
    ]
  }
];

/** Dollar-quote a value so apostrophes and newlines need no escaping. */
const lit = (value) => `$lit$${value}$lit$`;

const statements = STRUCTURE.flatMap((section) => section.statements);
const expected = { topics: STRUCTURE.length, statements: statements.length };

const sql = [
  `-- OxfordAQA International GCSE Chemistry (9202) — specification v${SPEC_VERSION}`,
  `-- ${SPEC_URL}`,
  `-- ${expected.topics} topics, ${expected.statements} syllabus statements. Inactive until content lands.`,
  `insert into public.subjects (name, slug, description, icon, color, sort_order, is_active)
values (${lit(SUBJECT.name)}, ${lit(SUBJECT_SLUG)}, ${lit(SUBJECT.description)}, ${lit(SUBJECT.icon)}, ${lit(SUBJECT.color)}, ${SUBJECT.sort_order}, false)
on conflict (slug) do update set name = excluded.name, description = excluded.description, updated_at = now();`,
  `insert into public.subject_levels (subject_id, level, description, sort_order, is_active)
select s.id, ${lit(LEVEL.level)}, ${lit(LEVEL.description)}, ${LEVEL.sort_order}, false
from public.subjects s where s.slug = ${lit(SUBJECT_SLUG)}
on conflict (subject_id, level) do update set description = excluded.description, updated_at = now();`,
];

// One statement per topic: the topic upsert and its statements land atomically,
// and a re-run updates in place rather than duplicating.
for (const section of STRUCTURE) {
  const values = section.statements
    .map((s) => `(${lit(s.code)}, ${lit(s.title)}, ${lit(section.area)}, ${s.sort_order})`)
    .join(",\n      ");
  sql.push(`with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = ${lit(SUBJECT_SLUG)} and sl.level = ${lit(LEVEL.level)}
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, ${lit(section.name)}, ${lit(section.slug)}, ${section.description ? lit(section.description) : "null"}, ${section.sort_order} from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select ${lit(BOARD)}, ${lit(SPEC_CODE)}, ${lit(LEVEL.level)}, v.code, v.title, v.area, 'both', l.id, t.id,
       ${lit(SPEC_URL)}, ${lit(SYLLABUS_YEARS)}, v.sort_order
from l, t, (values
      ${values}
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();`);
}

const body = sql.join("\n\n") + "\n";
fs.writeFileSync(OUT, body);
console.log(`wrote ${path.relative(ROOT, OUT)} — ${sql.length} statements, ${expected.topics} topics, ${expected.statements} syllabus rows`);

if (!process.argv.includes("--apply")) {
  console.log("dry run: nothing sent. Re-run with --apply to write.");
  process.exit(0);
}

const TOKEN = (fs.readFileSync(path.join(ROOT, ".freebuff/get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const req = https.request(
  {
    hostname: "api.supabase.com",
    path: `/v1/projects/${REF}/database/query`,
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  },
  (res) => {
    let d = "";
    res.on("data", (c) => (d += c));
    res.on("end", () => {
      console.log(`status ${res.statusCode}`);
      console.log(d.slice(0, 800));
      process.exit(res.statusCode === 200 || res.statusCode === 201 ? 0 : 1);
    });
  },
);
req.on("error", (e) => {
  console.error(e.message);
  process.exit(1);
});
req.end(JSON.stringify({ query: body }));
