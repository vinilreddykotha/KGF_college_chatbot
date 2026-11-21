import collegeData from '../data/collegeData.json' with { type: 'json' };

/**
 * Text normalization: converts to lowercase, removes punctuation, trims whitespace
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s%]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if a string contains a whole word or phrase
 */
function hasWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
}

/**
 * Extract numerical percentages or mentions like "above 85%", "70%", "below 59%"
 */
export function extractPercentage(text) {
  const norm = normalizeText(text);

  // Match patterns like "85%", "85 percent", "85 per cent", "scored 85", "scoring 85"
  const pctRegex = /(\b\d{1,2}(?:\.\d+)?)\s*(?:%|percent|per cent)/i;
  const matchPct = norm.match(pctRegex);
  if (matchPct) {
    return parseFloat(matchPct[1]);
  }

  // Check if context has "fee for XX" or "score XX" or "got XX in +2"
  const contextRegex = /(?:fee\s+(?:for|if|with|at)?|score\s+(?:of|is)?|scored|scoring|got|having)\s+(\d{1,2}(?:\.\d+)?)/i;
  const matchContext = norm.match(contextRegex);
  if (matchContext) {
    const val = parseFloat(matchContext[1]);
    if (val >= 30 && val <= 100) {
      return val;
    }
  }

  // Check for textual phrases
  if (/\b(?:above|greater than|>)\s*85\b/i.test(norm) || norm.includes('above 85')) {
    return 88;
  }
  if (/\b(?:below|less than|<)\s*50\b/i.test(norm) || norm.includes('below 50')) {
    return 48;
  }
  if (/\b(?:below|less than|<)\s*59\b/i.test(norm) || norm.includes('below 59')) {
    return 55;
  }

  return null;
}

/**
 * Get response for percentage-based fee inquiries
 */
export function getFeeResponseForPercentage(percentage, originalQuery) {
  const norm = normalizeText(originalQuery);

  if (percentage >= 85) {
    return {
      topic: 'B.Tech Fee – Above 85% Tier',
      category: 'Fee structure',
      answer: `### **B.Tech Fee Package for Above 85% (+2 Marks)** 🎓\n\n- **Total 4-Year Package:** **₹7,40,000** *(Limited seats only)*\n- **1st Year Fee:** ₹2,60,000\n- **2nd Year Fee:** ₹1,60,000\n- **3rd Year Fee:** ₹1,60,000\n- **4th Year Fee:** ₹1,60,000\n\n✨ **Inclusions in Package:**\n- Complete Tuition Fees\n- On-campus Hostel Accommodation (2, 3, or 4 sharing with non-attached washroom, subject to availability)\n- Specialized **HCL Training**\n\n*(Note: Food/mess fees may vary based on food, cooking materials and essential supplies. Value-added courses and exam fees are additional).*`
    };
  }

  if (percentage >= 75 && percentage < 85) {
    return {
      topic: 'B.Tech Fee – 75% to 84% Tier',
      category: 'Fee structure',
      answer: `### **B.Tech Fee Package for 75% – 84% Tier (${percentage}%)** 🎓\n\n- **Total 4-Year Package:** **₹8,40,000** *(Limited seats only)*\n- **1st Year Fee:** ₹2,85,000\n- **2nd Year Fee:** ₹1,85,000\n- **3rd Year Fee:** ₹1,85,000\n- **4th Year Fee:** ₹1,85,000\n\n✨ **Inclusions in Package:**\n- Complete Tuition Fees\n- On-campus Hostel Accommodation (2, 3, or 4 sharing with non-attached washroom, subject to availability)\n- Specialized **HCL Training**\n\n*(Note: Food/mess fees may vary based on food, cooking materials and essential supplies. Value-added courses and exam fees are additional).*`
    };
  }

  if (percentage >= 60 && percentage < 75) {
    return {
      topic: 'B.Tech Fee – 60% to 74% Tier',
      category: 'Fee structure',
      answer: `### **B.Tech Fee Package for 60% – 74% Tier (${percentage}%)** 🎓\n\n- **Total 4-Year Package:** **₹9,40,000** *(Limited seats only)*\n- **1st Year Fee:** ₹3,10,000\n- **2nd Year Fee:** ₹2,10,000\n- **3rd Year Fee:** ₹2,10,000\n- **4th Year Fee:** ₹2,10,000\n\n✨ **Inclusions in Package:**\n- Complete Tuition Fees\n- On-campus Hostel Accommodation (2, 3, or 4 sharing with non-attached washroom, subject to availability)\n- Specialized **HCL Training**\n\n*(Note: Food/mess fees may vary based on food, cooking materials and essential supplies. Value-added courses and exam fees are additional).*`
    };
  }

  // Under 60%
  return {
    topic: 'B.Tech Fee – Below 60% Categories',
    category: 'Fee structure',
    answer: `### **B.Tech Fee for ${percentage}% (+2 Marks)**\n\nBased on the official CARE KGF fee circular, two related categories are listed for percentages below 60%:\n\n1. **Below 59% Category:** Total Package **₹10,40,000**\n   - 1st Year: ₹3,35,000 | 2nd–4th Year: ₹2,35,000/year\n\n2. **Below 50% Category (separately listed in circular):** Total Package **₹11,40,000**\n   - ₹2,85,000 per year (Years 1 to 4)\n\n⚠️ **Important Note on Overlapping Bands:** The supplied fee schedule presents both *'Below 59%'* and *'Below 50%'* as separate categories. Because these ranges overlap in the source document, we strongly advise students scoring under 60% to confirm their applicable fee category directly with the **CARE KGF Admissions Office**.\n\n✨ Both fee packages include Tuition fees, Hostel accommodation, and HCL training.`
  };
}

