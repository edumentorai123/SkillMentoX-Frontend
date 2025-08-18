import { 
  Code, 
  Brain, 
  Shield, 
  Smartphone, 
  Cloud, 
  Database,
  LucideIcon
} from 'lucide-react';

export interface CourseCategory {
  title: string;
  color: string;
  icon: LucideIcon;
  students: string;
  courses: string;
  duration: string;
  rating: number;
  sub: Record<string, string[]>;
}

export const courseCategories: CourseCategory[] = [
  {
    title: "Web Development",
    color: "#1887A1",
    icon: Code,
    students: "15,420",
    courses: "24",
    duration: "3-6 months",
    rating: 4.8,
    sub: {
      "Frontend": [
        "HTML & CSS Fundamentals", 
        "JavaScript ES6+", 
        "React.js & Hooks", 
        "Next.js 14", 
        "Vue.js 3", 
        "Angular 16", 
        "Tailwind CSS"
      ],
      "Backend": [
        "Node.js & Express", 
        "NestJS Framework", 
        "Django & REST APIs", 
        "Spring Boot"
      ],
      "Full Stack": [
        "MERN Stack Complete", 
        "MEAN Stack", 
        "Next.js + Prisma + PostgreSQL"
      ]
    }
  },
  {
    title: "AI / Machine Learning",
    color: "#8B5CF6",
    icon: Brain,
    students: "12,890",
    courses: "18",
    duration: "4-8 months",
    rating: 4.9,
    sub: {
      "Machine Learning": [
        "Python for AI/ML",
        "NumPy, Pandas & Matplotlib",
        "Scikit-learn Mastery",
        "TensorFlow & Keras",
        "PyTorch Deep Learning"
      ],
      "Deep Learning": [
        "Neural Networks",
        "CNNs & Computer Vision",
        "RNNs & NLP",
        "Transformers & BERT"
      ],
      "Generative AI": [
        "LangChain Development",
        "OpenAI API Integration",
        "Custom AI Applications"
      ]
    }
  },
  {
    title: "Cybersecurity",
    color: "#EF4444",
    icon: Shield,
    students: "8,750",
    courses: "16",
    duration: "3-5 months",
    rating: 4.7,
    sub: {
      "Security Fundamentals": [
        "Cybersecurity Basics",
        "Network Security",
        "Cryptography",
        "Security Frameworks"
      ],
      "Ethical Hacking": [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Web App Security",
        "Mobile Security"
      ],
      "Cloud Security": [
        "AWS Security",
        "Azure Security",
        "Incident Response"
      ]
    }
  },
  {
    title: "Mobile Development",
    color: "#10B981",
    icon: Smartphone,
    students: "11,200",
    courses: "14",
    duration: "2-4 months",
    rating: 4.6,
    sub: {
      "Cross-Platform": [
        "Flutter Development",
        "React Native",
        "Dart Programming"
      ],
      "Native iOS": [
        "Swift Programming",
        "UIKit & SwiftUI",
        "Core Data"
      ],
      "Native Android": [
        "Kotlin Development",
        "Android Jetpack",
        "Room Database"
      ]
    }
  },
  {
    title: "Cloud & DevOps",
    color: "#F59E0B",
    icon: Cloud,
    students: "9,650",
    courses: "20",
    duration: "4-6 months",
    rating: 4.8,
    sub: {
      "Cloud Platforms": [
        "AWS Fundamentals",
        "Azure Essentials",
        "Google Cloud Platform"
      ],
      "DevOps Tools": [
        "Docker & Containers",
        "Kubernetes",
        "CI/CD Pipelines",
        "Jenkins & GitLab"
      ],
      "Infrastructure": [
        "Terraform",
        "Ansible",
        "Monitoring & Logging"
      ]
    }
  },
  {
    title: "Data Engineering",
    color: "#6366F1",
    icon: Database,
    students: "7,420",
    courses: "12",
    duration: "3-5 months",
    rating: 4.7,
    sub: {
      "Databases": [
        "SQL Mastery",
        "NoSQL Databases",
        "Database Design"
      ],
      "Big Data": [
        "Apache Hadoop",
        "Apache Spark",
        "Data Warehousing"
      ],
      "Data Pipelines": [
        "Apache Airflow",
        "Apache Kafka",
        "ETL Processes"
      ]
    }
  }
];