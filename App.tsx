import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Menu, X, Download, Mail, Phone, MapPin, ExternalLink, Award, Code, Database, Layout, Terminal as TerminalIcon, Trophy, ChevronRight, Minus, Square, Power } from 'lucide-react';
import { CONTACT_INFO, EXPERIENCE, CERTIFICATIONS, PROJECTS, SKILLS, TRAILHEAD, EDUCATION } from './constants';
import { Button } from './components/Button';
import { SectionHeader } from './components/SectionHeader';

// --- Type Definitions for Terminal ---
interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: React.ReactNode;
}

// --- Loading Screen Component ---
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const systemLogs = [
    "INITIALIZING KERNEL...",
    "LOADING ASSETS...",
    "MOUNTING VIRTUAL DOM...",
    "CONNECTING TO SALESFORCE NODE...",
    "FETCHING PROFILE DATA...",
    "OPTIMIZING LAYOUT ENGINES...",
    "CONFIGURING NEO-BRUTALIST MODULES...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const intervalTime = 40; // Update every 40ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      // Add logs based on progress
      if (currentStep % 12 === 0 && currentStep < steps) {
        const logIndex = Math.floor((currentStep / steps) * systemLogs.length);
        if (systemLogs[logIndex]) {
          setLogs(prev => [...prev, `> ${systemLogs[logIndex]}`]);
        }
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        onComplete();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-neo-yellow flex flex-col items-center justify-center p-8 border-8 border-black">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-end mb-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">SYSTEM_BOOT</h1>
          <span className="text-4xl md:text-6xl font-mono font-bold">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-12 border-4 border-black bg-white p-1 mb-8 shadow-neo">
          <div 
            className="h-full bg-black transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Terminal Log Output */}
        <div className="bg-black text-green-500 font-mono p-4 h-48 overflow-hidden border-4 border-white shadow-neo-lg text-sm md:text-base">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 opacity-80">{log}</div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>
    </div>
  );
};

