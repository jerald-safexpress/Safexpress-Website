/**
 * SITE CONTENT (defaults)
 * ---------------------------------------------------------------------------
 * Prefer the browser admin at /admin (password: admin123) to change content.
 * Edits are saved in this browser's localStorage and override these defaults.
 *
 * You can still edit this file for the factory defaults. Reset in admin
 * restores everything back to the values below.
 *
 * Company name:  company.name
 * Blue letters:  company.accentLetters  (letters at the end that are blue)
 * Theme colors:  ui.brandColor, ui.accentTextColor, ui.buttonBg, etc.
 */

const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
  /** Fill the dropdown from the services list so you do not have to repeat it. */
  childrenFrom?: 'services';
}

export interface ServiceItem {
  slug: string;
  title: string;
  icon: string;
  image: string;
  summary: string;
  lead: string;
  paragraphs: string[];
  highlights: string[];
}

export interface PostItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  paragraphs: string[];
}

export interface Shipment {
  id: string;
  status: string;
  origin: string;
  destination: string;
  service: string;
  eta: string;
  progress: number;
  events: { title: string; place: string; time: string; done: boolean }[];
}

export interface SiteContent {
  company: {
    name: string;
    accentLetters: number;
    legalName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    lat: number;
    lng: number;
    /** Color/dark logo for light backgrounds. Empty = built-in SVG mark. */
    logo: string;
    /** White/light logo for dark backgrounds (footer, hero header). Falls back to logo. */
    logoLight: string;
    /** icon = image + company name text; full = image only (full wordmark graphic). */
    logoStyle: 'icon' | 'full';
    /** Secondary label under the company name (e.g. LOGISTICS or Your Supply Chain Enabler). */
    logoLabel: string;
    /** Browser tab title on the home page (before “| Company”). */
    browserTitle: string;
    /** Browser tab / bookmark icon. Empty = default favicon.ico. */
    favicon: string;
    socials: { icon: string; label: string; url: string }[];
  };
  ui: {
    showPreloader: boolean;
    preloaderMs: number;
    banner: string;
    /** Links, icons, stats, section labels */
    brandColor: string;
    /** Hero accent line (e.g. "& Transport Services") */
    accentTextColor: string;
    /** Primary CTA background */
    buttonBg: string;
    /** Primary CTA text */
    buttonText: string;
    /** Primary CTA hover background */
    buttonHover: string;
    /** Headings on light pages */
    headingColor: string;
    /** Body copy */
    textColor: string;
    /** Outline / ghost button border & text on dark hero */
    ghostButtonColor: string;
    /** Header company name (main word) on light backgrounds */
    logoWordColor: string;
    /** Header company name accent letters */
    logoAccentColor: string;
    /** Header company name on dark / transparent hero header */
    logoWordOnDark: string;
    /** Secondary logo label on light backgrounds */
    logoLabelColor: string;
    /** Secondary logo label on dark / transparent hero header */
    logoLabelOnDark: string;
    /** Hero kicker / small label (px) */
    heroKickerSize: number;
    /** Hero main headline (px) */
    heroTitleSize: number;
    /** Hero supporting paragraph (px) */
    heroTextSize: number;
    /** Hero stats numbers (px) */
    heroStatValueSize: number;
    /** Hero stats labels under the numbers (px) */
    heroStatLabelSize: number;
    /** Section labels sitewide (px) */
    sectionLabelSize: number;
  };
  nav: NavItem[];
  hero: {
    kicker: string;
    title: string;
    titleAccent: string;
    text: string;
    image: string;
    primary: { label: string; path: string };
    secondary: { label: string; path: string };
    stats: { value: string; label: string }[];
  };
  features: { icon: string; title: string; text: string; number: string }[];
  trackingBand: {
    title: string;
    text: string;
    placeholder: string;
    image: string;
    stats: { value: string; label: string }[];
  };
  servicesIntro: { label: string; title: string; text: string };
  services: ServiceItem[];
  why: {
    label: string;
    title: string;
    text: string;
    points: string[];
    button: string;
    image: string;
  };
  processIntro: { label: string; title: string; text: string };
  process: { icon: string; title: string; text: string }[];
  testimonialsIntro: { label: string; title: string };
  testimonials: { id: string; name: string; role: string; quote: string; image: string }[];
  faqIntro: { label: string; title: string };
  faqs: { question: string; answer: string }[];
  blogIntro: { label: string; title: string; text: string };
  posts: PostItem[];
  shipments: Shipment[];
  trackingPage: { title: string; text: string; hint: string };
  fleetIntro: { title: string; text: string };
  fleet: { title: string; meta: string; text: string; image: string }[];
  teamIntro: { title: string; text: string };
  team: { name: string; role: string; text: string; image: string }[];
  careersIntro: { title: string; text: string };
  jobs: { title: string; location: string; type: string; summary: string }[];
  about: {
    title: string;
    heading: string;
    text: string[];
    image: string;
    points: string[];
  };
  contact: {
    title: string;
    heading: string;
    text: string;
    formTitle: string;
    hoursTitle: string;
    hours: string[];
  };
  quote: { title: string; heading: string; text: string; formTitle: string };
  footer: { aboutTitle: string; aboutText: string; links: { label: string; path: string }[] };
  legal: { privacy: { title: string; paragraphs: string[] }; terms: { title: string; paragraphs: string[] } };
  notFound: { title: string; text: string; button: string };
}

