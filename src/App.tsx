import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Server,
  Infinity as InfinityIcon,
  ShieldCheck,
  LayoutTemplate,
  Headphones,
  Activity,
  Lock,
  Mail,
  User,
  Phone,
  Workflow,
  ChevronDown,
  Timer,
  Maximize
} from 'lucide-react';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [defaultCountry, setDefaultCountry] = useState<any>('US');
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    // Detect country by IP using a reliable endpoint
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          setDefaultCountry(data.country_code);
        }
      })
      .catch((err) => {
        console.log('Error fetching IP from geojs, falling back', err);
        fetch('https://ipapi.co/json/')
          .then((res) => res.json())
          .then((data) => {
            if (data && data.country_code) {
              setDefaultCountry(data.country_code);
            }
          })
          .catch((e) => console.log('Error in fallback IP fetch', e));
      });

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !phone) return;
    
    setIsSubmitting(true);
    try {
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead');
      }
      
      // CHANGE THIS URL to your Google Apps Script Web App URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbz5hTWODng5HkF_e7WuvWBOVld_eoUJD7HF053BnBf1KFSgCniqvV1fRVTJBqCAECLSRQ/exec';
      
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script to avoid CORS errors
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone
        })
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent');
    }
    document.getElementById('capture-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const offerStatements = [
    "Dedicated Managed n8n Workspace",
    "Custom domain created for you",
    "Unlimited Workflows",
    "Unlimited Executions",
    "No Server Management",
    "SSL secured & Automated Backups",
    "10,000+ Ready-To-Use Workflow Templates",
    "99.9% Uptime",
    "Technical Support & Troubleshooting"
  ];

  const features = [
    {
      icon: <Server className="w-6 h-6 text-brand-500" />,
      title: "Your Own Managed n8n Workspace",
      description: "No shared accounts. No complicated setup. Start building immediately."
    },
    {
      icon: <InfinityIcon className="w-6 h-6 text-brand-500" />,
      title: "Unlimited Workflows",
      description: "Create as many automations, AI agents, and integrations as you want."
    },
    {
      icon: <InfinityIcon className="w-6 h-6 text-brand-500" />,
      title: "Unlimited Executions",
      description: "No worrying about task limits, operation limits, or usage caps. Build freely."
    },
    {
      icon: <Activity className="w-6 h-6 text-brand-500" />,
      title: "Zero Server Management",
      description: "No VPS setup. No Docker issues. No maintenance headaches. Just build."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-500" />,
      title: "SSL, Backups & Security",
      description: "Your workflows stay protected and backed up. Peace of mind out of the box."
    },
    {
      icon: <LayoutTemplate className="w-6 h-6 text-brand-500" />,
      title: "10,000+ Automation Templates",
      description: "Launch faster using ready-made workflows for AI Agents, Lead Gen, and CRM."
    },
    {
      icon: <Headphones className="w-6 h-6 text-brand-500" />,
      title: "Technical Support",
      description: "Get help when things break or when you're stuck."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-brand-500" />,
      title: "Reliable Infrastructure",
      description: "99.9% uptime so your automations keep running when you need them."
    }
  ];

  const templatesList = [
    "AI Agents", "WhatsApp Automation", "Lead Generation", "CRM Automation", "Email Marketing",
    "Customer Support", "Data Sync", "E-commerce", "Content Automation"
  ];

  const valueStack = [
    { benefit: "Managed n8n Workspace", value: "Build immediately" },
    { benefit: "Unlimited Executions", value: "No growth limits" },
    { benefit: "Unlimited Workflows", value: "Create as much as you want" },
    { benefit: "10,000+ Templates", value: "Save hundreds of hours" },
    { benefit: "SSL & Backups", value: "Peace of mind" },
    { benefit: "Technical Support", value: "Faster problem solving" },
    { benefit: "Managed Infrastructure", value: "No server headaches" }
  ];

  const faqs = [
    {
      question: "Is my data secure?",
      answer: "Yes, absolutely. We use industry-standard encryption, provide automatic SSL certificates, and run automated backups. Your workflows and credentials connected to your n8n workspace are fully isolated and secure."
    },
    {
      question: "What if I already have workflows set up on Zapier or Make?",
      answer: "Migrating is easier than you think. While you'll need to rebuild the logic, n8n's visual node interface makes it simple to replicate. Plus, you'll have access to our 10,000+ templates to speed up your migration, and you won't ever have to worry about monthly task limits again."
    },
    {
      question: "How does the billing work? Are there any hidden fees?",
      answer: "It's a flat rate of ₦15,000 per month. That's it. Unlike other platforms that charge per execution or task, our pricing includes unlimited workflows and executions. You won't face any surprise overages as your automations scale."
    },
    {
      question: "Can I manage everything myself without coding skills?",
      answer: "Yes! While n8n is incredibly powerful for developers, its visual interface means you don't need to write a single line of code to build complex automations. Just drag, drop, and connect the nodes."
    },
    {
      question: "Do you offer a free trial?",
      answer: "While we don't offer a free trial, your investment is fully protected by our 7-Day Money-Back Guarantee. Try your managed workspace for a full week, and if it's not the right fit, we will refund your workspace fee."
    },
    {
      question: "What if I get stuck while building a workflow?",
      answer: "We offer technical support and troubleshooting as part of your subscription to ensure you never get blocked. Plus, with over 10,000 templates ready to use, chances are the workflow you need is already built."
    },
    {
      question: "How soon do I get access to my workspace?",
      answer: "Setup is completely automated and instant. Once you submit your application and complete your subscription, you'll receive an email with your dedicated n8n workspace credentials."
    },
    {
      question: "Will I be able to connect my own external apps and APIs?",
      answer: "Absolutely. With n8n, you have comprehensive webhook support, the ability to make raw HTTP requests, and access to hundreds of native integrations out of the box."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time without any cancellation fees. You will continue to have access to your workspace until the end of your billing cycle."
    },
    {
      question: "What happens to my data and workflows if I cancel?",
      answer: "If you decide to cancel, you can easily export all your workflows as JSON files. You maintain full ownership of your data and can import your workflows into any other n8n instance in the future."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-50 font-sans selection:bg-brand-500/30 selection:text-brand-200 overflow-x-hidden">
      <div className="sticky top-0 z-[60]">
        {/* Urgency Banner */}
        <div className="bg-brand-500 text-white text-sm font-medium py-2 px-4 shadow-[0_0_15px_rgba(255,109,90,0.5)]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 text-center">
              <Timer className="w-4 h-4 shrink-0" />
              <span><strong className="font-bold">Limited Offer:</strong> Claim your workspace now to get all 10,000+ templates free!</span>
            </div>
            <div className="bg-black/20 px-3 py-1 rounded-full font-mono text-sm tracking-widest font-semibold shrink-0">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Top Navigation */}
        <nav className="bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-brand-500 flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Chatmixo N8n</span>
            </div>
            <button 
              onClick={scrollToForm}
              className="hidden sm:flex items-center space-x-2 text-sm font-medium text-white hover:text-brand-400 transition-colors"
            >
              <span>Claim Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>

      {/* Background ambient glow effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[120px]" />
      </div>

      <main className="relative pt-12 pb-16 lg:pt-20 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Copy & Value Prop */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6 lg:space-y-8 lg:col-span-7"
            >
              <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 w-fit max-w-full shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shrink-0"></span>
                <span className="text-xs sm:text-sm font-medium text-brand-400 truncate">Get Your Personal N8N Account</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight break-words">
                Build Unlimited <br className="hidden sm:block" />
                AI Automations<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600 block mt-2">
                  Without Paying Expensive Monthly Fees
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl font-light">
                Get your own managed n8n workspace, unlimited executions, 10,000+ workflow templates, and zero server headaches for just <strong className="text-white font-medium">₦15,000/month</strong>.
              </p>

              <button 
                onClick={scrollToForm}
                className="lg:hidden w-full flex items-center justify-center px-4 sm:px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(255,109,90,0.5)] active:scale-95"
              >
                <span>Get Access Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <div className="pt-4 space-y-6 hidden lg:block">
                <h3 className="text-xl font-display font-semibold text-white">Everything you need to build, deploy and scale:</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {offerStatements.map((benefit, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (idx * 0.05) }}
                      className="flex items-start text-slate-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mr-3 mt-0.5" />
                      <span className="text-base">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Lead Capture Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mx-auto lg:col-span-5 lg:ml-auto sticky top-28"
            >
              <div className="relative bg-[#131316] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600" />
                
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h3 id="capture-form" className="text-3xl font-display font-bold text-white mb-3 scroll-mt-[120px]">
                        Claim Your Workspace
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Enter your details below to claim your managed workspace for ₦15,000/month.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="sr-only">First Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                              id="firstName"
                              type="text"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="First name"
                              className="w-full pl-11 pr-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="sr-only">Last Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                              id="lastName"
                              type="text"
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Last name"
                              className="w-full pl-11 pr-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full pl-11 pr-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 w-full">
                        <label htmlFor="phone" className="sr-only">Phone number</label>
                        <div className="relative">
                          <PhoneInput
                            key={defaultCountry}
                            defaultCountry={defaultCountry}
                            addInternationalOption={false}
                            id="phone"
                            value={phone}
                            onChange={setPhone}
                            placeholder="Phone number"
                            className="w-full pl-4 pr-4 py-3.5 bg-[#0A0A0B] border border-white/10 rounded-xl text-white placeholder-slate-500 focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500 transition-all text-sm phone-input-override"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full relative flex items-center justify-center px-4 sm:px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed mt-2 shadow-[0_0_30px_-10px_rgba(255,109,90,0.4)]"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span className="flex items-center space-x-2">
                            <span className="truncate">Get Access for ₦15,000/mo</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </button>
                      
                      <div className="flex flex-col items-center justify-center space-y-3 mt-5">
                        <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>7-Day Money-Back Guarantee</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 text-center">
                          <Lock className="w-3 h-3" />
                          <span>Secure registration. We respect your privacy.</span>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-brand-500/10 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_-10px_rgba(255,109,90,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                       You're almost there!
                    </h3>
                    <p className="text-slate-300 text-sm mb-4">
                      Please watch the short walkthrough video below to understand exactly how your managed workspace operates before completing your payment.
                    </p>
                    
                    <div 
                      ref={videoContainerRef}
                      className="relative w-full rounded-xl overflow-hidden mb-6 bg-slate-900 border border-white/10 aspect-video group"
                    >
                      <iframe 
                        className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                        src="https://www.youtube.com/embed/gTfGR-X0j2U?rel=0&controls=0&modestbranding=1" 
                        title="Walkthrough Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                        allowFullScreen>
                      </iframe>
                      <button
                        onClick={toggleFullScreen}
                        className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-brand-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        title="Fullscreen"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mb-6 space-y-2">
                      <p className="text-white font-medium text-lg">
                        Ready to start automating at a Low cost?
                      </p>
                      <p className="text-slate-400 text-sm">
                        Click below to complete your payment and get instant access to your managed workspace.
                      </p>
                    </div>

                    <a
                      href="https://app.chatmixo.com/dashboard/pay/n8n"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full relative flex items-center justify-center px-4 sm:px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 active:scale-95 shadow-[0_0_30px_-10px_rgba(255,109,90,0.4)]"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="truncate">Complete Payment (₦15,000/mo)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                  </motion.div>
                )}
              </div>
              
              {/* Form Footer Note */}
              <div className="mt-6 text-center space-y-1">
                <p className="text-sm font-medium text-slate-300">No expensive cloud plans.</p>
                <p className="text-sm font-medium text-slate-400">No execution limits. Just build.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Feature Section beneath the fold */}
      <div className="border-t border-white/5 bg-[#0A0A0B] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 lg:mb-6">What You Get</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Everything required to scale your automations securely, without the stress of managing infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-[#131316] border border-white/5 rounded-2xl p-8 hover:bg-[#1A1A1E] transition-all hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/20 group">
                <div className="w-14 h-14 rounded-xl bg-brand-900/30 border border-brand-500/20 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  {React.cloneElement(feature.icon, { className: 'w-6 h-6 text-brand-500 group-hover:text-white transition-colors' })}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-500/10 text-brand-400 font-semibold rounded-xl transition-all hover:bg-brand-500 hover:text-white border border-brand-500/20 hover:border-brand-500"
            >
              <span>Set up my Managed Workspace</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Templates Section */}
          <div className="mt-20 lg:mt-24 text-center pb-8">
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-6 lg:mb-8">10,000+ Ready-made Templates</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {templatesList.map((template, idx) => (
                <span key={idx} className="px-5 py-2.5 rounded-full bg-[#131316] text-slate-300 border border-white/10 text-sm font-medium hover:border-brand-500/30 hover:text-brand-400 transition-colors cursor-default">
                  {template}
                </span>
              ))}
              <span className="px-5 py-2.5 rounded-full text-brand-400 text-sm font-medium opacity-80">
                and thousands more...
              </span>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="mt-20 lg:mt-24 max-w-5xl mx-auto px-4 sm:px-0">
            <div className="text-center mb-10 lg:mb-12">
              <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2 mb-4 lg:mb-6">
                <span className="text-sm font-medium text-brand-400">Why Choose Us?</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Smartest Way to Run n8n</h2>
              <p className="text-slate-400 text-lg">Compare hosting options and see why this is a complete steal.</p>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden md:block bg-[#131316] border border-white/10 rounded-3xl overflow-hidden shadow-2xl overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#1A1A1E]">
                    <th className="p-6 border-b border-white/5 text-slate-300 font-display font-bold w-1/4">Feature</th>
                    <th className="p-6 border-b border-white/5 border-l border-white/5 text-slate-400 font-display font-semibold w-1/4">DIY VPS<br/><span className="text-xs font-normal opacity-70">(Hostinger, DigitalOcean)</span></th>
                    <th className="p-6 border-b border-white/5 border-l border-white/5 text-slate-400 font-display font-semibold w-1/4">n8n Cloud<br/><span className="text-xs font-normal opacity-70">(Official)</span></th>
                    <th className="p-6 border-b border-brand-500 border-l border-white/5 bg-brand-500/5 text-brand-400 font-display font-bold w-1/4 text-lg">Our Managed Stack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white">Monthly Price</td>
                    <td className="p-6 text-slate-400 border-l border-white/5">~$5 - $20+ <span className="text-xs block text-slate-500 mt-1">Plus domains & hidden costs</span></td>
                    <td className="p-6 text-slate-400 border-l border-white/5">~$20+ /mo</td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02]">₦15,000 /mo <span className="text-xs font-medium block text-brand-400/80 mt-1">Flat predictable rate</span></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white">Workflow Executions</td>
                    <td className="p-6 text-slate-400 border-l border-white/5">Unlimited <span className="text-xs block text-slate-500 mt-1">If your server doesn't crash</span></td>
                    <td className="p-6 text-slate-400 border-l border-white/5">Strict Limits <span className="text-xs block text-slate-500 mt-1">Expensive overages</span></td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02]">Unlimited <span className="text-xs font-medium block text-brand-400/80 mt-1">No strings attached</span></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white text-base">Server Management</td>
                    <td className="p-6 text-red-400/80 border-l border-white/5">
                      <div className="flex items-center text-sm"><XCircle className="w-4 h-4 mr-2 shrink-0" /> You configure Docker & Linux</div>
                    </td>
                    <td className="p-6 text-emerald-400/80 border-l border-white/5">
                      <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 shrink-0" /> Managed by them</div>
                    </td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02]">
                      <div className="flex items-center text-base"><CheckCircle2 className="w-5 h-5 mr-2 shrink-0 text-brand-500" /> Fully Managed for you</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white">SSL & Updates</td>
                    <td className="p-6 text-red-400/80 border-l border-white/5">
                      <div className="flex items-center text-sm"><XCircle className="w-4 h-4 mr-2 shrink-0" /> DIY maintenance</div>
                    </td>
                    <td className="p-6 text-emerald-400/80 border-l border-white/5">
                      <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 shrink-0" /> Automatic</div>
                    </td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02]">
                      <div className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2 shrink-0 text-brand-500" /> Automatic</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white">Setup Time</td>
                    <td className="p-6 text-slate-400 border-l border-white/5">Hours / Days</td>
                    <td className="p-6 text-emerald-400 border-l border-white/5">Instant</td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02]">Instant</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white">Ready-Made Templates</td>
                    <td className="p-6 text-slate-400 border-l border-white/5 text-sm">Manual JSON/XML import</td>
                    <td className="p-6 text-slate-400 border-l border-white/5 text-sm">Standard community access</td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02]">
                      <div className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2 shrink-0 text-brand-500" /> 10,000+ Pre-loaded</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-medium text-white border-b-4 border-b-transparent">Support</td>
                    <td className="p-6 text-slate-400 border-l border-white/5 border-b-4 border-b-transparent">Google Search & Forums</td>
                    <td className="p-6 text-slate-400 border-l border-white/5 border-b-4 border-b-transparent">Email support tickets</td>
                    <td className="p-6 text-brand-300 font-bold border-l border-white/5 bg-brand-500/[0.02] border-b-4 border-b-brand-500">
                      <div className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2 shrink-0 text-brand-500" /> Priority Technical Support</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6">
              {/* DIY VPS Card */}
              <div className="bg-[#131316] border border-white/10 rounded-2xl p-5 shadow-lg">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-xl font-display font-bold text-white">DIY VPS</h3>
                  <p className="text-sm text-slate-400">(Hostinger, DigitalOcean)</p>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Monthly Price</span>
                    <div className="text-right flex-1">
                      <span className="text-white text-sm">~$5 - $20+</span>
                      <span className="text-xs block text-slate-500 mt-0.5">Plus domains & costs</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Executions</span>
                    <div className="text-right flex-1">
                      <span className="text-white text-sm">Unlimited</span>
                      <span className="text-xs block text-slate-500 mt-0.5">If server stays up</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Server Mgmt</span>
                    <div className="text-right flex-1 flex flex-col items-end">
                      <span className="flex items-center text-red-400/80 text-sm"><XCircle className="w-4 h-4 mr-1.5 shrink-0" /> You configure</span>
                      <span className="text-xs block text-slate-500 mt-0.5">Docker & Linux</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">SSL & Updates</span>
                    <div className="text-right flex-1 flex items-center justify-end text-red-400/80 text-sm">
                      <XCircle className="w-4 h-4 mr-1.5 shrink-0" /> DIY maintenance
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Setup Time</span>
                    <div className="text-right flex-1 text-white text-sm">
                      Hours / Days
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Templates</span>
                    <div className="text-right flex-1 text-slate-400 text-sm">
                      Manual import
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Support</span>
                    <div className="text-right flex-1 text-slate-400 text-sm">
                      Google Search & Forums
                    </div>
                  </li>
                </ul>
              </div>

              {/* n8n Cloud Card */}
              <div className="bg-[#131316] border border-white/10 rounded-2xl p-5 shadow-lg">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-xl font-display font-bold text-white">n8n Cloud</h3>
                  <p className="text-sm text-slate-400">(Official)</p>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Monthly Price</span>
                    <div className="text-right flex-1">
                      <span className="text-white text-sm">~$20+ /mo</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Executions</span>
                    <div className="text-right flex-1">
                      <span className="text-white text-sm">Strict Limits</span>
                      <span className="text-xs block text-slate-500 mt-0.5">Expensive overages</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Server Mgmt</span>
                    <div className="text-right flex-1 flex items-center justify-end text-emerald-400/80 text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" /> Managed by them
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">SSL & Updates</span>
                    <div className="text-right flex-1 flex items-center justify-end text-emerald-400/80 text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" /> Automatic
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Setup Time</span>
                    <div className="text-right flex-1 text-emerald-400 text-sm">
                      Instant
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Templates</span>
                    <div className="text-right flex-1 text-slate-400 text-sm">
                      Standard access
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm font-medium pr-4 mt-0.5">Support</span>
                    <div className="text-right flex-1 text-slate-400 text-sm">
                      Email tickets
                    </div>
                  </li>
                </ul>
              </div>

              {/* Our Managed Stack Card */}
              <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600" />
                <div className="border-b border-brand-500/20 pb-4 mb-4">
                  <h3 className="text-xl font-display font-bold text-brand-400">Our Managed Stack</h3>
                  <p className="text-sm text-brand-400/70">The maximum value</p>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">Monthly Price</span>
                    <div className="text-right flex-1">
                      <span className="text-brand-300 font-bold text-sm">₦15,000 /mo</span>
                      <span className="text-[11px] font-medium block text-brand-400/80 mt-0.5">Flat predictable rate</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">Executions</span>
                    <div className="text-right flex-1">
                      <span className="text-brand-300 font-bold text-sm">Unlimited</span>
                      <span className="text-[11px] font-medium block text-brand-400/80 mt-0.5">No strings attached</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">Server Mgmt</span>
                    <div className="text-right flex-1 flex items-center justify-end text-brand-300 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0 text-brand-500" /> Fully Managed
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">SSL & Updates</span>
                    <div className="text-right flex-1 flex items-center justify-end text-brand-300 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0 text-brand-500" /> Automatic
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">Setup Time</span>
                    <div className="text-right flex-1 text-brand-300 font-bold text-sm">
                      Instant
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">Templates</span>
                    <div className="text-right flex-1 flex items-center justify-end text-brand-300 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0 text-brand-500" /> 10,000+ Pre-loaded
                    </div>
                  </li>
                  <li className="flex justify-between items-start">
                    <span className="text-brand-400/70 text-sm font-medium pr-4 mt-0.5">Support</span>
                    <div className="text-right flex-1 flex items-center justify-end text-brand-300 font-bold text-sm text-right">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0 text-brand-500" /> Priority Technical
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-10 py-4 bg-brand-500/10 text-brand-400 font-semibold rounded-xl transition-all hover:bg-brand-500 hover:text-white border border-brand-500/20 hover:border-brand-500 shadow-sm"
              >
                <span>Grab This Steal Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t border-white/5 bg-[#0A0A0B] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Everything you need to know about migrating and securing your automations.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#131316] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-display font-bold text-lg text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === idx ? 'auto' : 0, opacity: openFaq === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-slate-400 text-sm">
            Still have questions? Feel free to reach out to our technical support team once you've joined.
          </div>
        </div>
      </div>

      {/* Value Stack Table Section */}
      <div className="border-t border-white/5 bg-[#050505] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Better Value Stack</h2>
            <p className="text-slate-400 text-lg">Stop paying per task. Start building freely.</p>
          </div>
          
          <div className="bg-[#131316] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 bg-[#1A1A1E] p-6 border-b border-white/10">
              <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">Feature included</div>
              <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider pl-4">The Value To You</div>
            </div>
            <div className="divide-y divide-white/5">
              {valueStack.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 p-6 hover:bg-[#1A1A1E]/50 transition-colors">
                  <div className="font-medium text-white flex items-center pr-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mr-3" />
                    <span className="text-sm md:text-base">{item.benefit}</span>
                  </div>
                  <div className="text-brand-400 font-medium flex items-center pl-4 text-sm md:text-base">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-10 py-5 bg-brand-500 text-white font-bold rounded-2xl transition-all hover:bg-brand-600 hover:-translate-y-1 shadow-[0_0_40px_-10px_rgba(255,109,90,0.5)] active:scale-95 text-lg"
            >
              <span>Get the Ultimate Stack for ₦15,000</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <p className="mt-4 text-sm text-slate-500">Secure checkout. Instant access to n8n workspace.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-slate-500 text-sm bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} The AI Automation Builder Stack. All rights reserved.</p>
          <p className="mt-2 text-slate-600 font-light max-w-xl mx-auto">This managed service is not directly affiliated with n8n. "n8n" is a trademark of n8n GmbH. We provide managed hosting and infrastructure optimized for open-source workflow builders.</p>
        </div>
      </footer>
    </div>
  );
}
