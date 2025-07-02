import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FileText, Clock, Users, Trophy, ChevronRight, Play, ChartBar as BarChart3 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const SUBJECTS = ['Maths', 'Chemistry', 'Physics'];

export default function Tests() {
  const router = useRouter();

  // Mock Tests for each subject
  const mockTests = [
    {
      id: 'maths-mock-1',
      title: 'Maths Mock Test #1',
      subject: 'Maths',
      duration: '90 mins',
      questions: 30,
      attempted: false,
      difficulty: 'Medium',
      color: ['#667eea', '#764ba2'],
    },
    {
      id: 'chemistry-mock-1',
      title: 'Chemistry Mock Test #1',
      subject: 'Chemistry',
      duration: '90 mins',
      questions: 30,
      attempted: false,
      difficulty: 'Medium',
      color: ['#ff6b6b', '#ffa726'],
    },
    {
      id: 'physics-mock-1',
      title: 'Physics Mock Test #1',
      subject: 'Physics',
      duration: '90 mins',
      questions: 30,
      attempted: true,
      score: 24,
      difficulty: 'Easy',
      color: ['#10b981', '#059669'],
    },
  ];

  // Combined Test (All Subjects)
  const combinedTest = {
    id: 'combined-mock-1',
    title: 'Combined Mock Test (All Subjects)',
    subject: 'All',
    duration: '180 mins',
    questions: 90,
    attempted: false,
    difficulty: 'Hard',
    color: ['#3A7CA5', '#F4A261'],
  };

  // Previous Years' Papers
  const previousPapers = [
    {
      id: 'jee-2022',
      title: 'JEE Main 2022',
      subject: 'All',
      duration: '180 mins',
      questions: 90,
      attempted: false,
      year: 2022,
      color: ['#3A7CA5', '#10b981'],
    },
    {
      id: 'jee-2021',
      title: 'JEE Main 2021',
      subject: 'All',
      duration: '180 mins',
      questions: 90,
      attempted: false,
      year: 2021,
      color: ['#3A7CA5', '#F4A261'],
    },
    {
      id: 'jee-2020',
      title: 'JEE Main 2020',
      subject: 'All',
      duration: '180 mins',
      questions: 90,
      attempted: false,
      year: 2020,
      color: ['#3A7CA5', '#ff6b6b'],
    },
  ];

  // Test History (unchanged)
  const testHistory = [
    {
      title: 'JEE Main Mock Test #3',
      score: '78/90',
      percentage: 87,
      date: '2 days ago',
      rank: 234,
    },
    {
      title: 'Chemistry Subject Test',
      score: '25/30',
      percentage: 83,
      date: '5 days ago',
      rank: 156,
    },
    {
      title: 'Mathematics Practice',
      score: '22/30',
      percentage: 73,
      date: '1 week ago',
      rank: 445,
    },
  ];

  const stats = [
    { label: 'Tests Taken', value: '45', color: '#3A7CA5' },
    { label: 'Best Score', value: '92%', color: 'rgba(58, 124, 165, 0.7)' },
    { label: 'Avg Rank', value: '156', color: 'rgba(58, 124, 165, 0.5)' },
    { label: 'Study Hours', value: '124h', color: 'rgba(58, 124, 165, 0.3)' },
  ];

  // Helper to navigate to instructions
  const goToInstructions = (test: any) => {
    router.push({
      pathname: '/test/instructions',
      params: {
        subject: test.subject,
        testType: test.year ? 'previous' : (test.subject === 'All' ? 'combined' : 'mock'),
        testId: test.id,
      },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Mock Tests</Text>
        <Text style={styles.subtitle}>Practice with real exam patterns</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Stats</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mock Tests by Subject */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mock Tests by Subject</Text>
          {mockTests.map((test, index) => (
            <TouchableOpacity key={index} style={styles.testCard} onPress={() => goToInstructions(test)}>
              <View style={styles.testContent}>
                <View style={styles.testLeft}>
                  <FileText size={32} color="#ffffff" />
                  <View style={styles.testInfo}>
                    <Text style={styles.testTitle}>{test.title}</Text>
                    <View style={styles.testDetails}>
                      <View style={styles.detailItem}>
                        <Clock size={14} color="rgba(255, 255, 255, 0.8)" />
                        <Text style={styles.detailText}>{test.duration}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <FileText size={14} color="rgba(255, 255, 255, 0.8)" />
                        <Text style={styles.detailText}>{test.questions} Questions</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <BarChart3 size={14} color="rgba(255, 255, 255, 0.8)" />
                        <Text style={styles.detailText}>{test.difficulty}</Text>
                      </View>
                    </View>
                    {test.attempted && (
                      <Text style={styles.scoreText}>Score: {test.score}/30</Text>
                    )}
                  </View>
                </View>
                <View style={styles.testRight}>
                  <View style={styles.retakeButton}>
                    <Text style={styles.retakeText}>{test.attempted ? 'Retake' : 'Start'}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Combined Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Combined Test (All Subjects)</Text>
          <TouchableOpacity style={styles.testCard} onPress={() => goToInstructions(combinedTest)}>
            <View style={styles.testContent}>
              <View style={styles.testLeft}>
                <FileText size={32} color="#ffffff" />
                <View style={styles.testInfo}>
                  <Text style={styles.testTitle}>{combinedTest.title}</Text>
                  <View style={styles.testDetails}>
                    <View style={styles.detailItem}>
                      <Clock size={14} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.detailText}>{combinedTest.duration}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <FileText size={14} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.detailText}>{combinedTest.questions} Questions</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <BarChart3 size={14} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.detailText}>{combinedTest.difficulty}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.testRight}>
                <View style={styles.retakeButton}>
                  <Text style={styles.retakeText}>Start</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Previous Years' Papers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Years' Papers</Text>
          {previousPapers.map((test, index) => (
            <TouchableOpacity key={index} style={styles.testCard} onPress={() => goToInstructions(test)}>
              <View style={styles.testContent}>
                <View style={styles.testLeft}>
                  <FileText size={32} color="#ffffff" />
                  <View style={styles.testInfo}>
                    <Text style={styles.testTitle}>{test.title}</Text>
                    <View style={styles.testDetails}>
                      <View style={styles.detailItem}>
                        <Clock size={14} color="rgba(255, 255, 255, 0.8)" />
                        <Text style={styles.detailText}>{test.duration}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <FileText size={14} color="rgba(255, 255, 255, 0.8)" />
                        <Text style={styles.detailText}>{test.questions} Questions</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <BarChart3 size={14} color="rgba(255, 255, 255, 0.8)" />
                        <Text style={styles.detailText}>Previous Year</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.testRight}>
                  <View style={styles.retakeButton}>
                    <Text style={styles.retakeText}>Start</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Test History (unchanged) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Test History</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {testHistory.map((test, index) => (
            <TouchableOpacity key={index} style={styles.historyCard}>
              <View style={styles.historyContent}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historyTitle}>{test.title}</Text>
                  <Text style={styles.historyDate}>{test.date}</Text>
                  <View style={styles.historyProgress}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${test.percentage}%`,
                            backgroundColor: '#3A7CA5'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.percentageText}>{test.percentage}%</Text>
                  </View>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyScore}>{test.score}</Text>
                  <View style={styles.historyRank}>
                    <Trophy size={16} color="#3A7CA5" />
                    <Text style={styles.rankText}>#{test.rank}</Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createTestButton}>
          <View style={styles.createTestGradient}>
            <Text style={styles.createTestText}>Create Custom Test</Text>
          </View>
        </TouchableOpacity>
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

    color: '#1e293b',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
  
    color: '#3A7CA5',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: (width - 72) / 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,

  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  testCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#3A7CA5',
    paddingVertical : 10,
    paddingHorizontal: 16,
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
  testInfo: {
    marginLeft: 16,
    flex: 1,
  },
  testTitle: {
    fontSize: 18,

    color: '#ffffff',
    marginBottom: 8,
  },
  testDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,

    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  scoreText: {
    fontSize: 14,

    color: '#ffffff',
    marginTop: 8,
  },
  testRight: {
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retakeText: {
    fontSize: 12,

    color: '#ffffff',
  },
  historyCard: {
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
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLeft: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,

    color: '#1e293b',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,

    color: '#64748b',
    marginBottom: 8,
  },
  historyProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
    flex: 1,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#3A7CA5',
  },
  percentageText: {
    fontSize: 12,

    color: '#1e293b',
    minWidth: 35,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyScore: {
    fontSize: 16,

    color: '#10b981',
    marginBottom: 4,
  },
  historyRank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankText: {
    fontSize: 12,

    color: '#ffa726',
    marginLeft: 4,
  },
  createTestButton: {
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  createTestGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#3A7CA5',
  },
  createTestText: {
    fontSize: 18,

    color: '#ffffff',
  },
});