// --- Terminal Modal Component ---
const TerminalModal = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', content: 'Welcome to NASHTE_OS v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 gap-2">
            <div><span className="text-neo-yellow font-bold">about</span>      - View objective & summary</div>
            <div><span className="text-neo-yellow font-bold">experience</span> - List work history</div>
            <div><span className="text-neo-yellow font-bold">skills</span>     - List technical skills</div>
            <div><span className="text-neo-yellow font-bold">projects</span>   - View key projects</div>
            <div><span className="text-neo-yellow font-bold">contact</span>    - Contact information</div>
            <div><span className="text-neo-yellow font-bold">clear</span>      - Clear terminal</div>
            <div><span className="text-neo-yellow font-bold">exit</span>       - Close terminal</div>
          </div>
        );
        break;
      case 'about':
        output = CONTACT_INFO.objective;
        break;
      case 'contact':
        output = (
          <div>
            <p>Email: {CONTACT_INFO.email}</p>
            <p>Phone: {CONTACT_INFO.phone}</p>
            <p>Loc:   {CONTACT_INFO.location}</p>
          </div>
        );
        break;
      case 'experience':
        output = (
          <div className="flex flex-col gap-4">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="border-l-2 border-green-500 pl-2">
                <div className="font-bold text-neo-yellow">{exp.role}</div>
                <div>{exp.company} | {exp.period}</div>
                <div className="text-xs text-gray-400">[{exp.type}]</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="grid grid-cols-2 gap-2">
            {SKILLS.map(cat => (
              <div key={cat.title}>
                <div className="text-neo-blue underline mb-1">{cat.title}</div>
                <div className="text-xs">{cat.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="flex flex-col gap-4">
            {PROJECTS.map((proj, i) => (
              <div key={i}>
                <div className="font-bold text-neo-purple">{proj.name}</div>
                <div className="text-xs mb-1">{proj.role}</div>
                <div className="text-xs text-gray-400">Stack: {proj.techStack.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case '':
        return;
      default:
        output = `Command not found: ${cleanCmd}. Type "help" for assistance.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: output }
    ]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-[#0c0c0c] border-4 border-white shadow-neo-lg flex flex-col h-[80vh] md:h-[600px]">
        {/* Terminal Header */}
        <div className="bg-white text-black p-2 flex justify-between items-center border-b-4 border-black select-none">
          <div className="font-mono font-bold flex items-center gap-2">
            <TerminalIcon size={18} />
            <span>TERMINAL.EXE</span>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-black">
              <Minus size={16} />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-black">
              <Square size={16} />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-neo-red hover:text-white transition-colors border-2 border-black">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 p-4 overflow-y-auto font-mono text-green-500 text-sm md:text-base"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="mb-2 break-words">
              {line.type === 'input' ? (
                <div className="flex gap-2 text-white">
                  <span>➜</span>
                  <span>{line.content}</span>
                </div>
              ) : (
                <div className="ml-5 text-green-400 opacity-90">
                  {line.content}
                </div>
              )}
            </div>
          ))}
          
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <span className="text-white select-none">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-full caret-white font-mono"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

// --- Navbar Component ---
const NavBar = ({ onOpenTerminal }: { onOpenTerminal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-4 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-black border-2 border-black group-hover:rotate-180 transition-transform duration-500"></div>
          <span className="font-sans font-black text-xl tracking-tighter">NASHTE.DEV</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-mono font-bold">
          <a href="#about" className="hover:bg-neo-yellow px-2 transition-colors">ABOUT</a>
          <a href="#experience" className="hover:bg-neo-blue hover:text-white px-2 transition-colors">XP</a>
          <a href="#skills" className="hover:bg-neo-red hover:text-white px-2 transition-colors">SKILLS</a>
          <a href="#projects" className="hover:bg-neo-purple hover:text-white px-2 transition-colors">PROJECTS</a>
          
          <div className="h-6 w-[2px] bg-black mx-2"></div>
          
          <button 
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-2 py-1 hover:bg-black hover:text-white transition-colors"
            title="Open Terminal"
          >
            <TerminalIcon size={20} />
          </button>

          <Button onClick={() => window.location.href = `mailto:${CONTACT_INFO.email}`} variant="primary" className="py-1 px-4 shadow-neo-sm text-xs">
            HIRE ME
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black bg-white absolute w-full h-screen pb-24 overflow-y-auto">
          <div className="flex flex-col p-4 gap-4 font-mono font-bold">
             <a href="#about" onClick={() => setIsOpen(false)} className="p-4 border-2 border-black shadow-neo-sm hover:translate-x-1 transition-transform text-center">ABOUT</a>
             <a href="#experience" onClick={() => setIsOpen(false)} className="p-4 border-2 border-black shadow-neo-sm hover:translate-x-1 transition-transform bg-neo-blue text-white text-center">EXPERIENCE</a>
             <a href="#skills" onClick={() => setIsOpen(false)} className="p-4 border-2 border-black shadow-neo-sm hover:translate-x-1 transition-transform bg-neo-red text-white text-center">SKILLS</a>
             <a href="#projects" onClick={() => setIsOpen(false)} className="p-4 border-2 border-black shadow-neo-sm hover:translate-x-1 transition-transform bg-neo-purple text-white text-center">PROJECTS</a>
             <button onClick={() => { setIsOpen(false); onOpenTerminal(); }} className="p-4 border-2 border-black shadow-neo-sm hover:translate-x-1 transition-transform bg-black text-white text-center flex items-center justify-center gap-2">
               <TerminalIcon /> TERMINAL
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Main Content Components ---
const Hero = () => {
  return (
    <header id="about" className="relative pt-24 pb-16 md:pt-40 md:pb-24 border-b-4 border-black overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-2/3 z-10">
            <div className="inline-block bg-black text-white px-4 py-1 font-mono font-bold mb-6 rotate-2 shadow-neo-sm border-2 border-white animate-pulse">
              <span className="text-green-500">●</span> OPEN FOR WORK
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black leading-[0.9] tracking-tighter mb-8 text-black drop-shadow-sm">
              OMKAR<br/>
              <span className="text-stroke-3 text-transparent bg-clip-text bg-black lg:text-white lg:text-stroke-black lg:text-stroke-3 hover:text-neo-yellow transition-colors duration-300 cursor-default">NASHTE</span>
            </h1>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-neo-blue"></div>
              <p className="text-lg md:text-xl font-mono font-bold leading-relaxed pl-6 mb-8 max-w-2xl bg-white/90 p-6 border-2 border-black shadow-neo">
                {CONTACT_INFO.objective}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => window.location.href = `mailto:${CONTACT_INFO.email}`} variant="primary" className="flex items-center justify-center gap-2 group">
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" /> CONTACT ME
              </Button>
              <Button onClick={() => window.open(CONTACT_INFO.github, '_blank')} variant="outline" className="flex items-center justify-center gap-2 group">
                <Code className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> GITHUB REPO
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/3 relative">
             {/* Decorative Abstract Box for Photo/Stats */}
             <div className="relative bg-white border-4 border-black p-6 shadow-neo-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-300 group">
                <div className="bg-neo-blue h-4 w-full mb-4 border-2 border-black"></div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 font-mono font-bold group-hover:text-neo-blue transition-colors">
                     <MapPin className="w-6 h-6" /> {CONTACT_INFO.location}
                  </div>
                  <div className="flex items-center gap-3 font-mono font-bold group-hover:text-neo-purple transition-colors">
                     <Phone className="w-6 h-6" /> {CONTACT_INFO.phone}
                  </div>
                  <div className="flex items-center gap-3 font-mono font-bold break-all group-hover:text-neo-red transition-colors">
                     <Mail className="w-6 h-6 flex-shrink-0" /> {CONTACT_INFO.email}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-dashed border-black flex gap-3">
                    <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="bg-black text-white px-3 py-1 font-mono text-xs hover:bg-neo-yellow hover:text-black transition-colors border-2 border-black">LINKEDIN</a>
                    <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="bg-black text-white px-3 py-1 font-mono text-xs hover:bg-neo-yellow hover:text-black transition-colors border-2 border-black">GITHUB</a>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatsMarquee = () => {
  return (
    <a href={CONTACT_INFO.trailhead} target="_blank" rel="noreferrer" className="block bg-neo-yellow border-b-4 border-black py-4 overflow-hidden whitespace-nowrap relative hover:bg-yellow-400 transition-colors cursor-pointer group">
       <div className="animate-marquee inline-block">
          <span className="text-2xl font-black font-sans mx-8 uppercase">Rank: {TRAILHEAD.rank}</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">★</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">Badges: {TRAILHEAD.badges}</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">★</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">Points: {TRAILHEAD.points}</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">★</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">Trailmixes: {TRAILHEAD.trailmixes}</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">★</span>
          {/* Duplicate for smooth loop */}
          <span className="text-2xl font-black font-sans mx-8 uppercase">Rank: {TRAILHEAD.rank}</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">★</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">Badges: {TRAILHEAD.badges}</span>
          <span className="text-2xl font-black font-sans mx-8 uppercase">★</span>
       </div>
       <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
       <style>{`
         @keyframes marquee {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         .animate-marquee {
           animation: marquee 15s linear infinite;
         }
       `}</style>
    </a>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 border-b-4 border-black bg-neo-white pattern-grid">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader number="01" title="Experience" color="bg-neo-blue" />
        
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2"></div>

          <div className="flex flex-col gap-16">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center gap-8`}>
                
                {/* Content Box */}
                <div className="w-full md:w-1/2 group">
                  <div className="bg-white border-4 border-black shadow-neo p-6 transition-all hover:shadow-neo-lg hover:-translate-y-1 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 px-4 py-2 font-black text-xs border-b-4 border-l-4 border-black ${exp.type === 'Training' ? 'bg-neo-yellow' : 'bg-neo-blue text-white'}`}>
                      {exp.type.toUpperCase()}
                    </div>
                    
                    <h3 className="text-2xl font-black uppercase mb-1 mt-6">{exp.role}</h3>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-3 h-3 bg-black rounded-full"></span>
                      {exp.company}
                    </h4>
                    
                    <div className="flex items-center gap-2 font-mono text-sm text-white border-t-4 border-black pt-4 mt-2">
                      <span className="bg-black px-2 py-1 shadow-neo-sm">{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Connector Dot */}
                <div className="w-8 h-8 bg-neo-yellow border-4 border-black z-10 hidden md:block rotate-45"></div>
                
                {/* Spacer */}
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const getIcon = (title: string) => {
    if (title.includes('Admin')) return <Layout className="w-6 h-6" />;
    if (title.includes('Security')) return <Award className="w-6 h-6" />;
    if (title.includes('Platform')) return <Database className="w-6 h-6" />;
    if (title.includes('Dev')) return <Code className="w-6 h-6" />;
    return <TerminalIcon className="w-6 h-6" />;
  };

  return (
    <section id="skills" className="py-20 border-b-4 border-black bg-[#ff914d]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader number="02" title="Technical Arsenal" color="bg-black" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((category, index) => (
            <div key={index} className="bg-white border-4 border-black shadow-neo hover:shadow-neo-lg transition-all hover:-translate-y-2">
              <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-black">
                <h3 className="font-mono font-bold uppercase text-lg">{category.title}</h3>
                {getIcon(category.title)}
              </div>
              <ul className="p-6 flex flex-col gap-3">
                {category.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="flex items-start gap-3 group">
                    <ChevronRight className="w-5 h-5 text-black flex-shrink-0 group-hover:text-neo-red transition-colors" />
                    <span className="font-mono font-bold leading-tight group-hover:underline decoration-4 decoration-neo-yellow underline-offset-2">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 border-b-4 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader number="03" title="Major Projects" color="bg-neo-purple" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PROJECTS.map((project, index) => (
            <div key={index} className="group relative">
               {/* Background decoration */}
               <div className="absolute inset-0 bg-black transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-200"></div>
               
               <div className="relative bg-white border-4 border-black p-8 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
                    <div>
                      <h3 className="text-3xl font-black uppercase leading-tight mb-1">{project.name}</h3>
                      <span className="font-mono text-sm bg-neo-purple text-white px-2 py-1 font-bold border-2 border-black shadow-neo-sm">{project.role}</span>
                    </div>
                    <div className="bg-black text-white px-3 py-1 font-mono text-xs border-2 border-black">
                      PRJ_{index + 1}
                    </div>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                       <span key={i} className="px-2 py-1 border-2 border-black text-xs font-bold bg-neo-white uppercase hover:bg-neo-yellow transition-colors cursor-default shadow-neo-sm">
                         {tech}
                       </span>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {project.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 font-mono text-sm">
                         <Square className="w-3 h-3 mt-1 flex-shrink-0 fill-black" />
                         {resp}
                      </li>
                    ))}
                  </ul>

                  <Button variant="secondary" className="w-full flex items-center justify-center gap-2 mt-auto group-hover:bg-neo-blue group-hover:text-white">
                    VIEW CASE STUDY <ExternalLink className="w-4 h-4" />
                  </Button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificationsSection = () => {
  return (
    <section className="py-20 border-b-4 border-black bg-neo-blue">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start">
           <div className="w-full md:w-1/3 sticky top-24">
             <h2 className="text-6xl font-black text-white uppercase leading-none mb-6 drop-shadow-[6px_6px_0px_#000]">
               Certifi-<br/>cations
             </h2>
             <p className="font-mono font-bold bg-black text-white p-6 inline-block border-4 border-white shadow-neo text-lg">
               Verified Proficiency &<br/> continuous learning.
             </p>
           </div>
           
           <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CERTIFICATIONS.map((cert, index) => (
                <div key={index} className="bg-white border-4 border-black p-6 flex flex-col justify-between h-full shadow-neo hover:rotate-1 transition-transform group hover:bg-neo-yellow">
                   <div className="mb-6">
                     <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-black mb-4 shadow-neo-sm group-hover:bg-white group-hover:text-black transition-colors">
                        <Trophy className="w-6 h-6" />
                     </div>
                     <h3 className="font-black text-xl leading-tight uppercase">{cert.name}</h3>
                   </div>
                   <div className="border-t-4 border-black pt-3 mt-2 flex justify-between items-center text-xs font-mono font-bold uppercase">
                      <span>{cert.provider}</span>
                      <span className="bg-black text-white px-2 py-1">{cert.date}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

const EducationFooter = () => {
  return (
    <footer className="bg-neo-black text-white py-16 border-t-4 border-black relative overflow-hidden">
       <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <div className="text-[20rem] font-black leading-none text-white">ED</div>
       </div>
       
       <div className="max-w-7xl mx-auto px-4 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Education Box */}
            <div className="border-8 border-white p-8 relative bg-black hover:bg-zinc-900 transition-colors">
               <div className="absolute -top-6 left-6 bg-neo-yellow text-black px-6 py-2 font-black border-4 border-black uppercase shadow-neo text-lg">
                 Education
               </div>
               <div className="mt-4">
                   <h3 className="text-3xl font-black mb-2 uppercase">{EDUCATION.institution}</h3>
                   <p className="font-mono text-xl mb-4 text-neo-blue font-bold">{EDUCATION.degree}</p>
                   <div className="flex flex-wrap gap-4 mt-6 font-mono text-sm text-gray-300 border-t-2 border-dashed border-zinc-700 pt-4">
                      <span>{EDUCATION.location}</span>
                      <span>//</span>
                      <span>{EDUCATION.year}</span>
                      <span>//</span>
                      <span className="text-neo-yellow bg-zinc-800 px-2">{EDUCATION.score}</span>
                   </div>
               </div>
            </div>

            {/* Contact CTA */}
            <div className="flex flex-col justify-center items-start gap-8">
               <div>
                   <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-2">
                     LET'S<br/><span className="text-neo-yellow">WORK.</span>
                   </h2>
                   <p className="font-mono text-gray-400 max-w-md">
                       Ready to deploy robust Salesforce solutions? I'm available for immediate joining.
                   </p>
               </div>
               
               <div className="flex gap-4 flex-wrap w-full">
                  <Button onClick={() => window.location.href = `mailto:${CONTACT_INFO.email}`} className="bg-white text-black hover:bg-neo-yellow border-white flex-1 justify-center">
                    EMAIL ME
                  </Button>
                  <Button onClick={() => window.open(CONTACT_INFO.linkedin, '_blank')} className="bg-transparent text-white border-white hover:bg-white hover:text-black flex-1 justify-center">
                    LINKEDIN
                  </Button>
               </div>
               
               <div className="w-full h-px bg-zinc-800 my-4"></div>
               
               <div className="flex justify-between w-full font-mono text-xs text-gray-500">
                 <span>© {new Date().getFullYear()} OMKAR NASHTE</span>
                 <span>BUILT WITH REACT.JS & TAILWIND</span>
               </div>
            </div>
         </div>
       </div>
    </footer>
  );
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      <main>
        <Hero />
        <StatsMarquee />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
      </main>

      <EducationFooter />
      
      {/* Floating Action Button for Terminal (Mobile/Quick Access) */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-black text-green-500 p-4 border-4 border-white shadow-neo-lg rounded-none hover:-translate-y-1 transition-transform hidden md:flex items-center gap-2 font-mono font-bold"
      >
        <TerminalIcon size={24} />
        <span className="hidden group-hover:inline">CMD</span>
      </button>

      {isTerminalOpen && (
        <TerminalModal onClose={() => setIsTerminalOpen(false)} />
      )}
    </div>
  );
};

export default App;