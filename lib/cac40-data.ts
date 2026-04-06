export type UseCaseStatus = "production" | "pilot" | "announced";

export interface UseCase {
  title: string;
  status: UseCaseStatus;
  department: string;
  description: string;
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  sectorIcon: string;
  description: string;
  score: number;
  trend: number;
  useCaseCount: number;
  aiPartners: string[];
  knownLeader?: string;
  knownLeaderTitle?: string;
  competitors: string[];
  useCases: UseCase[];
  accentColor: string;
}

export const CAC40_COMPANIES: Company[] = [
  {
    "id": "capgemini",
    "name": "Capgemini",
    "sector": "IT & Conseil",
    "sectorIcon": "💻",
    "description": "Leader mondial des services numériques et de la transformation digitale.",
    "score": 94,
    "trend": 31,
    "useCaseCount": 8,
    "aiPartners": [
      "Microsoft",
      "Google",
      "AWS",
      "Mistral",
      "OpenAI"
    ],
    "knownLeader": "Aiman Ezzat",
    "knownLeaderTitle": "CEO & AI Champion",
    "competitors": [
      "publicis-groupe",
      "dassault-systemes"
    ],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "Plateforme GenAI pour clients",
        "status": "production",
        "department": "Conseil",
        "description": "Suite d'outils GenAI déployée chez +500 clients enterprise."
      },
      {
        "title": "Génération de code automatisée",
        "status": "production",
        "department": "IT",
        "description": "IA de génération de code réduisant le temps de dev de 40%."
      },
      {
        "title": "Résumé de documents RFP",
        "status": "production",
        "department": "Commercial",
        "description": "Claude analyse et résume automatiquement les appels d'offres."
      },
      {
        "title": "Test automatisé IA",
        "status": "production",
        "department": "QA",
        "description": "Génération automatique de cas de test avec LLM."
      },
      {
        "title": "GenAI pour transformation ERP",
        "status": "pilot",
        "department": "SAP",
        "description": "Accélération des migrations SAP S/4HANA par GenAI."
      }
    ]
  },
  {
    "id": "publicis-groupe",
    "name": "Publicis Groupe",
    "sector": "Médias & Pub",
    "sectorIcon": "📢",
    "description": "Premier groupe de communication mondial avec une stratégie IA agressive.",
    "score": 89,
    "trend": 28,
    "useCaseCount": 7,
    "aiPartners": [
      "Microsoft",
      "OpenAI",
      "Mistral"
    ],
    "knownLeader": "Arthur Sadoun",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": [
      "vivendi",
      "capgemini"
    ],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Marcel AI — plateforme interne",
        "status": "production",
        "department": "RH & Opérations",
        "description": "IA connectant 100k+ employés, projets et compétences."
      },
      {
        "title": "Génération de contenus publicitaires",
        "status": "production",
        "department": "Créatif",
        "description": "Claude génère des variantes d'annonces à grande échelle."
      },
      {
        "title": "CoreAI — données first-party",
        "status": "production",
        "department": "Data",
        "description": "Plateforme d'activation IA sur données propriétaires."
      },
      {
        "title": "Personnalisation campagnes",
        "status": "production",
        "department": "Media",
        "description": "IA pour adapter les messages aux segments micro-ciblés."
      },
      {
        "title": "IA créative pour marques luxe",
        "status": "pilot",
        "department": "Luxe",
        "description": "LLM générant des concepts créatifs pour clients premium."
      }
    ]
  },
  {
    "id": "sanofi",
    "name": "Sanofi",
    "sector": "Pharma & Santé",
    "sectorIcon": "💊",
    "description": "Pionnier de l'IA dans la pharmacie, avec un investissement massif annoncé.",
    "score": 86,
    "trend": 24,
    "useCaseCount": 7,
    "aiPartners": [
      "OpenAI",
      "Aily Labs",
      "AWS"
    ],
    "knownLeader": "Houman Ashrafian",
    "knownLeaderTitle": "Chief Medical Officer & AI Lead",
    "competitors": [
      "essilorluxottica",
      "eurofins-scientific"
    ],
    "accentColor": "#EC4899",
    "useCases": [
      {
        "title": "Plai — plateforme IA propriétaire",
        "status": "production",
        "department": "R&D",
        "description": "Plateforme GenAI déployée pour 400+ use cases internes."
      },
      {
        "title": "Accélération découverte médicaments",
        "status": "production",
        "department": "R&D",
        "description": "LLM analyse la littérature scientifique pour identifier candidats."
      },
      {
        "title": "Résumé rapports cliniques",
        "status": "production",
        "department": "Médical",
        "description": "Synthèse automatique de milliers de pages d'essais cliniques."
      },
      {
        "title": "Optimisation essais cliniques",
        "status": "pilot",
        "department": "Clinical",
        "description": "IA pour le design et le recrutement des essais."
      },
      {
        "title": "Médecine personnalisée",
        "status": "announced",
        "department": "Precision Med",
        "description": "Traitement individualisé guidé par GenAI."
      }
    ]
  },
  {
    "id": "dassault-systemes",
    "name": "Dassault Systèmes",
    "sector": "IT & Conseil",
    "sectorIcon": "💻",
    "description": "Plateforme 3DEXPERIENCE intégrant nativement l'IA pour la simulation.",
    "score": 83,
    "trend": 19,
    "useCaseCount": 6,
    "aiPartners": [
      "NVIDIA",
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Pascal Daloz",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "capgemini",
      "stmicroelectronics"
    ],
    "accentColor": "#3B82F6",
    "useCases": [
      {
        "title": "IA dans 3DEXPERIENCE",
        "status": "production",
        "department": "Produit",
        "description": "Copilot IA natif dans la plateforme de simulation."
      },
      {
        "title": "Jumeau numérique intelligent",
        "status": "production",
        "department": "Ingénierie",
        "description": "IA optimise les jumeaux numériques en temps réel."
      },
      {
        "title": "Génération de design paramétrique",
        "status": "production",
        "department": "CAO",
        "description": "LLM génère des variantes de design mécaniques."
      },
      {
        "title": "Assistant documentation technique",
        "status": "pilot",
        "department": "Documentation",
        "description": "GenAI pour rédiger et maintenir la doc technique."
      }
    ]
  },
  {
    "id": "schneider-electric",
    "name": "Schneider Electric",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "L'énergie et l'automatisation rencontrent l'IA dans une stratégie transformatrice.",
    "score": 81,
    "trend": 22,
    "useCaseCount": 6,
    "aiPartners": [
      "Microsoft",
      "NVIDIA",
      "Aveva"
    ],
    "knownLeader": "Peter Herweck",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "legrand",
      "saint-gobain",
      "engie"
    ],
    "accentColor": "#10B981",
    "useCases": [
      {
        "title": "EcoStruxure AI — gestion énergie",
        "status": "production",
        "department": "Data Centers",
        "description": "IA optimise la consommation énergétique des data centers."
      },
      {
        "title": "Maintenance prédictive usines",
        "status": "production",
        "department": "Industrie",
        "description": "LLM analyse capteurs pour prédire pannes équipements."
      },
      {
        "title": "Chatbot support technique",
        "status": "production",
        "department": "Service Client",
        "description": "Assistant IA résolvant les problèmes techniques complexes."
      },
      {
        "title": "Conception tableaux électriques",
        "status": "pilot",
        "department": "R&D",
        "description": "GenAI accélère la conception de systèmes électriques."
      }
    ]
  },
  {
    "id": "orange",
    "name": "Orange",
    "sector": "Télécoms",
    "sectorIcon": "📡",
    "description": "Opérateur leader avec une stratégie IA pour réseau, client et données.",
    "score": 78,
    "trend": 17,
    "useCaseCount": 6,
    "aiPartners": [
      "Microsoft",
      "Google",
      "Mistral"
    ],
    "knownLeader": "Nicolas Blanc",
    "knownLeaderTitle": "Chief Digital & IT Officer",
    "competitors": [
      "bouygues",
      "teleperformance"
    ],
    "accentColor": "#F97316",
    "useCases": [
      {
        "title": "Orange AI — service client",
        "status": "production",
        "department": "Service Client",
        "description": "IA traite 5M de demandes clients/mois automatiquement."
      },
      {
        "title": "Optimisation réseau LLM",
        "status": "production",
        "department": "Réseau",
        "description": "IA prédit congestions et optimise le routage réseau."
      },
      {
        "title": "Personnalisation offres",
        "status": "production",
        "department": "Marketing",
        "description": "GenAI génère des offres sur mesure pour chaque client."
      },
      {
        "title": "Détection fraudes télécom",
        "status": "pilot",
        "department": "Sécurité",
        "description": "LLM détecte les schémas frauduleux en temps réel."
      }
    ]
  },
  {
    "id": "bnp-paribas",
    "name": "BNP Paribas",
    "sector": "Banque",
    "sectorIcon": "🏦",
    "description": "Leader bancaire européen avec 400M€ investis dans l'IA sur 3 ans.",
    "score": 76,
    "trend": 18,
    "useCaseCount": 7,
    "aiPartners": [
      "Microsoft",
      "OpenAI",
      "AWS"
    ],
    "knownLeader": "Jean-Laurent Bonnafé",
    "knownLeaderTitle": "Directeur Général",
    "competitors": [
      "societe-generale",
      "credit-agricole",
      "axa"
    ],
    "accentColor": "#006AB0",
    "useCases": [
      {
        "title": "Résumé automatique de contrats",
        "status": "production",
        "department": "Juridique",
        "description": "Claude synthétise les contrats complexes en quelques secondes."
      },
      {
        "title": "Conseiller virtuel bancaire",
        "status": "production",
        "department": "Service Client",
        "description": "Chatbot IA gérant les demandes courantes clients 24/7."
      },
      {
        "title": "Génération rapports ESG",
        "status": "pilot",
        "department": "Finance",
        "description": "LLM automatise la rédaction des reportings ESG réglementaires."
      },
      {
        "title": "Détection fraude par LLM",
        "status": "pilot",
        "department": "Risques",
        "description": "IA détecte des patterns de fraude complexes en temps réel."
      },
      {
        "title": "Conformité réglementaire IA",
        "status": "announced",
        "department": "Compliance",
        "description": "Veille réglementaire automatisée avec analyse d'impact."
      }
    ]
  },
  {
    "id": "thales",
    "name": "Thales",
    "sector": "Aérospatiale",
    "sectorIcon": "✈️",
    "description": "Plateforme Cortex AI pour la défense, l'aérospatiale et la cybersécurité.",
    "score": 75,
    "trend": 15,
    "useCaseCount": 5,
    "aiPartners": [
      "NVIDIA",
      "AWS",
      "Microsoft"
    ],
    "knownLeader": "Patrice Caine",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "airbus",
      "safran",
      "dassault-systemes"
    ],
    "accentColor": "#6366F1",
    "useCases": [
      {
        "title": "Cortex AI — analyse défense",
        "status": "production",
        "department": "Défense",
        "description": "IA pour analyse de renseignement et aide à la décision."
      },
      {
        "title": "Maintenance prédictive aéro",
        "status": "production",
        "department": "Aérospatiale",
        "description": "IA prédit défaillances moteurs avant qu'elles surviennent."
      },
      {
        "title": "Cybersécurité IA",
        "status": "production",
        "department": "Cyber",
        "description": "Détection d'intrusions par LLM en temps réel."
      },
      {
        "title": "Assistance pilote IA",
        "status": "pilot",
        "department": "Avionique",
        "description": "Copilot IA pour l'assistance cognitive des pilotes."
      }
    ]
  },
  {
    "id": "loreal",
    "name": "L'Oréal",
    "sector": "Luxe & Mode",
    "sectorIcon": "✨",
    "description": "Beauté Tech leader mondial, pionnier de l'IA dans le luxe et la cosmétique.",
    "score": 72,
    "trend": 20,
    "useCaseCount": 6,
    "aiPartners": [
      "Google",
      "Microsoft",
      "Modiface"
    ],
    "knownLeader": "Nicolas Hieronimus",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "lvmh",
      "kering",
      "hermes"
    ],
    "accentColor": "#F43F5E",
    "useCases": [
      {
        "title": "BeautyGenius — chatbot beauté",
        "status": "production",
        "department": "Digital",
        "description": "Assistant IA personnalisant les recommandations beauté."
      },
      {
        "title": "Diagnostic peau par IA",
        "status": "production",
        "department": "R&D",
        "description": "Analyse de photo pour recommandations de soin personnalisées."
      },
      {
        "title": "Génération descriptions produits",
        "status": "production",
        "department": "Marketing",
        "description": "LLM génère des descriptions en 30+ langues automatiquement."
      },
      {
        "title": "Essayage virtuel IA",
        "status": "production",
        "department": "E-Commerce",
        "description": "Try-on IA pour maquillage et coloration cheveux."
      },
      {
        "title": "IA pour R&D formulations",
        "status": "pilot",
        "department": "R&D",
        "description": "GenAI accélère la découverte de nouvelles formules."
      }
    ]
  },
  {
    "id": "airbus",
    "name": "Airbus",
    "sector": "Aérospatiale",
    "sectorIcon": "✈️",
    "description": "L'IA transforme la conception, la fabrication et la maintenance des avions.",
    "score": 69,
    "trend": 16,
    "useCaseCount": 5,
    "aiPartners": [
      "Microsoft",
      "Google",
      "NVIDIA"
    ],
    "knownLeader": "Guillaume Faury",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "thales",
      "safran",
      "dassault-systemes"
    ],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Conception aérodynamique IA",
        "status": "production",
        "department": "Ingénierie",
        "description": "LLM génère et optimise des formes aérodynamiques."
      },
      {
        "title": "MRO prédictif",
        "status": "production",
        "department": "Maintenance",
        "description": "IA prédit les besoins de maintenance sur flotte mondiale."
      },
      {
        "title": "Analyse documents certif.",
        "status": "pilot",
        "department": "Certification",
        "description": "GenAI analyse la conformité des dossiers de certification."
      },
      {
        "title": "Assemblage assisté par IA",
        "status": "pilot",
        "department": "Production",
        "description": "Guidage IA pour les techniciens d'assemblage."
      }
    ]
  },
  {
    "id": "stmicroelectronics",
    "name": "STMicroelectronics",
    "sector": "IT & Conseil",
    "sectorIcon": "💻",
    "description": "Fabricant de puces edge AI, au coeur de l'IA embarquée mondiale.",
    "score": 67,
    "trend": 12,
    "useCaseCount": 4,
    "aiPartners": [
      "NVIDIA",
      "Microsoft",
      "ARM"
    ],
    "knownLeader": "Jean-Marc Chery",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "capgemini",
      "dassault-systemes"
    ],
    "accentColor": "#8B5CF6",
    "useCases": [
      {
        "title": "Edge AI chips STM32",
        "status": "production",
        "department": "R&D",
        "description": "Microcontrôleurs avec IA embarquée pour IoT."
      },
      {
        "title": "Optimisation design puces",
        "status": "pilot",
        "department": "Conception",
        "description": "LLM assiste les ingénieurs dans la conception de circuits."
      }
    ]
  },
  {
    "id": "totalenergies",
    "name": "TotalEnergies",
    "sector": "Énergie",
    "sectorIcon": "⚡",
    "description": "L'IA au service de la transition énergétique et de l'optimisation opérationnelle.",
    "score": 65,
    "trend": 14,
    "useCaseCount": 5,
    "aiPartners": [
      "Google",
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Patrick Pouyanné",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "engie",
      "air-liquide"
    ],
    "accentColor": "#EF4444",
    "useCases": [
      {
        "title": "Optimisation production pétrolière",
        "status": "production",
        "department": "E&P",
        "description": "IA optimise les paramètres de production en temps réel."
      },
      {
        "title": "Prévision production solaire/éolien",
        "status": "production",
        "department": "Renouvelables",
        "description": "LLM prédit la production à 48h pour équilibrage réseau."
      },
      {
        "title": "Maintenance raffineries IA",
        "status": "pilot",
        "department": "Raffinage",
        "description": "Détection précoce d'anomalies sur équipements critiques."
      },
      {
        "title": "Trading énergie IA",
        "status": "pilot",
        "department": "Trading",
        "description": "IA assiste les traders sur les marchés de l'énergie."
      }
    ]
  },
  {
    "id": "axa",
    "name": "AXA",
    "sector": "Assurance",
    "sectorIcon": "🛡️",
    "description": "Assureur mondial adoptant l'IA pour la souscription, les sinistres et la fraude.",
    "score": 62,
    "trend": 9,
    "useCaseCount": 6,
    "aiPartners": [
      "Microsoft",
      "AWS",
      "Google"
    ],
    "knownLeader": "Gaëlle Olivier",
    "knownLeaderTitle": "Chief Data Officer",
    "competitors": [
      "bnp-paribas",
      "societe-generale",
      "credit-agricole"
    ],
    "accentColor": "#1D4ED8",
    "useCases": [
      {
        "title": "Traitement automatisé sinistres",
        "status": "production",
        "department": "Sinistres",
        "description": "IA traite et classe les déclarations de sinistres en quelques minutes."
      },
      {
        "title": "Détection fraude IA",
        "status": "production",
        "department": "Fraude",
        "description": "LLM identifie des patterns frauduleux dans les dossiers."
      },
      {
        "title": "Tarification personnalisée",
        "status": "pilot",
        "department": "Souscription",
        "description": "IA calcule des primes individualisées en temps réel."
      },
      {
        "title": "Chatbot conseil assurance",
        "status": "pilot",
        "department": "Commercial",
        "description": "Assistant IA guidant les clients dans le choix de contrats."
      }
    ]
  },
  {
    "id": "teleperformance",
    "name": "Teleperformance",
    "sector": "Services",
    "sectorIcon": "🎧",
    "description": "Leader BPO qui réinvente son modèle face à l'IA, avec un pivot stratégique majeur.",
    "score": 60,
    "trend": 35,
    "useCaseCount": 5,
    "aiPartners": [
      "Microsoft",
      "OpenAI",
      "Google"
    ],
    "knownLeader": "Daniel Julien",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": [
      "orange",
      "capgemini"
    ],
    "accentColor": "#059669",
    "useCases": [
      {
        "title": "TP GenAI — agent augmenté",
        "status": "production",
        "department": "Opérations",
        "description": "IA assiste les agents humains en temps réel."
      },
      {
        "title": "Analyse sentiment client",
        "status": "production",
        "department": "Quality",
        "description": "LLM analyse 100% des conversations pour améliorer la qualité."
      },
      {
        "title": "Automatisation tickets N1",
        "status": "pilot",
        "department": "IT Support",
        "description": "IA résout automatiquement les tickets simples."
      }
    ]
  },
  {
    "id": "societe-generale",
    "name": "Société Générale",
    "sector": "Banque",
    "sectorIcon": "🏦",
    "description": "Banque en transformation digitale avec une stratégie IA centrée sur la compliance.",
    "score": 58,
    "trend": 11,
    "useCaseCount": 5,
    "aiPartners": [
      "Microsoft",
      "Google"
    ],
    "knownLeader": "Slawomir Krupa",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "bnp-paribas",
      "credit-agricole",
      "axa"
    ],
    "accentColor": "#DC2626",
    "useCases": [
      {
        "title": "Compliance réglementaire IA",
        "status": "production",
        "department": "Compliance",
        "description": "IA surveille les transactions et détecte les anomalies réglementaires."
      },
      {
        "title": "Résumé recherche financière",
        "status": "production",
        "department": "Research",
        "description": "LLM synthétise les rapports d'analystes automatiquement."
      },
      {
        "title": "Détection fraude IA",
        "status": "pilot",
        "department": "Risques",
        "description": "Analyse comportementale des transactions par LLM."
      }
    ]
  },
  {
    "id": "engie",
    "name": "Engie",
    "sector": "Énergie",
    "sectorIcon": "⚡",
    "description": "Transition énergétique accélérée par l'IA pour les réseaux et la consommation.",
    "score": 57,
    "trend": 13,
    "useCaseCount": 4,
    "aiPartners": [
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Catherine MacGregor",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "totalenergies",
      "air-liquide",
      "schneider-electric"
    ],
    "accentColor": "#10B981",
    "useCases": [
      {
        "title": "Optimisation réseau gaz",
        "status": "production",
        "department": "Réseau",
        "description": "IA équilibre la distribution de gaz sur le réseau national."
      },
      {
        "title": "Prévision demande énergie",
        "status": "production",
        "department": "Trading",
        "description": "LLM prédit la consommation à court et moyen terme."
      },
      {
        "title": "Maintenance centrales IA",
        "status": "pilot",
        "department": "Production",
        "description": "Détection anomalies sur centrales thermiques et hydrauliques."
      }
    ]
  },
  {
    "id": "safran",
    "name": "Safran",
    "sector": "Aérospatiale",
    "sectorIcon": "✈️",
    "description": "IA pour la propulsion, la navigation et la maintenance des systèmes aéronautiques.",
    "score": 55,
    "trend": 10,
    "useCaseCount": 4,
    "aiPartners": [
      "NVIDIA",
      "Microsoft"
    ],
    "knownLeader": "Olivier Andriès",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "airbus",
      "thales"
    ],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "Maintenance prédictive moteurs",
        "status": "production",
        "department": "Propulsion",
        "description": "IA surveille les moteurs LEAP et CFM56 en temps réel."
      },
      {
        "title": "Contrôle qualité IA",
        "status": "pilot",
        "department": "Production",
        "description": "Vision IA pour la détection de défauts de fabrication."
      }
    ]
  },
  {
    "id": "michelin",
    "name": "Michelin",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "L'IA révolutionne la R&D matériaux et la fabrication de pneumatiques.",
    "score": 53,
    "trend": 8,
    "useCaseCount": 4,
    "aiPartners": [
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Florent Menegaux",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "stellantis",
      "renault",
      "schneider-electric"
    ],
    "accentColor": "#1E40AF",
    "useCases": [
      {
        "title": "R&D matériaux IA",
        "status": "production",
        "department": "R&D",
        "description": "IA accélère la découverte de nouvelles compositions de gomme."
      },
      {
        "title": "Optimisation processus fabrication",
        "status": "pilot",
        "department": "Production",
        "description": "GenAI optimise les paramètres de vulcanisation."
      }
    ]
  },
  {
    "id": "danone",
    "name": "Danone",
    "sector": "Distribution",
    "sectorIcon": "🛒",
    "description": "L'IA optimise la supply chain, le marketing et le développement produit.",
    "score": 51,
    "trend": 9,
    "useCaseCount": 4,
    "aiPartners": [
      "Microsoft",
      "Google"
    ],
    "knownLeader": "Antoine de Saint-Affrique",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "carrefour",
      "pernod-ricard"
    ],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Optimisation supply chain",
        "status": "production",
        "department": "Supply Chain",
        "description": "IA réduit les ruptures de stock et optimise les flux."
      },
      {
        "title": "Innovation produit IA",
        "status": "pilot",
        "department": "R&D",
        "description": "LLM génère des concepts de nouveaux produits alimentaires."
      }
    ]
  },
  {
    "id": "lvmh",
    "name": "LVMH",
    "sector": "Luxe & Mode",
    "sectorIcon": "✨",
    "description": "Le géant du luxe explore l'IA pour l'expérience client et la créativité.",
    "score": 49,
    "trend": 7,
    "useCaseCount": 4,
    "aiPartners": [
      "Microsoft",
      "Google"
    ],
    "knownLeader": "Bernard Arnault",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "hermes",
      "kering",
      "loreal"
    ],
    "accentColor": "#B45309",
    "useCases": [
      {
        "title": "Personnalisation e-commerce luxe",
        "status": "production",
        "department": "Digital",
        "description": "IA personnalise l'expérience d'achat en ligne pour chaque client."
      },
      {
        "title": "Traçabilité et authenticité produit",
        "status": "pilot",
        "department": "Operations",
        "description": "LLM et blockchain pour certifier l'authenticité des produits."
      },
      {
        "title": "Assistance créative designers",
        "status": "pilot",
        "department": "Créatif",
        "description": "GenAI supporte les créateurs dans l'exploration de tendances."
      }
    ]
  },
  {
    "id": "vinci",
    "name": "Vinci",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "Construction et concessions transformées par l'IA et la digitalisation.",
    "score": 47,
    "trend": 6,
    "useCaseCount": 3,
    "aiPartners": [
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Xavier Huillard",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "bouygues",
      "saint-gobain"
    ],
    "accentColor": "#F59E0B",
    "useCases": [
      {
        "title": "IA pour la sécurité chantiers",
        "status": "production",
        "department": "HSE",
        "description": "Analyse vidéo IA pour détecter les risques de sécurité en temps réel."
      },
      {
        "title": "Gestion intelligente autoroutes",
        "status": "pilot",
        "department": "Autoroutes",
        "description": "IA optimise les flux et anticipe les incidents sur le réseau."
      }
    ]
  },
  {
    "id": "accor",
    "name": "Accor",
    "sector": "Distribution",
    "sectorIcon": "🛒",
    "description": "L'hôtellerie mondiale investit l'IA pour l'expérience client et les opérations.",
    "score": 45,
    "trend": 8,
    "useCaseCount": 3,
    "aiPartners": [
      "Microsoft",
      "Google"
    ],
    "knownLeader": "Sébastien Bazin",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "danone",
      "carrefour"
    ],
    "accentColor": "#DC2626",
    "useCases": [
      {
        "title": "Concierge IA hôtels",
        "status": "production",
        "department": "Service Client",
        "description": "Assistant IA 24/7 pour les demandes des hôtes."
      },
      {
        "title": "Revenue management IA",
        "status": "pilot",
        "department": "Revenue",
        "description": "IA optimise les prix en temps réel selon la demande."
      }
    ]
  },
  {
    "id": "kering",
    "name": "Kering",
    "sector": "Luxe & Mode",
    "sectorIcon": "✨",
    "description": "Groupe de luxe explorant l'IA générative pour la création et la personnalisation.",
    "score": 44,
    "trend": 11,
    "useCaseCount": 3,
    "aiPartners": [
      "Google",
      "Microsoft"
    ],
    "knownLeader": "François-Henri Pinault",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "lvmh",
      "hermes",
      "loreal"
    ],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "IA pour trend forecasting",
        "status": "production",
        "department": "Créatif",
        "description": "Analyse tendances mondiales par LLM pour orienter les collections."
      },
      {
        "title": "Personnalisation Gucci/YSL",
        "status": "pilot",
        "department": "Retail",
        "description": "IA recommande des produits personnalisés en boutique."
      }
    ]
  },
  {
    "id": "stellantis",
    "name": "Stellantis",
    "sector": "Automobile",
    "sectorIcon": "🚗",
    "description": "Groupe automobile en transformation, l'IA au service du véhicule connecté.",
    "score": 43,
    "trend": 5,
    "useCaseCount": 3,
    "aiPartners": [
      "AWS",
      "Foxconn"
    ],
    "knownLeader": "Carlos Tavares",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "renault",
      "michelin"
    ],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Assistant vocal IA embarqué",
        "status": "production",
        "department": "Connected Car",
        "description": "IA intégrée dans STLA Brain pour les véhicules connectés."
      },
      {
        "title": "Maintenance prédictive flotte",
        "status": "pilot",
        "department": "After-Sales",
        "description": "IA anticipe les besoins de maintenance pour les flottes."
      }
    ]
  },
  {
    "id": "renault",
    "name": "Renault",
    "sector": "Automobile",
    "sectorIcon": "🚗",
    "description": "L'alliance automobile use l'IA pour le véhicule autonome et la fabrication.",
    "score": 43,
    "trend": 7,
    "useCaseCount": 3,
    "aiPartners": [
      "Google",
      "Qualcomm"
    ],
    "knownLeader": "Luca de Meo",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "stellantis",
      "michelin"
    ],
    "accentColor": "#F59E0B",
    "useCases": [
      {
        "title": "Ampere — software vehicle IA",
        "status": "production",
        "department": "Software",
        "description": "Plateforme software defined vehicle avec IA embarquée."
      },
      {
        "title": "Chatbot après-vente",
        "status": "pilot",
        "department": "Service Client",
        "description": "IA assiste les clients pour le diagnostic et la maintenance."
      }
    ]
  },
  {
    "id": "hermes",
    "name": "Hermès",
    "sector": "Luxe & Mode",
    "sectorIcon": "✨",
    "description": "Adoption sélective de l'IA préservant l'artisanat et l'exclusivité de la marque.",
    "score": 41,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Axel Dumas",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "lvmh",
      "kering",
      "loreal"
    ],
    "accentColor": "#B45309",
    "useCases": [
      {
        "title": "Lutte anti-contrefaçon IA",
        "status": "production",
        "department": "Sécurité",
        "description": "IA détecte les faux produits sur les marchés en ligne."
      },
      {
        "title": "Gestion stocks intelligente",
        "status": "pilot",
        "department": "Supply Chain",
        "description": "IA optimise les stocks en respectant l'exclusivité produit."
      }
    ]
  },
  {
    "id": "carrefour",
    "name": "Carrefour",
    "sector": "Distribution",
    "sectorIcon": "🛒",
    "description": "Le retail digital exploite l'IA pour la supply chain et l'expérience en magasin.",
    "score": 39,
    "trend": 6,
    "useCaseCount": 3,
    "aiPartners": [
      "Microsoft",
      "Google"
    ],
    "knownLeader": "Alexandre Bompard",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "danone",
      "accor"
    ],
    "accentColor": "#2563EB",
    "useCases": [
      {
        "title": "IA anti-gaspillage alimentaire",
        "status": "production",
        "department": "Logistique",
        "description": "LLM prédit les dates limites et optimise la rotation des produits."
      },
      {
        "title": "Chatbot produits GPT",
        "status": "production",
        "department": "E-commerce",
        "description": "IA répond aux questions produits pour 10M clients en ligne."
      }
    ]
  },
  {
    "id": "legrand",
    "name": "Legrand",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "Infrastructure électrique intelligente avec des premières applications IA.",
    "score": 37,
    "trend": 5,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Benoît Coquart",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "schneider-electric",
      "vinci"
    ],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "Bâtiments intelligents IA",
        "status": "production",
        "department": "Smart Building",
        "description": "IA optimise la consommation électrique des bâtiments."
      }
    ]
  },
  {
    "id": "veolia",
    "name": "Veolia",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "IA pour la gestion de l'eau, des déchets et de l'énergie durable.",
    "score": 35,
    "trend": 7,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Estelle Brachlianoff",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "engie",
      "totalenergies"
    ],
    "accentColor": "#059669",
    "useCases": [
      {
        "title": "Détection fuites réseau eau",
        "status": "production",
        "department": "Eau",
        "description": "IA analyse les données capteurs pour détecter les fuites."
      },
      {
        "title": "Optimisation tri déchets",
        "status": "pilot",
        "department": "Recyclage",
        "description": "Vision IA pour améliorer le tri et le recyclage."
      }
    ]
  },
  {
    "id": "credit-agricole",
    "name": "Crédit Agricole",
    "sector": "Banque",
    "sectorIcon": "🏦",
    "description": "Première banque française de détail en démarrage sur l'IA générative.",
    "score": 34,
    "trend": 8,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Philippe Brassac",
    "knownLeaderTitle": "PDG",
    "competitors": [
      "bnp-paribas",
      "societe-generale",
      "axa"
    ],
    "accentColor": "#15803D",
    "useCases": [
      {
        "title": "Assistant conseillers IA",
        "status": "pilot",
        "department": "Réseau",
        "description": "IA assiste les conseillers dans la recommandation produits."
      }
    ]
  },
  {
    "id": "air-liquide",
    "name": "Air Liquide",
    "sector": "Énergie",
    "sectorIcon": "⚡",
    "description": "Gaz industriels et santé explorent l'IA pour l'optimisation opérationnelle.",
    "score": 32,
    "trend": 5,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "François Jackow",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "engie",
      "totalenergies"
    ],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Optimisation production hydrogène",
        "status": "pilot",
        "department": "Production",
        "description": "IA optimise les paramètres des électrolyseurs."
      }
    ]
  },
  {
    "id": "saint-gobain",
    "name": "Saint-Gobain",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "Matériaux de construction et solutions habitat avec quelques initiatives IA.",
    "score": 31,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Benoît Bazin",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "vinci",
      "schneider-electric"
    ],
    "accentColor": "#DC2626",
    "useCases": [
      {
        "title": "Conception de bâtiments IA",
        "status": "pilot",
        "department": "Architecture",
        "description": "IA assiste les architectes dans la conception de bâtiments durables."
      }
    ]
  },
  {
    "id": "bouygues",
    "name": "Bouygues",
    "sector": "Télécoms",
    "sectorIcon": "📡",
    "description": "Conglomérat télécoms-construction avec des premières expérimentations IA.",
    "score": 29,
    "trend": 5,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Martin Bouygues",
    "knownLeaderTitle": "Président",
    "competitors": [
      "orange",
      "vinci"
    ],
    "accentColor": "#1D4ED8",
    "useCases": [
      {
        "title": "Chatbot Bouygues Telecom",
        "status": "production",
        "department": "Service Client",
        "description": "IA répond aux demandes basiques des abonnés."
      }
    ]
  },
  {
    "id": "pernod-ricard",
    "name": "Pernod Ricard",
    "sector": "Distribution",
    "sectorIcon": "🛒",
    "description": "Spiritueux et vins explorent l'IA pour le marketing et la distribution.",
    "score": 27,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Alexandre Ricard",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "danone",
      "lvmh"
    ],
    "accentColor": "#B45309",
    "useCases": [
      {
        "title": "Personnalisation marketing",
        "status": "pilot",
        "department": "Marketing",
        "description": "LLM génère des messages marketing personnalisés par marché."
      }
    ]
  },
  {
    "id": "arcelormittal",
    "name": "ArcelorMittal",
    "sector": "Industrie",
    "sectorIcon": "⚙️",
    "description": "Acier et mining avec des applications IA pour la production et la qualité.",
    "score": 25,
    "trend": 3,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Aditya Mittal",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "saint-gobain",
      "michelin"
    ],
    "accentColor": "#F97316",
    "useCases": [
      {
        "title": "Contrôle qualité acier IA",
        "status": "pilot",
        "department": "Production",
        "description": "Vision IA pour détecter les défauts sur les bobines d'acier."
      }
    ]
  },
  {
    "id": "essilorluxottica",
    "name": "EssilorLuxottica",
    "sector": "Pharma & Santé",
    "sectorIcon": "💊",
    "description": "Optique mondiale avec des applications IA émergentes pour le diagnostic visuel.",
    "score": 23,
    "trend": 3,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Francesco Milleri",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "sanofi",
      "eurofins-scientific"
    ],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "Diagnostic visuel IA",
        "status": "pilot",
        "department": "Médical",
        "description": "IA détecte les anomalies oculaires sur images de fond d'oeil."
      }
    ]
  },
  {
    "id": "vivendi",
    "name": "Vivendi",
    "sector": "Médias & Pub",
    "sectorIcon": "📢",
    "description": "Groupe médias en restructuration avec quelques pilotes IA dans la création.",
    "score": 24,
    "trend": 6,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft"
    ],
    "knownLeader": "Yannick Bolloré",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "publicis-groupe"
    ],
    "accentColor": "#1D4ED8",
    "useCases": [
      {
        "title": "IA pour sous-titrage Canal+",
        "status": "pilot",
        "department": "Production",
        "description": "LLM génère des sous-titres automatiques pour les contenus."
      }
    ]
  },
  {
    "id": "worldline",
    "name": "Worldline",
    "sector": "Services",
    "sectorIcon": "🎧",
    "description": "Paiements et services financiers avec des applications IA pour la fraude.",
    "score": 30,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": [
      "Microsoft",
      "AWS"
    ],
    "knownLeader": "Gilles Grapinet",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "bnp-paribas",
      "societe-generale"
    ],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Détection fraude paiements",
        "status": "production",
        "department": "Risques",
        "description": "IA analyse les transactions en temps réel pour détecter la fraude."
      }
    ]
  },
  {
    "id": "unibail-rodamco",
    "name": "Unibail-Rodamco-Westfield",
    "sector": "Services",
    "sectorIcon": "🎧",
    "description": "Immobilier commercial avec des premières explorations de l'IA.",
    "score": 21,
    "trend": 3,
    "useCaseCount": 1,
    "aiPartners": [],
    "knownLeader": "Jean-Marie Tritant",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "accor",
      "vinci"
    ],
    "accentColor": "#6366F1",
    "useCases": [
      {
        "title": "Optimisation flux visiteurs",
        "status": "pilot",
        "department": "Opérations",
        "description": "IA optimise les parcours visiteurs dans les centres commerciaux."
      }
    ]
  },
  {
    "id": "eurofins-scientific",
    "name": "Eurofins Scientific",
    "sector": "Pharma & Santé",
    "sectorIcon": "💊",
    "description": "Laboratoires d'analyse scientifique avec quelques applications IA pour la R&D.",
    "score": 19,
    "trend": 2,
    "useCaseCount": 1,
    "aiPartners": [],
    "knownLeader": "Gilles Martin",
    "knownLeaderTitle": "CEO",
    "competitors": [
      "sanofi",
      "essilorluxottica"
    ],
    "accentColor": "#059669",
    "useCases": [
      {
        "title": "Interprétation résultats labo",
        "status": "pilot",
        "department": "Laboratoire",
        "description": "LLM aide les biologistes à interpréter les résultats d'analyses."
      }
    ]
  }
] as Company[];

export const SECTORS = [...new Set(CAC40_COMPANIES.map((c) => c.sector))].sort();

export function getCompanyBySlug(slug: string): Company | undefined {
  return CAC40_COMPANIES.find((c) => c.id === slug);
}

export function getCompanyCompetitors(company: Company): Company[] {
  return company.competitors
    .map((id) => CAC40_COMPANIES.find((c) => c.id === id))
    .filter(Boolean) as Company[];
}
