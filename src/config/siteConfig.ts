import { BusinessInfo, SocialLinks, ApplianceService, RanchiLocality, CustomerReview, FaqItem, BlogPost } from '../types';

export const initialBusinessInfo: BusinessInfo = {
  companyName: 'Ranchi Repair',
  tagline: 'Expert Doorstep Appliance Repair Service',
  logo: '/logo.png',
  favicon: '/logo.png',
  phone: '8229893196',
  whatsapp: '8229893196',
  email: 'repairservice240@gmail.com',
  officeAddress: 'Lac Factory Road, Hindpiri',
  area: 'Hindpiri',
  city: 'Ranchi',
  district: 'Ranchi',
  state: 'Jharkhand',
  country: 'India',
  pincode: '834001',
  googleMapsUrl: '',
  googleBusinessProfileUrl: '',
  latitude: '23.3644',
  longitude: '85.3340',
  businessHours: '8:00 AM - 9:00 PM (All 7 Days)',
  yearEstablished: '2018',
  domain: 'ranchirepair.in'
};

export const initialSocialLinks: SocialLinks = {
  facebook: 'https://facebook.com/ranchirepair',
  instagram: 'https://instagram.com/ranchirepair',
  youtube: 'https://youtube.com/@ranchirepair',
  linkedin: 'https://linkedin.com/company/ranchirepair',
  other: ''
};

export const initialSupportedBrands: string[] = [
  'Samsung', 'LG', 'Whirlpool', 'IFB', 'Godrej', 'Voltas', 
  'Daikin', 'Carrier', 'Panasonic', 'Haier', 'Bosch', 'Blue Star', 
  'Lloyd', 'Crompton', 'Bajaj', 'Havells', 'V-Guard'
];

