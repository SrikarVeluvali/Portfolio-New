'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Github, Linkedin, Mail, FileText, Code, Youtube } from 'lucide-react'

export default function ModernBWPortfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sectionRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'CGPA', 'skills', 'experience', 'projects', 'education', 'contact']
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

  const scrollToSection = (sectionId) => {
    sectionRefs.current[sectionId].scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const cgpaData = [
    { year: 1, sem1: 9.84, sem2: 9.79 },
    { year: 2, sem1: 9.62, sem2: null },
    { year: 3, sem1: null, sem2: null },
    { year: 4, sem1: null, sem2: null },
  ]

  const calculateYearCGPA = (sem1, sem2) => {
    if (sem1 === null && sem2 === null) return null
    if (sem2 === null) return sem1
    return ((sem1 + sem2) / 2).toFixed(2)
  }

  const skills = [
    { name: 'C/C++', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'Go (Golang)', category: 'Languages' },
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
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Version Control' },
    { name: 'GitHub', category: 'Version Control' },
    { name: 'Postman', category: 'Tools' },
    { name: 'Tableau', category: 'Tools' },
    { name: 'Unix/Linux', category: 'Operating Systems' },
    { name: 'Windows NT', category: 'Operating Systems' },
    { name: 'VS Code', category: 'Tools' },
    { name: 'Visual Studio', category: 'Tools' },
    { name: 'StarUML', category: 'Tools' }
  ];

  const SkillCloud = () => {
    const [hoveredSkill, setHoveredSkill] = useState(null)
  
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <TooltipProvider key={skill.name}>
            <Tooltip>
              <TooltipTrigger>
                <motion.div
                  className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    hoveredSkill === skill.name ? 'bg-gray-200 text-gray-900' : 'bg-gray-700 text-gray-200'
                  }`}
                  style={{
                    fontSize: hoveredSkill === skill.name ? '1rem' : '1rem',
                  }}
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  {skill.name}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
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
      title: 'OCR Entity Extraction with BERT',
      description: 'Developed an Optical Character Recognition (OCR) system using PaddleOCR combined with a fine-tuned BERT model to extract and classify entities from text in images.',
      technologies: ['Optical Character Recognition', 'BERT', 'Python', 'Machine Learning'],
      github: 'https://github.com/SrikarVeluvali/NER-Using-BERT'
    },
    {
      title: 'Astor AI: A Chatbot for Medical Queries',
      description: 'Built a medical chatbot using the Llama 3 model with Retrieval Augmented Generation (RAG) for more accurate responses and faster query handling, optimized for local system use.',
      technologies: ['React.js', 'Flask', 'LLMs', 'Generative AI'],
      github: 'https://github.com/SrikarVeluvali/Astor-AI'
    },
    {
      title: 'Heart Health Web Application',
      description: 'Developed a MERN stack web app with Machine Learning for heart disease prediction, offering personalized diet and exercise plans and integrating Google&apos;s Gemini AI for diet suggestions.',
      technologies: ['MERN', 'Machine Learning', 'Google Gemini AI', 'Flask'],
      github: 'https://github.com/SrikarVeluvali/HeartHealth'
    },
    {
      title: 'Battle Engine (Remaster)',
      description: 'Developed a Pokemon-style RPG game using Java and Object-Oriented Programming concepts. Players engage in turn-based battles and progress through various levels with different strategies.',
      technologies: ['Java', 'OOPS'],
      github: 'https://github.com/SrikarVeluvali/battle-engine-remastered'
    },
    {
      title: 'Dataset - Extraction, Analysis, and Visualization',
      description: 'A Python-based data analysis project that explores the &quot;Video Game Sales Analysis&quot; dataset to answer 15 key questions related to video games. Presented at PRAKALP 2023.',
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
      title: 'Battle Engine (Release)',
      description: 'A text-based command-line game in C, simulating battles between the player and various bots. The game features strategic combat and a secret battle with a special challenge.',
      technologies: ['C', 'Command-line'],
      github: 'https://github.com/SrikarVeluvali/battleengine'
    }
  ];

  const experiences = [
    {
      title: 'CUDA Programming Intern',
      company: 'Defence Research Development Laboratory (DRDO)',
      period: 'Jun 2024 - Sep 2024',
      responsibilities: [
        'Contributed to the development and optimization of CUDA programs for Computational Fluid Dynamics (CFD) simulations',
        'Achieved a 25% reduction in processing time and enhanced computational efficiency on an NVIDIA RTX 4080 GPU',
        'Collaborated with a multidisciplinary team of engineers to implement high-performance computing solutions',
        'Improved overall simulation speed and accuracy through optimization of CUDA code',
        'Worked on high-performance computing and parallel processing techniques to improve simulation efficiency'
      ]
    }
  ];

  const calculateOverallCGPA = () => {
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

  const certifications = [
    'Consistently achieved the highest academic standing as the Branch Topper across all semesters.',
    'Silver Medal in Python for Data Science - IIT Madras (Top 5% - Scored 84%)',
    'Silver Medal in Programming in Java - IIT Kharagpur (Top 5% - Scored 78%)',
    'Deep Learning using Python - IIT Hyderabad (Completed February 2023)',
    'Prompt Design and Developing Generative AI Apps - Google (Awarded May 2024)',
    'Top Performer in Coding Challenges - Leetcode (Solving over 600 problems)',
    '2-Star Rating on Codechef for Competitive Programming',
    'Nominee for People&apos;s Choice Award - Google Gemini API Developer Competition (2024)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm border-b border-gray-700">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <a href="#home" onClick={() => scrollToSection('home')} className="text-2xl font-bold text-white">Srikar Veluvali</a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <ul className={`md:flex md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 bg-gray-900 md:bg-transparent`}>
              {['home', 'about', 'cgpa', 'skills', 'experience', 'projects', 'education', 'contact'].map((section) => (
                <li key={section} className="md:inline-block">
                  <a
                    href={`#${section}`}
                    onClick={() => scrollToSection(section)}
                    className={`block py-2 px-4 text-sm font-medium transition-colors hover:text-gray-300 ${
                      activeSection === section ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-20">
        <section id="home" ref={el => sectionRefs.current['home'] = el} className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-gray-200">
                <AvatarImage src="./S.png" alt="Srikar Veluvali" />
                <AvatarFallback>SV</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Srikar Veluvali
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              IIIrd Year Student At Keshav Memorial Institute of Technology
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-gray-300 bg-gray-800 hover:bg-gray-700">
                      <a href="https://github.com/SrikarVeluvali" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 text-gray-300" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-gray-300 bg-gray-800 hover:bg-gray-700">
                      <a href="https://www.linkedin.com/in/srikarveluvali/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5 text-gray-300" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-gray-300 bg-gray-800 hover:bg-gray-700">
                      <a href="/Srikar_Veluvali_s_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="h-5 w-5 text-gray-300" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download Resume</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-gray-300 bg-gray-800 hover:bg-gray-700">
                      <a href="https://leetcode.com/srikar_v05/" target="_blank" rel="noopener noreferrer">
                        <Code className="h-5 w-5 text-gray-300" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LeetCode Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-gray-300 bg-gray-800 hover:bg-gray-700">
                      <a href="https://www.youtube.com/@SrikarVeluvali" target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-5 w-5 text-gray-300" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>YouTube Channel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </section>

        <section id="about" ref={el => sectionRefs.current['about'] = el} className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="prose prose-invert">
                <p className="mt-4 text-gray-300">
                  Hey! I&apos;m Srikar, currently pursuing a Bachelor of Technology in Information Technology at Keshav Memorial Institute of Technology with a CGPA of <b>9.75</b>. <br /><br />
                  I&apos;ve had the chance to work as a <b>CUDA Programming Intern at DRDL</b>, optimizing computational efficiency for complex simulations. I love diving into tech challenges, and I&apos;ve built some cool projects like a medical chatbot and a heart health prediction app using AI and machine learning. <br /><br />
                  When I&apos;m not coding or tinkering with tech, I enjoy solving problems on Leetcode or exploring the latest in generative AI.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="cgpa" ref={el => sectionRefs.current['cgpa'] = el} className="py-20">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Academic Performance</h2>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
        <h2 className="text-4xl font-bold mt-8 text-center text-gray-100">B.Tech - Information Techology</h2>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cgpaData.map((year, index) => (
                <Card key={index} className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-gray-100">Year {year.year}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Semester 1</p>
                        <p className="text-lg font-semibold text-gray-100">{year.sem1 ? year.sem1.toFixed(2) : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Semester 2</p>
                        <p className="text-lg font-semibold text-gray-100">{year.sem2 ? year.sem2.toFixed(2) : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Year CGPA</p>
                        <p className="text-xl font-bold text-gray-100">{calculateYearCGPA(year.sem1, year.sem2) || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-2xl font-bold text-gray-300">Overall CGPA</p>
              <p className="text-5xl font-bold text-gray-100 mt-2">{calculateOverallCGPA()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

        <section id="skills" ref={el => sectionRefs.current['skills'] = el} className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Skills & Expertise</h2>
          <Card className="bg-gray-800 border-gray-700 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <SkillCloud />
            </CardContent>
          </Card>
        </section>

        <section id="experience" ref={el => sectionRefs.current['experience'] = el} className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Work Experience</h2>
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 mb-6">
                  <CardHeader>
                    <CardTitle className="text-gray-100">{exp.title}</CardTitle>
                    <CardDescription className="text-gray-400">{exp.company} | {exp.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-300">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="mb-2">{resp}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" ref={el => sectionRefs.current['projects'] = el} className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-gray-100">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-4 text-gray-300">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-gray-700 text-gray-200 border-gray-600">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full border-gray-600 text-black-200 hover:bg-gray-700">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="education" ref={el => sectionRefs.current['education'] = el} className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Education & Certifications</h2>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                <TabsTrigger value="education" className="data-[state=active]:bg-gray-800 text-gray-200">Education</TabsTrigger>
                <TabsTrigger value="certifications" className="data-[state=active]:bg-gray-800 text-gray-200">Certifications</TabsTrigger>
              </TabsList>
              <TabsContent value="education">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    {education.map((edu, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="font-semibold text-lg text-gray-100">{edu.degree}</h3>
                        <p className="text-gray-300">{edu.institution}, {edu.year}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="certifications">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <ul className="list-disc list-inside">
                      {certifications.map((cert, index) => (
                        <li key={index} className="mb-2 last:mb-0 text-gray-300">{cert}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="contact" ref={el => sectionRefs.current['contact'] = el} className="py-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Get in Touch</h2>
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-gray-300" />
                    <a href="mailto:srikarv100@gmail.com" className="text-gray-300 hover:text-gray-100 transition-colors">
                      srikarv100@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="mr-2 h-5 w-5 text-gray-300" />
                    <a href="https://linkedin.com/in/srikarveluvali" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors">
                      linkedin.com/in/srikarveluvali
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github className="mr-2 h-5 w-5 text-gray-300" />
                    <a href="https://github.com/SrikarVeluvali" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors">
                      github.com/SrikarVeluvali
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="mailto:srikarv100@gmail.com" className="w-full">
                  <Button className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600">
                    <Mail className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-6 mt-20 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>{new Date().getFullYear()} - Srikar Veluvali</p>
        </div>
      </footer>
    </div>
  )
}