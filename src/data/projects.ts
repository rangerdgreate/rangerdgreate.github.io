import { cyberscanDemoUrl } from './liveDemos'

export type Project = {
  id: string
  name: string
  fullName: string
  category: string
  role: string
  summary: string
  technologies: string[]
  features: string[]
  note: string
  visibility: 'Private' | 'Public'
  repository?: string
  liveUrl?: string
  training?: boolean
}

export const projects: Project[] = [
  {
    id: 'cyberscan',
    liveUrl: cyberscanDemoUrl,
    name: 'CyberScan',
    fullName: 'CyberScan — Web Vulnerability Assessment Platform',
    category: 'Security assessment',
    role: 'Solo Developer · AI-Assisted Development',
    summary:
      'A Python-based platform for authorized web security assessments. Explore potential vulnerabilities through automated checks, risk classification, and clear reporting.',
    technologies: [
      'Python',
      'Flask',
      'HTML',
      'CSS',
      'JavaScript',
      'Requests',
      'BeautifulSoup',
      'MongoDB (optional)',
    ],
    features: [
      'Quick, Full, and Authenticated scanning profiles',
      'OWASP-aligned checks and security configuration analysis',
      'HTTP security header inspection and SSL/TLS checks',
      'Potential XSS and SQL injection indicators',
      'Severity classification, risk scoring, and a findings dashboard',
      'Scan history, report generation, and comparison of previous and current findings',
    ],
    note: 'Built for authorized assessments. Findings indicate potential vulnerabilities and require validation; automated checks do not identify every vulnerability.',
    visibility: 'Private',
  },
  {
    id: 'shopora',
    name: 'Shopora',
    fullName: 'Shopora — Full-Stack E-Commerce & Delivery Management System',
    category: 'Full-stack development',
    role: 'Solo Full-Stack Developer',
    summary:
      'An independently built commerce demonstration connecting customer shopping, inventory, order processing, and delivery operations across web and Android applications.',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express 5',
      'MongoDB',
      'Mongoose',
      'React Native',
      'Expo',
      'CSS',
    ],
    features: [
      'Customer, administrator, and driver roles',
      'Product, category, and inventory management',
      'Shopping cart, checkout, order history, and tracking',
      'Driver assignments and optional GPS tracking during deliveries',
      'Cash-on-delivery collection and reconciliation',
      'Session-based authentication, role-based authorization, and two-factor authentication',
      'CSRF protection, validation, and rate limiting',
      'A web application and a separate Android customer application sharing a backend',
    ],
    note: 'A demonstration project developed with AI-assisted workflows. Electronic payments are simulated. The public website is a frontend-only portfolio demo with fictional products, a guest bag, and simulated checkout. No real accounts, payments, deliveries, email, or GPS operations are available. Full-stack source and operational tools remain private; no production Android release is claimed.',
    visibility: 'Private',
    liveUrl: 'https://resonant-fudge-df3c7e.netlify.app/',
  },
  {
    id: 'webguard',
    name: 'WebGuard',
    fullName: 'WebGuard — Cybersecurity Capstone Project',
    category: 'Group capstone',
    role: 'Project Manager',
    summary:
      'A group cybersecurity capstone with a browser extension, an OTP server component, setup tools, and documentation. My contribution centered on leading and coordinating the project.',
    technologies: ['Browser extension', 'OTP server', 'Setup tools', 'Project documentation'],
    features: [
      'Project leadership and team coordination',
      'Planning and documentation',
      'Understanding the system and its components',
      'Group project package containing a browser extension, OTP server component, setup tools, and documentation',
    ],
    note: 'A collaborative capstone. My role was Project Manager; I do not claim to have individually programmed the entire system. Group-owned source and materials remain private.',
    visibility: 'Private',
  },
  {
    id: 'stellar',
    name: 'Stellar / Soroban',
    fullName: 'Stellar / Soroban Blockchain Workshop Project',
    category: 'Training & exploration',
    role: 'Seminar Participant / Hands-on Developer',
    summary:
      'A guided technical seminar exploring decentralized application concepts, with a React bill-splitting interface, Rust smart contract examples, and blockchain transaction workflows.',
    technologies: [
      'React',
      'TypeScript',
      'Rust',
      'Soroban SDK',
      'Stellar Blockchain',
      'Vite',
      'Freighter Wallet',
    ],
    features: [
      'React-based bill-splitting interface',
      'Rust smart contract examples using Soroban',
      'Wallet integration and transaction workflow examples',
      'Hands-on exploration of decentralized application concepts',
    ],
    note: 'Completed as a guided seminar activity. The frontend and contract examples are not presented as one verified, fully integrated application.',
    visibility: 'Public',
    repository: 'https://github.com/rangerdgreate/stellarproject2026',
    training: true,
  },
]
