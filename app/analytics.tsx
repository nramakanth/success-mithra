import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, ChevronLeft, Clock, FileText, Trophy, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const stats = [
  { icon: FileText, label: 'Tests Taken', value: 18, color: '#3A7CA5' },
  { icon: Trophy, label: 'Avg. Score', value: '82%', color: '#F4A261' },
  { icon: TrendingUp, label: 'Accuracy', value: 76, color: '#3A7CA5' },
  { icon: Clock, label: 'Study Time', value: '42h', color: '#F4A261', progress: 0.42 },
];

const recentTests = [
  { id: 1, subject: 'Physics', score: 88, color: '#3A7CA5' },
  { id: 2, subject: 'Chemistry', score: 75, color: '#F4A261' },
  { id: 3, subject: 'Mathematics', score: 92, color: '#3A7CA5' },
  { id: 4, subject: 'Biology', score: 68, color: '#F4A261' },
];

function AccuracyCircle({ percent, color }: { percent: number; color: string }) {
  return (
    <View style={{
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: color + '22',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    }}>
      <Text style={{ fontWeight: 'bold', color, fontSize: 22 }}>{percent}%</Text>
    </View>
  );
}

export default function Analytics() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Gradient Header with floating chart icon and back button */}
      <View style={styles.headerContainer}>
        <LinearGradient colors={["#3A7CA5", "#5DB7DE"]} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ChevronLeft size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerIconCircle}>
              <TrendingUp size={32} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Analytics</Text>
              <Text style={styles.headerSubtitle}>Track your progress and performance analytics.</Text>
            </View>
          </View>
          <View style={styles.wave} />
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Highlight Card */}
        <LinearGradient colors={["#fff", "#e3f0fa"]} style={styles.highlightCard}>
          <View style={styles.highlightIconCircle}>
            <Star size={32} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.highlightTitle}>Great job!</Text>
            <Text style={styles.highlightSubtitle}>You're in the top 10% of students this week.</Text>
          </View>
        </LinearGradient>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <LinearGradient colors={["#fff", "#e3f0fa"]} style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#3A7CA5' }]}> 
              <FileText size={24} color="#fff" />
            </View>
            <Text style={[styles.statValue, { color: '#3A7CA5' }]}>18</Text>
            <Text style={styles.statLabel}>Tests Taken</Text>
          </LinearGradient>
          <LinearGradient colors={["#fff", "#fff3e6"]} style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#F4A261' }]}> 
              <Trophy size={24} color="#fff" />
            </View>
            <Text style={[styles.statValue, { color: '#F4A261' }]}>82%</Text>
            <Text style={styles.statLabel}>Avg. Score</Text>
          </LinearGradient>
          <LinearGradient colors={["#fff", "#e3f0fa"]} style={styles.statCard}>
            <AccuracyCircle percent={76} color="#3A7CA5" />
            <Text style={styles.statLabel}>Accuracy</Text>
          </LinearGradient>
          <LinearGradient colors={["#fff", "#fff3e6"]} style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#F4A261' }]}> 
              <Clock size={24} color="#fff" />
            </View>
            <Text style={[styles.statValue, { color: '#F4A261' }]}>42h</Text>
            <Text style={styles.statLabel}>Study Time</Text>
            <View style={styles.progressBarWrap}>
              <View style={[styles.progressBar, { backgroundColor: '#F4A261', width: '42%' }]} />
            </View>
          </LinearGradient>
        </View>
        {/* Recent Progress */}
        <Text style={styles.recentTitle}>Recent Tests</Text>
        <FlatList
          data={recentTests}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentList}
          renderItem={({ item }) => (
            <LinearGradient colors={["#fff", item.color + '22']} style={styles.recentCard}>
              <Text style={styles.recentSubject}>{item.subject}</Text>
              <View style={styles.recentBarBg}>
                <View style={[styles.recentBar, { width: `${item.score}%`, backgroundColor: item.color }]} />
              </View>
              <Text style={styles.recentScore}>{item.score}%</Text>
            </LinearGradient>
          )}
        />
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
    marginRight: 14,
    marginLeft: -8,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F4A261',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    elevation: 4,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#eaf1f8',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: '500',
    maxWidth: '90%',
    flexShrink: 1,
    textAlign: 'center',
    alignSelf: 'center',
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
    paddingBottom: 24,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 26,
    marginBottom: 28,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 3,
  },
  highlightIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F4A261',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 22,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 2,
  },
  highlightSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 18,
    marginBottom: 22,
  },
  statCard: {
    width: '47%',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  statIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statValueBig: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBarWrap: {
    width: '100%',
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginTop: 22,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  recentList: {
    paddingBottom: 8,
  },
  recentCard: {
    borderRadius: 18,
    padding: 22,
    marginRight: 18,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  recentSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 10,
  },
  recentBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  recentBar: {
    height: '100%',
    borderRadius: 5,
  },
  recentScore: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
}); 