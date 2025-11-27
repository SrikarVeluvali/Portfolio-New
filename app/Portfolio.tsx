'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Github, Linkedin, Mail, FileText, Code, Youtube, Zap, Star, Rocket, Award } from 'lucide-react'
import dynamic from 'next/dynamic'

const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false })

type SectionRefs = {
  [key: string]: HTMLElement | null;
}

type CGPAData = {
  year: number;
  sem1: number | null;
  sem2: number | null;
}

export default function ComicBookPortfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCertificate, setActiveCertificate] = useState(0)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const sectionRefs = useRef<SectionRefs>({})
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const achievements = [
    'Consistently achieved the highest academic standing as the Branch Topper across all semesters.',
    'Silver Medal in Python for Data Science - IIT Madras (Top 5% - Scored 84%)',
    'Silver Medal in Programming in Java - IIT Kharagpur (Top 5% - Scored 78%)',
    'Deep Learning using Python - IIT Hyderabad (Completed February 2023)',
    'Prompt Design and Developing Generative AI Apps - Google (Awarded May 2024)',
    'Top Performer in Coding Challenges - LeetCode (Solved 1122+ problems)',
    '2-Star Rating on Codechef for Competitive Programming',
    'Nominee for People\'s Choice Award - Google Gemini API Developer Competition (2024)'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'cgpa', 'skills', 'experience', 'projects', 'education', 'achievements', 'contact']
      const currentSection = sections.find(section => {
        const element = sectionRefs.current[section]
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll certificates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCertificate((prev) => (prev + 1) % achievements.length)
    }, 5000) // Change certificate every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const cgpaData: CGPAData[] = [
    { year: 1, sem1: 9.84, sem2: 9.79 },
    { year: 2, sem1: 9.62, sem2: 9.86 },
    { year: 3, sem1: 9.26, sem2: 9.37 },
    { year: 4, sem1: null, sem2: null },
  ]

  const calculateYearCGPA = (sem1: number | null, sem2: number | null): string | null => {
    if (sem1 === null && sem2 === null) return null
    if (sem2 === null) return sem1?.toFixed(2) ?? null
    return (((sem1 ? sem1 : 0 )+ sem2) / 2).toFixed(2)
  }

  const skills = [
    { name: 'C/C++', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'Go (Golang)', category: 'Languages' },
    { name: 'CUDA', category: 'Languages' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'React.js', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Tailwind', category: 'Frontend' },
    { name: 'Bootstrap', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'Flask', category: 'Backend' },
    { name: 'MySQL', category: 'Databases' },
    { name: 'MongoDB', category: 'Databases' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Google Colab', category: 'Cloud' },
    { name: 'Azure DevOps', category: 'DevOps' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Version Control' },
    { name: 'GitHub', category: 'Version Control' },
    { name: 'Postman', category: 'Tools' },
    { name: 'Tableau', category: 'Tools' },
    { name: 'Azure Machine Learning Studio', category: 'Tools' },
    { name: 'Unix/Linux', category: 'Operating Systems' },
    { name: 'Windows NT', category: 'Operating Systems' },
    { name: 'VS Code', category: 'Tools' },
    { name: 'Visual Studio', category: 'Tools' },
    { name: 'StarUML', category: 'Tools' }
  ];

  const SkillCloud = () => {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill, index) => (
          <TooltipProvider key={skill.name}>
            <Tooltip>
              <TooltipTrigger>
                <motion.div
                  className="px-4 py-2 rounded-lg cursor-pointer font-medium text-slate-200 border border-slate-600 bg-slate-800/50 hover:bg-slate-700 hover:border-blue-500 backdrop-blur-sm transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2
                  }}
                >
                  {skill.name}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 text-slate-100 border border-slate-600">
                <p>{skill.category}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    )
  }

  const projects = [
    {
      title: 'PRISM: AI-Powered Learning Platform',
      description: 'Built PRISM, a comprehensive learning platform that leverages AI to transform how students study and prepare. Features include RAG-based document Q&A, AI-powered quiz generation, virtual interview practice, interactive flashcards, PDF annotation, mind maps, and progress analytics. Supports multiple formats including PDFs, Word documents, text files, and YouTube videos.',
      technologies: [
        'React',
        'FastAPI',
        'Groq API',
        'Pinecone',
        'MongoDB',
        'TipTap',
        'SentenceTransformers',
        'JWT',
        'Google OAuth'
      ],
      github: 'https://github.com/SrikarVeluvali/PRISM',
      liveUrl: 'https://prism-learning.vercel.app'
    },
    {
      title: 'Searchly: AI-Powered Product Recommendation System',
      description: 'Developed Searchly, an AI-driven e-commerce assistant built on a robust microservices architecture with an agentic workflow that orchestrates data scraping, embedding, retrieval, and UI interactions. Features include "Aivy" natural-language chat, personalized recommendations via HuggingFace embeddings and Pinecone vector search, real-time product data scraping, JWT-based authentication, and a responsive React/Tailwind UI.',
      technologies: [
        'Flask',
        'Python',
        'MongoDB',
        'Pinecone',
        'HuggingFace Embeddings',
        'Groq API',
        'BeautifulSoup',
        'React',
        'Tailwind CSS'
      ],
      github: 'https://github.com/SrikarVeluvali/Searchly',
      demoVideo: 'https://youtu.be/yYAuvi1P8ao?si=GjDO8zEUy3ubiXyN'
    },
    {
      title: 'Astor AI: A Chatbot for Medical Queries',
      description: 'Built a medical chatbot using the Llama 3 model with Retrieval Augmented Generation (RAG) for more accurate responses and faster query handling, optimized for local system use.',
      technologies: ['React.js', 'Flask', 'LLMs', 'Generative AI'],
      github: 'https://github.com/SrikarVeluvali/Astor-AI',
      demoVideo: 'https://youtu.be/k34QwkP7tRo?si=VtL6dCdv5l4p8wZ0'
    },
    {
      title: 'Heart Health Web Application',
      description: 'Developed a MERN stack web app with Machine Learning for heart disease prediction, offering personalized diet and exercise plans and integrating Google\'s Gemini AI for diet suggestions.',
      technologies: ['MERN', 'Machine Learning', 'Google Gemini AI', 'Flask'],
      github: 'https://github.com/SrikarVeluvali/HeartHealth',
      demoVideo: 'https://youtu.be/wXYNzBSrL6Y?si=_9QNNn5sYEwgYz9d'
    },
    {
      title: 'OCR Entity Extraction with BERT',
      description: 'Developed an Optical Character Recognition (OCR) system using PaddleOCR combined with a fine-tuned BERT model to extract and classify entities from text in images.',
      technologies: ['Optical Character Recognition', 'BERT', 'Python', 'Machine Learning'],
      github: 'https://github.com/SrikarVeluvali/NER-Using-BERT'
    },
    {
      title: 'Battle Engine (Remaster)',
      description: 'Developed a Pokemon-style RPG game using Java and Object-Oriented Programming concepts. Players engage in turn-based battles and progress through various levels with different strategies.',
      technologies: ['Java', 'OOPS'],
      github: 'https://github.com/SrikarVeluvali/battle-engine-remastered'
    },
    {
      title: 'Dataset - Extraction, Analysis, and Visualization',
      description: 'A Python-based data analysis project that explores the Video Game Sales Analysis dataset to answer 15 key questions related to video games. Presented at PRAKALP 2023.',
      technologies: ['Python', 'Data Analysis', 'Visualization','Tableau'],
      github: 'https://github.com/SrikarVeluvali/dataanalysis'
    },
    {
      title: 'LUNA and LEVI',
      description: 'AI-powered navigation assistants. LUNA is voice-based, while LEVI is text-based, designed to assist users with website navigation, answering queries, playing music, and more.',
      technologies: ['AI', 'Python'],
      github: 'https://github.com/SrikarVeluvali/lunalevi'
    },
    {
      title: 'Battle Engine',
      description: 'A text-based command-line game in C, simulating battles between the player and various bots. The game features strategic combat and a secret battle with a special challenge.',
      technologies: ['C', 'Command-line'],
      github: 'https://github.com/SrikarVeluvali/battleengine'
    }
  ];

  const experiences = [
    {
      title: 'Research Intern',
      company: 'Microsoft',
      period: 'Jan 2025 - Jul 2025',
      responsibilities: [
        'Researched optimization techniques to enhance the efficiency and scalability of kernels for large language models, minimizing latency and maximizing throughput',
        'Parsed, restructured, and improved the infrastructure of compiler intermediate code using graph transformations to boost performance',
        'Conducted performance profiling and benchmarking to validate improvements and ensure stability',
        'Collaborated with research and engineering teams to integrate optimized GPU kernel solutions into production workflows'
      ]
    },
    {
      title: 'CUDA Programming Intern',
      company: 'Defence Research Development Laboratory (DRDO)',
      period: 'Jun 2024 - Dec 2024',
      responsibilities: [
        'Contributed to the development and optimization of CUDA programs for Computational Fluid Dynamics (CFD) simulations',
        'Achieved a 25% reduction in processing time and enhanced computational efficiency on an NVIDIA RTX 4080 GPU',
        'Collaborated with a multidisciplinary team of engineers to implement high-performance computing solutions',
        'Improved overall simulation speed and accuracy through optimization of CUDA code',
        'Worked on high-performance computing and parallel processing techniques to improve simulation efficiency'
      ]
    }
  ];

  const calculateOverallCGPA = (): string => {
    let totalCGPA = 0
    let semesters = 0
    cgpaData.forEach(year => {
      if (year.sem1) {
        totalCGPA += year.sem1
        semesters++
      }
      if (year.sem2) {
        totalCGPA += year.sem2
        semesters++
      }
    })
    return semesters > 0 ? (totalCGPA / semesters).toFixed(2) : 'N/A'
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setContactForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const education = [
    {
      degree: 'Bachelor of Technology in Information Technology',
      institution: 'Keshav Memorial Institute of Technology',
      year: 'Expected 2026'
    },
    {
      degree: 'Class 12',
      institution: 'Sri Chaitanya Junior College',
      year: '2022'
    },
    {
      degree: 'Class 10',
      institution: 'Dilsukhnagar Public School',
      year: '2020'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-x-hidden">
      {/* Subtle dots background overlay */}
      <div className="fixed inset-0 opacity-30 halftone-bg pointer-events-none z-0"></div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Floating Hamburger Menu Button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 left-6 z-[60] w-14 h-14 rounded-full bg-slate-800/90 backdrop-blur-md border-2 border-slate-600 hover:border-blue-500 hover:bg-slate-700 transition-all shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </motion.button>

      {/* Sidebar Menu */}
      <motion.div
        className="fixed top-0 left-0 bottom-0 w-80 bg-slate-900/98 backdrop-blur-md border-r border-slate-700 shadow-2xl overflow-y-auto z-50"
        initial={{ x: '-100%' }}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 comic-title mb-2">
              SRIKAR VELUVALI
            </h2>
            <p className="text-sm text-slate-400">Full-Stack Developer & AI Enthusiast</p>
          </div>

          {/* Navigation Links */}
          <nav>
            <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              {['home', 'about', 'cgpa', 'skills', 'experience', 'projects', 'education', 'achievements', 'contact'].map((section, index) => (
                <motion.li
                  key={section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                  transition={{ delay: isMenuOpen ? index * 0.05 : 0 }}
                >
                  <a
                    href={`#${section}`}
                    onClick={() => {
                      scrollToSection(section)
                      setIsMenuOpen(false)
                    }}
                    className={`block py-3 px-5 text-sm font-semibold rounded-full transition-all ${
                      activeSection === section
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 hover:border-blue-500'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Social Links in Sidebar */}
          <div className="mt-10 pt-8 border-t border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com/SrikarVeluvali', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/srikarveluvali/', label: 'LinkedIn' },
                { icon: Code, href: 'https://leetcode.com/srikar_v05/', label: 'LeetCode' },
                { icon: Youtube, href: 'https://www.youtube.com/@SrikarVeluvali', label: 'YouTube' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl border border-slate-600 bg-slate-800/50 hover:bg-slate-700 hover:border-blue-500 transition-all flex items-center justify-center"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-slate-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main className="container mx-auto px-6 pt-12 relative z-10">
        {/* HERO SECTION */}
        <section id="home" ref={(el) => { sectionRefs.current['home'] = el }} className="min-h-screen flex items-center justify-center">
          <div className="text-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              className="relative z-10"
            >
              <Avatar className="w-40 h-40 mx-auto mb-8 border-4 border-slate-700 shadow-xl">
                <AvatarImage src="./S.jpg" alt="Srikar Veluvali" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-5xl font-bold text-white">SV</AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 comic-title text-slate-100">
                SRIKAR
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 comic-title text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                VELUVALI
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-semibold mb-8 comic-subtitle bg-slate-800/50 border border-slate-600 px-6 py-3 inline-block rounded-lg backdrop-blur-sm relative z-10"
            >
              <div className="text-slate-300">
                <Typewriter
                  options={{
                    strings: [
                      'Microsoft Research Intern',
                      'DRDL HPC Intern',
                      'AI/ML Enthusiast',
                      'Problem Solver',
                      'CUDA Programmer'
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 80,
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-slate-400 font-medium mb-12 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              IVth Year @ KMIT
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: Github, href: 'https://github.com/SrikarVeluvali', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/srikarveluvali/', label: 'LinkedIn' },
                { icon: Code, href: 'https://leetcode.com/srikar_v05/', label: 'LeetCode' },
                { icon: Youtube, href: 'https://www.youtube.com/@TheNullFlare', label: 'YouTube' }
              ].map(({ icon: Icon, href, label }, index) => (
                <TooltipProvider key={label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-12 h-12 rounded-lg border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700 hover:border-blue-500 transition-all backdrop-blur-sm"
                        >
                          <a href={href} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-5 w-5 text-slate-300" />
                          </a>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 text-slate-100 border border-slate-600">
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={(el) => { sectionRefs.current['about'] = el }} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              About Me
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="browser-window">
                {/* Browser Tabs */}
                <div className="browser-tabs-head">
                  <div className="browser-tab">
                    <div className="browser-tab-icon"></div>
                    <span>About - Srikar Veluvali</span>
                    <div className="browser-tab-close">×</div>
                  </div>
                  <div className="browser-window-controls">
                    <button className="browser-window-btn">−</button>
                    <button className="browser-window-btn">□</button>
                    <button className="browser-window-btn browser-window-close">×</button>
                  </div>
                </div>

                {/* Browser Address Bar */}
                <div className="browser-address-bar">
                  <button className="browser-nav-btn">←</button>
                  <button className="browser-nav-btn" disabled>→</button>
                  <input
                    type="text"
                    className="browser-url-input"
                    value="http://localhost:3000/about"
                    readOnly
                  />
                  <button className="browser-menu-btn browser-star">★</button>
                  <button className="browser-menu-btn">⋮</button>
                </div>

                {/* Browser Content */}
                <div className="browser-content">
                  <h1>👋 Hello, World!</h1>
                  <p>
                    I'm <span className="browser-highlight">Srikar Veluvali</span>, currently pursuing a Bachelor of Technology in Information Technology at Keshav Memorial Institute of Technology with a CGPA of <span className="browser-number">{calculateOverallCGPA()}</span>.
                  </p>

                  <p>
                    I've worked as a <span className="browser-highlight-alt">Research Intern at Microsoft</span> in Bengaluru. Previously, I was an <span className="browser-highlight-orange">HPC Software Engineering Intern at DRDL (DRDO)</span>.
                  </p>

                  <p>
                    I've built projects like <span className="browser-highlight-green">Astor AI</span>, a medical chatbot fine-tuned on Llama 3 with Retrieval-Augmented Generation achieving <span className="browser-number">400+</span> downloads, and a <span className="browser-highlight-pink">Heart Health Web App</span> using the MERN stack and machine learning with Google's Gemini AI for personalized plans, nominated for the <span className="browser-highlight-yellow">People's Choice Award in the Google Gemini API Developer Competition</span>.
                  </p>

                  <p>
                    When I'm not coding or tinkering with tech, I enjoy solving problems on <span className="browser-highlight-orange">LeetCode <span className="browser-number">(1122+ problems, rating 1713)</span></span> or exploring the latest in generative AI.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CGPA SECTION */}
        <section id="cgpa" ref={el => {sectionRefs.current['cgpa'] = el}} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Academic Performance
            </h2>

            <div className="max-w-5xl mx-auto">
              <Card className="bg-slate-800/50 border-2 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Overall CGPA - Prominent Display */}
                  <motion.div
                    className="text-center mb-10 pb-8 border-b border-slate-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-lg font-semibold text-slate-400 mb-2">Overall CGPA</p>
                    <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mb-3">
                      {calculateOverallCGPA()}
                    </p>
                    <Badge className="bg-yellow-600/20 text-yellow-300 border border-gold-100/50 px-5 py-3">
                      Branch Topper - All Semesters
                    </Badge>
                  </motion.div>

                  {/* Compact Year-wise Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cgpaData.map((year, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                      >
                        <h3 className="text-lg font-bold text-blue-400 mb-3 text-center">
                          Year {year.year}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Sem 1:</span>
                            <span className="text-slate-100 font-semibold">
                              {year.sem1 ? year.sem1.toFixed(2) : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Sem 2:</span>
                            <span className="text-slate-100 font-semibold">
                              {year.sem2 ? year.sem2.toFixed(2) : 'N/A'}
                            </span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-slate-600">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-400">Year CGPA:</span>
                              <span className="text-lg font-bold text-cyan-400">
                                {calculateYearCGPA(year.sem1, year.sem2) || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" ref={el => {sectionRefs.current['skills'] = el}} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Skills & Expertise
            </h2>

            <Card className="bg-slate-800/50 border-2 border-slate-700 backdrop-blur-sm max-w-6xl mx-auto">
              <CardContent className="p-10">
                <SkillCloud />
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" ref={el => {sectionRefs.current['experience'] = el}} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Work Experience
            </h2>

            <div className="max-w-5xl mx-auto space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-2 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl md:text-3xl comic-title text-slate-100">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-blue-400">{exp.company} | {exp.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="flex items-start text-base text-slate-300"
                          >
                            <span className="text-blue-400 mr-3 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" ref={el => {sectionRefs.current['projects'] = el}} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="terminal-container">
                    {/* Terminal Toolbar */}
                    <div className="terminal-toolbar">
                      <div className="terminal-buttons">
                        <button className="terminal-btn terminal-btn-red"></button>
                        <button className="terminal-btn terminal-btn-yellow"></button>
                        <button className="terminal-btn terminal-btn-green"></button>
                      </div>
                      <div className="terminal-title">{project.title}</div>
                      <div style={{ width: '52px' }}></div> {/* Spacer for centering */}
                    </div>

                    {/* Terminal Body */}
                    <div className="terminal-body">
                      <div className="terminal-line">
                        <span className="terminal-prompt">$</span>
                        <span className="terminal-command">cat README.md</span>
                      </div>

                      <div className="terminal-line">
                        <span className="terminal-output">{project.description}</span>
                      </div>

                      <div className="terminal-line" style={{ marginTop: '12px' }}>
                        <span className="terminal-prompt">$</span>
                        <span className="terminal-command">ls tech-stack/</span>
                      </div>

                      <div className="terminal-line">
                        <div className="terminal-output">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="terminal-tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="terminal-line" style={{ marginTop: '12px' }}>
                        <span className="terminal-prompt">$</span>
                        <span className="terminal-command">git remote -v</span>
                      </div>

                      <div className="terminal-line">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="terminal-link"
                        >
                          <Github className="h-4 w-4" />
                          <span>View on GitHub</span>
                        </a>
                      </div>

                      {'liveUrl' in project && project.liveUrl && (
                        <>
                          <div className="terminal-line" style={{ marginTop: '12px' }}>
                            <span className="terminal-prompt">$</span>
                            <span className="terminal-command">npm run deploy</span>
                          </div>

                          <div className="terminal-line">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="terminal-link"
                            >
                              <Rocket className="h-4 w-4" />
                              <span>View Live Demo</span>
                            </a>
                          </div>
                        </>
                      )}

                      {'demoVideo' in project && project.demoVideo && (
                        <>
                          <div className="terminal-line" style={{ marginTop: '12px' }}>
                            <span className="terminal-prompt">$</span>
                            <span className="terminal-command">play demo.mp4</span>
                          </div>

                          <div className="terminal-line">
                            <a
                              href={project.demoVideo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="terminal-link"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              <span>Watch Demo Video</span>
                            </a>
                          </div>
                        </>
                      )}

                      <div className="terminal-line" style={{ marginTop: '8px' }}>
                        <span className="terminal-prompt">$</span>
                        <span className="terminal-cursor"></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" ref={el => {sectionRefs.current['education'] = el}} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Education
            </h2>

            <div className="max-w-6xl mx-auto">
              <Card className="bg-slate-800/50 border-2 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Horizontal Timeline */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hidden md:block"></div>

                    {/* Timeline Items */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                      {/* Class 10 */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                        className="relative"
                      >
                        {/* Building Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="w-24 h-24 bg-slate-700/50 border-2 border-slate-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors">
                              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-800"></div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 text-center hover:border-blue-500/50 transition-colors mt-8 md:mt-12">
                          <div className="text-sm font-semibold text-blue-400 mb-2">2020</div>
                          <h3 className="font-bold text-lg text-slate-100 mb-2">Class 10</h3>
                          <p className="text-sm text-slate-300">Dilsukhnagar Public School</p>
                        </div>
                      </motion.div>

                      {/* Class 12 */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative"
                      >
                        {/* Building Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="w-24 h-24 bg-slate-700/50 border-2 border-slate-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors">
                              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-800"></div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 text-center hover:border-cyan-500/50 transition-colors mt-8 md:mt-12">
                          <div className="text-sm font-semibold text-cyan-400 mb-2">2022</div>
                          <h3 className="font-bold text-lg text-slate-100 mb-2">Class 12</h3>
                          <p className="text-sm text-slate-300">Sri Chaitanya Junior College</p>
                        </div>
                      </motion.div>

                      {/* B.Tech */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                      >
                        {/* Building Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="w-24 h-24 bg-slate-700/50 border-2 border-slate-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors">
                              <svg className="w-14 h-14 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                              </svg>
                            </div>
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-800"></div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5 text-center hover:border-blue-500/50 transition-colors mt-8 md:mt-12">
                          <div className="text-sm font-semibold text-blue-400 mb-2">Expected 2026</div>
                          <h3 className="font-bold text-lg text-slate-100 mb-2">B.Tech - IT</h3>
                          <p className="text-sm text-slate-300">Keshav Memorial Institute of Technology</p>
                          <Badge className="mt-3 bg-blue-600/20 text-blue-300 border border-blue-500/50 text-xs">
                            Branch Topper
                          </Badge>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" ref={el => {sectionRefs.current['achievements'] = el}} className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Achievements & Certifications
            </h2>

            <div className="max-w-4xl mx-auto">
              {/* Certificate Carousel */}
              <div className="relative min-h-[400px]">
                {/* Previous Button */}
                <button
                  onClick={() => setActiveCertificate((prev) => (prev - 1 + achievements.length) % achievements.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600 hover:border-blue-500 hover:bg-slate-600 transition-all flex items-center justify-center text-slate-300 hover:text-blue-400"
                  aria-label="Previous certificate"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={() => setActiveCertificate((prev) => (prev + 1) % achievements.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600 hover:border-blue-500 hover:bg-slate-600 transition-all flex items-center justify-center text-slate-300 hover:text-blue-400"
                  aria-label="Next certificate"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: activeCertificate === index ? 1 : 0,
                      scale: activeCertificate === index ? 1 : 0.9,
                      zIndex: activeCertificate === index ? 10 : 0,
                      display: activeCertificate === index ? 'block' : 'none'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Glass Certificate */}
                    <div className="certificate-glass">
                      {/* Decorative Corner */}
                      <div className="certificate-corner certificate-corner-tl"></div>
                      <div className="certificate-corner certificate-corner-tr"></div>
                      <div className="certificate-corner certificate-corner-bl"></div>
                      <div className="certificate-corner certificate-corner-br"></div>

                      {/* Certificate Header */}
                      <div className="text-center mb-8">
                        <div className="inline-block">
                          <Award className="w-16 h-16 text-blue-400 mx-auto" />
                        </div>
                        <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-4"></div>
                      </div>

                      {/* Certificate Content */}
                      <div className="certificate-content">
                        <p className="text-slate-200 leading-relaxed">
                          {achievement}
                        </p>
                      </div>

                      {/* Certificate Footer */}
                      <div className="mt-8 flex justify-between items-end">
                        <div className="text-left">
                          <div className="h-px w-32 bg-slate-600 mb-2"></div>
                          <p className="text-xs text-slate-400">Srikar Veluvali</p>
                        </div>
                        <div className="certificate-badge">
                          <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Navigation Dots */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                  {achievements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCertificate(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeCertificate === index
                          ? 'bg-blue-400 w-8'
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                      aria-label={`Certificate ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Certificate Counter */}
              <div className="text-center mt-16 text-slate-400 text-sm">
                {activeCertificate + 1} / {achievements.length}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={el => {sectionRefs.current['contact'] = el}} className="py-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold comic-title text-slate-100 mb-12">
              Get in Touch
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="terminal-container">
                {/* Terminal Toolbar */}
                <div className="terminal-toolbar">
                  <div className="terminal-buttons">
                    <button className="terminal-btn terminal-btn-red"></button>
                    <button className="terminal-btn terminal-btn-yellow"></button>
                    <button className="terminal-btn terminal-btn-green"></button>
                  </div>
                  <div className="terminal-title">contact@srikar-terminal</div>
                  <div style={{ width: '52px' }}></div>
                </div>

                {/* Terminal Body */}
                <div className="terminal-body">
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command">./send-message.sh</span>
                  </div>

                  <form onSubmit={handleContactSubmit} className="mt-4 space-y-4">
                    {/* Name Input */}
                    <div className="terminal-line">
                      <span className="terminal-output text-blue-400">Enter your name:</span>
                    </div>
                    <div className="terminal-line flex items-center">
                      <span className="terminal-prompt">&gt;</span>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                        className="terminal-input flex-1 bg-transparent border-none outline-none text-slate-100 ml-2 font-mono"
                        placeholder="John Doe"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="terminal-line mt-4">
                      <span className="terminal-output text-blue-400">Enter your email:</span>
                    </div>
                    <div className="terminal-line flex items-center">
                      <span className="terminal-prompt">&gt;</span>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                        className="terminal-input flex-1 bg-transparent border-none outline-none text-slate-100 ml-2 font-mono"
                        placeholder="john@example.com"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Subject Input */}
                    <div className="terminal-line mt-4">
                      <span className="terminal-output text-blue-400">Subject:</span>
                    </div>
                    <div className="terminal-line flex items-center">
                      <span className="terminal-prompt">&gt;</span>
                      <input
                        type="text"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                        className="terminal-input flex-1 bg-transparent border-none outline-none text-slate-100 ml-2 font-mono"
                        placeholder="Project Collaboration"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Message Input */}
                    <div className="terminal-line mt-4">
                      <span className="terminal-output text-blue-400">Message:</span>
                    </div>
                    <div className="terminal-line flex">
                      <span className="terminal-prompt">&gt;</span>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="terminal-input flex-1 bg-transparent border-none outline-none text-slate-100 ml-2 font-mono resize-none"
                        placeholder="Your message here..."
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="terminal-line mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="terminal-link px-6 py-2 bg-blue-600/20 border border-blue-500 rounded hover:bg-blue-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="terminal-output text-yellow-400">Sending...</span>
                          </>
                        ) : (
                          <>
                            <span className="terminal-command">Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="terminal-line mt-4">
                        <span className="terminal-output text-green-400">✓ Message sent successfully! I'll get back to you soon.</span>
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="terminal-line mt-4">
                        <span className="terminal-output text-red-400">✗ Failed to send message. Please try again.</span>
                      </div>
                    )}
                  </form>

                  {/* Social Links */}
                  <div className="terminal-line mt-8 pt-6 border-t border-slate-700">
                    <span className="terminal-output text-slate-400">Or connect via:</span>
                  </div>
                  <div className="terminal-line mt-2 flex flex-wrap gap-4">
                    <a
                      href="https://linkedin.com/in/srikarveluvali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-link"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/SrikarVeluvali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-link"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  </div>

                  <div className="terminal-line mt-4">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-cursor"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 bg-slate-900 border-t border-slate-700 py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-medium text-slate-400">
            {new Date().getFullYear()} - Srikar Veluvali
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Built with Determination
          </p>
        </div>
      </footer>
    </div>
  )
}
