export type BusinessInput = { name: string; website: string; description: string };

export type BusinessDetails = BusinessInput & {
  summary: string;
  audience: string[];
  keywords: string[];
  competitors: string[];
};

export const analyzeSteps = [
  "Loading website",
  "Crawling pages",
  "Reading product & pricing",
  "Understanding your audience",
  "Checking competitors",
  "Building customer profile",
];

/**
 * Placeholder analysis. Replace with a real crawl + AI call
 * (e.g. a server action) when the backend is ready.
 */
export async function analyzeBusiness(input: BusinessInput): Promise<BusinessDetails> {
  return {
    ...input,
    summary: input.description || `${input.name} — summary will come from the website crawl.`,
    audience: ["Founders", "Marketing teams", "Small businesses"],
    keywords: ["lead generation", "outreach", "sales"],
    competitors: ["Competitor A", "Competitor B"],
  };
}
