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
    "sector": "IT & Consulting",
    "sectorIcon": "💻",
    "description": "Global leader in digital services and digital transformation.",
    "score": 94,
    "trend": 31,
    "useCaseCount": 8,
    "aiPartners": ["Microsoft", "Google", "AWS", "Mistral", "OpenAI"],
    "knownLeader": "Aiman Ezzat",
    "knownLeaderTitle": "CEO & AI Champion",
    "competitors": ["publicis-groupe", "dassault-systemes"],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "GenAI Platform for Clients",
        "status": "production",
        "department": "Consulting",
        "description": "GenAI toolset deployed across 500+ enterprise clients."
      },
      {
        "title": "Automated Code Generation",
        "status": "production",
        "department": "IT",
        "description": "AI code generation reducing development time by 40%."
      },
      {
        "title": "RFP Document Summarization",
        "status": "production",
        "department": "Sales",
        "description": "Claude automatically analyzes and summarizes RFP documents."
      },
      {
        "title": "AI-Driven Automated Testing",
        "status": "production",
        "department": "QA",
        "description": "Automatic test case generation using LLMs."
      },
      {
        "title": "GenAI for ERP Transformation",
        "status": "pilot",
        "department": "SAP",
        "description": "Accelerating SAP S/4HANA migrations with GenAI."
      }
    ]
  },
  {
    "id": "publicis-groupe",
    "name": "Publicis Groupe",
    "sector": "Media & Advertising",
    "sectorIcon": "📢",
    "description": "World's leading communications group with an aggressive AI strategy.",
    "score": 89,
    "trend": 28,
    "useCaseCount": 7,
    "aiPartners": ["Microsoft", "OpenAI", "Mistral"],
    "knownLeader": "Arthur Sadoun",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["vivendi", "capgemini"],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Marcel AI — Internal Platform",
        "status": "production",
        "department": "HR & Operations",
        "description": "AI connecting 100k+ employees, projects and skills."
      },
      {
        "title": "Advertising Content Generation",
        "status": "production",
        "department": "Creative",
        "description": "Claude generates ad variants at scale."
      },
      {
        "title": "CoreAI — First-Party Data",
        "status": "production",
        "department": "Data",
        "description": "AI activation platform on proprietary data."
      },
      {
        "title": "Campaign Personalization",
        "status": "production",
        "department": "Media",
        "description": "AI adapts messages to micro-targeted segments."
      },
      {
        "title": "Luxury Brand Creative AI",
        "status": "pilot",
        "department": "Luxury",
        "description": "LLM generating creative concepts for premium clients."
      }
    ]
  },
  {
    "id": "sanofi",
    "name": "Sanofi",
    "sector": "Pharma & Health",
    "sectorIcon": "💊",
    "description": "AI pioneer in pharma, with a massive announced investment.",
    "score": 86,
    "trend": 24,
    "useCaseCount": 7,
    "aiPartners": ["OpenAI", "Aily Labs", "AWS"],
    "knownLeader": "Houman Ashrafian",
    "knownLeaderTitle": "Chief Medical Officer & AI Lead",
    "competitors": ["essilorluxottica", "eurofins-scientific"],
    "accentColor": "#EC4899",
    "useCases": [
      {
        "title": "Plai — Proprietary AI Platform",
        "status": "production",
        "department": "R&D",
        "description": "GenAI platform deployed for 400+ internal use cases."
      },
      {
        "title": "Drug Discovery Acceleration",
        "status": "production",
        "department": "R&D",
        "description": "LLM scans scientific literature to identify drug candidates."
      },
      {
        "title": "Clinical Report Summarization",
        "status": "production",
        "department": "Medical",
        "description": "Automatic synthesis of thousands of pages of clinical trials."
      },
      {
        "title": "Clinical Trial Optimization",
        "status": "pilot",
        "department": "Clinical",
        "description": "AI for trial design and patient recruitment."
      },
      {
        "title": "Personalized Medicine",
        "status": "announced",
        "department": "Precision Med",
        "description": "GenAI-guided individualized treatment."
      }
    ]
  },
  {
    "id": "dassault-systemes",
    "name": "Dassault Systèmes",
    "sector": "IT & Consulting",
    "sectorIcon": "💻",
    "description": "3DEXPERIENCE platform natively integrating AI for simulation.",
    "score": 83,
    "trend": 19,
    "useCaseCount": 6,
    "aiPartners": ["NVIDIA", "Microsoft", "AWS"],
    "knownLeader": "Pascal Daloz",
    "knownLeaderTitle": "CEO",
    "competitors": ["capgemini", "stmicroelectronics"],
    "accentColor": "#3B82F6",
    "useCases": [
      {
        "title": "AI in 3DEXPERIENCE",
        "status": "production",
        "department": "Product",
        "description": "Native AI copilot in the simulation platform."
      },
      {
        "title": "Intelligent Digital Twin",
        "status": "production",
        "department": "Engineering",
        "description": "AI optimizes digital twins in real-time."
      },
      {
        "title": "Parametric Design Generation",
        "status": "production",
        "department": "CAD",
        "description": "LLM generates mechanical design variants."
      },
      {
        "title": "Technical Documentation Assistant",
        "status": "pilot",
        "department": "Documentation",
        "description": "GenAI to write and maintain technical documentation."
      }
    ]
  },
  {
    "id": "schneider-electric",
    "name": "Schneider Electric",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "Energy and automation meet AI in a transformative strategy.",
    "score": 81,
    "trend": 22,
    "useCaseCount": 6,
    "aiPartners": ["Microsoft", "NVIDIA", "Aveva"],
    "knownLeader": "Peter Herweck",
    "knownLeaderTitle": "CEO",
    "competitors": ["legrand", "saint-gobain", "engie"],
    "accentColor": "#10B981",
    "useCases": [
      {
        "title": "EcoStruxure AI — Energy Management",
        "status": "production",
        "department": "Data Centers",
        "description": "AI optimizes energy consumption in data centers."
      },
      {
        "title": "Factory Predictive Maintenance",
        "status": "production",
        "department": "Industry",
        "description": "LLM analyzes sensors to predict equipment failures."
      },
      {
        "title": "Technical Support Chatbot",
        "status": "production",
        "department": "Customer Service",
        "description": "AI assistant resolving complex technical issues."
      },
      {
        "title": "Electrical Panel Design",
        "status": "pilot",
        "department": "R&D",
        "description": "GenAI accelerates electrical systems design."
      }
    ]
  },
  {
    "id": "orange",
    "name": "Orange",
    "sector": "Telecom",
    "sectorIcon": "📡",
    "description": "Leading operator with an AI strategy for network, customer service, and data.",
    "score": 78,
    "trend": 17,
    "useCaseCount": 6,
    "aiPartners": ["Microsoft", "Google", "Mistral"],
    "knownLeader": "Nicolas Blanc",
    "knownLeaderTitle": "Chief Digital & IT Officer",
    "competitors": ["bouygues", "teleperformance"],
    "accentColor": "#F97316",
    "useCases": [
      {
        "title": "Orange AI — Customer Service",
        "status": "production",
        "department": "Customer Service",
        "description": "AI handles 5M customer requests per month automatically."
      },
      {
        "title": "LLM Network Optimization",
        "status": "production",
        "department": "Network",
        "description": "AI predicts congestion and optimizes network routing."
      },
      {
        "title": "Offer Personalization",
        "status": "production",
        "department": "Marketing",
        "description": "GenAI generates tailored offers for each customer."
      },
      {
        "title": "Telecom Fraud Detection",
        "status": "pilot",
        "department": "Security",
        "description": "LLM detects fraudulent patterns in real-time."
      }
    ]
  },
  {
    "id": "bnp-paribas",
    "name": "BNP Paribas",
    "sector": "Banking",
    "sectorIcon": "🏦",
    "description": "Europe's leading bank with €400M invested in AI over 3 years.",
    "score": 76,
    "trend": 18,
    "useCaseCount": 7,
    "aiPartners": ["Microsoft", "OpenAI", "AWS"],
    "knownLeader": "Jean-Laurent Bonnafé",
    "knownLeaderTitle": "CEO",
    "competitors": ["societe-generale", "credit-agricole", "axa"],
    "accentColor": "#006AB0",
    "useCases": [
      {
        "title": "Automated Contract Summarization",
        "status": "production",
        "department": "Legal",
        "description": "Claude synthesizes complex contracts in seconds."
      },
      {
        "title": "Virtual Banking Advisor",
        "status": "production",
        "department": "Customer Service",
        "description": "AI chatbot handling routine customer requests 24/7."
      },
      {
        "title": "ESG Report Generation",
        "status": "pilot",
        "department": "Finance",
        "description": "LLM automates drafting of regulatory ESG reports."
      },
      {
        "title": "LLM Fraud Detection",
        "status": "pilot",
        "department": "Risk",
        "description": "AI detects complex fraud patterns in real-time."
      },
      {
        "title": "AI Regulatory Compliance",
        "status": "announced",
        "department": "Compliance",
        "description": "Automated regulatory monitoring with impact analysis."
      }
    ]
  },
  {
    "id": "thales",
    "name": "Thales",
    "sector": "Aerospace",
    "sectorIcon": "✈️",
    "description": "Cortex AI platform for defense, aerospace, and cybersecurity.",
    "score": 75,
    "trend": 15,
    "useCaseCount": 5,
    "aiPartners": ["NVIDIA", "AWS", "Microsoft"],
    "knownLeader": "Patrice Caine",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["airbus", "safran", "dassault-systemes"],
    "accentColor": "#6366F1",
    "useCases": [
      {
        "title": "Cortex AI — Defense Analysis",
        "status": "production",
        "department": "Defense",
        "description": "AI for intelligence analysis and decision support."
      },
      {
        "title": "Aerospace Predictive Maintenance",
        "status": "production",
        "department": "Aerospace",
        "description": "AI predicts engine failures before they occur."
      },
      {
        "title": "AI Cybersecurity",
        "status": "production",
        "department": "Cyber",
        "description": "Real-time LLM-based intrusion detection."
      },
      {
        "title": "AI Pilot Assistance",
        "status": "pilot",
        "department": "Avionics",
        "description": "AI copilot for cognitive assistance of pilots."
      }
    ]
  },
  {
    "id": "loreal",
    "name": "L'Oréal",
    "sector": "Luxury & Fashion",
    "sectorIcon": "✨",
    "description": "Global Beauty Tech leader, AI pioneer in luxury and cosmetics.",
    "score": 72,
    "trend": 20,
    "useCaseCount": 6,
    "aiPartners": ["Google", "Microsoft", "Modiface"],
    "knownLeader": "Nicolas Hieronimus",
    "knownLeaderTitle": "CEO",
    "competitors": ["lvmh", "kering", "hermes"],
    "accentColor": "#F43F5E",
    "useCases": [
      {
        "title": "BeautyGenius — Beauty Chatbot",
        "status": "production",
        "department": "Digital",
        "description": "AI assistant personalizing beauty recommendations."
      },
      {
        "title": "AI Skin Diagnostic",
        "status": "production",
        "department": "R&D",
        "description": "Photo analysis for personalized skincare recommendations."
      },
      {
        "title": "Product Description Generation",
        "status": "production",
        "department": "Marketing",
        "description": "LLM auto-generates descriptions in 30+ languages."
      },
      {
        "title": "AI Virtual Try-On",
        "status": "production",
        "department": "E-Commerce",
        "description": "AI try-on for makeup and hair color."
      },
      {
        "title": "AI for R&D Formulations",
        "status": "pilot",
        "department": "R&D",
        "description": "GenAI accelerates discovery of new formulas."
      }
    ]
  },
  {
    "id": "airbus",
    "name": "Airbus",
    "sector": "Aerospace",
    "sectorIcon": "✈️",
    "description": "AI transforming aircraft design, manufacturing, and maintenance.",
    "score": 69,
    "trend": 16,
    "useCaseCount": 5,
    "aiPartners": ["Microsoft", "Google", "NVIDIA"],
    "knownLeader": "Guillaume Faury",
    "knownLeaderTitle": "CEO",
    "competitors": ["thales", "safran", "dassault-systemes"],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "AI Aerodynamic Design",
        "status": "production",
        "department": "Engineering",
        "description": "LLM generates and optimizes aerodynamic shapes."
      },
      {
        "title": "Predictive MRO",
        "status": "production",
        "department": "Maintenance",
        "description": "AI predicts maintenance needs across global fleet."
      },
      {
        "title": "Certification Document Analysis",
        "status": "pilot",
        "department": "Certification",
        "description": "GenAI checks compliance of certification files."
      },
      {
        "title": "AI-Assisted Assembly",
        "status": "pilot",
        "department": "Production",
        "description": "AI guidance for assembly technicians."
      }
    ]
  },
  {
    "id": "stmicroelectronics",
    "name": "STMicroelectronics",
    "sector": "IT & Consulting",
    "sectorIcon": "💻",
    "description": "Edge AI chip maker at the heart of global embedded AI.",
    "score": 67,
    "trend": 12,
    "useCaseCount": 4,
    "aiPartners": ["NVIDIA", "Microsoft", "ARM"],
    "knownLeader": "Jean-Marc Chery",
    "knownLeaderTitle": "CEO",
    "competitors": ["capgemini", "dassault-systemes"],
    "accentColor": "#8B5CF6",
    "useCases": [
      {
        "title": "Edge AI STM32 Chips",
        "status": "production",
        "department": "R&D",
        "description": "Microcontrollers with embedded AI for IoT."
      },
      {
        "title": "AI-Assisted Chip Design",
        "status": "pilot",
        "department": "Design",
        "description": "LLM assists engineers in circuit design."
      }
    ]
  },
  {
    "id": "totalenergies",
    "name": "TotalEnergies",
    "sector": "Energy",
    "sectorIcon": "⚡",
    "description": "AI serving the energy transition and operational optimization.",
    "score": 65,
    "trend": 14,
    "useCaseCount": 5,
    "aiPartners": ["Google", "Microsoft", "AWS"],
    "knownLeader": "Patrick Pouyanné",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["engie", "air-liquide"],
    "accentColor": "#EF4444",
    "useCases": [
      {
        "title": "Oil Production Optimization",
        "status": "production",
        "department": "E&P",
        "description": "AI optimizes production parameters in real-time."
      },
      {
        "title": "Solar/Wind Output Forecasting",
        "status": "production",
        "department": "Renewables",
        "description": "LLM predicts 48h output for grid balancing."
      },
      {
        "title": "AI Refinery Maintenance",
        "status": "pilot",
        "department": "Refining",
        "description": "Early anomaly detection on critical equipment."
      },
      {
        "title": "AI Energy Trading",
        "status": "pilot",
        "department": "Trading",
        "description": "AI assists traders on energy markets."
      }
    ]
  },
  {
    "id": "axa",
    "name": "AXA",
    "sector": "Insurance",
    "sectorIcon": "🛡️",
    "description": "Global insurer adopting AI for underwriting, claims, and fraud.",
    "score": 62,
    "trend": 9,
    "useCaseCount": 6,
    "aiPartners": ["Microsoft", "AWS", "Google"],
    "knownLeader": "Gaëlle Olivier",
    "knownLeaderTitle": "Chief Data Officer",
    "competitors": ["bnp-paribas", "societe-generale", "credit-agricole"],
    "accentColor": "#1D4ED8",
    "useCases": [
      {
        "title": "Automated Claims Processing",
        "status": "production",
        "department": "Claims",
        "description": "AI processes and classifies claims in minutes."
      },
      {
        "title": "AI Fraud Detection",
        "status": "production",
        "department": "Fraud",
        "description": "LLM identifies fraudulent patterns in dossiers."
      },
      {
        "title": "Personalized Pricing",
        "status": "pilot",
        "department": "Underwriting",
        "description": "AI calculates individualized premiums in real-time."
      },
      {
        "title": "Insurance Advisory Chatbot",
        "status": "pilot",
        "department": "Sales",
        "description": "AI assistant guiding clients in contract selection."
      }
    ]
  },
  {
    "id": "teleperformance",
    "name": "Teleperformance",
    "sector": "Services",
    "sectorIcon": "🎧",
    "description": "BPO leader reinventing its model in the face of AI, with a major strategic pivot.",
    "score": 60,
    "trend": 35,
    "useCaseCount": 5,
    "aiPartners": ["Microsoft", "OpenAI", "Google"],
    "knownLeader": "Daniel Julien",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["orange", "capgemini"],
    "accentColor": "#059669",
    "useCases": [
      {
        "title": "TP GenAI — Augmented Agent",
        "status": "production",
        "department": "Operations",
        "description": "AI assists human agents in real-time."
      },
      {
        "title": "Customer Sentiment Analysis",
        "status": "production",
        "department": "Quality",
        "description": "LLM analyzes 100% of conversations to improve quality."
      },
      {
        "title": "L1 Ticket Automation",
        "status": "pilot",
        "department": "IT Support",
        "description": "AI automatically resolves simple tickets."
      }
    ]
  },
  {
    "id": "societe-generale",
    "name": "Société Générale",
    "sector": "Banking",
    "sectorIcon": "🏦",
    "description": "Bank undergoing digital transformation with AI focused on compliance.",
    "score": 58,
    "trend": 11,
    "useCaseCount": 5,
    "aiPartners": ["Microsoft", "Google"],
    "knownLeader": "Slawomir Krupa",
    "knownLeaderTitle": "CEO",
    "competitors": ["bnp-paribas", "credit-agricole", "axa"],
    "accentColor": "#DC2626",
    "useCases": [
      {
        "title": "AI Regulatory Compliance",
        "status": "production",
        "department": "Compliance",
        "description": "AI monitors transactions and detects regulatory anomalies."
      },
      {
        "title": "Financial Research Summarization",
        "status": "production",
        "department": "Research",
        "description": "LLM automatically synthesizes analyst reports."
      },
      {
        "title": "AI Fraud Detection",
        "status": "pilot",
        "department": "Risk",
        "description": "Behavioral analysis of transactions by LLM."
      }
    ]
  },
  {
    "id": "engie",
    "name": "Engie",
    "sector": "Energy",
    "sectorIcon": "⚡",
    "description": "AI-accelerated energy transition for grids and consumption management.",
    "score": 57,
    "trend": 13,
    "useCaseCount": 4,
    "aiPartners": ["Microsoft", "AWS"],
    "knownLeader": "Catherine MacGregor",
    "knownLeaderTitle": "CEO",
    "competitors": ["totalenergies", "air-liquide", "schneider-electric"],
    "accentColor": "#10B981",
    "useCases": [
      {
        "title": "Gas Network Optimization",
        "status": "production",
        "department": "Network",
        "description": "AI balances gas distribution across the national grid."
      },
      {
        "title": "Energy Demand Forecasting",
        "status": "production",
        "department": "Trading",
        "description": "LLM predicts short and medium-term consumption."
      },
      {
        "title": "AI Power Plant Maintenance",
        "status": "pilot",
        "department": "Production",
        "description": "Anomaly detection on thermal and hydro plants."
      }
    ]
  },
  {
    "id": "safran",
    "name": "Safran",
    "sector": "Aerospace",
    "sectorIcon": "✈️",
    "description": "AI for propulsion, navigation, and maintenance of aviation systems.",
    "score": 55,
    "trend": 10,
    "useCaseCount": 4,
    "aiPartners": ["NVIDIA", "Microsoft"],
    "knownLeader": "Olivier Andriès",
    "knownLeaderTitle": "CEO",
    "competitors": ["airbus", "thales"],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "Engine Predictive Maintenance",
        "status": "production",
        "department": "Propulsion",
        "description": "AI monitors LEAP and CFM56 engines in real-time."
      },
      {
        "title": "AI Quality Control",
        "status": "pilot",
        "department": "Production",
        "description": "Vision AI for manufacturing defect detection."
      }
    ]
  },
  {
    "id": "michelin",
    "name": "Michelin",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "AI revolutionizing materials R&D and tyre manufacturing.",
    "score": 53,
    "trend": 8,
    "useCaseCount": 4,
    "aiPartners": ["Microsoft", "AWS"],
    "knownLeader": "Florent Menegaux",
    "knownLeaderTitle": "CEO",
    "competitors": ["stellantis", "renault", "schneider-electric"],
    "accentColor": "#1E40AF",
    "useCases": [
      {
        "title": "AI Materials R&D",
        "status": "production",
        "department": "R&D",
        "description": "AI accelerates discovery of new rubber compounds."
      },
      {
        "title": "Manufacturing Process Optimization",
        "status": "pilot",
        "department": "Production",
        "description": "GenAI optimizes vulcanization parameters."
      }
    ]
  },
  {
    "id": "danone",
    "name": "Danone",
    "sector": "Retail",
    "sectorIcon": "🛒",
    "description": "AI optimizing supply chain, marketing, and product development.",
    "score": 51,
    "trend": 9,
    "useCaseCount": 4,
    "aiPartners": ["Microsoft", "Google"],
    "knownLeader": "Antoine de Saint-Affrique",
    "knownLeaderTitle": "CEO",
    "competitors": ["carrefour", "pernod-ricard"],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Supply Chain Optimization",
        "status": "production",
        "department": "Supply Chain",
        "description": "AI reduces stockouts and optimizes flows."
      },
      {
        "title": "AI Product Innovation",
        "status": "pilot",
        "department": "R&D",
        "description": "LLM generates concepts for new food products."
      }
    ]
  },
  {
    "id": "lvmh",
    "name": "LVMH",
    "sector": "Luxury & Fashion",
    "sectorIcon": "✨",
    "description": "Luxury giant exploring AI for customer experience and creativity.",
    "score": 49,
    "trend": 7,
    "useCaseCount": 4,
    "aiPartners": ["Microsoft", "Google"],
    "knownLeader": "Bernard Arnault",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["hermes", "kering", "loreal"],
    "accentColor": "#B45309",
    "useCases": [
      {
        "title": "Luxury E-Commerce Personalization",
        "status": "production",
        "department": "Digital",
        "description": "AI personalizes the online shopping experience for each client."
      },
      {
        "title": "Product Traceability & Authenticity",
        "status": "pilot",
        "department": "Operations",
        "description": "LLM and blockchain to certify product authenticity."
      },
      {
        "title": "Designer Creative Assistance",
        "status": "pilot",
        "department": "Creative",
        "description": "GenAI supports creators in exploring trends."
      }
    ]
  },
  {
    "id": "vinci",
    "name": "Vinci",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "Construction and concessions transformed by AI and digitalization.",
    "score": 47,
    "trend": 6,
    "useCaseCount": 3,
    "aiPartners": ["Microsoft", "AWS"],
    "knownLeader": "Xavier Huillard",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["bouygues", "saint-gobain"],
    "accentColor": "#F59E0B",
    "useCases": [
      {
        "title": "AI Construction Site Safety",
        "status": "production",
        "department": "HSE",
        "description": "AI video analysis to detect safety risks in real-time."
      },
      {
        "title": "Intelligent Motorway Management",
        "status": "pilot",
        "department": "Highways",
        "description": "AI optimizes traffic flow and anticipates incidents."
      }
    ]
  },
  {
    "id": "accor",
    "name": "Accor",
    "sector": "Retail",
    "sectorIcon": "🛒",
    "description": "Global hospitality investing in AI for customer experience and operations.",
    "score": 45,
    "trend": 8,
    "useCaseCount": 3,
    "aiPartners": ["Microsoft", "Google"],
    "knownLeader": "Sébastien Bazin",
    "knownLeaderTitle": "CEO",
    "competitors": ["danone", "carrefour"],
    "accentColor": "#DC2626",
    "useCases": [
      {
        "title": "Hotel AI Concierge",
        "status": "production",
        "department": "Customer Service",
        "description": "24/7 AI assistant for guest requests."
      },
      {
        "title": "AI Revenue Management",
        "status": "pilot",
        "department": "Revenue",
        "description": "AI optimizes prices in real-time based on demand."
      }
    ]
  },
  {
    "id": "kering",
    "name": "Kering",
    "sector": "Luxury & Fashion",
    "sectorIcon": "✨",
    "description": "Luxury group exploring generative AI for creation and personalization.",
    "score": 44,
    "trend": 11,
    "useCaseCount": 3,
    "aiPartners": ["Google", "Microsoft"],
    "knownLeader": "François-Henri Pinault",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["lvmh", "hermes", "loreal"],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "AI Trend Forecasting",
        "status": "production",
        "department": "Creative",
        "description": "LLM analyzes global trends to guide collections."
      },
      {
        "title": "Gucci/YSL Personalization",
        "status": "pilot",
        "department": "Retail",
        "description": "AI recommends personalized products in-store."
      }
    ]
  },
  {
    "id": "stellantis",
    "name": "Stellantis",
    "sector": "Automotive",
    "sectorIcon": "🚗",
    "description": "Automotive group in transformation, AI serving the connected vehicle.",
    "score": 43,
    "trend": 5,
    "useCaseCount": 3,
    "aiPartners": ["AWS", "Foxconn"],
    "knownLeader": "Carlos Tavares",
    "knownLeaderTitle": "CEO",
    "competitors": ["renault", "michelin"],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Embedded AI Voice Assistant",
        "status": "production",
        "department": "Connected Car",
        "description": "AI integrated in STLA Brain for connected vehicles."
      },
      {
        "title": "Fleet Predictive Maintenance",
        "status": "pilot",
        "department": "After-Sales",
        "description": "AI anticipates maintenance needs for fleets."
      }
    ]
  },
  {
    "id": "renault",
    "name": "Renault",
    "sector": "Automotive",
    "sectorIcon": "🚗",
    "description": "Automotive alliance using AI for autonomous vehicles and manufacturing.",
    "score": 43,
    "trend": 7,
    "useCaseCount": 3,
    "aiPartners": ["Google", "Qualcomm"],
    "knownLeader": "Luca de Meo",
    "knownLeaderTitle": "CEO",
    "competitors": ["stellantis", "michelin"],
    "accentColor": "#F59E0B",
    "useCases": [
      {
        "title": "Ampere — AI Software Vehicle",
        "status": "production",
        "department": "Software",
        "description": "Software-defined vehicle platform with embedded AI."
      },
      {
        "title": "After-Sales Chatbot",
        "status": "pilot",
        "department": "Customer Service",
        "description": "AI assists customers with diagnostics and maintenance."
      }
    ]
  },
  {
    "id": "hermes",
    "name": "Hermès",
    "sector": "Luxury & Fashion",
    "sectorIcon": "✨",
    "description": "Selective AI adoption preserving craftsmanship and brand exclusivity.",
    "score": 41,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Axel Dumas",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["lvmh", "kering", "loreal"],
    "accentColor": "#B45309",
    "useCases": [
      {
        "title": "AI Anti-Counterfeiting",
        "status": "production",
        "department": "Security",
        "description": "AI detects counterfeit products on online marketplaces."
      },
      {
        "title": "Intelligent Inventory Management",
        "status": "pilot",
        "department": "Supply Chain",
        "description": "AI optimizes stock while maintaining product exclusivity."
      }
    ]
  },
  {
    "id": "carrefour",
    "name": "Carrefour",
    "sector": "Retail",
    "sectorIcon": "🛒",
    "description": "Digital retail leveraging AI for supply chain and in-store experience.",
    "score": 39,
    "trend": 6,
    "useCaseCount": 3,
    "aiPartners": ["Microsoft", "Google"],
    "knownLeader": "Alexandre Bompard",
    "knownLeaderTitle": "CEO",
    "competitors": ["danone", "accor"],
    "accentColor": "#2563EB",
    "useCases": [
      {
        "title": "AI Food Waste Reduction",
        "status": "production",
        "department": "Logistics",
        "description": "LLM predicts expiry dates and optimizes product rotation."
      },
      {
        "title": "GPT Product Chatbot",
        "status": "production",
        "department": "E-Commerce",
        "description": "AI answers product questions for 10M online customers."
      }
    ]
  },
  {
    "id": "legrand",
    "name": "Legrand",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "Smart electrical infrastructure with early AI applications.",
    "score": 37,
    "trend": 5,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Benoît Coquart",
    "knownLeaderTitle": "CEO",
    "competitors": ["schneider-electric", "vinci"],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "AI Smart Buildings",
        "status": "production",
        "department": "Smart Building",
        "description": "AI optimizes electrical consumption in buildings."
      }
    ]
  },
  {
    "id": "veolia",
    "name": "Veolia",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "AI for water, waste, and sustainable energy management.",
    "score": 35,
    "trend": 7,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft", "AWS"],
    "knownLeader": "Estelle Brachlianoff",
    "knownLeaderTitle": "CEO",
    "competitors": ["engie", "totalenergies"],
    "accentColor": "#059669",
    "useCases": [
      {
        "title": "Water Network Leak Detection",
        "status": "production",
        "department": "Water",
        "description": "AI analyzes sensor data to detect leaks."
      },
      {
        "title": "Waste Sorting Optimization",
        "status": "pilot",
        "department": "Recycling",
        "description": "Vision AI to improve sorting and recycling."
      }
    ]
  },
  {
    "id": "credit-agricole",
    "name": "Crédit Agricole",
    "sector": "Banking",
    "sectorIcon": "🏦",
    "description": "France's largest retail bank at early stage in generative AI.",
    "score": 34,
    "trend": 8,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Philippe Brassac",
    "knownLeaderTitle": "Chairman & CEO",
    "competitors": ["bnp-paribas", "societe-generale", "axa"],
    "accentColor": "#15803D",
    "useCases": [
      {
        "title": "AI Advisor Assistant",
        "status": "pilot",
        "department": "Network",
        "description": "AI assists advisors in product recommendations."
      }
    ]
  },
  {
    "id": "air-liquide",
    "name": "Air Liquide",
    "sector": "Energy",
    "sectorIcon": "⚡",
    "description": "Industrial gases and healthcare exploring AI for operational optimization.",
    "score": 32,
    "trend": 5,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "François Jackow",
    "knownLeaderTitle": "CEO",
    "competitors": ["engie", "totalenergies"],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Hydrogen Production Optimization",
        "status": "pilot",
        "department": "Production",
        "description": "AI optimizes electrolyzer parameters."
      }
    ]
  },
  {
    "id": "saint-gobain",
    "name": "Saint-Gobain",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "Building materials and habitat solutions with a few AI initiatives.",
    "score": 31,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Benoît Bazin",
    "knownLeaderTitle": "CEO",
    "competitors": ["vinci", "schneider-electric"],
    "accentColor": "#DC2626",
    "useCases": [
      {
        "title": "AI Building Design",
        "status": "pilot",
        "department": "Architecture",
        "description": "AI assists architects in designing sustainable buildings."
      }
    ]
  },
  {
    "id": "bouygues",
    "name": "Bouygues",
    "sector": "Telecom",
    "sectorIcon": "📡",
    "description": "Telecom-construction conglomerate with early AI experiments.",
    "score": 29,
    "trend": 5,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Martin Bouygues",
    "knownLeaderTitle": "Chairman",
    "competitors": ["orange", "vinci"],
    "accentColor": "#1D4ED8",
    "useCases": [
      {
        "title": "Bouygues Telecom Chatbot",
        "status": "production",
        "department": "Customer Service",
        "description": "AI handles basic subscriber requests."
      }
    ]
  },
  {
    "id": "pernod-ricard",
    "name": "Pernod Ricard",
    "sector": "Retail",
    "sectorIcon": "🛒",
    "description": "Spirits and wines exploring AI for marketing and distribution.",
    "score": 27,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Alexandre Ricard",
    "knownLeaderTitle": "CEO",
    "competitors": ["danone", "lvmh"],
    "accentColor": "#B45309",
    "useCases": [
      {
        "title": "Marketing Personalization",
        "status": "pilot",
        "department": "Marketing",
        "description": "LLM generates personalized marketing messages per market."
      }
    ]
  },
  {
    "id": "arcelormittal",
    "name": "ArcelorMittal",
    "sector": "Industry",
    "sectorIcon": "⚙️",
    "description": "Steel and mining with AI applications for production and quality.",
    "score": 25,
    "trend": 3,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft", "AWS"],
    "knownLeader": "Aditya Mittal",
    "knownLeaderTitle": "CEO",
    "competitors": ["saint-gobain", "michelin"],
    "accentColor": "#F97316",
    "useCases": [
      {
        "title": "AI Steel Quality Control",
        "status": "pilot",
        "department": "Production",
        "description": "Vision AI to detect defects on steel coils."
      }
    ]
  },
  {
    "id": "essilorluxottica",
    "name": "EssilorLuxottica",
    "sector": "Pharma & Health",
    "sectorIcon": "💊",
    "description": "Global optics with emerging AI applications for visual diagnostics.",
    "score": 23,
    "trend": 3,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Francesco Milleri",
    "knownLeaderTitle": "CEO",
    "competitors": ["sanofi", "eurofins-scientific"],
    "accentColor": "#7C3AED",
    "useCases": [
      {
        "title": "AI Visual Diagnostics",
        "status": "pilot",
        "department": "Medical",
        "description": "AI detects ocular anomalies on fundus images."
      }
    ]
  },
  {
    "id": "vivendi",
    "name": "Vivendi",
    "sector": "Media & Advertising",
    "sectorIcon": "📢",
    "description": "Media group under restructuring with a few AI pilots in content creation.",
    "score": 24,
    "trend": 6,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft"],
    "knownLeader": "Yannick Bolloré",
    "knownLeaderTitle": "CEO",
    "competitors": ["publicis-groupe"],
    "accentColor": "#1D4ED8",
    "useCases": [
      {
        "title": "AI Subtitling for Canal+",
        "status": "pilot",
        "department": "Production",
        "description": "LLM auto-generates subtitles for content."
      }
    ]
  },
  {
    "id": "worldline",
    "name": "Worldline",
    "sector": "Services",
    "sectorIcon": "🎧",
    "description": "Payments and financial services with AI applications for fraud.",
    "score": 30,
    "trend": 4,
    "useCaseCount": 2,
    "aiPartners": ["Microsoft", "AWS"],
    "knownLeader": "Gilles Grapinet",
    "knownLeaderTitle": "CEO",
    "competitors": ["bnp-paribas", "societe-generale"],
    "accentColor": "#0EA5E9",
    "useCases": [
      {
        "title": "Payment Fraud Detection",
        "status": "production",
        "department": "Risk",
        "description": "AI analyzes transactions in real-time to detect fraud."
      }
    ]
  },
  {
    "id": "unibail-rodamco",
    "name": "Unibail-Rodamco-Westfield",
    "sector": "Services",
    "sectorIcon": "🎧",
    "description": "Commercial real estate with early AI explorations.",
    "score": 21,
    "trend": 3,
    "useCaseCount": 1,
    "aiPartners": [],
    "knownLeader": "Jean-Marie Tritant",
    "knownLeaderTitle": "CEO",
    "competitors": ["accor", "vinci"],
    "accentColor": "#6366F1",
    "useCases": [
      {
        "title": "Visitor Flow Optimization",
        "status": "pilot",
        "department": "Operations",
        "description": "AI optimizes visitor routes in shopping malls."
      }
    ]
  },
  {
    "id": "eurofins-scientific",
    "name": "Eurofins Scientific",
    "sector": "Pharma & Health",
    "sectorIcon": "💊",
    "description": "Scientific testing laboratories with a few AI applications for R&D.",
    "score": 19,
    "trend": 2,
    "useCaseCount": 1,
    "aiPartners": [],
    "knownLeader": "Gilles Martin",
    "knownLeaderTitle": "CEO",
    "competitors": ["sanofi", "essilorluxottica"],
    "accentColor": "#059669",
    "useCases": [
      {
        "title": "Lab Results Interpretation",
        "status": "pilot",
        "department": "Laboratory",
        "description": "LLM helps biologists interpret analysis results."
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