export const initialServices: ApplianceService[] = [
  {
    id: 'ac-repair',
    name: 'AC Repair & Service',
    slug: 'ac-repair',
    shortDesc: 'Doorstep AC repair, deep jet cleaning, gas charging (R32/R410A), compressor repair, and installation across Ranchi.',
    fullDesc: 'Get fast, reliable, and doorstep AC repair and servicing in Ranchi, Jharkhand. Our certified HVAC technicians diagnose and repair all major split AC and window AC brands. Whether your AC is not cooling, leaking water, emitting foul smells, making unusual noises, or experiencing compressor and PCB trip issues, we offer 30-minute quick response, 90-day warranty on spare parts, and transparent upfront pricing.',
    iconName: 'Wind',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 299,
    problemsFixed: [
      'AC Not Cooling / Low Cooling',
      'Water Leakage from Indoor Unit',
      'AC Gas Leakage & Charging (R32 / R410A / R22)',
      'AC Making Loud Noise or Vibration',
      'AC Turning Off Automatically / Tripping MCB',
      'Compressor Not Starting or Overheating',
      'PCB Board Failure & Sensor Error Codes',
      'Foul Smell from Air Vents',
      'Fan Motor & Blower Repair',
      'Remote Sensor & Display Issue'
    ],
    serviceOfferings: [
      'Split AC Repair & Servicing',
      'Window AC Repair & Servicing',
      'AC Jet Foam Deep Cleaning',
      'AC Installation & Uninstallation',
      'AC Gas Leak Inspection & Charging',
      'Annual Maintenance Contract (AMC)'
    ],
    supportedBrands: ['Voltas', 'Daikin', 'LG', 'Samsung', 'Carrier', 'Blue Star', 'Lloyd', 'Panasonic', 'Godrej', 'Haier'],
    seoTitle: 'AC Repair & Service in Ranchi | Ranchi Repair',
    metaDescription: 'Professional AC repair and service at your doorstep in Ranchi, Jharkhand. Certified technicians for AC cooling, gas charging, jet cleaning, PCB repair & installation.',
    faqs: [
      {
        question: 'Do you provide doorstep AC repair service in Ranchi?',
        answer: 'Yes, Ranchi Repair offers 100% doorstep AC repair and servicing across all areas in Ranchi, including Morabadi, Kanke, Doranda, Harmu, Lalpur, and Bariatu.'
      },
      {
        question: 'How much does AC gas charging cost in Ranchi?',
        answer: 'AC gas charging starts from ₹1,499 depending on the refrigerant gas type (R32, R410A, R22) and exact tonnage of your AC unit.'
      },
      {
        question: 'What warranty do you offer on AC repair parts?',
        answer: 'We provide a 90-day warranty on all genuine spare parts replaced and a 30-day service warranty on technician workmanship.'
      }
    ]
  },
  {
    id: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    slug: 'washing-machine-repair',
    shortDesc: 'Expert doorstep repair for Front Load, Top Load, and Semi-Automatic washing machines in Ranchi.',
    fullDesc: 'Facing washing machine drum issues, water drainage problems, spin motor failure, excessive vibration, or error code displays? Ranchi Repair provides fast doorstep washing machine repair services in Ranchi, Jharkhand. We service all fully automatic front load, top load, and semi-automatic models with genuine spare parts.',
    iconName: 'Shirt',
    heroImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 199,
    problemsFixed: [
      'Washing Machine Drum Not Spinning or Rotating',
      'Water Not Draining Out / Drain Pump Blocked',
      'Excessive Noise & Heavy Shaking during Spin Cycle',
      'Water Leakage from Bottom or Door Rubber Seal',
      'Washing Machine Not Turning On / Power Failure',
      'PCB Display Error Codes (E1, E2, UE, OE, etc.)',
      'Door Latch & Lock Stuck / Not Opening',
      'Inlet Valve Not Intake Water',
      'Belt Replacement & Motor Bush Repair',
      'Foul Odor Inside Drum'
    ],
    serviceOfferings: [
      'Front Load Washing Machine Repair',
      'Top Load Washing Machine Repair',
      'Semi-Automatic Washing Machine Repair',
      'Drum Servicing & Scale Removal',
      'PCB Repair & Circuit Replacement',
      'New Washing Machine Installation'
    ],
    supportedBrands: ['IFB', 'LG', 'Samsung', 'Whirlpool', 'Bosch', 'Godrej', 'Haier', 'Panasonic'],
    seoTitle: 'Washing Machine Repair in Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep washing machine repair in Ranchi for Front Load, Top Load & Semi-Automatic models. Experienced technicians, genuine parts, quick 30-min response.',
    faqs: [
      {
        question: 'Can your technician fix washing machine PCB error codes?',
        answer: 'Yes, our experienced Ranchi technicians specialize in repairing and reflashing PCB motherboards for IFB, LG, Samsung, Whirlpool, and Bosch machines.'
      },
      {
        question: 'How fast can a washing machine technician visit my home in Ranchi?',
        answer: 'We schedule doorstep technician visits within 30 to 60 minutes of booking confirmation anywhere in Ranchi city.'
      }
    ]
  },
  {
    id: 'refrigerator-repair',
    name: 'Refrigerator / Fridge Repair',
    slug: 'refrigerator-repair',
    shortDesc: 'Doorstep repair for Single Door, Double Door, Side-by-Side, and Inverter Compressors in Ranchi.',
    fullDesc: 'Is your refrigerator not cooling, producing excess ice, leaking water inside, or making clicking sounds from the compressor? Trust Ranchi Repair for doorstep fridge repair services in Ranchi, Jharkhand. We fix all single door, double door, triple door, and side-by-side inverter refrigerators.',
    iconName: 'Refrigerator',
    heroImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 249,
    problemsFixed: [
      'Not Cooling',
      'Cooling Issues',
      'Water Leakage',
      'Compressor Repair',
      'Gas Charging',
      'Electrical Issues',
      'Door / Gasket Problems',
      'All Brands Support'
    ],
    serviceOfferings: [
      'Single Door Refrigerator Repair',
      'Double Door Refrigerator Repair',
      'Side-by-Side Inverter Refrigerator Repair',
      'Fridge Gas Charging & Leak Sealing',
      'Inverter Compressor Replacement',
      'Thermostat & Sensor Replacement'
    ],
    supportedBrands: ['Samsung', 'LG', 'Whirlpool', 'Godrej', 'Haier', 'Bosch', 'Panasonic'],
    seoTitle: 'Refrigerator Repair in Ranchi | Ranchi Repair',
    metaDescription: 'Fast & reliable doorstep refrigerator/fridge repair in Ranchi, Jharkhand. Expert repair for Single Door, Double Door, Side-by-Side & Inverter Compressors.',
    faqs: [
      {
        question: 'Why is my fridge compressor clicking and not cooling?',
        answer: 'Clicking sound usually indicates a faulty Relay OLP (Overload Protector), defective capacitor, or compressor start failure. Our Ranchi technician will inspect and repair it on-site.'
      },
      {
        question: 'Do you charge gas for single door and double door fridges?',
        answer: 'Yes, we perform complete gas leak detection, vacuum pressure test, and R600a / R134a gas charging at competitive prices in Ranchi.'
      }
    ]
  },
  {
    id: 'microwave-repair',
    name: 'Microwave Oven Repair',
    slug: 'microwave-repair',
    shortDesc: 'Quick doorstep repair for Solo, Grill, and Convection Microwave Ovens in Ranchi.',
    fullDesc: 'Is your microwave oven not heating food, sparking inside, making loud noise, or suffering from a dead touch control panel? Ranchi Repair provides doorstep microwave oven repair services across Ranchi, Jharkhand.',
    iconName: 'Flame',
    heroImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 199,
    problemsFixed: [
      'Microwave Oven Running But Not Heating Food',
      'Sparking Inside Cooking Chamber',
      'Touch Membrane Keypad Unresponsive',
      'Microwave Plate Glass Not Rotating / Motor Stalled',
      'Power Dead / Blowing House Fuse',
      'Display Screen Blank or Garbled',
      'Door Latch & Safety Interlock Switch Broken',
      'Magnetron & High Voltage Diode Failure',
      'Convection Fan Not Working',
      'Baking & Grill Element Damaged'
    ],
    serviceOfferings: [
      'Convection Microwave Repair',
      'Grill Microwave Repair',
      'Solo Microwave Repair',
      'Magnetron & Capacitor Replacement',
      'Touch Panel & Membrane Repair',
      'Door Switch & Fuse Replacement'
    ],
    supportedBrands: ['IFB', 'LG', 'Samsung', 'Whirlpool', 'Panasonic', 'Godrej', 'Bajaj', 'Morphy Richards'],
    seoTitle: 'Microwave Repair in Ranchi | Ranchi Repair',
    metaDescription: 'Professional microwave oven repair in Ranchi. Fast doorstep repair for Solo, Grill & Convection microwaves. Magnetron, touch panel & heating repairs.',
    faqs: [
      {
        question: 'What causes sparking inside a microwave oven?',
        answer: 'Sparking inside the microwave is commonly caused by a burnt mica wave-guide cover, damaged turntable rack, or metal debris inside the cavity. We replace wave-guide mica sheets on-site.'
      }
    ]
  },
  {
    id: 'geyser-repair',
    name: 'Geyser Repair & Service',
    slug: 'geyser-repair',
    shortDesc: 'Doorstep repair and installation for Electric, Storage, Instant, and Gas Geysers in Ranchi.',
    fullDesc: 'No hot water coming from your water heater geyser, element tripped, water leaking from tank, or thermostat malfunction? Ranchi Repair provides specialized geyser repair, descaling, and installation services in Ranchi, Jharkhand.',
    iconName: 'Zap',
    heroImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 199,
    problemsFixed: [
      'Geyser Water Not Heating at All',
      'Geyser Tripping Main Power Switch / MCB',
      'Water Leakage from Tank Bottom or Pipe Connections',
      'Geyser Heating Element Burnt',
      'Thermostat Cut-Off Failure / Water Overheating',
      'Low Hot Water Flow / Hard Water Scale Blockage',
      'Electric Shock Feelings from Tap Water',
      'Geyser Indicator Light Not Turning On',
      'Safety Valve Dripping Continuously',
      'Gas Geyser Ignition & Burner Problem'
    ],
    serviceOfferings: [
      'Electric Storage Geyser Repair',
      'Instant Water Heater Repair',
      'Gas Geyser Repair & Servicing',
      'Geyser Descaling & Flushing',
      'Heating Element & Thermostat Replacement',
      'New Geyser Wall Mounting & Installation'
    ],
    supportedBrands: ['Crompton', 'Bajaj', 'Havells', 'V-Guard', 'Racold', 'AO Smith', 'Venus', 'Orient'],
    seoTitle: 'Geyser Repair & Service in Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep Geyser repair and service in Ranchi, Jharkhand. Certified technicians for electric, storage & instant geyser heating, leakage & installation.',
    faqs: [
      {
        question: 'Why is my geyser tripping the MCB when switched on?',
        answer: 'MCB tripping occurs when the heating element insulation breaks down and short-circuits with water inside the tank. Our technician will test with a megger meter and replace the heating element.'
      }
    ]
  }
];

