/**
 * GEO (Generative Engine Optimization) Helpers
 * These utilities help optimize content for AI-powered search engines like
 * ChatGPT, Claude, Bard, and other LLMs
 */

// Entity-based content structure for better GEO
export interface EntityContent {
  entity: string;
  type: string;
  description: string;
  attributes: Record<string, string>;
  relationships: Array<{ entity: string; relationship: string }>;
}

// Generate entity-rich content for GEO
export const generateEntityContent = (content: EntityContent): string => {
  const { entity, type, description, attributes, relationships } = content;
  
  let output = `${entity} is a ${type}. ${description}\n\n`;
  
  // Add attributes in natural language
  if (Object.keys(attributes).length > 0) {
    output += "Key characteristics include:\n";
    Object.entries(attributes).forEach(([key, value]) => {
      output += `- ${key}: ${value}\n`;
    });
    output += "\n";
  }
  
  // Add relationships
  if (relationships.length > 0) {
    output += "Related to:\n";
    relationships.forEach(rel => {
      output += `- ${rel.entity} (${rel.relationship})\n`;
    });
  }
  
  return output;
};

// Optimize headings for question-based queries (AEO + GEO)
export const generateQuestionBasedHeadings = (topic: string): string[] => {
  return [
    `What is ${topic}?`,
    `How does ${topic} work?`,
    `Why choose ${topic}?`,
    `When should you use ${topic}?`,
    `Where can you find ${topic}?`,
    `Who benefits from ${topic}?`
  ];
};

// Generate context-rich descriptions for GEO
export const enrichContextForGEO = (
  topic: string,
  mainContext: string,
  relatedConcepts: string[],
  useCases: string[]
): string => {
  let content = `${topic}: ${mainContext}\n\n`;
  
  // Add related concepts for entity understanding
  if (relatedConcepts.length > 0) {
    content += `${topic} is closely related to ${relatedConcepts.join(", ")}. `;
  }
  
  // Add practical use cases for better understanding
  if (useCases.length > 0) {
    content += `Common applications include ${useCases.join(", ")}. `;
  }
  
  return content;
};

// Generate comparison content for "vs" queries
export const generateComparisonContent = (
  itemA: { name: string; pros: string[]; cons: string[] },
  itemB: { name: string; pros: string[]; cons: string[] },
  context: string
): string => {
  let content = `Comparing ${itemA.name} vs ${itemB.name}: ${context}\n\n`;
  
  content += `${itemA.name} advantages:\n`;
  itemA.pros.forEach(pro => content += `- ${pro}\n`);
  
  content += `\n${itemB.name} advantages:\n`;
  itemB.pros.forEach(pro => content += `- ${pro}\n`);
  
  content += `\nBest for: ${itemA.name} is ideal when ${itemA.pros[0]}, `;
  content += `while ${itemB.name} excels when ${itemB.pros[0]}.`;
  
  return content;
};

// Optimize for voice search and natural language queries
export const optimizeForVoiceSearch = (content: string): string => {
  // Add conversational phrases
  const conversationalPhrases = [
    "Simply put,",
    "In other words,",
    "To put it another way,",
    "Here's what that means:",
    "The bottom line is"
  ];
  
  // Make content more conversational
  return content.replace(/\. ([A-Z])/g, (match, letter) => {
    return Math.random() > 0.7 
      ? `. ${conversationalPhrases[Math.floor(Math.random() * conversationalPhrases.length)]} ${letter}`
      : match;
  });
};

// Generate "How-to" content structure for AEO
export const generateHowToContent = (
  title: string,
  steps: Array<{ step: string; description: string; tip?: string }>
): string => {
  let content = `How to ${title}:\n\n`;
  
  steps.forEach((step, index) => {
    content += `Step ${index + 1}: ${step.step}\n`;
    content += `${step.description}\n`;
    if (step.tip) {
      content += `💡 Pro tip: ${step.tip}\n`;
    }
    content += '\n';
  });
  
  return content;
};

// Add statistical credibility for GEO
export const addStatisticalContext = (
  claim: string,
  statistics: Array<{ stat: string; source?: string }>
): string => {
  let content = `${claim}\n\n`;
  
  content += "Supporting data:\n";
  statistics.forEach(stat => {
    content += `• ${stat.stat}`;
    if (stat.source) {
      content += ` (Source: ${stat.source})`;
    }
    content += '\n';
  });
  
  return content;
};

