export function buildAnalysisPrompt(companyName: string, sector: string, searchResults: string): string {
  return `You are a GenAI market intelligence analyst. Analyze the GenAI strategy of ${companyName} (sector: ${sector}) based on the following search results.

Search results:
${searchResults}

Provide a comprehensive analysis in French with the following sections (in this exact order):

## Score GenAI: [X]/100

### Résumé stratégique
[2-3 paragraph executive summary of their GenAI positioning]

### Investissements et signaux clés
[Bullet points of key investments, partnerships, announcements with dates when available]

### Use cases identifiés
[Bullet points of specific GenAI use cases in production or development]

### Avantages concurrentiels
[Their GenAI strengths vs sector competitors]

### Points d'attention
[Risks, gaps, or areas where they could need help — be honest and specific]

### 💡 Opportunités pour Anthropic
[This section is MANDATORY. Write 3-4 concrete paragraphs on how Claude/Anthropic could specifically help this company. Cover:
1. Core-business angle: which specific Claude capability solves which of their challenges
2. Developer & API angle: how their tech teams could use Claude API for internal tools
3. Individual productivity angle: how Claude could augment employees in their specific sector
4. One concrete proposed next step (e.g. workshop, PoC, specific use case to demo)
Be specific, reference their actual AI initiatives and gaps. Do NOT skip this section.]

Be specific, cite sources from the search results when possible, and keep the tone professional and insightful.`;
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
  return `You are a competitive intelligence analyst specializing in GenAI adoption.

IMPORTANT: You are analyzing ${companyName}'s COMPETITORS. ${companyName} is the CLIENT we want to sell to — do NOT write insights about ${companyName} itself. All insights must be about the competitors (${competitors.join(", ")}) and what they reveal as OPPORTUNITIES FOR ${companyName}.

Compare ${companyName} with its competitors: ${competitors.join(", ")} in the ${sector} sector.

Search results:
${searchResults}

Return a JSON object with this structure:
{
  "dimensions": ["Budget IA", "Use cases prod", "Partenariats", "Recrutement IA", "Communication"],
  "companies": [
    {
      "name": "Company Name",
      "scores": [score1, score2, score3, score4, score5],
      "topUseCase": "Their most advanced GenAI use case",
      "aiPartner": "Primary AI partner"
    }
  ],
  "insights": [
    "Competitor insight 1: what a specific competitor is doing and what gap this reveals for ${companyName}",
    "Competitor insight 2: another competitor dynamic relevant to ${companyName}'s positioning",
    "Competitor insight 3: cross-competitor pattern or threat ${companyName} should be aware of"
  ],
  "opportunity": "## Opportunité Anthropic pour ${companyName}\\n\\n**Angle core-métier** : [Specific Claude use case matching ${companyName}'s business]\\n\\n**Angle développeurs & API** : [How ${companyName}'s dev teams could use Claude API to build internal tools, automate workflows, create AI-powered products]\\n\\n**Angle productivité individuelle** : [How Claude could augment each employee in ${companyName} — legal, finance, HR, marketing — specific to their sector]\\n\\n**Angle automatisation & sécurité** : [Process automation, compliance monitoring, anomaly detection relevant to ${companyName}'s context]\\n\\n**Prochaine étape recommandée** : [1 concrete action to propose to ${companyName} this week]"
}

RULES:
- Scores are 0-5. Be objective and base scores on available evidence.
- The first company in the "companies" array MUST be ${companyName}.
- Insights must discuss competitors, NOT ${companyName}.
- The opportunity field should be rich, multi-angle, and formatted in Markdown with the exact structure above.`;
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