/**
 * Compute Jaccard / Token similarity between two strings
 */
function computeTokenSimilarity(str1, str2) {
  const stopWords = new Set(['what', 'which', 'who', 'where', 'when', 'how', 'is', 'are', 'the', 'a', 'an', 'in', 'at', 'for', 'of', 'and', 'or', 'do', 'you', 'have', 'tell', 'me', 'can', 'i', 'there']);
  const tokens1 = new Set(normalizeText(str1).split(/\s+/).filter(t => t.length > 1 && !stopWords.has(t)));
  const tokens2 = new Set(normalizeText(str2).split(/\s+/).filter(t => t.length > 1 && !stopWords.has(t)));

  if (tokens1.size === 0 || tokens2.size === 0) return 0;

  let intersection = 0;
  tokens1.forEach(token => {
    if (tokens2.has(token)) intersection++;
  });

  const union = new Set([...tokens1, ...tokens2]).size;
  return intersection / union;
}

/**
 * Score how well a knowledge base item matches a query
 */
function scoreItem(item, query, queryTokens) {
  let score = 0;
  const normQuery = normalizeText(query);

  // 1. Exact or high-similarity Example Questions Match (Highest weight)
  if (item.exampleQuestions && item.exampleQuestions.length > 0) {
    for (const ex of item.exampleQuestions) {
      const normEx = normalizeText(ex);
      if (normQuery === normEx) {
        return 100; // Perfect match
      }
      if (normQuery.includes(normEx) || normEx.includes(normQuery)) {
        score = Math.max(score, 70);
      }
      const sim = computeTokenSimilarity(normQuery, normEx);
      if (sim > 0.4) {
        score = Math.max(score, sim * 80);
      }
    }
  }

  // 2. Keyword Matching with word boundary check
  if (item.keywords) {
    let keywordHits = 0;
    item.keywords.forEach(kw => {
      const normKw = normalizeText(kw);
      if (hasWord(normQuery, normKw)) {
        keywordHits += normKw.length > 3 ? 4 : 2;
      }
    });
    score += keywordHits * 3.5;
  }

  // 3. Synonyms Matching
  if (item.synonyms) {
    let synHits = 0;
    item.synonyms.forEach(syn => {
      const normSyn = normalizeText(syn);
      if (hasWord(normQuery, normSyn)) {
        synHits += 3;
      }
    });
    score += synHits * 2;
  }

  // 4. Topic & Category Matches
  const normTopic = normalizeText(item.topic);
  if (normTopic.includes(normQuery) || normQuery.includes(normTopic)) {
    score += 15;
  }

  return score;
}

/**
 * Main query processor: takes user input and returns intelligent answer
 */
