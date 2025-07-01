import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, ChevronLeft, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const mockTests = [
  {
    id: 1,
    title: 'Physics Mock Test',
    subject: 'Physics',
    questions: 30,
    duration: '45 mins',
    difficulty: 'Medium',
  },
  {
    id: 2,
    title: 'Chemistry Practice',
    subject: 'Chemistry',
    questions: 25,
    duration: '30 mins',
    difficulty: 'Easy',
  },
  {
    id: 3,
    title: 'Mathematics Full Test',
    subject: 'Mathematics',
    questions: 40,
    duration: '60 mins',
    difficulty: 'Hard',
  },
];

export default function MockTest() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Gradient Header with floating file icon and back button */}
      <View style={styles.headerContainer}>
        <LinearGradient colors={["#3A7CA5", "#5DB7DE"]} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ChevronLeft size={28} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerIconCircle}>
              <FileText size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Mock Test</Text>
              <Text style={styles.headerSubtitle}>Start a new mock test or continue where you left off.</Text>
            </View>
          </View>
          <View style={styles.wave} />
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Sample Mock Test List */}
        {mockTests.map((test) => (
          <View key={test.id} style={styles.mockTestCard}>
            <View style={styles.mockTestIconCircle}>
              <FileText size={26} color="#fff" />
            </View>
            <View style={styles.mockTestInfo}>
              <Text style={styles.mockTestTitle}>{test.title}</Text>
              <Text style={styles.mockTestSubtitle}>
                {test.subject} • {test.questions} Questions • {test.duration} • {test.difficulty}
              </Text>
            </View>
            <TouchableOpacity style={styles.mockTestButton}>
              <Play size={18} color="#fff" />
              <Text style={styles.mockTestButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  headerContainer: {
    overflow: 'hidden',
    paddingBottom: 0,
  },
  headerGradient: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingBottom: 0,
    paddingTop: 60,
    paddingHorizontal: 0,
    minHeight: 180,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 18,
    zIndex: 2,
  },
  backButton: {
    marginRight: 10,
    marginLeft: -8,
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#F4A261',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    elevation: 4,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#eaf1f8',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: '500',

  },
  wave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 40,
    backgroundColor: '#F6F8FB',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 24,
  },
  mockTestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  mockTestIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3A7CA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  mockTestInfo: {
    flex: 1,
  },
  mockTestTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 2,
  },
  mockTestSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  mockTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4A261',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  mockTestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
}); 