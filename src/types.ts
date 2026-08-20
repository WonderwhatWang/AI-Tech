export type TechCategory = 
  | 'all'
  | 'nlp'
  | 'vision'
  | 'multimodal'
  | 'agent'
  | 'infra'
  | 'audio'
  | 'robotics';

export type MaturityLevel = '入門應用級' | '實用工程級' | '前沿探索級';

export interface InteractiveDemoConfig {
  type: 'rag' | 'agent' | 'diffusion' | 'cot' | 'lora' | 'embedding' | 'multimodal';
  title: string;
  description: string;
}

export interface AITechnology {
  id: string;
  name: string;
  englishName: string;
  shortDefinition: string;
  category: TechCategory;
  categoryLabel: string;
  tags: string[];
  maturity: MaturityLevel;
  yearIntroduced: string;
  iconName: string;
  accentColor: string; // Tailwind color reference or hex
  
  // Detailed Explanations
  corePrinciple: string;
  architectureSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  
  strengths: string[];
  limitations: string[];
  
  useCases: {
    title: string;
    industry: string;
    scenario: string;
  }[];
  
  representativeTools: {
    name: string;
    type: '開源模型' | '商業服務' | '開發框架' | '基礎設施';
    description: string;
    link?: string;
  }[];
  
  codeSnippet: {
    language: string;
    title: string;
    code: string;
    explanation: string;
  };
  
  comparisonMetrics: {
    computeCost: number; // 1 to 5
    latency: number; // 1 to 5 (1 is fastest, 5 is slowest)
    customizationEase: number; // 1 to 5
    dataRequirement: number; // 1 to 5
    realTimeCapability: number; // 1 to 5
  };
  
  interactiveDemo?: InteractiveDemoConfig;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  englishTerm: string;
  category: string;
  definition: string;
  formulaOrIntuition?: string;
  relatedTechIds: string[];
}
