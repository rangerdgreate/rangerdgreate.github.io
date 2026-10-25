export const profile = {
  name: 'Ranger Aganon F. Wagayen',
  shortName: 'Ranger Wagayen',
  headline: 'IT Student | Computer Security Major | Full-Stack & Cybersecurity Enthusiast',
  email: 'wagayenranger@gmail.com',
  github: 'https://github.com/rangerdgreate',
  university: 'PHINMA Araullo University',
  degree: 'Bachelor of Science in Information Technology',
  major: 'Computer Security',
  year: 'Fourth Year',
  introduction:
    "I'm an Information Technology student passionate about cybersecurity, software development, and building practical digital solutions. I develop web applications, explore security technologies, and continuously strengthen my technical skills through hands-on projects.",
  objective:
    "Motivated fourth-year Bachelor of Science in Information Technology student majoring in Computer Security at PHINMA Araullo University, seeking an On-the-Job Training (OJT) opportunity to apply my technical knowledge in cybersecurity, networking, and software development. Eager to gain practical industry experience, strengthen my professional skills, and contribute to an organization's IT operations.",
  resumeUrl: '/resume/Ranger_Aganon_F_Wagayen_Resume.pdf',
}

export const navigation = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['certifications', 'Certifications'],
  ['resume', 'Resume'],
  ['contact', 'Contact'],
] as const

export const interests = [
  'Cybersecurity',
  'Full-Stack Development',
  'Network Security',
  'Python Development',
  'Linux',
]

export const skillGroups = [
  {
    id: 'code',
    title: 'Programming & web',
    caption: 'Building practical digital experiences',
    skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js'],
  },
  {
    id: 'security',
    title: 'Security & networking',
    caption: 'Exploring systems and security tools',
    skills: ['Kali Linux', 'Linux / Ubuntu', 'Burp Suite', 'Cisco Packet Tracer'],
  },
  {
    id: 'database',
    title: 'Database',
    caption: 'Working with application data',
    skills: ['MongoDB'],
  },
  {
    id: 'virtualization',
    title: 'Virtualization',
    caption: 'Learning in virtual environments',
    skills: ['VirtualBox', 'VMware'],
  },
] as const
