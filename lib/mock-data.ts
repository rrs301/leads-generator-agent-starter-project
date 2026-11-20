export type Platform = "web" | "x" | "linkedin" | "instagram" | "reddit";

export type Lead = {
  id: string;
  name: string;
  role: string;
  company: string;
  platform: Platform;
  score: number;
  signal: string;
  status: "New" | "Contacted" | "Replied";
  email: string;
};

export const leads: Lead[] = [
  { id: "1", name: "Priya Shah", role: "Founder", company: "Loopwise", platform: "x", score: 94, signal: "Tweeted: “need a better way to find B2B leads”", status: "New", email: "priya@loopwise.io" },
  { id: "2", name: "Marcus Lee", role: "Head of Growth", company: "Northbeam", platform: "linkedin", score: 89, signal: "Hiring 3 SDRs this month", status: "Contacted", email: "marcus@northbeam.co" },
  { id: "3", name: "Sofia Alvarez", role: "CEO", company: "Pixelcraft", platform: "instagram", score: 82, signal: "Launched new agency services", status: "Replied", email: "sofia@pixelcraft.studio" },
  { id: "4", name: "Daniel Kim", role: "CTO", company: "Stackly", platform: "reddit", score: 77, signal: "Asked r/SaaS for outreach tools", status: "New", email: "dan@stackly.dev" },
  { id: "5", name: "Aisha Khan", role: "Marketing Lead", company: "Brightdesk", platform: "web", score: 71, signal: "Pricing page mentions “sales team”", status: "Contacted", email: "aisha@brightdesk.com" },
  { id: "6", name: "Tom Becker", role: "Co-founder", company: "Shipfast", platform: "x", score: 66, signal: "Engaged with competitor post", status: "New", email: "tom@shipfast.so" },
];

export const stats = [
  { label: "Leads found", value: "1,284", delta: "+18%", spark: [4, 6, 5, 8, 7, 10, 12] },
  { label: "Hot leads", value: "212", delta: "+9%", spark: [2, 3, 3, 4, 6, 5, 7] },
  { label: "Emails found", value: "846", delta: "+24%", spark: [3, 4, 6, 5, 7, 9, 10] },
  { label: "Replies", value: "64", delta: "+12%", spark: [1, 2, 2, 3, 3, 4, 5] },
];

export const weekly = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 168 },
  { day: "Wed", value: 142 },
  { day: "Thu", value: 210 },
  { day: "Fri", value: 186 },
  { day: "Sat", value: 98 },
  { day: "Sun", value: 132 },
];

export const sources: { platform: Platform; label: string; value: number }[] = [
  { platform: "x", label: "X", value: 38 },
  { platform: "linkedin", label: "LinkedIn", value: 27 },
  { platform: "web", label: "Web", value: 18 },
  { platform: "reddit", label: "Reddit", value: 10 },
  { platform: "instagram", label: "Instagram", value: 7 },
];

export const scanSteps = [
  "Crawling website pages",
  "Reading product & pricing",
  "Understanding your audience",
  "Mapping competitors",
  "Building ideal customer profile",
];

export const businessBrain = {
  name: "Acme Analytics",
  url: "acme.io",
  pitch: "Product analytics for fast-moving SaaS teams.",
  audience: ["SaaS founders", "Growth leads", "Product managers"],
  keywords: ["product analytics", "retention", "churn", "funnels"],
  competitors: ["Mixpanel", "Amplitude", "PostHog"],
};

export const agentFeed = [
  { from: "agent" as const, text: "Hey 👋 I'm Scout, your lead agent. Add your business and I'll start hunting." },
  { from: "agent" as const, text: "Tip: connect X or LinkedIn so I can run deep social searches." },
];