export const initialLocalities: RanchiLocality[] = [
  {
    id: 'morabadi',
    name: 'Morabadi',
    slug: 'morabadi',
    description: 'Premier residential locality in Ranchi known for Morabadi Ground, Ranchi University campus, and Tagor Hill nearby.',
    landmarks: ['Morabadi Ground', 'Tagore Hill', 'Ranchi University', 'Oxygen Park'],
    pincode: '834008',
    status: 'published',
    seoTitle: 'Doorstep Appliance Repair in Morabadi, Ranchi | Ranchi Repair',
    metaDescription: 'Fast 30-minute doorstep AC, washing machine, fridge, microwave & geyser repair service in Morabadi, Ranchi. Expert local technicians with warranty.',
    isIndexable: true
  },
  {
    id: 'kanke',
    name: 'Kanke',
    slug: 'kanke',
    description: 'Prominent locality home to Kanke Dam, Birsa Agricultural University, and major educational institutions.',
    landmarks: ['Kanke Dam', 'BAU Campus', 'CIP Ranchi', 'Rock Garden'],
    pincode: '834006',
    status: 'published',
    seoTitle: 'Appliance Repair Service in Kanke, Ranchi | Ranchi Repair',
    metaDescription: 'Trusted doorstep AC, fridge, washing machine & geyser repair service in Kanke Road, Ranchi. Affordable rates & genuine spare parts.',
    isIndexable: true
  },
  {
    id: 'doranda',
    name: 'Doranda',
    slug: 'doranda',
    description: 'Historic commercial & residential neighborhood near Ranchi Railway Station and High Court area.',
    landmarks: ['Doranda College', 'High Court Colony', 'Mecon Colony', 'Paras Hospital'],
    pincode: '834002',
    status: 'published',
    seoTitle: 'Appliance Repair Technician in Doranda, Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep AC repair, washing machine & refrigerator service in Doranda, Ranchi. Certified technician visit within 30 minutes.',
    isIndexable: true
  },
  {
    id: 'harmu',
    name: 'Harmu',
    slug: 'harmu',
    description: 'Central residential housing colony locality in Ranchi close to MS Dhoni residential villa and Argora bypass.',
    landmarks: ['Harmu Housing Colony', 'MS Dhoni Residence', 'Argora Chowk', 'Vidhan Sabha Road'],
    pincode: '834002',
    status: 'published',
    seoTitle: 'Home Appliance Repair in Harmu Colony, Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep AC, washing machine, fridge, geyser & microwave repair in Harmu Housing Colony, Ranchi. Genuine parts & 90-day warranty.',
    isIndexable: true
  },
  {
    id: 'hatia',
    name: 'Hatia',
    slug: 'hatia',
    description: 'Key industrial and transportation hub surrounding Hatia Railway Station and HEC township.',
    landmarks: ['Hatia Railway Station', 'HEC Colony', 'NIFFT Campus', 'Dhurwa Dam'],
    pincode: '834003',
    status: 'published',
    seoTitle: 'Doorstep Appliance Service in Hatia, Ranchi | Ranchi Repair',
    metaDescription: 'Reliable doorstep appliance technician in Hatia & Dhurwa, Ranchi. AC gas charging, fridge cooling repair, washing machine service.',
    isIndexable: true
  },
  {
    id: 'lalpur',
    name: 'Lalpur',
    slug: 'lalpur',
    description: 'Bustling educational & commercial commercial hub around Circular Road and Plaza Chowk.',
    landmarks: ['Circular Road', 'Plaza Chowk', 'Women\'s College', 'Nucleus Mall'],
    pincode: '834001',
    status: 'published',
    seoTitle: 'Appliance Repair Service in Lalpur, Ranchi | Ranchi Repair',
    metaDescription: 'Quick doorstep AC repair, washing machine, fridge & geyser service in Lalpur, Ranchi. Book doorstep service today.',
    isIndexable: true
  },
  {
    id: 'ashok-nagar',
    name: 'Ashok Nagar',
    slug: 'ashok-nagar',
    description: 'Upscale residential neighborhood near Harmu bypass and Kadru bridge.',
    landmarks: ['Kadru Bridge', 'Argora bypass', 'Ashok Nagar Park'],
    pincode: '834002',
    status: 'published',
    seoTitle: 'Doorstep Appliance Repair in Ashok Nagar, Ranchi | Ranchi Repair',
    metaDescription: 'Professional home appliance repair service in Ashok Nagar & Kadru, Ranchi. Fast technician doorstep visit.',
    isIndexable: true
  },
  {
    id: 'bariatu',
    name: 'Bariatu',
    slug: 'bariatu',
    description: 'Major medical center of Ranchi home to RIMS (Rajendra Institute of Medical Sciences).',
    landmarks: ['RIMS Hospital', 'Bariatu Housing Colony', 'Medical College'],
    pincode: '834009',
    status: 'published',
    seoTitle: 'Appliance Technician in Bariatu, Ranchi | Ranchi Repair',
    metaDescription: 'Emergency doorstep AC repair, fridge & washing machine technician in Bariatu, Ranchi. Call for doorstep service.',
    isIndexable: true
  },
  {
    id: 'ratu-road',
    name: 'Ratu Road',
    slug: 'ratu-road',
    description: 'Major arterial road connecting Ranchi city center to western suburbs.',
    landmarks: ['Hehal Chowk', 'Piska More', 'Ratu Palace Road', 'Itki Road'],
    pincode: '834005',
    status: 'published',
    seoTitle: 'Appliance Repair Service in Ratu Road, Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep repair for AC, washing machine, fridge, geyser & microwave in Ratu Road & Piska More, Ranchi.',
    isIndexable: true
  },
  {
    id: 'hinoo',
    name: 'Hinoo',
    slug: 'hinoo',
    description: 'Residential and business sector adjacent to Birsa Munda Airport Ranchi.',
    landmarks: ['Birsa Munda Airport', 'Hinoo Chowk', 'Eye Hospital'],
    pincode: '834002',
    status: 'draft',
    seoTitle: 'Appliance Repair in Hinoo, Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep appliance repair service in Hinoo, Ranchi.',
    isIndexable: false
  },
  {
    id: 'kokar',
    name: 'Kokar',
    slug: 'kokar',
    description: 'Industrial and residential township near Kantatoli and Lalpur connector.',
    landmarks: ['Kokar Industrial Area', 'Distillery Bridge', 'Kantatoli Bus Stand'],
    pincode: '834001',
    status: 'draft',
    seoTitle: 'Appliance Repair in Kokar, Ranchi | Ranchi Repair',
    metaDescription: 'Doorstep appliance repair service in Kokar, Ranchi.',
    isIndexable: false
  }
];

