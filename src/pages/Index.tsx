import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FormWelcome } from "@/components/FormWelcome";
import { FormQuestionWithValidation } from "@/components/FormQuestionWithValidation";
import { FormComplete } from "@/components/FormComplete";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "date" | "file" | "checkbox";
  title: string;
  subtitle?: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  groups?: { label: string; icon: string; options: string[]; benefits?: string[] }[];
}

const questions: Question[] = [
  {
    id: "name",
    type: "text",
    title: "1. Name",
    required: true,
    placeholder: "Your full name",
  },
  {
    id: "phone",
    type: "tel",
    title: "2. Contact Number",
    required: true,
    placeholder: "+971 50 000 0000",
  },
  {
    id: "existingCourse",
    type: "select",
    title: "4. Existing Course Enrolled",
    required: true,
    options: ["Market Break Out", "Delta Wave Theory"],
  },
  {
    id: "newProgramme",
    type: "checkbox",
    title: "5. Select New Programme",
    required: true,
    groups: [
      {
        label: "DELTA STRUCTURE & LIQUIDITY PROGRAMM (DSLP)",
        icon: "📈",
        options: [
          "1. Basics of Elliott",
          "2. Elliott Corrections",
          "3. Elliott Diagonals",
          "4. Basics of Liquidity",
          "5. Advanced Liquidity",
          "6. Session Liquidity",
          "7. Complex Corrections",
          "8. HADC — Module 1",
          "9. HADC — Module 2",
          "10. HADC — Module 3",
          "11. HADC — Module 4",
          "12. Wyckoff — Class 1",
          "13. Wyckoff — Class 2",
          "14. Wyckoff — Class 3",
        ],
        benefits: [
          "$5,000 Trading Bonus Account",
          "14 Advanced Modules",
          "Mentor Mastery Trading Tool — 45 days free access",
          "Senior / Chief Mentor Assigned",
          "Structured 1-on-1 Meetings",
          "Profit Withdrawal Rights",
        ],
      },
      {
        label: "DELTA QUANT MASTERY PROGRAMME (DQMP)",
        icon: "🧠",
        options: [
          "1. All DSLP Content (14 modules)",
          "2. Gann Theory 1",
          "3. Gann Theory 2",
          "4. Gann Theory 3",
          "5. Gann Theory 4",
          "6. Block Chain Study & Understand Crypto currencies",
          "7. Crypto Platform Setups",
          "8. Crypto Market Structure",
          "9. Crypto Market Liquidity",
          "10. Bitcoin Strategy & How to find potential Project",
          "11. Monte Carlo Simulation 1",
          "12. Monte Carlo Simulation 2",
        ],
        benefits: [
          "$10,000 Trading Bonus Account",
          "Mentor Mastery Tool — 75 days free access",
          "Pips Craft — 180 days free access",
          "Pips Trader — 180 days free access",
          "Traders Day Out Premium Conference",
          "Senior / Chief Mentor",
        ],
      },
      {
        label: "Delta Grand Master Programme (DGMP)",
        icon: "👑",
        options: [
          "1. All DSLP + DQMP Content",
          "2. WD Gann Astro 1",
          "3. WD Gann Astro 2",
          "4. WD Gann Astro 3",
          "5. WD Gann Astro 4",
          "6. Inter Market Analysis 1",
          "7. Inter Market Analysis 2",
          "8. Wealth Management",
          "9. Stocks & Mutual Funds 1",
          "10. Stocks & Mutual Funds 2",
          "11. Stocks & Mutual Funds 3",
        ],
        benefits: [
          "$25,000 Trading Bonus Account",
          "Delta Journal Tool",
          "Mentors Mastery Tool — 365 days free",
          "Pips Craft Tool — 365 days free",
          "Pips Trader Tool — 365 days free",
          "Traders Day Out Grand Master",
        ],
      },
    ],
  },
  {
    id: "termsAgreed",
    type: "checkbox",
    title: "6. Terms & Conditions",
    required: true,
    subtitle: `TERMS AND CONDITIONS\nDelta International Management Development Training – Amended 10th May 2026\n\nThe Terms and Conditions ("Terms") agreed herein govern the participation of the undersigned student ("you" or "Student") in any forex trading course or related course ("Course") offered by Delta International Management Development Training ("Delta", "we", or "us"), an educational initiative providing instructional courses in forex trading and related subjects.\n\n1. ACCEPTANCE OF THE TERMS\n• By registering for the Course offered by Delta, either through online platforms or in-person enrolment, you acknowledge that you have read, understood, and agreed to be bound by these Terms in full.\n• Enrolment to the Course is subject to availability and is not guaranteed until explicitly confirmed by us as per the Terms herein. We reserve the right to accept or reject any application for enrolment at our sole discretion.\n\n2. NATURE AND SCOPE OF THE COURSE\n• The Course is intended and offered solely for educational and informational purposes relating to virtual and forex trading (the "Subject"), and does not constitute any kind of professional, financial, legal or investment advice, or solicitation to trade.\n• Delta makes no warranties or representations as to the accuracy, completeness, or usefulness of the Course. You agree that any trading or investment decisions are made independently at your sole risk.\n• Delta shall not be liable for any losses, financial or otherwise, arising out of or in connection with the Course content or actions taken based on it.\n\n3. COURSE MATERIALS AND INTELLECTUAL PROPERTY\n• All Course content, including but not limited to logos, trademarks, trade names, copyrights, and any videos, presentations, slides, written materials, images, and lectures (collectively, the "Course Content") shall be the exclusive property of Delta. All intellectual property rights over the Course Content are hereby reserved by Delta.\n• Upon enrolment, you are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Course Content solely for purposes relating to the Subject as agreed herein.\n• Any form of unauthorized storage, reproduction, distribution, modification, public display, or commercial use of any Course Content is strictly prohibited and may result in immediate legal action, including seeking injunctive relief or damages, and termination of enrolment of the Student.\n\n4. COURSE FEES AND PAYMENT\n• All Course fees must be paid in full prior to commencement, unless otherwise agreed in writing by Delta. Any instalment or deferred payment arrangements must be strictly adhered to as mutually agreed.\n• Any fees paid are non-refundable and non-transferable under any circumstances, including withdrawal, termination, dissatisfaction, or partial completion.\n• Enrolment shall be deemed complete only upon:\n  – Submission of completed registration documents,\n  – Payment and receipt of fees as agreed, and\n  – Issuance of official confirmation from Delta via email or written notice.\n• Delta reserves the right to withhold services or disqualify any Student for reasons including, but not limited to, any payment failure, misrepresentation, false information, and/or breach of any Terms herein.\n• Please refer to our Payment and Refund Policy for further details.\n\n5. EDUCATIONAL TRADING CREDIT\n• As part of the Course, Delta may provide the Student with access to a trading credit scheme ("Trading Credit") offered by an independent third-party brokerage company ("Broker") for the purpose of gaining experience trading on a trading platform ("Platform").\n• Creation of the account with the Broker and availing the Trading Credit shall be entirely voluntary and at the sole discretion of the Student. Any such access provided shall be subject to successful registration, KYC completion, and approval by the Broker.\n• The Trading Credit provided shall be subject to the Broker's terms and conditions. Delta does not own, operate, or control the Platform or the Broker and shall not be held liable directly or indirectly, for the actions, omissions or decisions of the Broker or the Platform in any manner. The Trading Credit cannot be redeemed for cash or withdrawn in any other manner. However, profit earned through trading, above and beyond the Trading Credit, shall be available for withdrawal subject to charges and withdrawal limits of the Broker.\n• The Trading Credit does not form part of the Course fee, nor does it constitute a guaranteed benefit, right or entitlement in any manner. You acknowledge and agree that any participation or interaction with the Broker is undertaken at your sole risk and responsibility, and that Delta and/or any of its employees, instructors, agents, and partners (together as the "Affiliates") shall not be liable in any manner whatsoever in relation to such participation.\n\n6. CODE OF CONDUCT\n• Students must at all times:\n  – Conduct themselves in a respectful and professional manner, as ordinarily expected from a student;\n  – Abide by all rules, regulations, and policies communicated during the Course.\n• Delta reserves the right to suspend or expel any Student, without refund or notice, for any:\n  – Disruptive, harassing, abusive, or unethical conduct or behavior;\n  – Misuse or unauthorized sharing of Course Content;\n  – Academic dishonesty or fraudulent activity.\n\n7. DISCLAIMERS AND LIMITATION OF LIABILITY\n• Trading in financial markets involves substantial risk. You acknowledge and agree that any past performance is not indicative of future results.\n• To the extent permitted by law, Delta and/or its Affiliates shall not be liable for any:\n  – Direct, indirect, incidental, special, or consequential damages;\n  – Loss of profits, capital, data, or goodwill;\n  – Technical failures, internet disruptions, or platform outages;\n  – Any other damages resulting from your decision to take part in or conduct any form of trading or related activity during or after the term of the Course.\n• You agree to indemnify, defend and hold harmless Delta and its Affiliates from any claims, damages, expenses or liabilities arising from the breach of these Terms, any trading activity or your conduct during or after the term of the Course.\n\n8. DATA PROTECTION AND PRIVACY\n• You agree to provide accurate, current, and complete information for registration and during the term of this Course.\n• Your personal data shall be collected, stored and processed in accordance with applicable data protection laws of the UAE.\n• Delta shall not share your information with any third parties except as required by law.\n\n9. AMENDMENTS AND MODIFICATIONS\n• Delta reserves the right, at its sole discretion, to:\n  – Amend, revise, or update these Terms;\n  – Modify Course structure, content, fees, or instructors;\n  – Suspend or discontinue the Course in whole or in part.\n• Any amendments or modifications to the Terms shall be published on Delta's website. Continued participation or attendance in the Course after any such amendment constitutes acceptance of the revised Terms.\n\n10. TERM AND TERMINATION\n• These Terms shall come into effect from the date of your enrolment in the Course, as confirmed in writing by Delta, or the date of your signing or acceptance of the terms, whichever is earlier ("Effective Date"), and shall remain in force until the completion of the Course, unless earlier terminated in accordance with the provisions herein.\n• Upon termination for any reason:\n  – The Student's access to the Course Content, platforms, and any materials shall cease immediately;\n  – The Student shall immediately cease all use of the Course Content and return, delete or destroy any copies in their possession;\n  – Termination shall be without prejudice to any accrued rights, remedies, or obligations of Delta under these Terms, including its right to seek damages, enforce indemnities, or pursue any other remedies available under law.\n\n11. SEVERABILITY\n• If any provision of these Terms is found to be invalid, void, or unenforceable under applicable law, such provision shall be severed without affecting the validity of the remaining Terms, which shall remain in full force and effect.\n\n12. GOVERNING LAW AND DISPUTE RESOLUTION\n• These Terms shall be governed by and construed in accordance with the applicable Federal laws of the United Arab Emirates and the local laws of the Emirate of Dubai.\n• Any disputes arising from or relating to these Terms shall be first resolved amicably through mutual negotiations. In case of failure to settle the dispute within thirty days of initiating such negotiation, the matter shall be exclusively submitted to the Courts of the Emirate of Dubai.\n\n13. ACKNOWLEDGEMENT AND ACCEPTANCE\n• By signing below or submitting your registration form electronically, you confirm that you have read, understood, and agreed to be legally bound by these Terms in full.`,
    options: ["I have read, understood, and agree to Delta Institutions' Terms & Conditions, including the No Refund Policy. I confirm all information provided is accurate."],
  },
];

