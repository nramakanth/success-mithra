import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BookOpen, Target, TrendingUp, Award, Clock, Users, Trophy, ChevronRight, FileText, Play, Star, Calendar, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#3A7CA5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  username: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    right: 20,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
    zIndex: 1,
  },
  notificationIcon: {
    fontSize: 24,
  },
  statsScrollView: {
    marginHorizontal: -24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  statCard: {
    width: 120,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  section: {
    // marginBottom: 32,
    // marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    // fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#1e293b',
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  testCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testGradient: {
    padding: 20,
  },
  testContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  testIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  testInfo: {
    flex: 1,
  },
  testTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  testDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testDetail: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: 8,
  },
  startButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  streakCount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  streakSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  streakBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  streakDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDay: {
    alignItems: 'center',
  },
  streakDayText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  streakDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 14,
    color: '#ffffff',
  },
  practiceCardModern: {
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  practiceImageModern: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: '#f0f4ff',
  },
  practiceInfoModern: {
    flex: 1,
    justifyContent: 'center',
  },
  practiceSubjectModern: {
    fontSize: 13,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  practiceChapterModern: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#222',
    marginBottom: 2,
  },
  practiceQuestionsModern: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Inter-Regular',
    marginBottom: 6,
  },
  progressContainerModern: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  progressBarModern: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFillModern: {
    height: '100%',
    borderRadius: 3,
  },
  progressTextModern: {
    fontSize: 12,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    minWidth: 32,
    textAlign: 'right',
  },
  practiceButtonModern: {
    backgroundColor: '#F4A261',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 12,
    alignSelf: 'flex-end',
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 1,
  },
  practiceButtonTextModern: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  quickActionsModern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionModern: {
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 48) / 2,
    marginBottom: 12,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTextModern: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#222',
    textAlign: 'center',
  },
  mentorsScroll: {
    marginTop: 8,
  },
  mentorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 2,
  },
  mentorImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  stickyUserInfoBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#3A7CA5',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  mockTestsList: {
    marginTop: 8,
  },
  mockTestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
    padding: 14,
  },
  mockTestIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F8FB',
    marginRight: 16,
  },
  mockTestInfo: {
    flex: 1,
  },
  mockTestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  mockTestDetails: {
    fontSize: 13,
    color: '#888',
  },
  mockTestButton: {
    backgroundColor: '#F4A261',
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginLeft: 12,
  },
  mockTestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 48) / 2,
    marginBottom: 16,
    paddingVertical: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    // height: 100,
  },
  quickActionIconCircleGrid: {
    width: 45,
    height: 45,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 14,
  },
  quickActionCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  quickActionsGridRedesigned: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 4,
  },
  quickActionCardRedesigned: {
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    paddingVertical: 22,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 0,
  },
  quickActionCardPressed: {
    backgroundColor: '#F6F8FB',
  },
  quickActionCardTextRedesigned: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    // textAlign: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  quickActionCardSubtitle: {
    fontSize: 13,
    color: '#888',
    // textAlign: 'center',
  },
  quickActionsGridRedesignedRow: {
    // gap: 4,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  quickActionTextAreaRedesigned: {
    flex: 1,
    marginLeft: 14,
    // justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default function Home() {
  const router = useRouter();

  const stats = [
    { icon: BookOpen, label: 'Questions Solved', value: '1,234', color: '#667eea', bgColor: '#f0f4ff' },
    { icon: Trophy, label: 'Tests Completed', value: '45', color: '#ff6b6b', bgColor: '#fff0f0' },
    { icon: TrendingUp, label: 'Accuracy', value: '78%', color: '#10b981', bgColor: '#f0fdf4' },
    { icon: Clock, label: 'Study Time', value: '124h', color: '#f59e0b', bgColor: '#fffbeb' },
  ];

  const todaysTests = [
    {
      title: 'Physics Mock Test',
      questions: 30,
      duration: '45 mins',
      difficulty: 'Medium',
      color: '#3A7CA5',
      icon: '⚡',
    },
    {
      title: 'Chemistry Practice',
      questions: 25,
      duration: '30 mins',
      difficulty: 'Easy',
      color: '#3A7CA5',
      icon: '🧪',
    },
  ];

  const streakData = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  const recommendedPractice = [
    {
      subject: 'Physics',
      chapter: 'Mechanics',
      progress: 65,
      questions: 45,
      color: '#3A7CA5',
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      progress: 40,
      questions: 38,
      color: '#3A7CA5',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      subject: 'Mathematics',
      chapter: 'Calculus',
      progress: 85,
      questions: 52,
      color: '#3A7CA5',
      image: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  // Add handleClick for quick actions
  const handleClick = (action: string) => {
    switch (action) {
      case 'mocktest':
        router.push('/mocktest');
        break;
      case 'answers':
        router.push('/answers');
        break;
      case 'analytics':
        router.push('/analytics');
        break;
      case 'leaderboard':
        router.push('/leaderboard');
        break;
      default:
        break;
    }
  };

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky User Info Bar */}
      <View style={styles.stickyUserInfoBar}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AK</Text>
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Good Morning! 🌅</Text>
              <Text style={styles.username}>Arjun Kumar</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            <View style={styles.notificationDot} />
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Main Scrollable Content */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 90 }}>
        {/* Header with Primary Color (stats cards and rest of header) */}
        <View style={styles.header}>
          {/* Stats Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsScrollView}
            contentContainerStyle={styles.statsContainer}
          >
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { backgroundColor: stat.bgColor }]}> 
                <View style={[styles.statIconContainer, { backgroundColor: stat.color }]}> 
                  <stat.icon size={20} color="#ffffff" />
                </View>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.content}>
          {/* Today's Tests */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Tests 🎯</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            {todaysTests.map((test, index) => (
              <TouchableOpacity key={index} style={styles.testCard}>
                <View style={[styles.testGradient, { backgroundColor: test.color }]}> 
                  <View style={styles.testContent}>
                    <View style={styles.testLeft}>
                      <Text style={styles.testIcon}>{test.icon}</Text>
                      <View style={styles.testInfo}>
                        <Text style={styles.testTitle}>{test.title}</Text>
                        <View style={styles.testDetails}>
                          <Text style={styles.testDetail}>{test.questions} Questions</Text>
                          <Text style={styles.testDetail}>•</Text>
                          <Text style={styles.testDetail}>{test.duration}</Text>
                          <Text style={styles.testDetail}>•</Text>
                          <Text style={styles.testDetail}>{test.difficulty}</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={[styles.startButton, { backgroundColor: '#F4A261' }]}> 
                      <Play size={16} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Daily Streak */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Streak 🔥</Text>
            <View style={styles.streakCard}>
              <View style={styles.streakHeader}>
                <View>
                  <Text style={styles.streakCount}>3 Days</Text>
                  <Text style={styles.streakSubtext}>Current Streak</Text>
                </View>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakBadgeText}>🏆 Keep Going!</Text>
                </View>
              </View>
              <View style={styles.streakDays}>
                {streakData.map((day, index) => (
                  <View key={index} style={styles.streakDay}>
                    <Text style={
                      [styles.streakDayText, { color: day.completed ? '#10b981' : '#94a3b8' }]
                    }>
                      {day.day}
                    </Text>
                    <View style={
                      [styles.streakDot, { backgroundColor: day.completed ? '#10b981' : '#e2e8f0', transform: [{ scale: day.completed ? 1.2 : 1 }] }]
                    }>
                      {day.completed && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Mock Tests & Practice */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mock Tests & Practice</Text>
            <View style={styles.mockTestsList}>
              {todaysTests.map((test, index) => (
                <View key={index} style={styles.mockTestCard}>
                  <View style={styles.mockTestIconCircle}>
                    <Play size={22} color="#3A7CA5" />
                  </View>
                  <View style={styles.mockTestInfo}>
                    <Text style={styles.mockTestTitle}>{test.title}</Text>
                    <Text style={styles.mockTestDetails}>{test.questions} Questions • {test.duration} • {test.difficulty}</Text>
                  </View>
                  <TouchableOpacity style={styles.mockTestButton}>
                    <Text style={styles.mockTestButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions ⚡</Text>
            <View style={styles.quickActionsGridRedesignedRow}>
              <View style={styles.quickActionsRow}>
                <TouchableOpacity
                  style={styles.quickActionCardRedesigned}
                  activeOpacity={0.85}
                  onPress={() => handleClick('mocktest')}
                >
                  <View style={[styles.quickActionIconCircleGrid, { backgroundColor: '#3A7CA5' }]}> 
                    <FileText size={28} color="#fff" />
                  </View>
                  <View style={styles.quickActionTextAreaRedesigned}>
                    <Text style={styles.quickActionCardTextRedesigned}>Mock Test</Text>
                    <Text style={styles.quickActionCardSubtitle}>Take a new mock test</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickActionCardRedesigned}
                  activeOpacity={0.85}
                  onPress={() => handleClick('answers')}
                >
                  <View style={[styles.quickActionIconCircleGrid, { backgroundColor: '#F4A261' }]}> 
                    <BookOpen size={28} color="#fff" />
                  </View>
                  <View style={styles.quickActionTextAreaRedesigned}>
                    <Text style={styles.quickActionCardTextRedesigned}>Answers</Text>
                    <Text style={styles.quickActionCardSubtitle}>Review your answers</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.quickActionsRow}>
                <TouchableOpacity
                  style={styles.quickActionCardRedesigned}
                  activeOpacity={0.85}
                  onPress={() => handleClick('analytics')}
                >
                  <View style={[styles.quickActionIconCircleGrid, { backgroundColor: '#3A7CA5' }]}> 
                    <TrendingUp size={28} color="#fff" />
                  </View>
                  <View style={styles.quickActionTextAreaRedesigned}>
                    <Text style={styles.quickActionCardTextRedesigned}>Analytics</Text>
                    <Text style={styles.quickActionCardSubtitle}>Track your progress</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickActionCardRedesigned}
                  activeOpacity={0.85}
                  onPress={() => handleClick('leaderboard')}
                >
                  <View style={[styles.quickActionIconCircleGrid, { backgroundColor: '#F4A261' }]}> 
                    <Trophy size={28} color="#fff" />
                  </View>
                  <View style={styles.quickActionTextAreaRedesigned}>
                    <Text style={styles.quickActionCardTextRedesigned}>Leaderboard</Text>
                    <Text style={styles.quickActionCardSubtitle}>See your rank</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}