export const SITE: SiteContent = {
  company: {
    name: 'SFX',
    accentLetters: 1,
    legalName: 'SFX Logistics',
    tagline: 'Global Logistics Excellence',
    phone: '+65 6123 8800',
    email: 'hello@sfxlogistics.com',
    address: '100 Harbour Drive, Singapore',
    hours: 'Mon - Sat: 08:00 - 18:00',
    lat: 1.2834,
    lng: 103.8607,
    logo: '',
    logoLight: '',
    logoStyle: 'full',
    logoLabel: '',
    browserTitle: 'Premium Global Logistics',
    favicon: '',
    socials: [
      { icon: 'fa-brands fa-facebook-f', label: 'Facebook', url: 'https://facebook.com' },
      { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', url: 'https://linkedin.com' },
      { icon: 'fa-brands fa-instagram', label: 'Instagram', url: 'https://instagram.com' }
    ]
  },

  ui: {
    showPreloader: true,
    preloaderMs: 900,
    banner: photo('photo-1578575437130-527eed3abbec', 2000),
    brandColor: '#2563eb',
    accentTextColor: '#2563eb',
    buttonBg: '#2563eb',
    buttonText: '#ffffff',
    buttonHover: '#1d4ed8',
    headingColor: '#0f172a',
    textColor: '#64748b',
    ghostButtonColor: '#ffffff',
    logoWordColor: '#0f172a',
    logoAccentColor: '#2563eb',
    logoWordOnDark: '#ffffff',
    logoLabelColor: '#1e3a8a',
    logoLabelOnDark: '#cbd5e1',
    heroKickerSize: 13,
    heroTitleSize: 72,
    heroTextSize: 18,
    heroStatValueSize: 44,
    heroStatLabelSize: 12,
    sectionLabelSize: 13
  },

  nav: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services', childrenFrom: 'services' },
    { label: 'Tracking', path: '/tracking' },
    {
      label: 'Company',
      path: '/about',
      children: [
        { label: 'About Us', path: '/about' },
        { label: 'Our Fleet', path: '/fleet' },
        { label: 'Our Team', path: '/team' },
        { label: 'Careers', path: '/careers' },
        { label: 'FAQ', path: '/faq' }
      ]
    },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ],

  hero: {
    kicker: 'Worldwide Freight Solutions',
    title: 'Reliable Logistics',
    titleAccent: '& Transport Services',
    text: 'We provide fast, safe, and secure transportation services for your business needs. From ocean freight to air cargo, we handle it all with precision.',
    image: photo('photo-1601584115197-04ecc0da31d7', 2200),
    primary: { label: 'Explore Services', path: '/services' },
    secondary: { label: 'Track Shipment', path: '/tracking' },
    stats: [
      { value: '15K+', label: 'Delivered Shipments' },
      { value: '50+', label: 'Countries Served' },
      { value: '24/7', label: 'Support Available' }
    ]
  },

  features: [
    {
      icon: 'fa-solid fa-truck-fast',
      title: 'Express Delivery',
      text: 'Optimized routes and a dedicated fleet keep your cargo on schedule, every single time.',
      number: '01'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Secure Transport',
      text: 'Live tracking and strict handling rules keep valuable goods protected while they move.',
      number: '02'
    },
    {
      icon: 'fa-solid fa-earth-americas',
      title: 'Global Network',
      text: 'Connected with major ports and hubs worldwide for smooth international trade.',
      number: '03'
    }
  ],

  trackingBand: {
    title: 'Track Your Order',
    text: 'Enter your Track Id For Instant Search',
    placeholder: 'Tracking ID',
    image: photo('photo-1605745341112-85968b19335b', 1800),
    stats: [
      { value: '80%', label: 'Areas Covered' },
      { value: '205+', label: 'Countries Covered' },
      { value: '180+', label: 'Corporate Clients' },
      { value: '450+', label: 'Owned Vehicles' }
    ]
  },

  servicesIntro: {
    label: 'What We Offer',
    title: 'Our Premium Logistics Services',
    text: 'Comprehensive transportation solutions tailored to meet your specific business requirements.'
  },

  services: [
    {
      slug: 'ocean-freight',
      title: 'Ocean Freight',
      icon: 'fa-solid fa-ship',
      image: photo('photo-1605745341112-85968b19335b'),
      summary: 'Comprehensive sea freight services for FCL and LCL shipments to global destinations with competitive rates.',
      lead: 'Full-container and shared-container ocean freight planned around your sailing window.',
      paragraphs: [
        'SFX moves commercial cargo on scheduled ocean services between major ports. We book space, prepare the paperwork, and stay with the shipment until it is released at destination.',
        'Choose a full container when you need the box to yourself, or a shared container when the load is smaller. Either way you get a single point of contact and a tracking ID.'
      ],
      highlights: ['FCL and LCL bookings', 'Port-to-port and door-to-door', 'Export and import documentation', 'Competitive sailing schedules']
    },
    {
      slug: 'air-cargo',
      title: 'Air Cargo',
      icon: 'fa-solid fa-plane-departure',
      image: photo('photo-1436491865332-7a61a109cc05'),
      summary: 'Expedited air transport solutions for time-sensitive and high-value goods with priority handling.',
      lead: 'When the calendar is tight, air cargo keeps high-value and urgent freight moving.',
      paragraphs: [
        'We book direct and consolidated air services for parts, samples, retail launches, and other cargo that cannot wait for the next vessel.',
        'Priority handling, airport transfer, and customs paperwork are arranged before the flight so the shipment is not sitting on the ramp.'
      ],
      highlights: ['Airport-to-airport and door-to-door', 'Priority uplift', 'High-value cargo care', 'Tight delivery windows']
    },
    {
      slug: 'land-transport',
      title: 'Land Transport',
      icon: 'fa-solid fa-truck',
      image: photo('photo-1519003722824-194d4455a60c'),
      summary: 'Flexible trucking and rail options for domestic and cross-border distribution with real-time tracking.',
      lead: 'Road and rail distribution for domestic runs and cross-border lanes.',
      paragraphs: [
        'Our road fleet covers first-mile pickup, linehaul, and final delivery. Cross-border moves include the paperwork your lane requires.',
        'You can follow the truck from dispatch to proof of delivery with the same tracking ID used for ocean and air jobs.'
      ],
      highlights: ['FTL and LTL trucking', 'Cross-border lanes', 'Scheduled milk runs', 'Proof of delivery']
    },
    {
      slug: 'warehousing',
      title: 'Warehousing',
      icon: 'fa-solid fa-warehouse',
      image: photo('photo-1586528116311-ad8dd3c8310d'),
      summary: 'State-of-the-art storage facilities with inventory management and distribution services.',
      lead: 'Storage, pick-and-pack, and inventory control next to the freight network.',
      paragraphs: [
        'Use SFX warehouses as a buffer between production and delivery. We receive, count, store, and release cargo against your instructions.',
        'Short-term staging and longer storage contracts are both available, with simple stock reports you can share with your team.'
      ],
      highlights: ['Short and long-term storage', 'Inventory counts', 'Pick, pack, and dispatch', 'Bonded staging on request']
    },
    {
      slug: 'customs-clearance',
      title: 'Customs Clearance',
      icon: 'fa-solid fa-file-shield',
      image: photo('photo-1578575437130-527eed3abbec'),
      summary: 'Expert assistance with documentation and regulatory compliance for international shipments.',
      lead: 'Declarations, permits, and duty estimates handled before the cargo arrives.',
      paragraphs: [
        'International freight only moves as fast as the paperwork. Our brokerage team prepares entries, checks product codes, and flags missing permits early.',
        'You see the duty estimate before the shipment sails or flies, not after it is stuck at the terminal.'
      ],
      highlights: ['Import and export entries', 'Duty and tax estimates', 'Product classification', 'Permit coordination']
    },
    {
      slug: 'special-cargo',
      title: 'Special Cargo',
      icon: 'fa-solid fa-box-archive',
      image: photo('photo-1553413077-190dd305871c'),
      summary: 'Specialized handling for oversized, hazardous, and temperature-controlled cargo shipments.',
      lead: 'Out-of-gauge, temperature-controlled, and carefully packed freight.',
      paragraphs: [
        'Some loads need more than a standard box. We plan lifts, lashing, reefer settings, and route surveys before the cargo is collected.',
        'Tell us the dimensions, weight, and handling limits and we will propose the mode, the equipment, and the timeline.'
      ],
      highlights: ['Oversized and heavy lift', 'Temperature-controlled moves', 'Careful packing plans', 'Route surveys']
    }
  ],

  why: {
    label: 'Why Choose Us',
    title: 'We Create Opportunities to Reach Your Full Potential',
    text: 'With years of work in international logistics, SFX has built a reputation for reliability, clear pricing, and people who answer the phone.',
    points: [
      'Real-time tracking for all shipments',
      'Transparent pricing with no hidden fees',
      'Dedicated support team available 24/7',
      'Global network of trusted partners'
    ],
    button: 'Learn More About Us',
    image: photo('photo-1578575437130-527eed3abbec', 2000)
  },

  processIntro: {
    label: 'How It Works',
    title: 'Simple Shipping Process',
    text: 'Four easy steps to get your cargo delivered safely and efficiently.'
  },
  process: [
    { icon: 'fa-solid fa-file-lines', title: 'Request Quote', text: 'Fill out our simple form to get a competitive rate.' },
    { icon: 'fa-solid fa-box', title: 'Prepare Cargo', text: 'We help you with packaging and documentation.' },
    { icon: 'fa-solid fa-ship', title: 'Shipment', text: 'Your goods are transported via optimal routes.' },
    { icon: 'fa-solid fa-circle-check', title: 'Delivery', text: 'Safe arrival at the final destination.' }
  ],

  testimonialsIntro: { label: 'Testimonials', title: 'Customers' },
  testimonials: [
    {
      id: 't1',
      name: 'Hannah Cole',
      role: 'Supply Chain Lead',
      quote: 'SFX took over our weekly export lane and the first thing we noticed was silence. No chasing, no surprise fees, just cargo that landed when they said it would.',
      image: photo('photo-1573496359142-b8d87734a5a2', 600)
    },
    {
      id: 't2',
      name: 'Marcus Reid',
      role: 'Operations Director',
      quote: 'We moved a time-critical parts shipment by air on a Thursday and it was on the production line Monday morning. The tracking updates were specific, not generic.',
      image: photo('photo-1560250097-0b93528c311a', 600)
    },
    {
      id: 't3',
      name: 'Priya Nair',
      role: 'Import Manager',
      quote: 'Customs used to be the slow part of our month. SFX flags missing documents before the vessel arrives, which has saved us more than one storage bill.',
      image: photo('photo-1580489944761-15a19d654956', 600)
    },
    {
      id: 't4',
      name: 'Daniel Cho',
      role: 'Plant Manager',
      quote: 'Their warehouse team treats our inventory like it is already sold. Counts match, releases are on time, and I always know who to call.',
      image: photo('photo-1472099645785-5658abf4ff4e', 600)
    },
    {
      id: 't5',
      name: 'Elena Vasquez',
      role: 'Procurement Manager',
      quote: 'Pricing is plain. The quote we approve is the invoice we pay. That alone is why we moved the rest of our lanes to SFX.',
      image: photo('photo-1544005313-94ddf0286df2', 600)
    }
  ],

  faqIntro: { label: 'Everything You Need to Know', title: 'Frequently Asked Questions' },
  faqs: [
    {
      question: 'How often should I check my shipment status?',
      answer: 'You only need to look when you want to. Status updates post at each major checkpoint, and we email you if a milestone slips. For ocean freight, once a day is plenty. For air, check on the morning of arrival.'
    },
    {
      question: 'What should I do if my cargo is delayed?',
      answer: 'Open the tracking page with your ID, or call the number on your booking. We will tell you where the cargo is, why it stopped, and the revised arrival. If a connection is missed, we rebook before we call you back.'
    },
    {
      question: 'Do you offer specialized services for fragile items?',
      answer: 'Yes. Fragile, oversized, and temperature-controlled cargo is planned as special cargo. Share the handling notes with your quote request and we will match the packing, equipment, and mode.'
    },
    {
      question: 'What are my options for international shipping?',
      answer: 'Ocean freight for planned volume, air cargo for short lead times, and land transport for the pickup and final mile. Most international jobs combine two of those. Customs clearance can be added to any of them.'
    },
    {
      question: 'Is cargo insurance mandatory?',
      answer: 'It is not required to book, and we recommend it whenever the cargo value matters to your business. Ask for it on the quote form and we will include the premium as its own line, not buried in the freight rate.'
    }
  ],

  blogIntro: {
    label: 'Latest News',
    title: 'Logistics Insights & Updates',
    text: 'Stay informed with the latest trends, tips, and news from the transportation industry.'
  },
  posts: [
    {
      slug: 'supply-chain-trends',
      title: 'Global Supply Chain Trends to Watch in 2027',
      date: 'Oct 24, 2026',
      image: photo('photo-1454165804606-c3d57bc86b40'),
      excerpt: 'Explore the key technologies and strategies shaping the future of global logistics and supply chain management.',
      paragraphs: [
        'Shippers are planning 2027 around fewer surprises, not more software logos. The companies that stay on time are the ones that can see a booking, a document, and a truck on the same screen.',
        'Capacity is still uneven by lane. Locking a weekly allocation on your core ocean routes, and keeping air as a relief valve, is a calmer plan than shopping the spot market every month.',
        'Ask your forwarder how exceptions are raised. A tracking page that only moves when someone remembers to update it is not a plan. SFX posts milestones as the cargo passes them.'
      ]
    },
    {
      slug: 'safer-cargo',
      title: 'Optimizing Your Cargo for Safer Transport',
      date: 'Oct 18, 2026',
      image: photo('photo-1586528116311-ad8dd3c8310d'),
      excerpt: 'Essential tips on packaging, labeling, and securing your goods to ensure they arrive safely at their destination.',
      paragraphs: [
        'Most damage claims start before the truck arrives. Cartons that are too large for the product, missing “this side up” marks, and pallets with an open footprint are the usual causes.',
        'Label every handling unit with the shipper, the consignee, the weight, and the booking ID. If a label can survive rain on a dock, it can survive the trip.',
        'If the cargo is fragile or oddly shaped, tell us before collection. A ten-minute packing note is cheaper than a survey at destination.'
      ]
    },
    {
      slug: 'modern-warehousing',
      title: 'The Benefits of Modern Warehousing Solutions',
      date: 'Oct 12, 2026',
      image: photo('photo-1553413077-190dd305871c'),
      excerpt: 'How smart warehousing and inventory management can reduce costs and improve delivery speed for your business.',
      paragraphs: [
        'A warehouse earns its keep when it shortens the last mile, not when it simply holds boxes. Staging inventory closer to your customers cuts both transit time and rush-freight bills.',
        'The useful features are ordinary ones done consistently: accurate receipts, a stock number you trust, and a release that leaves the same day you ask for it.',
        'SFX warehouses sit on the same tracking ID as the freight. When a container is devanned, the stock is visible. When you release it, the truck is already in the plan.'
      ]
    }
  ],

  shipments: [
    {
      id: 'SFX-24081',
      status: 'In Transit',
      origin: 'Singapore',
      destination: 'Rotterdam',
      service: 'Ocean Freight',
      eta: '18 Nov 2026',
      progress: 65,
      events: [
        { title: 'Booking confirmed', place: 'Singapore', time: '28 Oct 2026, 14:05', done: true },
        { title: 'Cargo received at terminal', place: 'Singapore', time: '31 Oct 2026, 09:40', done: true },
        { title: 'Departed origin port', place: 'Singapore', time: '02 Nov 2026, 21:10', done: true },
        { title: 'Arrived at destination port', place: 'Rotterdam', time: 'Pending', done: false },
        { title: 'Delivered to consignee', place: 'Rotterdam', time: 'Pending', done: false }
      ]
    },
    {
      id: 'SFX-24092',
      status: 'Customs Hold',
      origin: 'Shanghai',
      destination: 'Los Angeles',
      service: 'Air Cargo',
      eta: '07 Nov 2026',
      progress: 80,
      events: [
        { title: 'Booking confirmed', place: 'Shanghai', time: '03 Nov 2026, 11:20', done: true },
        { title: 'Uplifted', place: 'Shanghai Pudong', time: '04 Nov 2026, 02:15', done: true },
        { title: 'Arrived at destination airport', place: 'Los Angeles', time: '04 Nov 2026, 22:40', done: true },
        { title: 'Customs review', place: 'Los Angeles', time: '05 Nov 2026, 08:05', done: true },
        { title: 'Out for delivery', place: 'Los Angeles', time: 'Pending', done: false }
      ]
    },
    {
      id: 'SFX-24110',
      status: 'Delivered',
      origin: 'Jakarta',
      destination: 'Singapore',
      service: 'Land Transport',
      eta: '01 Nov 2026',
      progress: 100,
      events: [
        { title: 'Collected from shipper', place: 'Jakarta', time: '30 Oct 2026, 16:00', done: true },
        { title: 'Crossed border', place: 'Batam', time: '31 Oct 2026, 19:30', done: true },
        { title: 'Arrived at warehouse', place: 'Singapore', time: '01 Nov 2026, 09:10', done: true },
        { title: 'Delivered', place: 'Singapore', time: '01 Nov 2026, 11:45', done: true }
      ]
    }
  ],

  trackingPage: {
    title: 'Track Shipment',
    text: 'Enter the tracking ID from your booking confirmation. Sample IDs you can try right now: SFX-24081, SFX-24092, and SFX-24110.',
    hint: 'No shipment found for that ID. Check the characters, or try one of the sample IDs above.'
  },

  fleetIntro: {
    title: 'Our Fleet',
    text: 'Equipment we run and partners we book, matched to the cargo rather than the other way around.'
  },
  fleet: [
    { title: 'Linehaul Trucks', meta: '45 ft trailers', text: 'Curtain and box trailers for domestic and cross-border full loads.', image: photo('photo-1601584115197-04ecc0da31d7') },
    { title: 'Ocean Partners', meta: 'FCL & LCL', text: 'Weekly space on major east-west and intra-Asia services.', image: photo('photo-1605745341112-85968b19335b') },
    { title: 'Air Network', meta: 'Priority uplift', text: 'Consolidated and direct air bookings for urgent freight.', image: photo('photo-1436491865332-7a61a109cc05') },
    { title: 'Warehouse Hubs', meta: 'Bonded & general', text: 'Receipt, storage, and release next to port and airport gates.', image: photo('photo-1586528116311-ad8dd3c8310d') },
    { title: 'Port Handling', meta: 'Major terminals', text: 'Cranes, chassis, and terminal appointments arranged with the booking.', image: photo('photo-1578575437130-527eed3abbec') },
    { title: 'Special Equipment', meta: 'Reefer & flat rack', text: 'Temperature-controlled and out-of-gauge gear planned per shipment.', image: photo('photo-1553413077-190dd305871c') }
  ],

  teamIntro: {
    title: 'Our Team',
    text: 'Operators, brokers, and account leads. You get a name, not a ticket queue.'
  },
  team: [
    { name: 'Adrian Blake', role: 'Managing Director', text: 'Sets the lanes we run and the service standard behind every booking.', image: photo('photo-1560250097-0b93528c311a', 800) },
    { name: 'Mei Tan', role: 'Head of Ocean Freight', text: 'Looks after vessel space, schedules, and the customers who ship every week.', image: photo('photo-1573496359142-b8d87734a5a2', 800) },
    { name: 'Omar Farouk', role: 'Air Cargo Lead', text: 'Builds the short-notice air plans when a production line cannot wait.', image: photo('photo-1472099645785-5658abf4ff4e', 800) },
    { name: 'Sofia Marin', role: 'Customs Broker', text: 'Clears import and export entries and keeps duty estimates honest.', image: photo('photo-1580489944761-15a19d654956', 800) },
    { name: 'James Okonkwo', role: 'Warehouse Manager', text: 'Owns receipts, counts, and the trucks that leave the same day.', image: photo('photo-1519085360753-af0119f7cbe7', 800) },
    { name: 'Lina Cho', role: 'Customer Desk', text: 'The person who answers when a tracking page is not enough.', image: photo('photo-1544005313-94ddf0286df2', 800) }
  ],

  careersIntro: {
    title: 'Careers',
    text: 'We hire people who like freight, plain answers, and finishing the job they started.'
  },
  jobs: [
    { title: 'Ocean Freight Coordinator', location: 'Singapore', type: 'Full time', summary: 'Book space, chase documents, and keep weekly shippers updated from receipt to arrival.' },
    { title: 'Customer Support Specialist', location: 'Singapore', type: 'Full time', summary: 'Answer tracking questions, open exception cases, and stay with the customer until the cargo moves.' },
    { title: 'Warehouse Supervisor', location: 'Singapore', type: 'Full time', summary: 'Run the inbound desk, the count, and the dispatch plan for a multi-client warehouse.' }
  ],

  about: {
    title: 'About Us',
    heading: 'Freight people who stay with the shipment',
    text: [
      'SFX is a logistics company built around one promise: you always know where the cargo is, what it costs, and who is responsible for the next step.',
      'We handle ocean, air, road, warehousing, and customs clearance for shippers who are tired of stitching five vendors together. One booking, one tracking ID, one invoice.',
      'Teams in Singapore coordinate the booking, the documents, and the arrival, so your staff are not managing five vendors for one shipment.'
    ],
    image: photo('photo-1586528116311-ad8dd3c8310d', 1400),
    points: [
      'One tracking ID from pickup to delivery',
      'Quotes that match the final invoice',
      'A named contact on every account',
      'Ocean, air, road, warehouse, and customs in one place'
    ]
  },

  contact: {
    title: 'Contact Us',
    heading: 'Get In Touch',
    text: 'We are here to support your logistics needs with a fast response and a straight answer.',
    formTitle: 'Send Us a Message',
    hoursTitle: 'Working Hours',
    hours: ['Monday - Friday: 08:00 - 18:00', 'Saturday: 08:00 - 15:00', 'Sunday by reservation']
  },

  quote: {
    title: 'Get a Quote',
    heading: 'Tell us about the shipment',
    text: 'Share the lane, the cargo, and the timing. We will come back with a rate you can compare line by line.',
    formTitle: 'Quote Request'
  },

  footer: {
    aboutTitle: 'About SFX',
    aboutText: 'We are a logistics provider committed to delivering excellence in every shipment. Trust us to move your business forward with reliability and care.',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Services', path: '/services' },
      { label: 'Track Shipment', path: '/tracking' },
      { label: 'News & Blog', path: '/blog' },
      { label: 'Contact', path: '/contact' }
    ]
  },

  legal: {
    privacy: {
      title: 'Privacy Policy',
      paragraphs: [
        'SFX Logistics collects the details you type into the contact, quote, and tracking forms so we can answer you. That includes your name, company, email, phone number, and anything you write about a shipment.',
        'We do not sell that information. We use it to prepare a quote, to find a tracking record, or to reply to a message. This demo saves contact and quote submissions in the browser admin Inbox (localStorage) and does not email a remote server.',
        'If you later connect these forms to email, a CRM, or a cloud backend, update this page to name that provider, the data you share, and how a customer can ask for a copy or a deletion.',
        'Questions about this policy can be sent to the email address in the footer.'
      ]
    },
    terms: {
      title: 'Terms of Service',
      paragraphs: [
        'Quotes on this website are invitations to book, not a contract, until both sides confirm the rate, the cargo, and the schedule in writing.',
        'Transit times are estimates. Weather, port congestion, customs inspections, and airline or vessel changes can move an arrival. We will tell you when that happens.',
        'You are responsible for describing the cargo accurately, including weight, dimensions, and any dangerous or restricted goods. Incorrect details can delay the shipment or void cover.',
        'These terms are a starting point for your own company. Have them reviewed before you take live bookings through this site.'
      ]
    }
  },

  notFound: {
    title: 'Page not found',
    text: 'That page has moved or does not exist. Head back to the homepage and pick a section from the menu.',
    button: 'Back to Home'
  }
};

export function brandParts(name = SITE.company.name, accentLetters = SITE.company.accentLetters) {
  const count = Math.min(Math.max(accentLetters, 0), name.length);
  return {
    word: name.slice(0, name.length - count),
    accent: name.slice(name.length - count)
  };
}

export function telHref(phone: string) {
  return 'tel:' + phone.replace(/[^\d+]/g, '');
}

export function serviceBySlug(slug: string) {
  return SITE.services.find((service) => service.slug === slug) ?? null;
}

export function postBySlug(slug: string) {
  return SITE.posts.find((post) => post.slug === slug) ?? null;
}

export function shipmentById(id: string) {
  const key = id.trim().toLowerCase();
  return SITE.shipments.find((shipment) => shipment.id.toLowerCase() === key) ?? null;
}
