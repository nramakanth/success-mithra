import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Modal, InteractionManager, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Clock, CheckCircle, XCircle, Eye } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

const BRAND_COLORS = {
  primary: '#3A7CA5',
  accent: '#F4A261',
  green: '#10b981',
  gray: '#64748b',
  bg: '#f8fafc',
};

// Utility to deeply flatten and filter only strings
function flattenToStrings(arr: any): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.reduce<string[]>((acc, val) => {
    if (typeof val === 'string') acc.push(val);
    else if (Array.isArray(val)) acc.push(...flattenToStrings(val));
    else if (val && typeof val.name === 'string') acc.push(val.name);
    return acc;
  }, []);
}

function getLessonList(lessonsParam: any): string[] {
  try {
    if (!lessonsParam) return [];
    if (typeof lessonsParam === 'string') {
      const parsed = JSON.parse(lessonsParam) as any[];
      if (Array.isArray(parsed)) {
        let arr = parsed.flatMap(l => typeof l === 'string' ? l : (l && typeof l.name === 'string' ? l.name : []));
        return ([] as string[]).concat(...arr).filter((l): l is string => typeof l === 'string');
      }
    } else if (Array.isArray(lessonsParam)) {
      let arr = (lessonsParam as any[]).flatMap(l => typeof l === 'string' ? l : (l && typeof l.name === 'string' ? l.name : []));
      return ([] as string[]).concat(...arr).filter((l): l is string => typeof l === 'string');
    }
  } catch {}
  return [];
}

// Sample images for questions and options
const SAMPLE_IMAGES = [
  'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&w=400',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Right_triangle.svg/1200px-Right_triangle.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Equilateral-triangle.svg/1200px-Equilateral-triangle.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Isosceles-triangle.svg/1200px-Isosceles-triangle.svg.png',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=400',
  'https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg?auto=compress&w=400',
];

function randomImage() {
  return SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)];
}