// Generate location-aware content for local SEO/GEO
export const generateLocationContext = (
  service: string,
  locations: string[],
  globalAvailability: boolean = false
): string => {
  let content = `${service} is available `;
  
  if (globalAvailability) {
    content += `globally with specialized support in ${locations.join(", ")}. `;
    content += `We serve clients worldwide with 24/7 availability and multilingual support.`;
  } else {
    content += `in ${locations.join(", ")} with plans to expand to additional regions.`;
  }
  
  return content;
};

// Generate list-based content for featured snippets
export const generateListContent = (
  title: string,
  items: Array<{ name: string; description: string }>,
  introText?: string
): string => {
  let content = introText ? `${introText}\n\n` : '';
  content += `${title}:\n\n`;
  
  items.forEach((item, index) => {
    content += `${index + 1}. ${item.name}\n`;
    content += `   ${item.description}\n\n`;
  });
  
  return content;
};

// Optimize meta descriptions for GEO
export const optimizeMetaDescription = (
  description: string,
  maxLength: number = 155
): string => {
  // Ensure description is concise and includes key information
  if (description.length <= maxLength) {
    return description;
  }
  
  // Truncate at sentence boundary
  const sentences = description.split('. ');
  let optimized = '';
  
  for (const sentence of sentences) {
    if ((optimized + sentence).length < maxLength - 3) {
      optimized += sentence + '. ';
    } else {
      break;
    }
  }
  
  return optimized.trim() || description.substring(0, maxLength - 3) + '...';
};

// Generate citation-friendly content
export const generateCitableContent = (
  fact: string,
  context: string,
  source?: string
): string => {
  let content = `${fact} ${context}`;
  
  if (source) {
    content += ` According to ${source}, this information is verified and up-to-date.`;
  }
  
  return content;
};

// Add temporal context for time-sensitive queries
export const addTemporalContext = (
  content: string,
  timeframe: string,
  lastUpdated?: Date
): string => {
  let enhanced = content;
  
  if (lastUpdated) {
    enhanced += ` This information is current as of ${lastUpdated.toLocaleDateString()}.`;
  }
  
  enhanced += ` ${timeframe}`;
  
  return enhanced;
};

// Generate problem-solution content structure
export const generateProblemSolutionContent = (
  problem: string,
  solution: string,
  benefits: string[],
  implementation?: string
): string => {
  let content = `Problem: ${problem}\n\n`;
  content += `Solution: ${solution}\n\n`;
  
  content += `Benefits:\n`;
  benefits.forEach(benefit => {
    content += `• ${benefit}\n`;
  });
  
  if (implementation) {
    content += `\nImplementation: ${implementation}`;
  }
  
  return content;
};

// Optimize for "Best" queries
export const generateBestOfContent = (
  category: string,
  items: Array<{ name: string; reason: string; rating?: number }>,
  criteria: string[]
): string => {
  let content = `Best ${category} (Evaluated based on: ${criteria.join(", ")}):\n\n`;
  
  items.forEach((item, index) => {
    content += `${index + 1}. ${item.name}`;
    if (item.rating) {
      content += ` (Rating: ${item.rating}/5)`;
    }
    content += `\n   Why it's great: ${item.reason}\n\n`;
  });
  
  return content;
};

// Add expertise signals for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
export const addExpertiseSignals = (
  content: string,
  expertise: {
    author?: string;
    credentials?: string;
    experience?: string;
    certification?: string;
  }
): string => {
  let enhanced = content;
  
  if (expertise.author) {
    enhanced += `\n\nExpert insight from ${expertise.author}`;
    if (expertise.credentials) {
      enhanced += `, ${expertise.credentials}`;
    }
    enhanced += '.';
  }
  
  if (expertise.experience) {
    enhanced += ` With ${expertise.experience}, this advice is backed by real-world experience.`;
  }
  
  if (expertise.certification) {
    enhanced += ` Certified in ${expertise.certification}.`;
  }
  
  return enhanced;
};

// Generate multilingual content hints for global GEO
export const addMultilingualContext = (
  content: string,
  availableLanguages: string[]
): string => {
  return `${content}\n\nAvailable in multiple languages: ${availableLanguages.join(", ")}. ` +
         `This ensures global accessibility and understanding across diverse audiences.`;
};

// Optimize for long-tail keywords
export const generateLongTailContent = (
  shortKeyword: string,
  longTailVariations: string[],
  content: string
): string => {
  let enhanced = `${content}\n\n`;
  enhanced += `Related topics: ${longTailVariations.join(", ")}. `;
  enhanced += `Whether you're looking for ${longTailVariations[0]} or ${longTailVariations[1]}, `;
  enhanced += `${shortKeyword} provides comprehensive solutions.`;
  
  return enhanced;
};

