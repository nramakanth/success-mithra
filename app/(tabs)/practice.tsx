import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Target, Zap, ChevronRight, Clock, Users, RefreshCcw } from 'lucide-react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

export default function Practice() {
  const router = useRouter();

  const [selectedExam, setSelectedExam] = useState<'JEE' | 'EMCET'>('JEE');

  // Theme and data for JEE
  const jeeTheme = {
    backgroundColor: '#f8fafc',
    accent: '#667eea',
    header: '#3A7CA5',
    gradient: ['#3A7CA5', '#1e5a85'],
  };
  const jeePracticeTypes = [
    {
      title: 'Physics Test',
      description: 'Practice Physics questions',
      icon: BookOpen,
      color: ['#3A7CA5', '#1e5a85'],
      questions: '10 questions per lesson',
      time: '90 min',
      subject: 'Physics',
    },
    {
      title: 'Mathematics Test',
      description: 'Practice Mathematics questions',
      icon: Zap,
      color: ['#10b981', '#059669'],
      questions: '10 questions per lesson',
      time: '90 min',
      subject: 'Mathematics',
    },
    {
      title: 'Chemistry Test',
      description: 'Practice Chemistry questions',
      icon: Target,
      color: ['#F4A261', '#e76f51'],
      questions: '10 questions per lesson',
      time: '90 min',
      subject: 'Chemistry',
    },
  ];
  const jeeSubjects = [
    { name: 'Physics', chapters: 24, completed: 18, color: '#667eea' },
    { name: 'Chemistry', chapters: 22, completed: 15, color: '#ff6b6b' },
    { name: 'Mathematics', chapters: 20, completed: 12, color: '#10b981' },
  ];
  const jeeRecentChapters = [
    { subject: 'Physics', chapter: 'Mechanics', progress: 85, questions: '45/50', timesPracticed: 3 },
    { subject: 'Chemistry', chapter: 'Organic Chemistry', progress: 60, questions: '30/50', timesPracticed: 2 },
    { subject: 'Mathematics', chapter: 'Calculus', progress: 92, questions: '46/50', timesPracticed: 5 },
    { subject: 'Physics', chapter: 'Thermodynamics', progress: 40, questions: '20/50', timesPracticed: 1 },
  ];

  // Theme and data for EMCET
  const emcetTheme = {
    backgroundColor: '#f8fafc',
    accent: '#3A7CA5',
    header: '#1e5a85',
    gradient: ['#3A7CA5', '#1e5a85'],
  };
  const emcetPracticeTypes = [
    {
      title: 'Botany Test',
      description: 'Practice Botany questions',
      icon: BookOpen,
      color: ['#3A7CA5', '#F4A261'],
      questions: '10 questions per lesson',
      time: '60 min',
      subject: 'Botany',
    },
    {
      title: 'Zoology Test',
      description: 'Practice Zoology questions',
      icon: Users,
      color: ['#1e5a85', '#e76f51'],
      questions: '10 questions per lesson',
      time: '60 min',
      subject: 'Zoology',
    },
    {
      title: 'Physics Test',
      description: 'Practice Physics questions',
      icon: BookOpen,
      color: ['#667eea', '#3A7CA5'],
      questions: '10 questions per lesson',
      time: '60 min',
      subject: 'Physics',
    },
    {
      title: 'Chemistry Test',
      description: 'Practice Chemistry questions',
      icon: Target,
      color: ['#F4A261', '#e76f51'],
      questions: '10 questions per lesson',
      time: '60 min',
      subject: 'Chemistry',
    },
    {
      title: 'Mathematics Test',
      description: 'Practice Mathematics questions',
      icon: Zap,
      color: ['#3A7CA5', '#667eea'],
      questions: '10 questions per lesson',
      time: '60 min',
      subject: 'Mathematics',
    },
  ];
  const emcetSubjects = [
    { name: 'Botany', chapters: 18, completed: 10, color: '#3A7CA5' },
    { name: 'Zoology', chapters: 16, completed: 8, color: '#e76f51' },
    { name: 'Physics', chapters: 20, completed: 12, color: '#667eea' },
    { name: 'Chemistry', chapters: 18, completed: 9, color: '#F4A261' },
    { name: 'Mathematics', chapters: 15, completed: 7, color: '#1e5a85' },
  ];
  const emcetRecentChapters = [
    { subject: 'Botany', chapter: 'Plant Physiology', progress: 70, questions: '35/50', timesPracticed: 2 },
    { subject: 'Zoology', chapter: 'Human Physiology', progress: 55, questions: '28/50', timesPracticed: 1 },
    { subject: 'Physics', chapter: 'Waves', progress: 80, questions: '40/50', timesPracticed: 3 },
    { subject: 'Chemistry', chapter: 'Inorganic Chemistry', progress: 60, questions: '30/50', timesPracticed: 2 },
    { subject: 'Mathematics', chapter: 'Algebra', progress: 50, questions: '25/50', timesPracticed: 1 },
  ];

  // Select theme and data based on exam
  const theme = selectedExam === 'JEE' ? jeeTheme : emcetTheme;
  const practiceTypes = selectedExam === 'JEE' ? jeePracticeTypes : emcetPracticeTypes;
  const subjects = selectedExam === 'JEE' ? jeeSubjects : emcetSubjects;
  const recentChapters = selectedExam === 'JEE' ? jeeRecentChapters : emcetRecentChapters;
  const headerTitle = selectedExam === 'JEE' ? 'JEE Practice Hub' : 'EMCET Practice Hub';
  const headerSubtitle = selectedExam === 'JEE' ? 'Choose your JEE practice mode' : 'Choose your EMCET practice mode';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: theme.header }]}> 
        <Text style={[styles.title, { color: '#fff' }]}>{headerTitle}</Text>
        <Text style={[styles.subtitle, { color: '#e0e7ef' }]}>{headerSubtitle}</Text>
      </View>

      {/* Exam Toggle */}
      <View style={[styles.examToggleContainer, { backgroundColor: theme.accent + '22' }]}> {/* 22 for light accent */}
        <TouchableOpacity
          style={[styles.examToggleButton, selectedExam === 'JEE' && { backgroundColor: jeeTheme.accent }]}
          onPress={() => setSelectedExam('JEE')}
          activeOpacity={0.85}
        >
          <Text style={[styles.examToggleText, selectedExam === 'JEE' && styles.examToggleTextActive]}>JEE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.examToggleButton, selectedExam === 'EMCET' && { backgroundColor: emcetTheme.accent }]}
          onPress={() => setSelectedExam('EMCET')}
          activeOpacity={0.85}
        >
          <Text style={[styles.examToggleText, selectedExam === 'EMCET' && styles.examToggleTextActive]}>EMCET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>Practice Modes</Text> */}
          {practiceTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.practiceCard, { backgroundColor: type.color[0] }]}
              activeOpacity={0.93}
              onPress={() => {
                router.push(`/practice/lesson-select?subject=${type.subject}`);
              }}
            >
              <View style={styles.practiceContent}>
                <View style={styles.practiceLeft}>
                  <View style={[styles.practiceIconCircle, { backgroundColor: 'rgba(255,255,255,0.95)' }]}> 
                    <type.icon size={22} color={type.color[0]} />
                  </View>
                  <View style={styles.practiceInfo}>
                    <Text style={[styles.practiceTitle, { color: '#fff' }]}>{type.title}</Text>
                    <Text style={[styles.practiceDescription, { color: 'rgba(255,255,255,0.92)' }]}>{type.description}</Text>
                    <View style={styles.practiceDetails}>
                      <View style={styles.detailItem}>
                        <Clock size={16} color="#fff" />
                        <Text style={styles.detailText}>{type.time}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <BookOpen size={16} color="#fff" />
                        <Text style={styles.detailText}>{type.questions}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.chevronCircle}>
                  <ChevronRight size={16} color={type.color[0]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Progress</Text>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subjectCard}
                onPress={() => router.push({
                  pathname: '/practice/chapter-details',
                  params: { subject: subject.name },
                })}
              >
                <View style={[styles.subjectHeader, { backgroundColor: subject.color }]}> 
                  <Text style={styles.subjectName}>{subject.name}</Text>
                </View>
                <View style={styles.subjectBody}>
                  <View style={styles.subjectProgress}>
                    <Text style={styles.progressText}>
                      {subject.completed}/{subject.chapters} Chapters
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${(subject.completed / subject.chapters) * 100}%`,
                            backgroundColor: subject.color
                          }
                        ]} 
                      />
                    </View>
                  </View>
                  <Text style={styles.completionText}>
                    {Math.round((subject.completed / subject.chapters) * 100)}% Complete
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Chapters</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentChapters.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chapterCard}
              onPress={() => router.push({
                pathname: '/practice/chapter-details',
                params: { subject: chapter.subject, chapter: chapter.chapter },
              })}
            >
              <View style={styles.chapterContent}>
                <View style={styles.chapterLeft}>
                  <Text style={styles.chapterSubject}>{chapter.subject}</Text>
                  <Text style={styles.chapterName}>{chapter.chapter}</Text>
                  <View style={styles.timesPracticedRow}>
                    <RefreshCcw size={14} color="#64748b" />
                    <Text style={styles.timesPracticedText}>
                      Practiced {chapter.timesPracticed} {chapter.timesPracticed === 1 ? 'time' : 'times'}
                    </Text>
                  </View>
                  <View style={styles.chapterProgress}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${chapter.progress}%`,
                            backgroundColor: '#667eea'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{chapter.progress}%</Text>
                  </View>
                </View>
                <View style={styles.chapterRight}>
                  <Text style={styles.chapterQuestions}>{chapter.questions}</Text>
                  <ChevronRight size={20} color="#94a3b8" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor set dynamically
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    // backgroundColor set dynamically
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 24,
  },
  section: {
    // marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
     
    color: '#1e293b',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
     
    color: '#667eea',
  },
  practiceCard: {
    marginBottom: 14,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    minHeight: 72,
    borderWidth: 0,
    padding: 16,
  },
  practiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  practiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  practiceInfo: {
    marginLeft: 10,
    flex: 1,
  },
  practiceTitle: {
    fontSize: 18,  
    color: '#fff',
    marginBottom: 2,
  },
  practiceDescription: {
    fontSize: 13,
     
    color: 'rgba(255,255,255,0.92)',
    marginTop: 2,
    marginBottom: 6,
  },
  practiceDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 12,
    
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 6,
  },
  subjectsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  subjectCard: {
    width: (width - 72) / 3,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  subjectHeader: {
    padding: 16,
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 14,
     
    color: '#ffffff',
  },
  subjectBody: {
    padding: 16,
  },
  subjectProgress: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  completionText: {
    fontSize: 12,
     
    color: '#1e293b',
    textAlign: 'center',
  },
  chapterCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chapterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterLeft: {
    flex: 1,
  },
  chapterSubject: {
    fontSize: 12,
     
    color: '#667eea',
    marginBottom: 4,
  },
  chapterName: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 4,
  },
  timesPracticedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timesPracticedText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  chapterProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterRight: {
    alignItems: 'flex-end',
  },
  chapterQuestions: {
    fontSize: 14,
     
    color: '#10b981',
    marginBottom: 4,
  },
  practiceIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  examToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: 24,
    marginHorizontal: 24,
    marginBottom: 18,
    padding: 4,
  },
  examToggleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  examToggleButtonActive: {
    backgroundColor: '#667eea',
  },
  examToggleText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
  },
  examToggleTextActive: {
    color: '#fff',
  },
});