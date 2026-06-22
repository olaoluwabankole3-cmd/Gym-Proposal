import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Smartphone, 
  Calendar, 
  UserPlus, 
  TrendingUp, 
  FileText, 
  Code, 
  Copy, 
  X, 
  Check, 
  CheckCircle, 
  Edit3,
  CreditCard,
  Users
} from 'lucide-react';

export default function App() {
  const [gymName, setGymName] = useState('SWEAT HUB GYM');
  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [signatureText, setSignatureText] = useState('');
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // States for live automated payment & tracker simulator
  const [simulatedMembers, setSimulatedMembers] = useState([
    { id: 1, name: 'Alex Rivera', plan: 'Gold Membership', amount: '₦15,000', status: 'PAID', time: '2 mins ago' },
    { id: 2, name: 'Sarah Jenkins', plan: 'CrossFit Combo', amount: '₦22,000', status: 'PAID', time: '1 hour ago' },
    { id: 3, name: 'Michael Chen', plan: 'Day Pass Bundle', amount: '₦5,000', status: 'PAID', time: '3 hours ago' },
  ]);
  const [totalSimulatedCapital, setTotalSimulatedCapital] = useState(42000);

  const addSimulatedSignUp = () => {
    const names = ['Jordan Black', 'Evelyn Wood', 'Tariq Al-Mansoor', 'Chioma Nwachukwu', 'Damilola Adebayo', 'Yusuf Bello'];
    const plans = ['Gold Membership', 'Powerlifting Focus', 'Monthly All-Access', 'Cardio Unlimited'];
    const prices = [15000, 20000, 25000, 10000];
    
    const randomIdx = Math.floor(Math.random() * names.length);
    const randomPlanIdx = Math.floor(Math.random() * plans.length);
    
    const name = names[randomIdx];
    const plan = plans[randomPlanIdx];
    const rawPrice = prices[randomPlanIdx];
    
    const formattedPrice = `₦${rawPrice.toLocaleString()}`;
    const newMember = {
      id: Date.now(),
      name,
      plan,
      amount: formattedPrice,
      status: 'PAID',
      time: 'Just now'
    };
    
    setSimulatedMembers(prev => [newMember, ...prev.slice(0, 3)]);
    setTotalSimulatedCapital(prev => prev + rawPrice);
  };

  // Dynamic interactive options
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    'custom-coaching-portal': false,
    'merchandise-dropshop': false,
    'sms-automated-alerts': false,
  });

  const addonsList = [
    { 
      id: 'custom-coaching-portal', 
      title: 'COACH AND STUDENT DASHBOARD', 
      price: 50, 
      days: 4, 
      description: 'A special area where gym members can track their workouts, log what they eat, and talk directly with coaches.' 
    },
    { 
      id: 'merchandise-dropshop', 
      title: 'ONLINE GYM STORE', 
      price: 50, 
      days: 3, 
      description: 'An easy-to-use online shop to sell your gym shirts, hats, hoodies, and workout powder to anyone.' 
    },
    { 
      id: 'sms-automated-alerts', 
      title: 'AUTOMATIC PHONE TEXTS', 
      price: 50, 
      days: 3, 
      description: 'Sends automatic text messages to members when a class starts or when a spot opens up in a popular session.' 
    },
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeAddonsCount = Object.keys(selectedAddons).filter(k => selectedAddons[k]).length;
  const addonsTotalUSD = activeAddonsCount * 50;

  const currentPriceText = addonsTotalUSD > 0 
    ? `₦300,000 + $${addonsTotalUSD}`
    : `₦300,000`;

  const currentTimeline = 21 + Object.keys(selectedAddons).reduce((acc, curr) => {
    if (selectedAddons[curr]) {
      const addon = addonsList.find(a => a.id === curr);
      return acc + (addon ? addon.days : 0);
    }
    return acc;
  }, 0);

  // Initialize GSAP & ScrollTrigger directly
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animation (Massive title split or move slide up)
      gsap.fromTo('.hero-badge-loader',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out', delay: 0.1 }
      );

      gsap.fromTo('.hero-anim-title',
        { y: 50, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.8, ease: 'power4.out', stagger: 0.12, delay: 0.2 }
      );

      gsap.fromTo('.hero-anim-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo('.hero-anim-cta',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.8 }
      );

      // Objective Slider
      gsap.fromTo('.problem-side',
        { x: -100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: '.objective-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.solution-side',
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: '.objective-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Specs cards pop in
      gsap.fromTo('.feature-anim-card',
        { scale: 0.88, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Bottom Line box scale
      gsap.fromTo('.cta-box-anim',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-trigger-section',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  // Standalone HTML generator injecting current live stats
  const generateStandaloneHTML = () => {
    const activeAddonsListHTML = Object.keys(selectedAddons)
      .filter(key => selectedAddons[key])
      .map(key => {
        const item = addonsList.find(a => a.id === key);
        return `
        <!-- Dynamic Addon Item -->
        <div class="p-4 bg-neutral-900 border-2 border-neutral-800 flex items-start gap-3">
            <span class="text-yellow-500 font-bold">⚡</span>
            <div>
                <h5 class="text-xs font-black tracking-wide text-white uppercase">${item?.title}</h5>
                <p class="text-[11px] text-neutral-400 mt-0.5">${item?.description}</p>
            </div>
        </div>`;
      }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OUR PLAN FOR YOUR WEBSITE // ${gymName}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts Oswald & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet">
    <!-- GSAP & ScrollTrigger CDNs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0B0B0C;
        }
        .font-oswald {
            font-family: 'Oswald', sans-serif;
        }
        /* Brutalist industrial stylings */
        .brutalist-border {
            border: 4px solid #ffffff;
        }
        .brutalist-border-amber {
            border: 4px solid #EAB308;
        }
        .brutalist-shadow-amber {
            box-shadow: 8px 8px 0px 0px #EAB308;
        }
        .brutalist-shadow-white {
            box-shadow: 8px 8px 0px 0px #ffffff;
        }
        @keyframes rawPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 8px 8px 0px 0px #EAB308;
            }
            50% {
                transform: scale(1.02);
                box-shadow: 12px 12px 0px 0px #FACC15;
            }
        }
        .brutalist-pulse {
            animation: rawPulse 2.5s infinite ease-in-out;
        }
    </style>
</head>
<body class="text-neutral-100 min-h-screen selection:bg-yellow-500 selection:text-black overflow-x-hidden">

    <!-- Top Heavy Industrial Hazard Banner stripes -->
    <div class="h-4 bg-gradient-to-r from-yellow-500 via-neutral-900 to-yellow-500 bg-[size:40px_40px] opacity-90"></div>

    <!-- Main Digital Canvas Container -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">

        <!-- Top Urgent Header Badge Row -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b-4 border-white pb-8">
            <div>
                <span class="inline-block bg-yellow-500 text-black text-xs font-black tracking-[0.2em] px-3 py-1.5 uppercase font-oswald brutalist-border border-black">
                    [OUR PLAN FOR YOUR WEBSITE]
                </span>
                <h3 class="text-neutral-400 font-oswald tracking-wider uppercase text-sm mt-3">
                    MADE JUST FOR: <span class="text-white font-extrabold text-lg tracking-wide">${gymName}</span>
                </h3>
            </div>
            <div class="text-left md:text-right font-mono text-xs text-neutral-400 space-y-1">
                <p>PLAN NUMBER: <span class="text-yellow-500 font-bold">#IRON-WP-2026</span></p>
                <p>STATUS: READY TO START</p>
            </div>
        </div>

        <!-- HERO SECTION: BIG, LOUD BOLD UPPERCASE TEXT CENTERED -->
        <header id="hero" class="relative overflow-hidden mb-20 sm:mb-28 text-center bg-[#111113] brutalist-border brutalist-shadow-white p-8 sm:p-20">
            <!-- Grid Watermark -->
            <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            
            <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                <div class="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-yellow-500 uppercase bg-yellow-500/10 px-4 py-1.5 border border-yellow-500/30 mb-8">
                    <span>⚡ READY TO START BUILDING!</span>
                </div>
                
                <h1 class="font-oswald text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none max-w-2xl text-center">
                    LET'S BUILD <br class="hidden sm:inline"/>
                    YOUR GYM'S <span class="text-yellow-500 underline decoration-4 underline-offset-4">NEW</span> WEBSITE!
                </h1>
                
                <p class="text-neutral-400 text-sm sm:text-base mt-6 max-w-xl leading-relaxed">
                    Most gym websites are boring and do not get you new members. We will build a super fast website that turns people who visit the page into happy, signed-up members of your gym!
                </p>
            </div>
        </header>

        <!-- THE PROBLEM & SOLUTION: TWO COLUMN SPLIT -->
        <section id="objective" class="objective-section mb-20 sm:mb-28">
            <h2 class="font-oswald text-4xl sm:text-5xl font-black tracking-tight uppercase text-white mb-8">
                01. <span class="text-yellow-500">THE PROBLEM AND THE SOLUTION</span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left: The Problem -->
                <div class="problem-side bg-[#111113] brutalist-border p-6 sm:p-8 space-y-4">
                    <span class="text-xs font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-1 uppercase inline-block">
                        THE BIG PROBLEM
                    </span>
                    <h3 class="font-oswald text-2xl font-black text-white uppercase leading-tight">
                        PEOPLE CANNOT FIND YOU ONLINE
                    </h3>
                    <p class="text-neutral-400 text-sm leading-relaxed">
                        When people want to find a gym, they search on their phones first. If they see a messy website that does not work on their phones, they will leave and go to another gym down the street.
                    </p>
                    <p class="text-neutral-400 text-sm leading-relaxed">
                        If you only have an Instagram page, people get confused. They cannot sign up for classes easily, and you have to spend a lot of time doing boring paperwork at the front desk.
                    </p>
                </div>

                <!-- Right: The Solution -->
                <div class="solution-side bg-neutral-900 brutalist-border-amber brutalist-shadow-amber p-6 sm:p-8 space-y-4">
                    <span class="text-xs font-mono text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 uppercase inline-block font-mono">
                        OUR SMART SOLUTION
                    </span>
                    <h3 class="font-oswald text-2xl font-black text-white uppercase leading-tight">
                        A REALLY FAST AND EASY WEBSITE
                    </h3>
                    <p class="text-neutral-200 text-sm leading-relaxed">
                        We will make a beautiful, modern website that looks amazing on phones. It will let members book their classes with one click, sign their waivers online, and pay for memberships easily without any stress.
                    </p>
                </div>
            </div>
        </section>

        <!-- THE SPECS: 4 BOLD GRID BLOCKS -->
        <section id="specs" class="mb-20 sm:mb-28">
            <div class="mb-10 text-left">
                <span class="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">02. COOL FEATURES</span>
                <h3 class="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">WHAT WE WILL BUILD FOR YOU</h3>
            </div>

            <div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Block 1 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        01
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">WORKS GREAT ON PHONES</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        Almost everyone looks for gyms on their phones. Our website loads in less than two seconds on any phone. It is very easy to read and swipe through.
                    </p>
                </div>

                <!-- Block 2 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        02
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">EASY CLASS BOOKING</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        Show your class times clearly. Members can filter by what kind of workout they want (like Lifting, Cardio, or Yoga) and book their spot instantly.
                    </p>
                </div>

                <!-- Block 3 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        03
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">FAST SIGN-UP</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        No more paper forms! New members can type in their info, pay securely, and sign gym waivers online before they even walk through your door.
                    </p>
                </div>

                <!-- Block 4 -->
                <div class="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group">
                    <div class="h-10 w-10 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                        04
                    </div>
                    <h4 class="font-oswald text-xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors">SHOW UP ON GOOGLE MAPS</h4>
                    <p class="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        We set up your website so it shows up at the top of Google and Google Maps searches in your town. This gets you noticed before other gyms.
                    </p>
                </div>
            </div>
        </section>

        <!-- AUTOMATED PAYMENTS & MEMBER TRACKING PREVIEW (ZERO-HASSLE PROMISE) -->
        <section id="zero-hassle-payments" class="mb-20 sm:mb-28">
            <div class="mb-10 text-left">
                <span class="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">03. ZERO ADMINISTRATIVE WORK</span>
                <h3 class="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">HANDS-OFF PAYMENTS & AUTO-TRACKING</h3>
                <p class="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
                    Forget about chasing members for physical card swipes, bank transfer confirmations, or ledger notebooks. The brand new website is engineered to process transactions securely and update member enrollment logs automatically.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <!-- Comparison Item 1 -->
                <div class="bg-[#1a1113] border border-red-950 p-6 space-y-3 relative overflow-hidden">
                    <span class="text-[10px] font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 uppercase inline-block">
                        OLD PHYSICAL WAY
                    </span>
                    <h4 class="font-oswald text-xl font-bold text-white uppercase">Manual Fatigue & Queue Issues</h4>
                    <ul class="text-neutral-400 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                        <li>Chasing cash or manual transfer screenshots drains staff focus at the reception desk.</li>
                        <li>Tracking expired memberships in notebooks or spreadsheets leads to missed payments.</li>
                        <li>Overdue registration forms are easy to lose, leaving your business legally vulnerable.</li>
                    </ul>
                </div>

                <!-- Comparison Item 2 -->
                <div class="bg-[#111c16] border border-emerald-950 p-6 space-y-3 relative overflow-hidden">
                    <span class="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase inline-block">
                        DIGITAL WEBSITE DIRECT WAY
                    </span>
                    <h4 class="font-oswald text-xl font-bold text-white uppercase">100% Automated Business System</h4>
                    <ul class="text-neutral-200 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                        <li><strong>Instant Processing:</strong> Members pay directly on checkout from any smartphone securely.</li>
                        <li><strong>Automatic Tracker:</strong> The website flags active, unpaid, or renewal states instantly in real-time.</li>
                        <li><strong>Cloud Agreements:</strong> Signed membership waivers are saved alongside payments immediately.</li>
                    </ul>
                </div>
            </div>
            
            <!-- Standard dynamic summary badge info -->
            <div class="mt-6 bg-[#111113] brutalist-border p-4 text-center">
                <p class="text-xs font-mono text-yellow-500 uppercase tracking-widest">[ AUTOMATION VERIFIED: NO CASH BINDERS REQUIRED ]</p>
            </div>
        </section>

        <!-- THE BOTTOM LINE (CTA): MASSIVE HIGH-CONTRAST BOX -->
        <section id="bottom-line" class="cta-trigger-section">
            <div class="cta-box-anim bg-gradient-to-br from-yellow-500 to-amber-600 brutalist-border brutalist-shadow-white p-6 sm:p-14 text-black relative">
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="space-y-4 max-w-xl text-left">
                        <span class="inline-block bg-black text-yellow-500 text-xs font-black tracking-widest px-3 py-1 uppercase font-mono brutalist-border border-black">
                            TIMELINE AND BUDGET SUMMARY
                        </span>
                        <h3 class="font-oswald text-3xl sm:text-5xl font-black uppercase text-neutral-900 leading-none">
                            LOCK IN YOUR PRICES NOW
                        </h3>
                        <p class="text-neutral-900 text-sm font-semibold leading-relaxed">
                            We will start building your website as soon as you sign below. Locking this in reserves our development time so we can finish it quickly for you.
                        </p>
                        
                        <div class="space-y-2 text-xs font-mono text-black font-bold pt-2">
                            <p>✔ Complete website setup custom-made for your gym</p>
                            <p>✔ Everything hosted on the internet for you with no errors</p>
                            ${activeAddonsListHTML}
                        </div>
                    </div>

                    <!-- Lock block -->
                    <div class="bg-neutral-950 p-6 sm:p-8 brutalist-border border-black text-center text-white w-full md:max-w-xs space-y-6">
                        <div class="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-800">
                            <div>
                                <p class="text-[9px] text-neutral-500 font-mono tracking-widest uppercase font-black">DAYS TO BUILD</p>
                                <p class="text-lg font-black text-white mt-1 font-oswald text-white">${currentTimeline} DAYS</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-neutral-500 font-mono tracking-widest uppercase font-black">TOTAL PRICE</p>
                                <p class="text-lg font-black text-yellow-500 mt-1 font-oswald text-yellow-500">${currentPriceText}</p>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <button onclick="alert('Website deal signed successfully! We are ready to build it now!')" class="w-full bg-yellow-500 font-black text-black text-sm uppercase py-4.5 px-6 brutalist-border border-black shadow hover:bg-white hover:text-black hover:scale-[1.02] transform transition-all brutalist-pulse">
                                ORDER NOW 🚀
                            </button>
                            <p class="text-[9px] text-neutral-500 font-mono">This price is saved for 14 days</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Signature Statement footer -->
        <footer class="mt-16 text-center text-xs text-neutral-500 font-mono border-t border-neutral-800 pt-8">
            <p>GYM PROPOSAL FOR A BETTER WEBSITE 2026</p>
        </footer>

    </div>

    <!-- GSAP Initializations script block -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);

            // Stagger hero headers
            gsap.fromTo("#hero h1, #hero p", 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out" }
            );

            // Problem and solution slide
            gsap.fromTo(".problem-side", 
                { x: -80, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: ".objective-section",
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(".solution-side", 
                { x: 80, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    scrollTrigger: {
                        trigger: ".objective-section",
                        start: "top 80%"
                    }
                }
            );

            // Features cards pop up
            gsap.fromTo(".feature-anim-card", 
                { scale: 0.9, opacity: 0, y: 30 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: ".features-grid",
                        start: "top 85%"
                    }
                }
            );
        });
    </script>

</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateStandaloneHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !signatureText) return;
    setIsSignModalOpen(false);
    setIsAccepted(true);
  };

  const totalSelectedAddonsCount = Object.keys(selectedAddons).filter(k => selectedAddons[k]).length;

  return (
    <div className="bg-[#0B0B0C] text-neutral-100 min-h-screen font-sans selection:bg-yellow-500 selection:text-black pb-24 relative overflow-x-hidden">
      
      {/* Top Heavy Industrial Stripe Banner */}
      <div className="h-4 bg-gradient-to-r from-yellow-500 via-neutral-900 to-yellow-500 bg-[size:40px_40px] opacity-90"></div>

      {/* Main Canvas Space */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">

        {/* Celebratory Signature Acceptance Board */}
        {isAccepted && (
          <div className="bg-[#141d1a] brutalist-border-amber border-yellow-500 p-6 sm:p-10 mb-12 relative flex flex-col md:flex-row items-center gap-8 shadow-2xl animate-glow">
            <div className="h-16 w-16 bg-yellow-500 text-black brutalist-border border-black flex items-center justify-center shrink-0 animate-bounce">
              <Check className="h-9 w-9 stroke-[3]" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="font-oswald text-3xl font-black text-white uppercase tracking-wide">DEAL COMPLETED! 🎉</h3>
              <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Super! <strong>{clientName}</strong> signed the deal for <strong>{gymName}</strong>. We are ready to build the new website for you now. This will be awesome!
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
                <span className="bg-black border border-neutral-800 px-3 py-1.5">SIGNED BY: {clientName}</span>
                <span className="bg-black border border-neutral-800 px-3 py-1.5">EMAIL: {contactEmail}</span>
                <span className="bg-black border border-neutral-800 px-3 py-1.5 text-yellow-500">TOTAL PRICE: {currentPriceText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header Ribbon Section */}
        <div className="hero-badge-loader flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b-4 border-white pb-6">
          <div>
            <span className="inline-block bg-yellow-500 text-black text-xs font-black tracking-[0.2em] px-3 py-1 uppercase font-oswald brutalist-border border-black">
              [OUR PLAN FOR YOUR WEBSITE]
            </span>
            <h3 className="text-neutral-400 font-oswald tracking-wider uppercase text-sm mt-3.5">
              MADE JUST FOR: <span className="text-white font-extrabold text-base tracking-wide">{gymName}</span>
            </h3>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 flex flex-col md:items-end gap-2">
            <p>PLAN NUMBER: <span className="text-yellow-500 font-semibold font-mono">#STAKR-SHG-2026</span></p>
            <p className="text-neutral-500 flex items-center justify-start md:justify-end gap-1.5">Presented: June 2026</p>
            <button 
              onClick={handleCopyCode}
              className="mt-1 bg-yellow-500 hover:bg-white text-black font-black font-mono uppercase tracking-wider text-[10px] px-3 py-1.5 border border-black transform active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Code className="h-3.5 w-3.5" />
              {copied ? 'COPIED TO CLIPBOARD! ✓' : 'GET STANDALONE CODE 🚀'}
            </button>
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <header id="hero" className="relative overflow-hidden mb-20 sm:mb-28 text-center bg-[#111113] brutalist-border brutalist-shadow-white p-8 sm:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="hero-anim-sub inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-yellow-500 uppercase bg-yellow-500/10 px-4 py-1.5 border border-yellow-500/30 mb-8 rounded-none">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SUPER DUPER WEBSITES</span>
            </div>
            
            <h1 className="hero-anim-title font-oswald text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none max-w-2xl text-center">
              LET'S BUILD <br className="hidden sm:inline"/>
              YOUR GYM'S <span className="text-yellow-500 underline decoration-4 underline-offset-4">NEW</span> WEBSITE!
            </h1>
            
            <p className="hero-anim-sub text-neutral-400 text-sm sm:text-base mt-6 max-w-xl leading-relaxed">
              Most gym websites are boring and do not get you new members. We will build a super fast website that turns people who visit the page into happy, signed-up members of your gym!
            </p>

            <div className="hero-anim-cta mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('cta-box-point');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="bg-yellow-500 hover:bg-white text-black font-black font-oswald uppercase tracking-wider text-xs px-6 py-3 border-2 border-black transform active:scale-95 transition-all shadow-[4px_4px_0px_0px_#fff] cursor-pointer"
              >
                Sign Below & Start ⚡
              </button>
            </div>
          </div>
        </header>

        {/* 2. THE OBJECTIVE SECTION */}
        <section id="objective" className="objective-section mb-20 sm:mb-28">
          <h2 className="font-oswald text-4xl sm:text-5xl font-black tracking-tight uppercase text-white mb-8 border-b-2 border-neutral-850 pb-4">
            01. <span className="text-yellow-500">THE PROBLEM AND THE SOLUTION</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Problem */}
            <div className="problem-side bg-[#111113] brutalist-border p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-1 uppercase inline-block">
                THE BIG PROBLEM
              </span>
              <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight">
                PEOPLE CANNOT FIND YOU ONLINE
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                When people want to find a gym, they search on their phones first. If they see a messy website that does not work on their phones, they will leave and go to another gym down the street.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                If you only have an Instagram page, people get confused. They cannot sign up for classes easily, and you have to spend a lot of time doing boring paperwork at the front desk.
              </p>
            </div>

            {/* Right Column: Solution */}
            <div className="solution-side bg-neutral-900 brutalist-border-amber brutalist-shadow-amber p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 uppercase inline-block font-mono">
                OUR SMART SOLUTION
              </span>
              <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight">
                A REALLY FAST AND EASY WEBSITE
              </h3>
              <p className="text-neutral-200 text-sm leading-relaxed">
                We will make a beautiful, modern website that looks amazing on phones. It will let members book their classes with one click, sign their waivers online, and pay for memberships easily without any stress.
              </p>
              <p className="text-neutral-300 text-xs font-mono border-t border-neutral-800 pt-3 flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-yellow-500" />
                No stress. Built for simplicity, speed, and real gym growth.
              </p>
            </div>
          </div>
        </section>

        {/* 3. THE SPECS: 4 BOLD GRID BLOCKS */}
        <section id="specs" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">02. COOL FEATURES</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">WHAT WE WILL BUILD FOR YOU</h3>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Spec 1 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                01
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-yellow-500" />
                WORKS GREAT ON PHONES
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Almost everyone looks for gyms on their phones. Our website loads in less than two seconds on any phone. It is very easy to read and swipe through.
              </p>
            </div>

            {/* Spec 2 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                02
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-500" />
                EASY CLASS BOOKING
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Show your class times clearly. Members can filter by what kind of workout they want (like Lifting, Cardio, or Yoga) and book their spot instantly.
              </p>
            </div>

            {/* Spec 3 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                03
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-yellow-500" />
                FAST SIGN-UP
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                No more paper forms! New members can type in their info, pay securely, and sign gym waivers online before they even walk through your door.
              </p>
            </div>

            {/* Spec 4 */}
            <div className="feature-anim-card bg-[#111113] brutalist-border p-6 sm:p-8 hover:bg-[#18181b] transition-all group duration-300 relative">
              <div className="h-12 w-12 flex items-center justify-center bg-yellow-500 text-black font-extrabold text-xl font-oswald brutalist-border border-black mb-4">
                04
              </div>
              <h4 className="font-oswald text-2xl font-black text-white uppercase group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-500" />
                SHOW UP ON GOOGLE MAPS
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                We set up your website so it shows up at the top of Google and Google Maps searches in your town. This gets you noticed before other gyms.
              </p>
            </div>

          </div>
        </section>

        {/* AUTOMATION & PAYMENTS SECTION (GYM ZERO-HASSLE PROMISE) */}
        <section id="zero-hassle-payments" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-yellow-500 font-bold uppercase">03. ZERO ADMINISTRATIVE WORK</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">HANDS-OFF PAYMENTS & AUTO-TRACKING</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Forget about chasing members for physical card swipes, bank transfer confirmations, or ledger notebooks. The brand new website is engineered to process transactions securely and update member enrollment logs automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Comparison Columns */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              
              <div className="bg-[#1a1113] border border-red-950 p-6 space-y-3 relative overflow-hidden">
                <span className="text-[10px] font-mono text-red-500 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 uppercase inline-block">
                  OLD PHYSICAL WAY
                </span>
                <h4 className="font-oswald text-xl font-bold text-white uppercase flex items-center gap-2">
                  <X className="h-5 w-5 text-red-500 shrink-0" />
                  Manual Fatigue & Queue Issues
                </h4>
                <ul className="text-neutral-400 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Chasing cash or manual transfer screenshots drains staff focus at the reception desk.</li>
                  <li>Tracking expired memberships in notebooks or spreadsheets leads to missed payments.</li>
                  <li>Overdue registration forms are easy to lose, leaving your business legally vulnerable.</li>
                </ul>
              </div>

              <div className="bg-[#111c16] border border-emerald-950 p-6 space-y-3 relative overflow-hidden">
                <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase inline-block">
                  DIGITAL WEBSITE DIRECT WAY
                </span>
                <h4 className="font-oswald text-xl font-bold text-white uppercase flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                  100% Automated Business System
                </h4>
                <ul className="text-neutral-200 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed">
                  <li><strong>Instant Processing:</strong> Members pay directly on checkout from any smartphone securely.</li>
                  <li><strong>Automatic Tracker:</strong> The website flags active, unpaid, or renewal states instantly in real-time.</li>
                  <li><strong>Cloud Agreements:</strong> Signed membership waivers are saved alongside payments immediately.</li>
                </ul>
              </div>

            </div>

            {/* Right Side: Interactive Real-Time payment Simulator */}
            <div className="lg:col-span-6 bg-[#111113] brutalist-border p-6 sm:p-8 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-emerald-700/20 pb-4">
                  <div>
                    <h4 className="font-oswald text-lg font-bold text-white uppercase flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-yellow-500 shrink-0" />
                      LIVE TRANSACTION AUTO-TRACKER
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1">Interactive Proposal Demonstration</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-neutral-500 font-mono uppercase">Total Simulated Collections</p>
                    <p className="text-sm font-oswald text-yellow-500 font-bold">₦{totalSimulatedCapital.toLocaleString()}</p>
                  </div>
                </div>

                {/* Simulated Ledger Records list */}
                <div className="space-y-3 pt-2">
                  {simulatedMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-black border border-neutral-850 p-3 flex justify-between items-center text-xs animate-[fadeIn_0.5s_ease-out]"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-white flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-neutral-500" />
                          {member.name}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono">{member.plan} • {member.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-500 font-mono font-bold block">{member.amount}</span>
                        <span className="inline-block text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.2 uppercase font-black tracking-wider">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-850 mt-6 lg:mt-0">
                <button
                  type="button"
                  onClick={addSimulatedSignUp}
                  className="w-full bg-yellow-500 hover:bg-white text-black font-black font-mono uppercase tracking-wider text-xs py-3 px-4 border border-black hover:scale-[1.02] transform transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-black animate-spin" />
                  SIMULATE NEW SIGN-UP & AUTO-PAYMENT 🚀
                </button>
                <p className="text-[10px] text-neutral-400 text-center mt-2.5 font-mono">
                  Click to simulate a client buying a plan online. Notice how payment clears and updates track status live!
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE WORKSPACE CUSTOMIZATION ENGINES */}
        <section id="addons-customizer" className="mb-20 sm:mb-28">
          <div className="bg-[#111113] brutalist-border p-6 sm:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-800 mb-8">
              <div>
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase">PICK EXTRA COOL OPTIONS</span>
                <h3 className="font-oswald text-3xl font-black text-white uppercase mt-1">CHOOSE YOUR EXTRA FEATURES</h3>
                <p className="text-xs text-neutral-400 mt-1">Click the boxes below to add extra features to your new website. This will update the price and build time instantly!</p>
              </div>
              <div className="bg-black border border-neutral-800 text-xs font-mono text-yellow-500 tracking-wider py-1.5 px-3">
                EXTRA FEATURES: {totalSelectedAddonsCount}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {addonsList.map(item => {
                const isSelected = selectedAddons[item.id] || false;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleToggleAddon(item.id)}
                    className={`p-5 brutalist-border transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                      isSelected 
                        ? 'border-yellow-500 bg-[#1c180a]' 
                        : 'border-neutral-800 bg-[#0B0B0C] hover:bg-neutral-900 hover:border-neutral-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-none border-2 border-black flex items-center justify-center ${
                          isSelected ? 'bg-yellow-500 text-black' : 'bg-[#111113]'
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[4]" />}
                        </div>
                        <h4 className="font-oswald text-lg font-black text-white uppercase tracking-wide">{item.title}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 pl-8 leading-relaxed max-w-2xl">{item.description}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0 pl-8 sm:pl-0">
                      <span className="text-yellow-500 font-oswald text-lg font-extrabold">+${item.price}</span>
                      <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">+{item.days} DAYS TO BUILD</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. THE BOTTOM LINE: MASSIVE HIGH-CONTRAST BOX */}
        <section id="cta-box-point" className="cta-trigger-section">
          <h2 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mb-8">
            03. <span className="text-yellow-500">THE BOTTOM LINE</span>
          </h2>

          <div className="cta-box-anim bg-gradient-to-br from-yellow-500 to-amber-600 brutalist-border brutalist-shadow-white p-8 sm:p-14 text-black relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-xl text-left">
                <span className="inline-block bg-black text-yellow-500 text-xs font-black tracking-widest px-3 py-1 uppercase font-mono brutalist-border border-black">
                  TIMELINE AND BUDGET SUMMARY
                </span>
                <h3 className="font-oswald text-3xl sm:text-5xl font-black uppercase text-neutral-900 leading-none">
                  LOCK IN YOUR PRICES NOW
                </h3>
                <p className="text-neutral-900 text-sm font-semibold leading-relaxed">
                  We will start building your website as soon as you sign below. Locking this in reserves our development time so we can finish it quickly for you.
                </p>
                
                <div className="space-y-2 text-xs font-mono text-black font-bold pt-2">
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Complete website setup custom-made for your gym</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Everything hosted on the internet for you with no errors</span>
                  </p>
                  {Object.keys(selectedAddons).filter(k => selectedAddons[k]).map(key => {
                    const addonItem = addonsList.find(a => a.id === key);
                    return (
                      <p key={key} className="flex items-center gap-2 text-neutral-900">
                        <span>★</span>
                        <span>Option Included: {addonItem?.title} (+{addonItem?.days} Days)</span>
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Investment Block */}
              <div className="bg-neutral-950 p-6 sm:p-8 brutalist-border border-black text-center text-white w-full lg:max-w-xs space-y-6">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-800">
                  <div>
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">DAYS TO BUILD</p>
                    <p className="text-lg sm:text-xl font-extrabold text-white mt-1 uppercase font-oswald">{currentTimeline} DAYS</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">TOTAL PRICE</p>
                    <p className="text-lg sm:text-xl font-extrabold text-yellow-500 mt-1 font-oswald">{currentPriceText}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    id="lock-btn-interactive"
                    onClick={() => {
                      if (isAccepted) {
                        alert('Proposal already signed! 🦾');
                      } else {
                        setIsSignModalOpen(true);
                      }
                    }}
                    className="w-full bg-yellow-500 font-black text-black text-sm uppercase py-4.5 px-6 brutalist-border border-black hover:bg-white hover:text-black hover:scale-[1.02] transform transition-all brutalist-pulse cursor-pointer animate-glow"
                  >
                    {isAccepted ? 'SIGNED AND AGREED ✓' : 'ORDER NOW 🚀'}
                  </button>
                  <p className="text-[9px] text-neutral-500 font-mono">This price is saved for 14 days</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer specifications info lines */}
        <footer className="mt-20 text-center text-[11px] text-neutral-500 font-mono border-t border-neutral-850 pt-8 space-y-2">
          <p>GYM PROPOSAL FOR A BETTER WEBSITE 2026</p>
          <p className="text-neutral-600">Click &quot;Get Standalone Code&quot; at the top to see and copy the website code instantly.</p>
        </footer>

      </div>

      {/* Signature dynamic modal popup */}
      {isSignModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111113] brutalist-border border-yellow-500 w-full max-w-md rounded-none overflow-hidden shadow-2xl relative">
            
            <button 
              onClick={() => setIsSignModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-yellow-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <form onSubmit={submitSignature} className="p-6 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex bg-yellow-500 text-black p-3 rounded-none mb-3 brutalist-border border-black">
                  <Edit3 className="h-6 w-6" />
                </div>
                <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wide">SIGN TO ORDER FOR {gymName}</h3>
                <p className="text-xs text-neutral-400">We will lock in the prices today and start building right away</p>
              </div>

              <div className="space-y-4 pt-3">
                <div className="space-y-2">
                  <label htmlFor="client-name-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Your Full Name</label>
                  <input 
                    id="client-name-input"
                    required
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sam rage" 
                    className="w-full bg-black border-2 border-neutral-800 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-neutral-700"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Your Email Address</label>
                  <input 
                    id="contact-email-input"
                    required
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. sam@epicfortress.com" 
                    className="w-full bg-black border-2 border-neutral-800 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-neutral-700"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sig-verify-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Write Your Signature</label>
                  <input 
                    id="sig-verify-input"
                    required
                    type="text" 
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    placeholder="Type your signature here..." 
                    className="w-full bg-black border-2 border-neutral-800 rounded-none px-4 py-3 text-sm text-yellow-500 italic font-mono focus:outline-none focus:border-yellow-500 transition-colors placeholder-neutral-700 tracking-widest font-black"
                  />
                  <p className="text-[10px] text-neutral-500 pl-1">Signing here means you agree to start building your website.</p>
                </div>
              </div>

              <div className="bg-black p-4 border border-neutral-800 space-y-1.5 text-xs text-neutral-300 font-mono">
                <p><strong>YOUR CHOSEN PLAN:</strong></p>
                <p className="text-[11px] text-neutral-400">Standard Website Setup: 300,000 Naira</p>
                {Object.keys(selectedAddons).filter(k => selectedAddons[k]).map(key => {
                  const addonItem = addonsList.find(a => a.id === key);
                  return <p key={key} className="text-[11px] text-neutral-400">+ {addonItem?.title}: ${addonItem?.price}</p>;
                })}
                <p className="pt-2 border-t border-neutral-800 font-bold text-white flex justify-between font-bold">
                  <span>TOTAL COST:</span>
                  <span className="text-yellow-500">{currentPriceText}</span>
                </p>
              </div>

              <div className="flex gap-4 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsSignModalOpen(false)}
                  className="w-1/2 bg-neutral-900 border-2 border-neutral-800 hover:bg-neutral-800 text-neutral-300 py-3 uppercase text-xs font-black tracking-widest cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-yellow-500 text-black py-3 uppercase text-xs font-black tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  SIGN AND ORDER 🖋️
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
