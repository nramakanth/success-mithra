import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BookOpen, Target, Zap, ChevronRight, Clock, Users } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Practice() {
  const router = useRouter();

  const practiceTypes = [
    {
      title: 'Chapter Practice',
      description: '10 questions per chapter',
      icon: BookOpen,
      color: ['#667eea', '#764ba2'],
      questions: '10 Questions',
      time: '20 mins',
    },
    {
      title: 'Subject Practice',
      description: '30 questions per subject',
      icon: Target,
      color: ['#ff6b6b', '#ffa726'],
      questions: '30 Questions',
      time: '60 mins',
    },
    {
      title: 'Full Practice',
      description: '90 questions - Mixed subjects',
      icon: Zap,
      color: ['#10b981', '#059669'],
      questions: '90 Questions',
      time: '180 mins',
    },
  ];

  const subjects = [
    { name: 'Physics', chapters: 24, completed: 18, color: '#667eea' },
    { name: 'Chemistry', chapters: 22, completed: 15, color: '#ff6b6b' },
    { name: 'Mathematics', chapters: 20, completed: 12, color: '#10b981' },
  ];

  const recentChapters = [
    { subject: 'Physics', chapter: 'Mechanics', progress: 85, questions: '45/50' },
    { subject: 'Chemistry', chapter: 'Organic Chemistry', progress: 60, questions: '30/50' },
    { subject: 'Mathematics', chapter: 'Calculus', progress: 92, questions: '46/50' },
    { subject: 'Physics', chapter: 'Thermodynamics', progress: 40, questions: '20/50' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Hub</Text>
        <Text style={styles.subtitle}>Choose your practice mode</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Modes</Text>
          {practiceTypes.map((type, index) => (
            <TouchableOpacity key={index} style={styles.practiceCard}>
              <View style={[styles.practiceGradient, { backgroundColor: '#F4A261' }]}>
                <View style={styles.practiceContent}>
                  <View style={styles.practiceLeft}>
                    <type.icon size={32} color="#1e293b" />
                    <View style={styles.practiceInfo}>
                      <Text style={[styles.practiceTitle, { color: '#1e293b' }]}>{type.title}</Text>
                      <Text style={[styles.practiceDescription, { color: '#1e293b' }]}>{type.description}</Text>
                      <View style={styles.practiceDetails}>
                        <View style={styles.detailItem}>
                          <Clock size={14} color="rgba(255,255,255,0.8)" />
                          <Text style={styles.detailText}>{type.time}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <BookOpen size={14} color="rgba(255,255,255,0.8)" />
                          <Text style={styles.detailText}>{type.questions}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <ChevronRight size={24} color="rgba(255,255,255,0.8)" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Progress</Text>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject, index) => (
              <TouchableOpacity key={index} style={styles.subjectCard}>
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
            <TouchableOpacity key={index} style={styles.chapterCard}>
              <View style={styles.chapterContent}>
                <View style={styles.chapterLeft}>
                  <Text style={styles.chapterSubject}>{chapter.subject}</Text>
                  <Text style={styles.chapterName}>{chapter.chapter}</Text>
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
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  practiceCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  practiceGradient: {
    padding: 20,
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
    marginLeft: 16,
    flex: 1,
  },
  practiceTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  practiceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  practiceDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
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
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Medium',
    color: '#667eea',
    marginBottom: 4,
  },
  chapterName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
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
    fontFamily: 'Inter-Bold',
    color: '#10b981',
    marginBottom: 4,
  },
});