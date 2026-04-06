export function buildAnalysisPrompt(companyName: string, sector: string, searchResults: string): string {
  return `You are a GenAI market intelligence analyst. Analyze ${companyName} (sector: ${sector}).

IMPORTANT: Be concise. Total response must stay under 1800 tokens. Write in English.

Search results:
${searchResults}

Follow this structure exactly:

## GenAI Score: [X]/100

### Strategic Summary
[2 short paragraphs max — key positioning and top 2-3 facts with sources]

### 💡 Anthropic Opportunities
[4 numbered axes, each 2-3 sentences + one concrete proposition. No padding.]

1. **Core Business** : [2-3 sentences on the specific Claude capability addressing their main challenge. 1-sentence concrete proposition.]

2. **Developer & API** : [2-3 sentences on how dev/data teams could use Claude API. 1-sentence deliverable.]

3. **Individual Productivity** : [2-3 sentences on employee augmentation specific to their sector roles.]

4. **Next Step** : [1-2 sentences: one concrete action, relevant contact name, 2-week timeline.]

### Key Investments & Use Cases
[5 bullet points max covering key investments and confirmed use cases with dates]

### Watch Points
[3 bullet points max — key gaps and risks for their GenAI strategy]

Be specific, cite sources when available, stay professional and insightful.`;
}

export function buildContactsPrompt(companyName: string, sector: string, searchResults: string, knownLeader?: string, knownLeaderTitle?: string): string {
  const knownLeaderHint = knownLeader
    ? `NOTE: We already know that "${knownLeader}" (${knownLeaderTitle || "Executive"}) is a key AI decision-maker at ${companyName}. Include them if you find corroborating information, and add any additional contacts you discover.`
    : "";

  return `You are a sales intelligence analyst. Based on the following search results about ${companyName}, identify key decision-makers for an AI/GenAI sales conversation.

${knownLeaderHint}

Search results:
${searchResults}

Return a JSON array of contacts found (only publicly available information). Format:
{
  "contacts": [
    {
      "name": "Full Name",
      "title": "Job Title",
      "department": "Department",
      "confidence": "high|medium|low",
      "source": "Source of information (e.g. LinkedIn, company website, press article)",
      "talkingPoints": ["specific AI initiative they mentioned or are responsible for", "relevant quote or context"]
    }
  ]
}

Focus on: CDO, CTO, Chief AI Officer, Head of AI, VP Digital, Director of Data & AI, etc.
Only include people with clear relevance to AI/GenAI decision-making.
Include 3-6 contacts if possible. If you find ${knownLeader || "the known leader"}, include them.`;
}

export function buildCompetitorsPrompt(companyName: string, sector: string, competitors: string[], searchResults: string): string {
  const competitorList = competitors.join(", ");
  const jsonTemplate = `{
  "dimensions": ["AI Budget", "Prod use cases", "Partnerships", "Recruiting", "Communication"],
  "companies": [
    {"name": "COMPANY_NAME", "scores": [3,3,3,3,3], "topUseCase": "main use case", "aiPartner": "main partner"},
    {"name": "COMPETITOR_NAME", "scores": [2,2,2,2,2], "topUseCase": "main use case", "aiPartner": "main partner"}
  ],
  "insights": [
    "1 sentence on what competitor X does and what gap it reveals for COMPANY_NAME",
    "1 sentence on another competitor dynamic",
    "1 sentence on cross-competitor pattern"
  ],
  "opportunity": "**Core Business** : 2 sentences.\\n\\n**Dev & API** : 2 sentences.\\n\\n**Productivity** : 2 sentences.\\n\\n**Next step** : 1 concrete action."
}`;

  return `You are a competitive intelligence analyst for GenAI adoption.
Compare ${companyName} vs ${competitorList} in the ${sector} sector.

IMPORTANT:
- Keep entire JSON response under 1000 tokens. Use short strings.
- Do NOT write insights about ${companyName} itself — insights must discuss competitors only.
- First company in the array MUST be ${companyName}.
- Return ONLY valid JSON, no text outside the JSON object.

Search results:
${searchResults}

Return JSON matching this structure (replace placeholder values with real data):
${jsonTemplate}

Scores are 0-5 based on evidence. Valid JSON only, no trailing commas, no comments.`;
}

export function buildDemoPrompt(companyName: string, sector: string, topUseCase: string, contactName: string): string {
  return `You are an Anthropic solutions engineer creating a personalized demo proposal.

Company: ${companyName} (${sector})
Target use case: ${topUseCase}
Key contact: ${contactName}

Create a compelling demo proposal in English with this structure:

## Proposed Demo: [Creative memorable title]

### 30-second concept
[One powerful sentence describing the demo]

### Demo architecture
[3-4 concrete steps showing how Claude would be used, with specific Claude API features]
Step 1: [Input] → Claude [specific capability] → [Output]
Step 2: ...

### Estimated ROI
- Processing time: [Before] → [After with Claude]
- Potential savings: [Estimated annual savings]
- Deployment timeline: [Timeline from PoC to production]

### Why Claude over GPT-4?
[3 specific technical reasons relevant to this use case: context window, safety, multilingual, etc.]

### Next steps
1. [First concrete step — e.g. "2-hour technical workshop with your data teams"]
2. [Second step — PoC timeline]
3. [Third step — production path]

Keep it concise, specific, and exciting. Focus on Claude's unique strengths for this exact use case.`;
}

export function buildEmailPrompt(companyName: string, contactName: string, contactTitle: string, useCase: string, demoDescription: string): string {
  return `Write a professional prospecting email in English to ${contactName}, ${contactTitle} at ${companyName}.

Context:
- They are working on: ${useCase}
- Demo we're proposing: ${demoDescription}
- Sender: [Your Name], Solutions Engineer at Anthropic

The email should be:
- Subject line that creates urgency/curiosity (max 60 chars)
- 3 short paragraphs (total max 150 words)
- Personalized to their specific AI initiative
- Clear CTA: 20-minute demo call

Format:
SUBJECT: [subject line]

[Email body starting with their name]

Make it feel like a warm, expert outreach - not a cold sales pitch. Reference something specific about their AI journey at ${companyName}.`;
}
