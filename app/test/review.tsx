import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { CheckCircle, XCircle, Play, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Sample images for questions and options
const SAMPLE_IMAGES = [
  'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&w=400',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Right_triangle.svg/1200px-Right_triangle.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Equilateral-triangle.svg/1200px-Equilateral-triangle.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Isosceles-triangle.svg/1200px-Isosceles-triangle.svg.png',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=400',
];

function randomImage() {
  return SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)];
}

function generateMockQuestions(lessons: string[], subject: string): any[] {
  let questions: any[] = [];
  lessons.forEach((lesson) => {
    for (let i = 1; i <= 10; i++) {
      // Randomly decide if this question or its options have images
      const hasQImage = Math.random() < 0.4;
      const hasOptImages = Math.random() < 0.4;
      questions.push({
        id: `${lesson}-${i}`,
        lesson,
        subject,
        question: `Lesson: ${lesson}, Q${i}`,
        image: hasQImage ? randomImage() : null,
        options: [0, 1, 2, 3].map((idx) => ({
          text: hasOptImages ? '' : `Option ${String.fromCharCode(65 + idx)}`,
          image: hasOptImages ? randomImage() : null,
          isCorrect: i % 4 === idx,
        })),
        explanation: `This is the explanation for Lesson: ${lesson}, Q${i}. The correct answer is Option ${String.fromCharCode(65 + (i % 4))}.`,
        video: 'https://www.youtube.com/embed/2eVRsF4dQyQ',
        multiple: false,
      });
    }
  });
  return questions;
}

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

export default function Review() {
  const router = useRouter();
  const { answers, lessons: lessonsParam } = useLocalSearchParams();
  let parsedAnswers = answers ? JSON.parse(answers as string) : {};
  
  // Parse lessons
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
  const safeSubject = typeof lessonsParam === 'string' ? 'Physics' : 'Physics';
  const MOCK_QUESTIONS = generateMockQuestions(lessonList, safeSubject);
  
  const [selectedLesson, setSelectedLesson] = useState<string>(lessonList.length > 0 ? lessonList[0] : '');
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<'text' | 'video'>('text');

  // Get questions for the selected lesson
  const questions = lessonList.length > 0
    ? MOCK_QUESTIONS.filter(q => q.lesson === selectedLesson)
    : MOCK_QUESTIONS;
  const q = questions[current];
  const userAns = parsedAnswers[q.id] || [];
  const correctAns = q.options.map((o: any, i: number) => o.isCorrect ? i : null).filter((i: number) => i !== null);
  const isCorrect = userAns.length === correctAns.length && userAns.every((v: number) => correctAns.includes(v));

  // Reset question index when lesson changes
  React.useEffect(() => {
    setCurrent(0);
  }, [selectedLesson]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#3A7CA5', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}> 
        <Text style={styles.headerTitle}>Review Answers</Text>
        <TouchableOpacity style={styles.exitBtn} onPress={() => router.replace('/practice')}>
        <LogOut size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {lessonList.length > 1 && (
          <View style={styles.subjectTabs}>
            {lessonList.map((lesson) => (
              <TouchableOpacity
                key={lesson}
                style={[styles.subjectTab, selectedLesson === lesson && styles.subjectTabActive]}
                onPress={() => setSelectedLesson(lesson)}
              >
                <Text style={[styles.subjectTabText, selectedLesson === lesson && styles.subjectTabTextActive]}>{lesson}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={styles.qNo}>Q{current + 1} of {questions.length}</Text>
        {q.image && <Image source={{ uri: q.image }} style={styles.qImage} resizeMode="contain" />}
        <Text style={styles.qText}>{q.question}</Text>
        <View style={styles.optionsBox}>
          {q.options.map((opt: any, i: number) => {
            const isUser = userAns.includes(i);
            const isRight = opt.isCorrect;
            return (
              <View
                key={i}
                style={[
                  styles.option,
                  isUser && isRight ? styles.optionCorrect : {},
                  isUser && !isRight ? styles.optionWrong : {},
                  !isUser && isRight ? styles.optionHighlight : {},
                ]}
              >
                {opt.image ? (
                  <Image source={{ uri: opt.image }} style={styles.optionImage} resizeMode="contain" />
                ) : null}
                <Text style={styles.optionText}>{opt.text}</Text>
                {isUser && isRight && <CheckCircle size={18} color="#10b981" style={{ marginLeft: 8 }} />}
                {isUser && !isRight && <XCircle size={18} color="#ef4444" style={{ marginLeft: 8 }} />}
              </View>
            );
          })}
        </View>
        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.tabBtn, tab === 'text' && styles.tabBtnActive]} onPress={() => setTab('text')}>
            <Text style={[styles.tabBtnText, tab === 'text' && styles.tabBtnTextActive]}>Text Explanation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabBtn, tab === 'video' && styles.tabBtnActive]} onPress={() => setTab('video')}>
            <Text style={[styles.tabBtnText, tab === 'video' && styles.tabBtnTextActive]}>Video Explanation</Text>
          </TouchableOpacity>
        </View>
        {tab === 'text' ? (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>{q.explanation}</Text>
          </View>
        ) : (
          <View style={styles.explanationBox}>
            <View style={styles.videoPlaceholder}>
              <Play size={40} color="#3A7CA5" />
              <Text style={styles.videoText}>Video explanation coming soon</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: '#F4A261', opacity: current === 0 ? 0.5 : 1 }]}
          onPress={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          <Text style={styles.navBtnText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: '#F4A261', opacity: current === questions.length - 1 ? 0.5 : 1 }]}
          onPress={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
          disabled={current === questions.length - 1}
        >
          <Text style={styles.navBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  exitBtn: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  content: { flex: 1, padding: 24 },
  qNo: {
    fontSize: 14,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  qImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  qText: {
    fontSize: 16,
    color: '#1e293b',
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  optionsBox: { marginBottom: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: {
    backgroundColor: '#e0f7ef',
    borderColor: '#10b981',
  },
  optionWrong: {
    backgroundColor: '#ffeaea',
    borderColor: '#ef4444',
  },
  optionHighlight: {
    borderColor: '#f59e0b',
  },
  optionText: {
    fontSize: 15,
    color: '#222',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  optionImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
  },
  tabRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#fff',
  },
  tabBtnText: {
    color: '#64748b',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  tabBtnTextActive: {
    color: '#3A7CA5',
  },
  explanationBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  explanationText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  videoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  videoText: {
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  navBtn: {
    backgroundColor: '#F4A261',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  navBtnText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  subjectTabs: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  subjectTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  subjectTabActive: {
    backgroundColor: '#fff',
  },
  subjectTabText: {
    color: '#64748b',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  subjectTabTextActive: {
    color: '#3A7CA5',
  },
}); 