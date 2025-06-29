import { NextRequest, NextResponse } from 'next/server';

interface ProjectSuggestion {
  type: 'publication' | 'skill' | 'education';
  title: string;
  description: string;
  relevance: number;
  category: string;
  tags: string[];
}

interface RequestData {
  resumeData: {
    skills: string[];
  };
  scholarData: {
    researchInterests: string[];
  };
}

const projectTemplates = {
  'Data Science': [
    {
      title: 'Data Analysis Pipeline',
      description: 'Build a data analysis pipeline for {domain} using Python. Implement data cleaning, visualization, and statistical analysis.',
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    },
    {
      title: 'Big Data Processing System',
      description: 'Create a big data processing system for {domain} using distributed computing frameworks.',
      tags: ['Python', 'Spark', 'Hadoop', 'Data Engineering'],
    },
  ],
  'AI/ML': [
    {
      title: 'Machine Learning Model for {domain}',
      description: 'Develop a machine learning model to solve {domain} problems using {framework}. Implement data preprocessing, model training, and evaluation pipeline.',
      tags: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn'],
    },
    {
      title: 'Natural Language Processing System',
      description: 'Build an NLP system for {domain} using transformer models. Implement text preprocessing, model fine-tuning, and API integration.',
      tags: ['Python', 'HuggingFace', 'NLP', 'Deep Learning'],
    },
  ],
  'Web Development': [
    {
      title: 'Full-Stack {framework} Application',
      description: 'Create a full-stack application using {framework} for {domain}. Implement responsive design, authentication, and real-time features.',
      tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Progressive Web App',
      description: 'Develop a PWA for {domain} with offline capabilities, push notifications, and responsive design.',
      tags: ['JavaScript', 'React', 'Service Workers', 'PWA'],
    },
  ],
  'Cybersecurity': [
    {
      title: 'Security Analysis Tool',
      description: 'Develop a security analysis tool for {domain} with vulnerability scanning and threat detection capabilities.',
      tags: ['Python', 'Security', 'Networking', 'Cryptography'],
    },
    {
      title: 'Secure Authentication System',
      description: 'Build a secure authentication system with multi-factor authentication and encryption.',
      tags: ['JavaScript', 'Security', 'Authentication', 'Cryptography'],
    },
  ],
};

const skillToDomain: { [key: string]: string[] } = {
  'Node.js': ['Web Development'],
  'TensorFlow': ['AI/ML'],
  'PyTorch': ['AI/ML'],
  'Pandas': ['Data Science'],
  'Python': ['AI/ML', 'Data Science', 'Cybersecurity'],
  'JavaScript': ['Web Development', 'Cybersecurity'],
  'React': ['Web Development'],
  'Machine Learning': ['AI/ML', 'Data Science'],
  'Deep Learning': ['AI/ML'],
  'NLP': ['AI/ML'],
  'Data Analysis': ['Data Science'],
  'Security': ['Cybersecurity'],
};

const interestToDomain: { [key: string]: string[] } = {
  'Artificial Intelligence': ['AI/ML'],
  'Machine Learning': ['AI/ML'],
  'Natural Language Processing': ['AI/ML'],
  'Computer Vision': ['AI/ML'],
  'Data Mining': ['Data Science'],
  'Big Data': ['Data Science'],
  'Web Development': ['Web Development'],
  'Cybersecurity': ['Cybersecurity'],
  'Network Security': ['Cybersecurity'],
  'Software Engineering': ['Web Development'],
};

function calculateRelevance(
  suggestion: Omit<ProjectSuggestion, 'relevance'>,
  skills: string[],
  interests: string[]
): number {
  let relevance = 0;
  
  suggestion.tags.forEach(tag => {
    if (skills.some(skill => skill.toLowerCase().includes(tag.toLowerCase()))) {
      relevance += 2;
    }
  });

  if (interests.some(interest => 
    suggestion.description.toLowerCase().includes(interest.toLowerCase())
  )) {
    relevance += 1;
  }

  return relevance;
}

function generateSuggestions(
  skills: string[],
  interests: string[]
): ProjectSuggestion[] {
  const suggestions: ProjectSuggestion[] = [];
  const domains = new Set<string>();

  skills.forEach(skill => {
    const skillDomains = skillToDomain[skill] || [];
    skillDomains.forEach(domain => domains.add(domain));
  });

  interests.forEach(interest => {
    const interestDomains = interestToDomain[interest] || [];
    interestDomains.forEach(domain => domains.add(domain));
  });

  domains.forEach(domain => {
    const templates = projectTemplates[domain as keyof typeof projectTemplates] || [];
    
    templates.forEach(template => {
      const title = template.title.replace('{domain}', domain);
      const description = template.description
        .replace('{domain}', domain)
        .replace('{framework}', template.tags[0]);

      const suggestionBase = {
        type: 'skill' as const,
        title,
        description,
        category: domain,
        tags: template.tags,
      };

      const suggestion: ProjectSuggestion = {
        ...suggestionBase,
        relevance: calculateRelevance(suggestionBase, skills, interests),
      };

      suggestions.push(suggestion);
    });
  });

  return suggestions
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
}

export async function POST(request: NextRequest) {
  try {
    const { resumeData, scholarData }: RequestData = await request.json();

    if (!resumeData?.skills || !scholarData?.researchInterests) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    const suggestions = generateSuggestions(
      resumeData.skills,
      scholarData.researchInterests
    );

    return NextResponse.json(suggestions);
  } catch (error: any) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
} 