// Physics questions with proper content
const PHYSICS_QUESTIONS = [
  {
    question: "What is the SI unit of force?",
    image: null,
    options: [
      { text: "Newton (N)", isCorrect: true, image: null },
      { text: "Joule (J)", isCorrect: false, image: null },
      { text: "Watt (W)", isCorrect: false, image: null },
      { text: "Pascal (Pa)", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which of the following represents Ohm's Law?",
    image: null,
    options: [
      { text: "V = IR", isCorrect: true, image: null },
      { text: "P = VI", isCorrect: false, image: null },
      { text: "F = ma", isCorrect: false, image: null },
      { text: "E = mc²", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the acceleration due to gravity on Earth?",
    image: null,
    options: [
      { text: "9.8 m/s²", isCorrect: true, image: null },
      { text: "10 m/s²", isCorrect: false, image: null },
      { text: "8.9 m/s²", isCorrect: false, image: null },
      { text: "12 m/s²", isCorrect: false, image: null },
    ]
  },
  {
    question: "Identify the simple machine shown in the image:",
    image: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&w=400",
    options: [
      { text: "Lever", isCorrect: true, image: null },
      { text: "Pulley", isCorrect: false, image: null },
      { text: "Inclined Plane", isCorrect: false, image: null },
      { text: "Wheel and Axle", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which triangle is a right triangle?",
    image: null,
    options: [
      { text: "", isCorrect: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Equilateral-triangle.svg/1200px-Equilateral-triangle.svg.png" },
      { text: "", isCorrect: true, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Right_triangle.svg/1200px-Right_triangle.svg.png" },
      { text: "", isCorrect: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Isosceles-triangle.svg/1200px-Isosceles-triangle.svg.png" },
      { text: "", isCorrect: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Triangle.TrigArea.svg/1200px-Triangle.TrigArea.svg.png" },
    ]
  },
  {
    question: "What is the formula for kinetic energy?",
    image: null,
    options: [
      { text: "KE = ½mv²", isCorrect: true, image: null },
      { text: "KE = mgh", isCorrect: false, image: null },
      { text: "KE = Fd", isCorrect: false, image: null },
      { text: "KE = Pt", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which wave has the highest frequency?",
    image: null,
    options: [
      { text: "Radio waves", isCorrect: false, image: null },
      { text: "Visible light", isCorrect: false, image: null },
      { text: "X-rays", isCorrect: true, image: null },
      { text: "Infrared", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the unit of electric current?",
    image: null,
    options: [
      { text: "Volt (V)", isCorrect: false, image: null },
      { text: "Ampere (A)", isCorrect: true, image: null },
      { text: "Ohm (Ω)", isCorrect: false, image: null },
      { text: "Watt (W)", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which law states that energy cannot be created or destroyed?",
    image: null,
    options: [
      { text: "First Law of Thermodynamics", isCorrect: true, image: null },
      { text: "Second Law of Thermodynamics", isCorrect: false, image: null },
      { text: "Law of Conservation of Mass", isCorrect: false, image: null },
      { text: "Newton's Third Law", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the speed of light in vacuum?",
    image: null,
    options: [
      { text: "3 × 10⁸ m/s", isCorrect: true, image: null },
      { text: "2 × 10⁸ m/s", isCorrect: false, image: null },
      { text: "4 × 10⁸ m/s", isCorrect: false, image: null },
      { text: "1 × 10⁸ m/s", isCorrect: false, image: null },
    ]
  }
];

// Mathematics questions
const MATH_QUESTIONS = [
  {
    question: "What is the value of π (pi) to two decimal places?",
    image: null,
    options: [
      { text: "3.14", isCorrect: true, image: null },
      { text: "2.72", isCorrect: false, image: null },
      { text: "1.62", isCorrect: false, image: null },
      { text: "3.41", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the derivative of x²?",
    image: null,
    options: [
      { text: "2x", isCorrect: true, image: null },
      { text: "x", isCorrect: false, image: null },
      { text: "x²", isCorrect: false, image: null },
      { text: "1", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which triangle is a right triangle?",
    image: null,
    options: [
      { text: "", isCorrect: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Equilateral-triangle.svg/1200px-Equilateral-triangle.svg.png" },
      { text: "", isCorrect: true, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Right_triangle.svg/1200px-Right_triangle.svg.png" },
      { text: "", isCorrect: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Isosceles-triangle.svg/1200px-Isosceles-triangle.svg.png" },
      { text: "", isCorrect: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Triangle.TrigArea.svg/1200px-Triangle.TrigArea.svg.png" },
    ]
  },
  {
    question: "What is the area of a circle with radius r?",
    image: null,
    options: [
      { text: "πr²", isCorrect: true, image: null },
      { text: "2πr", isCorrect: false, image: null },
      { text: "πd", isCorrect: false, image: null },
      { text: "r²", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the sum of angles in a triangle?",
    image: null,
    options: [
      { text: "180°", isCorrect: true, image: null },
      { text: "90°", isCorrect: false, image: null },
      { text: "360°", isCorrect: false, image: null },
      { text: "270°", isCorrect: false, image: null },
    ]
  },
];

// Chemistry questions
const CHEMISTRY_QUESTIONS = [
  {
    question: "What is the chemical symbol for water?",
    image: null,
    options: [
      { text: "H₂O", isCorrect: true, image: null },
      { text: "O₂", isCorrect: false, image: null },
      { text: "CO₂", isCorrect: false, image: null },
      { text: "NaCl", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which of the following is an organic compound?",
    image: null,
    options: [
      { text: "CH₄", isCorrect: true, image: null },
      { text: "NaCl", isCorrect: false, image: null },
      { text: "H₂SO₄", isCorrect: false, image: null },
      { text: "KNO₃", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the pH of a neutral solution at 25°C?",
    image: null,
    options: [
      { text: "7", isCorrect: true, image: null },
      { text: "0", isCorrect: false, image: null },
      { text: "14", isCorrect: false, image: null },
      { text: "1", isCorrect: false, image: null },
    ]
  },
  {
    question: "Which gas is released during photosynthesis?",
    image: null,
    options: [
      { text: "Oxygen", isCorrect: true, image: null },
      { text: "Carbon Dioxide", isCorrect: false, image: null },
      { text: "Nitrogen", isCorrect: false, image: null },
      { text: "Hydrogen", isCorrect: false, image: null },
    ]
  },
  {
    question: "What is the atomic number of Carbon?",
    image: null,
    options: [
      { text: "6", isCorrect: true, image: null },
      { text: "12", isCorrect: false, image: null },
      { text: "8", isCorrect: false, image: null },
      { text: "16", isCorrect: false, image: null },
    ]
  },
];

function generateMockQuestions(lessons: string[], subject: string): any[] {
  let questions: any[] = [];
  let baseQuestions = PHYSICS_QUESTIONS;
  if (subject === 'Mathematics') baseQuestions = MATH_QUESTIONS;
  if (subject === 'Chemistry') baseQuestions = CHEMISTRY_QUESTIONS;
  lessons.forEach((lesson) => {
    for (let i = 1; i <= 10; i++) {
      const questionIndex = (i - 1) % baseQuestions.length;
      const baseQuestion = baseQuestions[questionIndex];
      questions.push({
        id: `${lesson}-${i}`,
        lesson,
        subject,
        question: `${lesson}: ${baseQuestion.question}`,
        image: baseQuestion.image,
        options: baseQuestion.options,
        multiple: false,
      });
    }
  });
  return questions;
}

export default function Exam() {
  const router = useRouter();
  const { subject, lessons: lessonsParam, answers: prevAnswers, testType, duration } = useLocalSearchParams();
  const lessonListRaw = (() => {
    try {
      if (!lessonsParam) return [];
      if (typeof lessonsParam === 'string') {
        const parsed = JSON.parse(lessonsParam);
        if (Array.isArray(parsed)) {
          return flattenToStrings(parsed);
        }
      } else if (Array.isArray(lessonsParam)) {
        return flattenToStrings(lessonsParam);
      }
    } catch {}
    return [];
  })();
  const lessonList = Array.isArray(lessonListRaw) && lessonListRaw.every(l => typeof l === 'string') ? lessonListRaw : [];
  const safeSubject = typeof subject === 'string' ? subject : '';
  let MOCK_QUESTIONS: any[] = [];
  let combinedSubjects = ['Maths', 'Chemistry', 'Physics'];
  let combinedQuestionsBySubject: { [subject: string]: any[] } = {};
  if (testType === 'combined' || testType === 'previous') {
    combinedSubjects.forEach((subj) => {
      combinedQuestionsBySubject[subj] = generateMockQuestions(['All'], subj).slice(0, 30).map((q, idx) => ({ ...q, subject: subj, paletteIndex: idx }));
    });
  } else {
    MOCK_QUESTIONS = generateMockQuestions(lessonList, safeSubject);
  }
  // For combined test, track current subject and question within that subject
  const [combinedSubjectIndex, setCombinedSubjectIndex] = useState(0);
  const [combinedQuestionIndex, setCombinedQuestionIndex] = useState(0);
  const [showNextSubjectModal, setShowNextSubjectModal] = useState(false);
  // For mock/combined/previous: overall exam timer. For practice: per-question timer.
  const isOverallTimer = testType === 'mock' || testType === 'combined' || testType === 'previous';
  const initialOverallTime = (() => {
    if (typeof duration === 'string') {
      const match = duration.match(/\d+/);
      if (match) return parseInt(match[0], 10) * 60;
    } else if (typeof duration === 'number') {
      return duration * 60;
    }
    return 120 * 60; // default 120 min
  })();
  const [overallTimeLeft, setOverallTimeLeft] = useState(initialOverallTime);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(120); // 2 min per question default
  const timerRef = useRef<NodeJS.Timeout | ReturnType<typeof setTimeout> | null>(null);
  const [showNextLessonModal, setShowNextLessonModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  // Always define these for both combined and non-combined test logic
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<{ [key: string]: number[] }>({});
  const [markedRead, setMarkedRead] = useState<{ [key: string]: boolean }>({});

  // Get current lesson and questions
  let currentLesson = lessonList[currentLessonIndex] || '';
  let currentLessonQuestions: any[] = [];
  let q: any = null;
  if (testType === 'combined' || testType === 'previous') {
    const subject = combinedSubjects[combinedSubjectIndex];
    currentLesson = subject;
    currentLessonQuestions = combinedQuestionsBySubject[subject] || [];
    q = currentLessonQuestions[combinedQuestionIndex];
  } else {
    currentLessonQuestions = MOCK_QUESTIONS.filter(q => q.lesson === currentLesson);
    q = currentLessonQuestions[currentQuestionIndex];
  }
  const selectedOptions = selected[q?.id] || [];
  const isRead = markedRead[q?.id];

  // Timer effect
  useEffect(() => {
    if (isOverallTimer) {
      setOverallTimeLeft(initialOverallTime);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setOverallTimeLeft((t) => {
          if (t <= 1) {
            setShowSubmitModal(true);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    } else {
      setQuestionTimeLeft(120);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setQuestionTimeLeft((t) => {
          if (t <= 1) {
            // Do not auto-next for combined test or any test, just stop timer
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [isOverallTimer, initialOverallTime, currentLessonIndex, currentQuestionIndex]);

  // Scroll to top on question change (using InteractionManager for reliability)
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: false });
      }
    });
  }, [currentLessonIndex, currentQuestionIndex]);

  const handleSelect = (optionIdx: number) => {
    if (!q) return;
    setSelected((prev) => {
      const prevSel = prev[q.id] || [];
      return { ...prev, [q.id]: [optionIdx] };
    });
  };

  const handleAutoNext = () => {
    if (currentQuestionIndex < currentLessonQuestions.length - 1) {
      // Next question in same lesson
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of current lesson
      if (currentLessonIndex < lessonList.length - 1) {
        // More lessons to go
        setShowNextLessonModal(true);
      } else {
        // All lessons completed
        setShowSubmitModal(true);
      }
    }
  };

  const handleNext = () => {
    if (testType === 'combined' || testType === 'previous') {
      if (combinedQuestionIndex < currentLessonQuestions.length - 1) {
        setCombinedQuestionIndex(combinedQuestionIndex + 1);
      } else {
        if (combinedSubjectIndex < combinedSubjects.length - 1) {
          setShowNextSubjectModal(true);
        } else {
          setShowSubmitModal(true);
        }
      }
    } else {
      if (currentQuestionIndex < currentLessonQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        if (currentLessonIndex < lessonList.length - 1) {
          setShowNextLessonModal(true);
        } else {
          setShowSubmitModal(true);
        }
      }
    }
  };

  const handlePrev = () => {
    if (testType === 'combined' || testType === 'previous') {
      if (combinedQuestionIndex > 0) {
        setCombinedQuestionIndex(combinedQuestionIndex - 1);
      } else if (combinedSubjectIndex > 0) {
        // Go to last question of previous subject
        const prevSubject = combinedSubjects[combinedSubjectIndex - 1];
        setCombinedSubjectIndex(combinedSubjectIndex - 1);
        setCombinedQuestionIndex((combinedQuestionsBySubject[prevSubject] || []).length - 1);
      }
    } else {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (currentLessonIndex > 0) {
        const prevLesson = lessonList[currentLessonIndex - 1];
        const prevLessonQuestions = MOCK_QUESTIONS.filter(q => q.lesson === prevLesson);
        setCurrentLessonIndex(currentLessonIndex - 1);
        setCurrentQuestionIndex(prevLessonQuestions.length - 1);
      }
    }
  };

  const handlePaletteJump = (idx: number) => {
    setCurrentQuestionIndex(idx);
  };

  const handleMarkRead = () => {
    if (!q) return;
    setMarkedRead((prev) => ({ ...prev, [q.id]: !prev[q.id] }));
  };

  const proceedToNextLesson = () => {
    setShowNextLessonModal(false);
    setCurrentLessonIndex(currentLessonIndex + 1);
    setCurrentQuestionIndex(0);
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    router.push({ pathname: '/test/results', params: { answers: JSON.stringify(selected), lessons: JSON.stringify(lessonList) } });
  };

  // Progress
  let totalQuestions = 0;
  let completedQuestions = 0;
  if (testType === 'combined' || testType === 'previous') {
    totalQuestions = combinedSubjects.reduce((sum, subj) => sum + (combinedQuestionsBySubject[subj]?.length || 0), 0);
    completedQuestions = combinedSubjects.slice(0, combinedSubjectIndex).reduce((sum, subj) => sum + (combinedQuestionsBySubject[subj]?.length || 0), 0) + combinedQuestionIndex;
  } else {
    totalQuestions = lessonList.reduce((total, lesson) => {
      return total + MOCK_QUESTIONS.filter(q => q.lesson === lesson).length;
    }, 0);
    completedQuestions = lessonList.slice(0, currentLessonIndex).reduce((total, lesson) => {
      return total + MOCK_QUESTIONS.filter(q => q.lesson === lesson).length;
    }, 0) + currentQuestionIndex;
  }
  const progress = ((completedQuestions + 1) / totalQuestions) * 100;
  const minutes = isOverallTimer
    ? Math.floor(overallTimeLeft / 60)
    : Math.floor(questionTimeLeft / 60);
  const seconds = isOverallTimer
    ? overallTimeLeft % 60
    : questionTimeLeft % 60;

  // Prevent hardware back for mock tests
  useFocusEffect(
    React.useCallback(() => {
      if (testType === 'combined' || testType === 'previous' || testType === 'mock') {
        const onBackPress = () => {
          setShowExitModal(true);
          return true; // Prevent default
        };
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => subscription.remove();
      }
    }, [testType])
  );

  if (!q) return null;

  return (
    <View style={{ flex: 1, backgroundColor: BRAND_COLORS.bg }}>
      {/* Header */}
      <View style={styles.header}>
        {(testType === 'combined' || testType === 'previous') ? (
          <TouchableOpacity style={styles.backBtn} onPress={() => setShowExitModal(true)}>
            <XCircle size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{safeSubject || (testType === 'combined' ? 'Combined Test' : '')}</Text>
          {testType !== 'combined' && <Text style={styles.lessonHeader}>{currentLesson}</Text>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.timerBox}>
            <Clock size={18} color="#fff" />
            <Text style={styles.timerText}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </Text>
          </View>
          <TouchableOpacity style={styles.paletteToggleBtn} onPress={() => setShowPalette(true)}>
            <Eye size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Question Card - Scrollable */}
      <ScrollView 
        ref={scrollRef}
        style={styles.questionScrollContainer}
        contentContainerStyle={styles.questionScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Question image if present */}
          {q.image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: q.image }} style={styles.questionImage} resizeMode="cover" />
            </View>
          )}
          {/* Show subject for combined test */}
          {(testType === 'combined' || testType === 'previous') ? (
            <Text style={{ fontWeight: 'bold', color: '#3A7CA5', marginBottom: 4 }}>{currentLesson}</Text>
          ) : null}
          {/* Show question number */}
          <Text style={{ fontWeight: 'bold', color: '#64748b', marginBottom: 4 }}>
            Question {(testType === 'combined' || testType === 'previous') ? combinedQuestionIndex + 1 : currentQuestionIndex + 1}/30
          </Text>
          <Text style={styles.questionText}>{q.question}</Text>
          <View style={styles.optionsList}>
            {q.options.map((opt: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                style={[styles.optionBtn, selectedOptions.includes(idx) && styles.optionBtnSelected]}
                onPress={() => handleSelect(idx)}
                activeOpacity={0.85}
              >
                {opt.image ? (
                  <View style={styles.optionImageContainer}>
                    <Image source={{ uri: opt.image }} style={styles.optionImage} resizeMode="contain" />
                  </View>
                ) : (
                  <Text style={[styles.optionText, selectedOptions.includes(idx) && styles.optionTextSelected]}>{opt.text}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.markReadRow}>
            <TouchableOpacity style={[styles.markReadBtn, isRead && styles.markReadActive]} onPress={handleMarkRead}>
              <CheckCircle size={18} color={isRead ? BRAND_COLORS.green : BRAND_COLORS.gray} />
              <Text style={[styles.markReadText, isRead && { color: BRAND_COLORS.green }]}>Mark as Read</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Next/Prev Buttons */}
      <View style={styles.navRow}>
        <TouchableOpacity 
          style={[styles.navBtn, (currentQuestionIndex === 0 && currentLessonIndex === 0) && styles.navBtnDisabled]} 
          onPress={handlePrev} 
          disabled={currentQuestionIndex === 0 && currentLessonIndex === 0}
        >
          <Text style={[styles.navBtnText, (currentQuestionIndex === 0 && currentLessonIndex === 0) && styles.navBtnTextDisabled]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={handleNext}>
          <Text style={styles.navBtnText}>
            {currentQuestionIndex === currentLessonQuestions.length - 1 && currentLessonIndex === lessonList.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Lesson Modal */}
      <Modal visible={showNextLessonModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Lesson Completed!</Text>
            <Text style={styles.modalMsg}>
              You have completed "{currentLesson}". {lessonList[currentLessonIndex + 1] ? `Ready to proceed to "${lessonList[currentLessonIndex + 1]}"?` : ''}
            </Text>
            <View style={styles.modalBtnsRow}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#e2e8f0' }]} onPress={() => setShowNextLessonModal(false)}>
                <Text style={[styles.modalBtnText, { color: BRAND_COLORS.gray }]}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: BRAND_COLORS.accent }]} onPress={proceedToNextLesson}>
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>Next Lesson</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Submit Modal */}
      <Modal visible={showSubmitModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Submit Test?</Text>
            <Text style={styles.modalMsg}>Are you sure you want to submit your answers?</Text>
            <View style={styles.modalBtnsRow}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#e2e8f0' }]} onPress={() => setShowSubmitModal(false)}>
                <Text style={[styles.modalBtnText, { color: BRAND_COLORS.gray }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: BRAND_COLORS.accent }]} onPress={handleSubmit}>
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Palette Modal */}
      <Modal visible={showPalette} transparent animationType="fade">
        <View style={styles.paletteModalBg}>
          <View style={styles.paletteModalCard}>
            <Text style={styles.paletteTitle}>Question Palette</Text>
            {(testType === 'combined' || testType === 'previous') ? (
              <View>
                {combinedSubjects.map((subj, subjIdx) => (
                  <View key={subj} style={{ marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold', color: '#3A7CA5', marginBottom: 2 }}>{subj}</Text>
                    <View style={[styles.paletteGrid, { marginBottom: 4 }]}> 
                      {combinedQuestionsBySubject[subj].map((question, idx) => {
                        const isAnswered = selected[question.id]?.length > 0;
                        const isMarked = markedRead[question.id];
                        let bgColor = '#e2e8f0';
                        if (isMarked) bgColor = '#3A7CA5';
                        else if (isAnswered) bgColor = '#10b981';
                        return (
                          <TouchableOpacity
                            key={question.id}
                            style={[styles.paletteNumber, { backgroundColor: bgColor }]}
                            onPress={() => {
                              setShowPalette(false);
                              setCombinedSubjectIndex(subjIdx);
                              setCombinedQuestionIndex(idx);
                            }}
                          >
                            <Text style={styles.paletteNumberText}>{idx + 1}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.paletteGrid}>
                {MOCK_QUESTIONS.map((question, idx) => {
                  const isAnswered = selected[question.id]?.length > 0;
                  const isMarked = markedRead[question.id];
                  let bgColor = '#e2e8f0';
                  if (isMarked) bgColor = '#3A7CA5';
                  else if (isAnswered) bgColor = '#10b981';
                  return (
                    <TouchableOpacity
                      key={question.id}
                      style={[styles.paletteNumber, { backgroundColor: bgColor }]}
                      onPress={() => {
                        setShowPalette(false);
                        // Find lesson and question index
                        const lessonIdx = lessonList.findIndex(l => l === question.lesson);
                        const qIdx = MOCK_QUESTIONS.filter(q => q.lesson === question.lesson).findIndex(q => q.id === question.id);
                        setCurrentLessonIndex(lessonIdx);
                        setCurrentQuestionIndex(qIdx);
                      }}
                    >
                      <Text style={styles.paletteNumberText}>{idx + 1}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            <View style={styles.paletteLegendRow}>
              <View style={[styles.paletteLegendDot, { backgroundColor: '#10b981' }]} /><Text style={styles.paletteLegendText}>Answered</Text>
              <View style={[styles.paletteLegendDot, { backgroundColor: '#3A7CA5' }]} /><Text style={styles.paletteLegendText}>Marked as Read</Text>
              <View style={[styles.paletteLegendDot, { backgroundColor: '#e2e8f0' }]} /><Text style={styles.paletteLegendText}>Not Answered</Text>
            </View>
            <TouchableOpacity style={styles.paletteCloseBtn} onPress={() => setShowPalette(false)}>
              <Text style={styles.paletteCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Exit Modal for Mock Test */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Exit Test?</Text>
            <Text style={styles.modalMsg}>Are you sure you want to exit? Your progress will be lost.</Text>
            <View style={styles.modalBtnsRow}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#e2e8f0' }]} onPress={() => setShowExitModal(false)}>
                <Text style={[styles.modalBtnText, { color: BRAND_COLORS.gray }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: BRAND_COLORS.accent }]} onPress={() => router.replace('/(tabs)/tests')}>
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Next Subject Modal for combined test */}
      {testType === 'combined' && (
        <Modal visible={showNextSubjectModal} transparent animationType="fade">
          <View style={styles.modalBg}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Subject Completed!</Text>
              <Text style={styles.modalMsg}>
                You have completed all questions for {currentLesson}. Ready to proceed to {combinedSubjects[combinedSubjectIndex + 1]}?
              </Text>
              <View style={styles.modalBtnsRow}>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#e2e8f0' }]} onPress={() => setShowNextSubjectModal(false)}>
                  <Text style={[styles.modalBtnText, { color: BRAND_COLORS.gray }]}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: BRAND_COLORS.accent }]} onPress={() => {
                  setShowNextSubjectModal(false);
                  setCombinedSubjectIndex(combinedSubjectIndex + 1);
                  setCombinedQuestionIndex(0);
                }}>
                  <Text style={[styles.modalBtnText, { color: '#fff' }]}>Next Subject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BRAND_COLORS.primary,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  backBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  timerText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 6,
  },
  paletteToggleBtn: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  paletteModalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paletteModalCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    width: 340,
    alignItems: 'center',
  },
  paletteTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#3A7CA5',
    marginBottom: 12,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  paletteNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteNumberText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  paletteLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paletteLegendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 4,
  },
  paletteLegendText: {
    fontSize: 13,
    color: '#64748b',
    marginRight: 12,
  },
  paletteCloseBtn: {
    marginTop: 8,
    backgroundColor: '#3A7CA5',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  paletteCloseBtnText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  questionScrollContainer: {
    flex: 1,
    marginHorizontal: 18,
    marginTop: 24,
    marginBottom: 8,
  },
  questionScrollContent: {
    paddingBottom: 20,
  },
  card: {
    // backgroundColor: '#fff',
    borderRadius: 18,
    padding: 26,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.10,
    // shadowRadius: 8,
    // elevation: 3,
    // minHeight: 400,
  },
  lessonTag: {
    backgroundColor: BRAND_COLORS.primary,
    color: '#fff',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: BRAND_COLORS.primary,
    fontFamily: 'Inter-Bold',
    marginBottom: 18,
  },
  optionsList: {
    marginBottom: 22,
    marginTop: 8,
  },
  optionBtn: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 60,
  },
  optionBtnSelected: {
    backgroundColor: BRAND_COLORS.accent,
    borderColor: BRAND_COLORS.accent,
  },
  optionText: {
    color: BRAND_COLORS.primary,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    flex: 1,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  optionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  markReadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 2,
  },
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  markReadActive: {
    backgroundColor: '#d1fae5',
  },
  markReadText: {
    color: BRAND_COLORS.gray,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
    fontSize: 15,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    marginTop: 8,
  },
  navBtn: {
    flex: 1,
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  navBtnDisabled: {
    backgroundColor: '#e2e8f0',
  },
  navBtnText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 17,
  },
  navBtnTextDisabled: {
    color: '#aaa',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: BRAND_COLORS.primary,
    marginBottom: 8,
  },
  modalMsg: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    fontFamily: 'Inter-Regular',
    marginBottom: 18,
    textAlign: 'center',
  },
  modalBtnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  modalBtnText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  lessonHeader: {
    fontSize: 16,
    color: BRAND_COLORS.accent,
    fontFamily: 'Inter-Bold',
    marginTop: 2,
    marginBottom: 2,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
  },
  optionImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}); 