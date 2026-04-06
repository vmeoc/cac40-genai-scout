export function buildAnalysisPrompt(companyName: string, sector: string, searchResults: string): string {
  return `You are a GenAI market intelligence analyst. Analyze the GenAI strategy of ${companyName} (sector: ${sector}) based on the following search results.

Search results:
${searchResults}

Provide a comprehensive analysis in French with the following sections:

## Score GenAI: [X]/100

### Résumé stratégique
[2-3 paragraph executive summary of their GenAI positioning]

### Investissements et signaux clés
[Bullet points of key investments, partnerships, announcements with dates]

### Use cases identifiés
[Bullet points of specific GenAI use cases in production or development]

### Avantages concurrentiels
[Their GenAI strengths vs competitors]

### Points d'attention
[Risks, gaps, or areas where they could need help]

### Recommandation Anthropic
[1 paragraph on how Claude/Anthropic could specifically help this company]

Be specific, cite sources from the search results when possible, and keep the tone professional and insightful.`;
}

export function buildContactsPrompt(companyName: string, sector: string, searchResults: string): string {
  return `You are a sales intelligence analyst. Based on the following search results about ${companyName}, identify key decision-makers for an AI/GenAI sales conversation.

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
      "source": "Source of information",
      "talkingPoints": ["relevant AI initiative they mentioned or are responsible for"]
    }
  ]
}

Focus on: CDO, CTO, Chief AI Officer, Head of AI, VP Digital, Director of Data & AI, etc.
Only include people with clear relevance to AI/GenAI decision-making.`;
}

export function buildCompetitorsPrompt(companyName: string, sector: string, competitors: string[], searchResults: string): string {
  return `You are a competitive intelligence analyst specializing in GenAI adoption. Compare ${companyName} with its competitors: ${competitors.join(", ")} in the ${sector} sector.

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
  "insights": ["Key competitive insight 1", "Key competitive insight 2", "Key competitive insight 3"],
  "opportunity": "Specific opportunity for Anthropic/Claude at ${companyName} based on competitive gaps"
}

Scores are 0-5. Be objective and base scores on available evidence.`;
}

export function buildDemoPrompt(companyName: string, sector: string, topUseCase: string, contactName: string): string {
  return `You are an Anthropic solutions engineer creating a personalized demo proposal. 

Company: ${companyName} (${sector})
Target use case: ${topUseCase}
Key contact: ${contactName}

Create a compelling demo proposal in French with this structure:

## Démo proposée: [Title]

### Concept en 30 secondes
[One powerful sentence describing the demo]

### Architecture de la démo
[3-4 steps showing how Claude would be used, with specific API features highlighted]
Étape 1: [Input] → Claude [specific capability] → [Output]
Étape 2: ...

### ROI estimé
- Temps de traitement: [Before] → [After with Claude]
- Économies: [Estimated]
- Délai de déploiement: [Timeline]

### Pourquoi Claude plutôt que GPT-4?
[3 specific technical reasons relevant to this use case]

### Prochaines étapes
[3 concrete next steps to move forward]

Keep it concise, specific, and exciting. Focus on Claude's unique strengths.`;
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

[Email body]

Make it feel like a warm, expert outreach - not a cold sales pitch. Reference something specific about their AI journey.`;
}