const STORAGE = {
  step:  "enrollCurrentStep",
  index: "enrollCurrentQuestionIndex",
  ans:   "enrollAnswers",
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"welcome" | "questions" | "complete">(
    (localStorage.getItem(STORAGE.step) as any) || "welcome",
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem(STORAGE.index) || "0"),
  );
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.ans) || "{}");
    } catch { return {}; }
  });
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // ── KEY FIX: track whether the last action was navigating back ──────────
  // This prevents auto-advance from firing when returning to a select question
  const navigatedBackRef = useRef(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE.step,  currentStep);
    localStorage.setItem(STORAGE.index, currentQuestionIndex.toString());
    localStorage.setItem(STORAGE.ans, JSON.stringify(answers));
  }, [currentStep, currentQuestionIndex, answers]);

  const handleStart = () => { setCurrentStep("questions"); setCurrentQuestionIndex(0); };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = async () => {
    const q   = questions[currentQuestionIndex];
    const ans = answers[q.id];

    if (q.required) {
      if (q.type === "file") {
        const ok = Array.isArray(ans) ? ans.length > 0 : ans instanceof File;
        if (!ok) { toast({ title: "Required", description: "Please upload the required file.", variant: "destructive" }); return; }
      } else if (!ans || ans?.trim?.() === "") {
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setDirection("left");
      setCurrentQuestionIndex(i => i + 1);
    } else {
      try {
        await handleSubmit();
        setCurrentStep("complete");
      } catch {
        // toast already shown in handleSubmit; stay on last question
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep === "complete") {
      // ── Back from complete screen → go back to last question ──────────
      navigatedBackRef.current = true;
      setDirection("right");
      setCurrentStep("questions");
      setCurrentQuestionIndex(questions.length - 1);
      return;
    }
    if (currentQuestionIndex > 0) {
      navigatedBackRef.current = true;   // <── suppress auto-advance
      setDirection("right");
      setCurrentQuestionIndex(i => i - 1);
    }
  };

  // Auto-advance for select — but NOT when navigating back
  useEffect(() => {
    if (navigatedBackRef.current) {
      navigatedBackRef.current = false;  // clear the flag, don't advance
      return;
    }
    const q = questions[currentQuestionIndex];
    if (q?.type === "select" && answers[q.id]) {
      const t = setTimeout(handleNext, 350);
      return () => clearTimeout(t);
    }
  }, [answers, currentQuestionIndex]);   // eslint-disable-line

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        name:           answers.name           || "",
        phone:          answers.phone          || "",
        existingCourse: answers.existingCourse || "",
        newProgramme:   (answers.newProgramme || "").split("|").filter(Boolean).join(", "),
        termsAgreed:    answers.termsAgreed    ? "Yes" : "No",
      };

      const res    = await fetch("https://script.google.com/macros/s/AKfycbz-inyZrhnEjT7a01xWHsSYjR9VtbYsFFSX6Sr7FWUxwrk1GIyFuqzQl5WAzLtvpqUI/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.status === "success") {
        toast({ title: "Enrollment Submitted!", description: "Our team will contact you on WhatsApp shortly." });
        localStorage.removeItem(STORAGE.step);
        localStorage.removeItem(STORAGE.index);
        localStorage.removeItem(STORAGE.ans);
        return { success: true };
      }
      throw new Error(result.message || "Submission failed");
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed to submit", variant: "destructive" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAnother = () => {
    localStorage.removeItem(STORAGE.step);
    localStorage.removeItem(STORAGE.index);
    localStorage.removeItem(STORAGE.ans);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setDirection("left");
    setCurrentStep("welcome");
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer   = currentQuestion ? answers[currentQuestion.id] ?? "" : "";

  const canGoNext = currentQuestion
    ? !currentQuestion.required ||
      (currentQuestion.type === "file"
        ? Array.isArray(currentAnswer) ? currentAnswer.length > 0 : currentAnswer instanceof File
        : currentAnswer && currentAnswer?.trim?.() !== "")
    : false;

  if (currentStep === "welcome")  return <FormWelcome onStart={handleStart} />;
  if (currentStep === "complete") return <FormComplete onRegisterAnother={handleRegisterAnother} />;

  return (
    <>
      <AnimatePresence mode="wait" custom={direction}>
        <FormQuestionWithValidation
          key={currentQuestionIndex}
          question={currentQuestion as any}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          value={currentAnswer}
          onChange={v => handleAnswerChange(currentQuestion.id, v)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={canGoNext}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === questions.length - 1}
          allAnswers={answers}
          direction={direction}
          isSubmitting={loading}
        />
      </AnimatePresence>

    </>
  );
};

export default Index;
