import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Clock, FileText, AlertCircle, CheckCircle, Play } from 'lucide-react-native';

export default function TestInstructions() {
  const router = useRouter();
  const { testType = 'Mock Test', duration = '120', questions = '90' } = useLocalSearchParams();

  const instructions = [
    {
      icon: Clock,
      title: 'Time Management',
      description: `You have ${duration} minutes to complete ${questions} questions. Manage your time wisely.`,
      color: '#667eea',
    },
    {
      icon: FileText,
      title: 'Question Navigation',
      description: 'You can navigate between questions freely. Use the question palette to jump to any question.',
      color: '#10b981',
    },
    {
      icon: AlertCircle,
      title: 'Marking Scheme',
      description: '+4 marks for correct answer, -1 mark for wrong answer, 0 marks for unattempted questions.',
      color: '#f59e0b',
    },
    {
      icon: CheckCircle,
      title: 'Final Submission',
      description: 'Review your answers before final submission. Once submitted, you cannot make changes.',
      color: '#ef4444',
    },
  ];

  const handleStartTest = () => {
    router.push('/test/exam');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Test Instructions</Text>
          <Text style={styles.headerSubtitle}>{testType}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.testInfo}>
          <View style={styles.testInfoCard}>
            <View style={styles.testInfoItem}>
              <Text style={styles.testInfoLabel}>Duration</Text>
              <Text style={styles.testInfoValue}>{duration} minutes</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.testInfoItem}>
              <Text style={styles.testInfoLabel}>Questions</Text>
              <Text style={styles.testInfoValue}>{questions}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.testInfoItem}>
              <Text style={styles.testInfoLabel}>Total Marks</Text>
              <Text style={styles.testInfoValue}>{parseInt(questions) * 4}</Text>
            </View>
          </View>
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Important Instructions</Text>
          
          {instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionCard}>
              <View style={[styles.instructionIcon, { backgroundColor: instruction.color }]}>
                <instruction.icon size={24} color="#ffffff" />
              </View>
              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>{instruction.title}</Text>
                <Text style={styles.instructionDescription}>{instruction.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>Additional Guidelines</Text>
          
          <View style={styles.guidelinesList}>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Ensure stable internet connection throughout the test
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Do not refresh the browser or close the app during the test
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Questions marked for review will be highlighted in yellow
              </Text>
            </View>
            <View style={styles.guidelineItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.guidelineText}>
                Auto-submit will occur when time expires
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningBox}>
          <AlertCircle size={20} color="#ef4444" />
          <Text style={styles.warningText}>
            Once you start the test, the timer will begin immediately. Make sure you're ready!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartTest}
        >
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.startGradient}
          >
            <Play size={20} color="#ffffff" />
            <Text style={styles.startButtonText}>Start Test</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  testInfo: {
    marginBottom: 32,
  },
  testInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testInfoItem: {
    alignItems: 'center',
  },
  testInfoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 4,
  },
  testInfoValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  divider: {
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  instructionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  instructionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  additionalInfo: {
    marginBottom: 24,
  },
  guidelinesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  guidelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
    marginRight: 12,
    marginTop: 2,
  },
  guidelineText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
    marginLeft: 12,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 8,
  },
});