export const initialReviews: CustomerReview[] = [
  {
    id: '1',
    customerName: 'Rajesh Kumar Verma',
    locality: 'Morabadi',
    service: 'AC Repair & Service',
    rating: 5,
    date: '2026-07-28',
    comment: 'My Voltas split AC stopped cooling during hot peak summer. Called Ranchi Repair technician. He arrived in 35 minutes at Morabadi, diagnosed R32 gas leak, repaired it cleanly, and completed jet cleaning. Cooling is awesome now!',
    status: 'published'
  },
  {
    id: '2',
    customerName: 'Priya Sharma',
    locality: 'Kanke Road',
    service: 'Washing Machine Repair',
    rating: 5,
    date: '2026-08-02',
    comment: 'IFB Front Load washing machine was giving E2 drain error code. The technician replaced the drain pump on-site at very reasonable charge. Very honest and polite service in Kanke.',
    status: 'published'
  },
  {
    id: '3',
    customerName: 'Sanjay Sinha',
    locality: 'Harmu Colony',
    service: 'Refrigerator / Fridge Repair',
    rating: 5,
    date: '2026-08-05',
    comment: 'LG Double Door fridge compressor was clicking continuously. The technician replaced the relay & capacitor with 90-day warranty. Doorstep service in Harmu was super fast.',
    status: 'published'
  },
  {
    id: '4',
    customerName: 'Amitabh Choudhury',
    locality: 'Doranda',
    service: 'Geyser Repair',
    rating: 5,
    date: '2026-07-15',
    comment: 'Geyser element burnt out. Called for repair in Doranda. Technician replaced element and thermostat safely with proper grounding check.',
    status: 'published'
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Which areas in Ranchi do you cover for doorstep appliance repair?',
    answer: 'We provide doorstep home appliance repair across all areas of Ranchi including Morabadi, Kanke, Doranda, Harmu, Hatia, Lalpur, Ashok Nagar, Bariatu, Ratu Road, Hinoo, Kadru, Kokar, Upper Bazar, and surrounding localities.',
    category: 'General',
    status: 'published'
  },
  {
    id: 'faq-2',
    question: 'How quickly does the technician arrive after booking?',
    answer: 'Our average doorstep response time in Ranchi is between 30 to 60 minutes after your booking request is confirmed.',
    category: 'General',
    status: 'published'
  },
  {
    id: 'faq-3',
    question: 'What appliances do you repair in Ranchi?',
    answer: 'We specialize in 5 major home appliances: Air Conditioners (AC), Washing Machines, Refrigerators / Fridges, Microwave Ovens, and Water Heater Geysers.',
    category: 'Services',
    status: 'published'
  },
  {
    id: 'faq-4',
    question: 'Do you offer warranty on replaced spare parts?',
    answer: 'Yes! We provide up to 90 days warranty on replaced genuine spare parts and 30 days service warranty on technician labor.',
    category: 'Pricing & Warranty',
    status: 'published'
  },
  {
    id: 'faq-5',
    question: 'What are the visiting / inspection charges in Ranchi?',
    answer: 'Our nominal inspection charge starts at ₹199. If you proceed with the repair service with our technician, the inspection fee is adjusted/waived in your final repair bill.',
    category: 'Pricing & Warranty',
    status: 'published'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why is My AC Not Cooling in Ranchi Summers? Top 5 Causes & Solutions',
    slug: 'why-is-my-ac-not-cooling-ranchi',
    excerpt: 'Is your split or window AC running without blowing cold air? Discover the common causes like dirty filters, gas leaks, and capacitor issues in Ranchi climate.',
    content: `
      <h2>Common Reasons Your Air Conditioner Isn't Cooling Properly</h2>
      <p>During peak summer months in Ranchi, an unserviced AC can struggle to cool your room. Here are the top 5 reasons diagnosed by our local experts:</p>
      
      <h3>1. Dirty Air Filters & Clogged Condenser Coils</h3>
      <p>Dust and pollution accumulate rapidly on AC filters. Clogged filters restrict airflow over the evaporator coil, preventing heat exchange and causing low cooling or ice buildup.</p>
      
      <h3>2. Refrigerant Gas Leakage</h3>
      <p>If your AC blower blows room temperature air continuously, your unit might have a slow gas leak in copper pipes. Professional pressure testing and gas charging (R32 / R410A) is required.</p>
      
      <h3>3. Faulty Compressor Run Capacitor</h3>
      <p>If the outdoor unit fan is spinning but the compressor doesn't turn on (humming sound), a blown capacitor is often the culprit.</p>

      <h3>4. Undersized Tonnage for Room Size</h3>
      <p>In top-floor rooms exposed to direct Ranchi sunlight, a 1-ton AC may be insufficient. A 1.5-ton or 2-ton unit is recommended.</p>

      <h3>5. Thermostat / PCB Sensor Error</h3>
      <p>Faulty room temperature sensors feed wrong temperature readings to the PCB, cutting off cooling prematurely.</p>

      <div class="my-6 p-4 bg-brand-50 border-l-4 border-brand-500 rounded-r">
        <p class="font-bold text-brand-900">Need Immediate AC Repair in Ranchi?</p>
        <p class="text-sm text-brand-700">Contact Ranchi Repair for doorstep AC jet cleaning, gas charging, and troubleshooting within 30 minutes.</p>
      </div>
    `,
    category: 'AC Servicing Tips',
    author: 'Chief HVAC Technician',
    publishDate: '2026-07-20',
    readTime: '4 min read',
    status: 'published'
  },
  {
    id: 'b2',
    title: 'How Often Should You Service Your Washing Machine in Ranchi?',
    slug: 'washing-machine-maintenance-tips-ranchi',
    excerpt: 'Learn essential maintenance tips for front load and top load washing machines to prevent drum scale buildup, motor overload, and drain pumps failure.',
    content: `
      <h2>Washing Machine Care Guide for Ranchi Homes</h2>
      <p>Hard water minerals in certain Ranchi areas like Kanke and Bariatu can cause scale buildup inside your washing machine drum and drain valve assembly.</p>

      <h3>1. Regular Descaling Every 3 Months</h3>
      <p>Run a hot water cycle with dedicated washing machine descaling powder to dissolve limescale and soap scum from drum holes and heating element.</p>

      <h3>2. Clean the Drain Filter Trap</h3>
      <p>Coins, lint, and safety pins collect in the bottom drain pump filter. Clean it monthly to prevent drain errors (OE / E2) and pump burnouts.</p>

      <h3>3. Leave the Door Ajar After Wash</h3>
      <p>Always leave the door or lid open for 30 minutes after washing to dry out moisture and prevent foul mildew smells on rubber gaskets.</p>
    `,
    category: 'Appliance Maintenance',
    author: 'Senior Appliance Engineer',
    publishDate: '2026-08-01',
    readTime: '3 min read',
    status: 'published'
  }
];

export const disabledLocalityServices: { localitySlug: string; serviceSlug: string }[] = [
  { localitySlug: 'doranda', serviceSlug: 'geyser-repair' }
];

export const isLocalityServiceDisabled = (localitySlug?: string, serviceSlug?: string): boolean => {
  if (!localitySlug || !serviceSlug) return false;
  return disabledLocalityServices.some(
    item => item.localitySlug.toLowerCase() === localitySlug.toLowerCase() && 
            item.serviceSlug.toLowerCase() === serviceSlug.toLowerCase()
  );
};