export function processChatQuery(userQuery) {
  if (!userQuery || !userQuery.trim()) {
    return {
      found: false,
      answer: "Please type a question about CARE KGF campus courses, fees, admissions, hostels, or facilities.",
      topic: "Empty Query",
      confidence: 0
    };
  }

  const query = userQuery.trim();
  const normQuery = normalizeText(query);
  const queryTokens = normQuery.split(/\s+/).filter(t => t.length > 1);

  // ─── 0. CONVERSATIONAL / GENERAL QUERIES ────────────────────────────────────

  // A) Greetings
  const greetingWords = ['hello', 'hi', 'hey', 'hii', 'helo', 'hola', 'greetings', 'good morning', 'good afternoon', 'good evening', 'good night', 'morning', 'evening', 'afternoon', 'whats up', 'what\'s up', 'sup', 'howdy', 'namaste', 'vanakkam'];
  if (greetingWords.some(g => normQuery === g || normQuery.startsWith(g + ' ') || normQuery.endsWith(' ' + g))) {
    const hour = new Date().getHours();
    const timeGreet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    return {
      found: true,
      topic: 'Greeting',
      category: 'General',
      confidence: 100,
      answer: `${timeGreet}! 👋 Welcome to the **CARE KGF Campus Enquiry Chatbot**!\n\nI'm here to help you with any questions about:\n- 🎓 **B.Tech Courses** – CSE, AI & ML, ECE, VLSI Design\n- 💰 **Fee Structure 2026–27** – Merit-based packages starting from ₹7.40L\n- 🏥 **Medical Programs** – Allied Health, BPT, BOT, B.Pharm, Nursing\n- 🏡 **Hostel & Campus Facilities**\n- 📝 **Admissions & Eligibility**\n\nWhat would you like to know today? Feel free to ask anything!`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "What medical courses are available?",
        "How can I apply for admission?"
      ]
    };
  }

  // B) How are you / How are you doing
  if (
    normQuery.includes('how are you') ||
    normQuery.includes('how r u') ||
    normQuery.includes('hows it going') ||
    normQuery.includes('how do you do') ||
    normQuery === 'you ok' ||
    normQuery === 'doing well'
  ) {
    return {
      found: true,
      topic: 'Bot Status',
      category: 'General',
      confidence: 100,
      answer: `I'm doing great, thank you for asking! 😊\n\nI'm your **CARE KGF College Enquiry Assistant** — always ready to help students and parents find the right information about admissions, courses, fees, and campus life.\n\nIs there something specific I can help you with today?`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "Tell me about B.Tech fee structure",
        "What medical courses are available?",
        "How can I apply for admission?"
      ]
    };
  }

  // C) Who are you / What are you / Bot identity
  if (
    normQuery.includes('who are you') ||
    normQuery.includes('what are you') ||
    normQuery.includes('your name') ||
    normQuery.includes('introduce yourself') ||
    normQuery.includes('tell me about yourself') ||
    normQuery === 'bot' ||
    normQuery === 'chatbot' ||
    normQuery.includes('are you a bot') ||
    normQuery.includes('are you human') ||
    normQuery.includes('are you ai') ||
    normQuery.includes('are you robot')
  ) {
    return {
      found: true,
      topic: 'Bot Identity',
      category: 'General',
      confidence: 100,
      answer: `I'm the **CARE KGF Virtual Enquiry Assistant** 🤖 — an AI-powered chatbot built specifically for **Chettinad Academy of Research and Education (CARE), Kolar Gold Fields (KGF) Campus**.\n\nI can answer your questions about:\n- **Engineering Courses** (B.Tech – CSE, AI & ML, ECE, VLSI)\n- **Medical & Allied Health Sciences** (BPT, BOT, B.Pharm, Nursing, Allied Health)\n- **Fee Packages** (2026–27 merit-based structure)\n- **Admissions, Eligibility & Scholarships**\n- **Hostel, Campus Facilities & Placements**\n\nI'm not a human, but I'll do my best to give you accurate, helpful answers! 😊`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "How can I apply for admission?"
      ]
    };
  }

  // D) Thank you / Thanks
  if (
    normQuery === 'thanks' ||
    normQuery === 'thank you' ||
    normQuery === 'thank u' ||
    normQuery === 'tq' ||
    normQuery === 'ty' ||
    normQuery === 'thx' ||
    normQuery.startsWith('thank') ||
    normQuery.includes('thank you') ||
    normQuery.includes('thanks a lot') ||
    normQuery.includes('thanks so much')
  ) {
    return {
      found: true,
      topic: 'Acknowledgement',
      category: 'General',
      confidence: 100,
      answer: `You're most welcome! 😊🎓\n\nIf you have any more questions about CARE KGF — courses, fees, admissions, hostel, or anything else — feel free to ask anytime!\n\nFor direct assistance, you can also reach our admissions team:\n📞 **+91 971 040 1000**\n✉️ **kolarenquiry@care.edu.in**`,
      suggestedQuestions: [
        "Tell me about B.Tech fee structure",
        "How can I apply for admission?",
        "What campus facilities are available?"
      ]
    };
  }

  // E) OK / Okay / Got it / Sure / Understood
  if (
    normQuery === 'ok' ||
    normQuery === 'okay' ||
    normQuery === 'ok ok' ||
    normQuery === 'got it' ||
    normQuery === 'sure' ||
    normQuery === 'alright' ||
    normQuery === 'noted' ||
    normQuery === 'understood' ||
    normQuery === 'fine' ||
    normQuery === 'great' ||
    normQuery === 'nice' ||
    normQuery === 'wow' ||
    normQuery === 'cool' ||
    normQuery === 'good' ||
    normQuery === 'perfect' ||
    normQuery === 'awesome'
  ) {
    return {
      found: true,
      topic: 'Acknowledgement',
      category: 'General',
      confidence: 100,
      answer: `Great! 😊 Is there anything else you'd like to know about **CARE KGF Campus**?\n\nI can help you with courses, fees, admissions, hostel, scholarships, placements, and more!`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "Tell me about B.Tech fee structure",
        "What medical courses are available?",
        "Contact information"
      ]
    };
  }

  // F) Help / What can you do
  if (
    normQuery === 'help' ||
    normQuery === 'help me' ||
    normQuery.includes('what can you do') ||
    normQuery.includes('what can you help') ||
    normQuery.includes('what do you know') ||
    normQuery.includes('what topics') ||
    normQuery.includes('what questions') ||
    normQuery.includes('how can you help') ||
    normQuery.includes('what can i ask')
  ) {
    return {
      found: true,
      topic: 'Help Menu',
      category: 'General',
      confidence: 100,
      answer: `Here's everything I can help you with! 📋\n\n**🎓 Engineering & B.Tech (CIT)**\n- Which B.Tech courses are offered (CSE, AI&ML, ECE, VLSI)\n- Specific details about each branch\n\n**💰 B.Tech Fee Structure (2026–27)**\n- Merit-based fee packages by your +2 percentage\n- Year-wise breakdown, hostel & HCL training inclusions\n\n**🏥 Medical & Allied Health Sciences**\n- B.Sc Allied Health Sciences (6 specializations)\n- BPT, BOT, B.Pharm, B.Sc Nursing programs\n\n**📝 Admissions & Eligibility**\n- How to apply online (step-by-step)\n- Eligibility criteria for all courses\n\n**🏡 Hostel & Campus**\n- Hostel details, sharing options, food\n- Library, labs, sports, transport\n\n**🏆 Scholarships & Placements**\n- Merit scholarships, HCL training, placement drive\n\n**📞 Contact Information**\n- Admissions helpline and campus address\n\nJust type your question naturally — I'll understand! 😊`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "What medical courses are available?",
        "Contact information"
      ]
    };
  }

  // G) Bye / Goodbye
  if (
    normQuery === 'bye' ||
    normQuery === 'goodbye' ||
    normQuery === 'good bye' ||
    normQuery === 'see you' ||
    normQuery === 'see ya' ||
    normQuery === 'cya' ||
    normQuery === 'exit' ||
    normQuery === 'quit' ||
    normQuery.includes('bye bye')
  ) {
    return {
      found: true,
      topic: 'Farewell',
      category: 'General',
      confidence: 100,
      answer: `Goodbye! 👋 Thank you for visiting the **CARE KGF Campus Enquiry Chatbot**.\n\nWishing you great success in your academic journey! 🎓\n\nIf you need any further information, don't hesitate to reach us:\n📞 **+91 971 040 1000**\n✉️ **kolarenquiry@care.edu.in**\n🌐 **application.care.edu.in/kgf**`,
      suggestedQuestions: []
    };
  }

  // H) Yes / No responses
  if (normQuery === 'yes' || normQuery === 'yeah' || normQuery === 'yep' || normQuery === 'yup' || normQuery === 'ya' || normQuery === 'yea') {
    return {
      found: true,
      topic: 'Acknowledgement',
      category: 'General',
      confidence: 100,
      answer: `Sure! What would you like to know more about? 😊 Feel free to ask any question about CARE KGF Campus.`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "Tell me about B.Tech fee structure",
        "What medical courses are available?",
        "How can I apply for admission?"
      ]
    };
  }

  if (normQuery === 'no' || normQuery === 'nope' || normQuery === 'nah') {
    return {
      found: true,
      topic: 'Acknowledgement',
      category: 'General',
      confidence: 100,
      answer: `No problem! 😊 Whenever you have a question about CARE KGF Campus, I'm right here to help. You can also reach the admissions office directly at **+91 971 040 1000**.`,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "Contact information"
      ]
    };
  }

  // ─── END CONVERSATIONAL HANDLER ─────────────────────────────────────────────

  // 1. Percentage-based Fee Queries Check
  const hasFeeOrScoreContext = 
    hasWord(normQuery, 'fee') || 
    hasWord(normQuery, 'fees') || 
    hasWord(normQuery, 'cost') || 
    hasWord(normQuery, 'package') || 
    hasWord(normQuery, 'pay') || 
    hasWord(normQuery, 'score') || 
    hasWord(normQuery, 'scoring') || 
    hasWord(normQuery, 'percent') || 
    normQuery.includes('%') || 
    normQuery.includes('+2') || 
    normQuery.includes('12th');

  const percentage = extractPercentage(query);

  if (percentage !== null && hasFeeOrScoreContext) {
    const feeResult = getFeeResponseForPercentage(percentage, query);
    return {
      found: true,
      answer: feeResult.answer,
      topic: feeResult.topic,
      category: feeResult.category,
      confidence: 96,
      suggestedQuestions: [
        "Is hostel included in the package?",
        "Is HCL training included?",
        "How can I apply for admission?"
      ]
    };
  }

  // General study / all courses inquiry
  if (
    normQuery.includes('what can i study') || 
    normQuery.includes('what can we study') || 
    normQuery.includes('what courses are available') || 
    normQuery.includes('which courses are available') || 
    (hasWord(normQuery, 'study') && !hasWord(normQuery, 'hostel') && !hasWord(normQuery, 'fee')) ||
    (hasWord(normQuery, 'programs') && !hasWord(normQuery, 'fee'))
  ) {
    const allCoursesItem = collegeData.knowledgeBase.find(i => i.id === 'all_courses_overview');
    if (allCoursesItem) {
      return {
        found: true,
        answer: allCoursesItem.answer,
        topic: allCoursesItem.topic,
        category: allCoursesItem.category,
        confidence: 96,
        suggestedQuestions: [
          "Which engineering courses are available?",
          "What medical courses are available?",
          "What is the B.Tech fee?"
        ]
      };
    }
  }

  // A) Medical Courses
  if (
    hasWord(normQuery, 'medical') || 
    hasWord(normQuery, 'nursing') || 
    hasWord(normQuery, 'physiotherapy') || 
    hasWord(normQuery, 'bpt') || 
    hasWord(normQuery, 'bot') || 
    hasWord(normQuery, 'pharmacy') || 
    hasWord(normQuery, 'bpharm') || 
    hasWord(normQuery, 'allied') ||
    hasWord(normQuery, 'paramedical') ||
    hasWord(normQuery, 'doctor')
  ) {
    if (hasWord(normQuery, 'fee') || hasWord(normQuery, 'fees') || hasWord(normQuery, 'cost')) {
      const medFeeItem = collegeData.knowledgeBase.find(i => i.id === 'medical_fee_inquiry');
      return {
        found: true,
        answer: medFeeItem.answer,
        topic: medFeeItem.topic,
        category: medFeeItem.category,
        confidence: 95,
        suggestedQuestions: [
          "What medical courses are available?",
          "What is the B.Tech fee?",
          "Where can I get more information?"
        ]
      };
    } else {
      const medItem = collegeData.knowledgeBase.find(i => i.id === 'medical_courses');
      return {
        found: true,
        answer: medItem.answer,
        topic: medItem.topic,
        category: medItem.category,
        confidence: 96,
        suggestedQuestions: [
          "Which engineering courses are available?",
          "What is the admission process?",
          "Where can I get more information?"
        ]
      };
    }
  }

  // B) Hostel Inclusions or Inquiries
  if (hasWord(normQuery, 'hostel') || hasWord(normQuery, 'accommodation') || hasWord(normQuery, 'stay') || hasWord(normQuery, 'room')) {
    if (hasWord(normQuery, 'included') || hasWord(normQuery, 'package') || hasWord(normQuery, 'fee') || hasWord(normQuery, 'free')) {
      return {
        found: true,
        answer: `### **Yes! Hostel Accommodation is Included in the B.Tech Package** 🏡\n\n- The 4-year B.Tech fee package at CARE KGF **already includes hostel accommodation** alongside tuition fees and specialized HCL training.\n- **Room Configuration:** 2, 3, or 4 sharing with non-attached washrooms, allocated subject to availability.\n- **Dining & Food:** Wholesome, hygienic food is served in the campus dining hall. *(Note: Hostel mess fees may fluctuate based on market rates for food items, cooking materials, and essentials)*.\n- **Amenities:** 24/7 security, continuous power backup, high-speed Wi-Fi, and recreation rooms.`,
        topic: "Hostel Inclusions",
        category: "Hostel",
        confidence: 98,
        suggestedQuestions: [
          "Is HCL training included?",
          "What is the B.Tech fee?",
          "Tell me about campus facilities"
        ]
      };
    } else {
      const hostelItem = collegeData.knowledgeBase.find(i => i.id === 'hostel_facilities');
      return {
        found: true,
        answer: hostelItem.answer,
        topic: hostelItem.topic,
        category: hostelItem.category,
        confidence: 95,
        suggestedQuestions: [
          "Is hostel included in the package?",
          "What campus facilities are available?",
          "What is the B.Tech fee?"
        ]
      };
    }
  }

  // C) HCL Training
  if (hasWord(normQuery, 'hcl')) {
    const hclItem = collegeData.knowledgeBase.find(i => i.id === 'hcl_training');
    return {
      found: true,
      answer: hclItem.answer,
      topic: hclItem.topic,
      category: hclItem.category,
      confidence: 98,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "What are the placements like?"
      ]
    };
  }

  // General Fee Structure Inquiry (triggered whenever fee, fees, cost, package, or how much is mentioned without percentage)
  if (
    hasWord(normQuery, 'fee') || 
    hasWord(normQuery, 'fees') || 
    hasWord(normQuery, 'cost') || 
    hasWord(normQuery, 'package') ||
    normQuery.includes('how much')
  ) {
    const feeItem = collegeData.knowledgeBase.find(i => i.id === 'btech_fee_structure');
    return {
      found: true,
      answer: feeItem.answer,
      topic: feeItem.topic,
      category: feeItem.category,
      confidence: 96,
      suggestedQuestions: [
        "How much is the CSE fee for students scoring above 85%?",
        "What is the fee for 80%?",
        "Is hostel included in the package?"
      ]
    };
  }

  // D) AI & ML Specific (use word boundaries to avoid matching 'available'!)
  if (
    hasWord(normQuery, 'ai') || 
    hasWord(normQuery, 'aiml') || 
    hasWord(normQuery, 'ml') || 
    normQuery.includes('artificial intelligence') || 
    normQuery.includes('machine learning')
  ) {
    const aimlItem = collegeData.knowledgeBase.find(i => i.id === 'course_aiml');
    return {
      found: true,
      answer: aimlItem.answer,
      topic: aimlItem.topic,
      category: aimlItem.category,
      confidence: 95,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "How can I apply for admission?"
      ]
    };
  }

  // E) Computer Science Specific
  if (
    hasWord(normQuery, 'cse') || 
    normQuery.includes('computer science') || 
    normQuery.includes('computer engineering')
  ) {
    const cseItem = collegeData.knowledgeBase.find(i => i.id === 'course_cse');
    return {
      found: true,
      answer: cseItem.answer,
      topic: cseItem.topic,
      category: cseItem.category,
      confidence: 95,
      suggestedQuestions: [
        "How much is the CSE fee for students scoring above 85%?",
        "Is AI and ML available?",
        "Which engineering courses are available?"
      ]
    };
  }

  // F) ECE & VLSI Specific
  if (
    hasWord(normQuery, 'ece') || 
    hasWord(normQuery, 'vlsi') || 
    normQuery.includes('electronics and communication') ||
    normQuery.includes('chip design')
  ) {
    const eceItem = collegeData.knowledgeBase.find(i => i.id === 'course_ece_vlsi');
    return {
      found: true,
      answer: eceItem.answer,
      topic: eceItem.topic,
      category: eceItem.category,
      confidence: 95,
      suggestedQuestions: [
        "Which engineering courses are available?",
        "What is the B.Tech fee?",
        "How can I apply for admission?"
      ]
    };
  }

  // G) General Engineering Courses Inquiry
  if (
    hasWord(normQuery, 'engineering') || 
    hasWord(normQuery, 'btech') || 
    hasWord(normQuery, 'b tech') ||
    (hasWord(normQuery, 'branches') && !hasWord(normQuery, 'bank')) ||
    hasWord(normQuery, 'departments')
  ) {
    const engItem = collegeData.knowledgeBase.find(i => i.id === 'engineering_courses');
    return {
      found: true,
      answer: engItem.answer,
      topic: engItem.topic,
      category: engItem.category,
      confidence: 95,
      suggestedQuestions: [
        "Do you have computer science?",
        "Is AI and ML available?",
        "What is the B.Tech fee?"
      ]
    };
  }

  // I) Contact & Location
  if (
    hasWord(normQuery, 'contact') || 
    hasWord(normQuery, 'phone') || 
    hasWord(normQuery, 'email') || 
    hasWord(normQuery, 'address') || 
    hasWord(normQuery, 'number') || 
    hasWord(normQuery, 'helpline') || 
    normQuery.includes('more information') ||
    normQuery.includes('reach')
  ) {
    const contactItem = collegeData.knowledgeBase.find(i => i.id === 'contact_info');
    return {
      found: true,
      answer: contactItem.answer,
      topic: contactItem.topic,
      category: contactItem.category,
      confidence: 98,
      suggestedQuestions: [
        "How can I apply for admission?",
        "Which engineering courses are available?",
        "What is the B.Tech fee?"
      ]
    };
  }

  // 3. Fallback to General Knowledge Base Scoring
  let bestItem = null;
  let highestScore = 0;

  for (const item of collegeData.knowledgeBase) {
    const score = scoreItem(item, query, queryTokens);
    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  if (bestItem && highestScore >= 12) {
    const suggestions = collegeData.quickQuestions
      .filter(q => normalizeText(q) !== normQuery)
      .slice(0, 3);

    return {
      found: true,
      answer: bestItem.answer,
      topic: bestItem.topic,
      category: bestItem.category,
      confidence: Math.min(Math.round(highestScore * 2), 99),
      suggestedQuestions: suggestions
    };
  }

  // Polite Fallback when confidence is low or question cannot be identified
  return {
    found: false,
    topic: "Not Found",
    confidence: 0,
    answer: "I couldn't find specific details for your query in our CARE KGF knowledge base.\n\nI can answer questions regarding:\n- **B.Tech Courses & Branches** (CSE, AI & ML, ECE, VLSI)\n- **B.Tech Fee Structure & Merit Tiers** (Above 85%, 75%–84%, 60%–74%, Below 59%)\n- **Medical & Health Sciences** (B.Sc Allied Health, Nursing, BPT, BOT, B.Pharm)\n- **Hostel Facilities & Inclusions**\n- **HCL Training & Placements**\n- **Online Admission Process & Eligibility**\n\nFor personalized counseling, please contact the **CARE KGF Admissions Office** directly:\n📞 **+91 971 040 1000** | ✉️ **kolarenquiry@care.edu.in**",
    suggestedQuestions: [
      "Which engineering courses are available?",
      "What is the B.Tech fee?",
      "What medical courses are available?",
      "How can I apply for admission?"
    ]
  };
}
