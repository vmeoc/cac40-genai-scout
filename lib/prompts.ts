export function buildAnalysisPrompt(companyName: string, sector: string, searchResults: string): string {
  return `You are a GenAI market intelligence analyst. Analyze ${companyName} (sector: ${sector}).

IMPORTANT: Be concise. Total response must stay under 1800 tokens.

Search results:
${searchResults}

Write in French. Follow this structure exactly:

## Score GenAI: [X]/100

### Résumé stratégique
[2 short paragraphs max — key positioning and top 2-3 facts with sources]

### 💡 Opportunités pour Anthropic
[4 numbered axes, each 2-3 sentences + one concrete proposition. No padding.]

1. **Axe Core-Métier** : [2-3 sentences on the specific Claude capability addressing their main challenge. 1-sentence concrete proposition.]

2. **Axe Developer & API** : [2-3 sentences on how dev/data teams could use Claude API. 1-sentence deliverable.]

3. **Axe Productivité Individuelle** : [2-3 sentences on employee augmentation specific to their sector roles.]

4. **Prochaine étape** : [1-2 sentences: one concrete action, relevant contact name, 2-week timeline.]

### Investissements & Use cases clés
[5 bullet points max covering key investments and confirmed use cases with dates]

### Points d'attention
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
  "dimensions": ["Budget IA", "Use cases prod", "Partenariats", "Recrutement IA", "Communication"],
  "companies": [
    {"name": "COMPANY_NAME", "scores": [3,3,3,3,3], "topUseCase": "main use case", "aiPartner": "main partner"},
    {"name": "COMPETITOR_NAME", "scores": [2,2,2,2,2], "topUseCase": "main use case", "aiPartner": "main partner"}
  ],
  "insights": [
    "1 sentence on what competitor X does and what gap it reveals for COMPANY_NAME",
    "1 sentence on another competitor dynamic",
    "1 sentence on cross-competitor pattern"
  ],
  "opportunity": "**Core-metier** : 2 sentences.\\n\\n**Dev & API** : 2 sentences.\\n\\n**Productivite** : 2 sentences.\\n\\n**Prochaine etape** : 1 concrete action."
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

Create a compelling demo proposal in French with this structure:

## Démo proposée: [Creative memorable title]

### Concept en 30 secondes
[One powerful sentence describing the demo]

### Architecture de la démo
[3-4 concrete steps showing how Claude would be used, with specific Claude API features]
Étape 1: [Input] → Claude [specific capability] → [Output]
Étape 2: ...

### ROI estimé
- Temps de traitement: [Before] → [After with Claude]
- Économies potentielles: [Estimated annual savings]
- Délai de déploiement: [Timeline from PoC to production]

### Pourquoi Claude plutôt que GPT-4?
[3 specific technical reasons relevant to this use case: context window, safety, multilingual, etc.]

### Prochaines étapes
1. [First concrete step — e.g. "Workshop technique de 2h avec vos équipes data"]
2. [Second step — PoC timeline]
3. [Third step — production path]

Keep it concise, specific, and exciting. Focus on Claude's unique strengths for this exact use case.`;
}

export function buildEmailPrompt(companyName: string, contactName: string, contactTitle: string, useCase: string, demoDescription: string): string {
  return `Write a professional prospecting email in French to ${contactName}, ${contactTitle} at ${companyName}.

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
