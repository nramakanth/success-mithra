import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Settings, Bell, Trophy, ChartBar as BarChart3, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, Star, Target, Calendar, Award } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();

  const achievements = [
    { title: '100 Days Streak', icon: Calendar, color: '#ff6b6b', unlocked: true },
    { title: 'Top 100 Rank', icon: Trophy, color: '#ffa726', unlocked: true },
    { title: 'Perfect Score', icon: Target, color: '#10b981', unlocked: false },
    { title: 'Speed Master', icon: Award, color: '#667eea', unlocked: true },
  ];

  const stats = [
    { label: 'Questions Solved', value: '2,456', color: '#667eea' },
    { label: 'Tests Completed', value: '78', color: '#ff6b6b' },
    { label: 'Study Hours', value: '245h', color: '#10b981' },
    { label: 'Current Streak', value: '12 days', color: '#ffa726' },
  ];

  const menuItems = [
    { title: 'Subscription', icon: CreditCard, color: '#667eea', route: '/subscription' },
    { title: 'Analytics', icon: BarChart3, color: '#10b981', route: '/analytics' },
    { title: 'Notifications', icon: Bell, color: '#ff6b6b', hasSwitch: true },
    { title: 'Settings', icon: Settings, color: '#64748b', route: '/settings' },
    { title: 'Help & Support', icon: HelpCircle, color: '#f59e0b', route: '/help' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: '#3A7CA5' }]}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AK</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Settings size={16} color="#3A7CA5" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Arjun Kumar</Text>
          <Text style={styles.email}>arjun.kumar@email.com</Text>
          <View style={styles.subscriptionBadge}>
            <Star size={16} color="#3A7CA5" />
            <Text style={styles.subscriptionText}>Premium Member</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={[
                styles.achievementCard,
                { opacity: achievement.unlocked ? 1 : 0.5 }
              ]}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <achievement.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                {achievement.unlocked && (
                  <Text style={styles.achievementUnlocked}>Unlocked</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              {item.hasSwitch ? (
                <Switch 
                  value={true}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#667eea' }}
                  thumbColor="#ffffff"
                />
              ) : (
                <ChevronRight size={20} color="#94a3b8" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Weekly Goal</Text>
              <Text style={styles.progressPercentage}>68%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '68%' }]} />
            </View>
            <Text style={styles.progressText}>340/500 questions this week</Text>
          </View>

          <View style={styles.subjectProgress}>
            <Text style={styles.subjectProgressTitle}>Subject Mastery</Text>
            {[
              { subject: 'Physics', progress: 85, color: '#667eea' },
              { subject: 'Chemistry', progress: 72, color: '#ff6b6b' },
              { subject: 'Mathematics', progress: 91, color: '#10b981' },
            ].map((item, index) => (
              <View key={index} style={styles.subjectItem}>
                <View style={styles.subjectLeft}>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <View style={styles.subjectBar}>
                    <View 
                      style={[
                        styles.subjectFill, 
                        { width: `${item.progress}%`, backgroundColor: item.color }
                      ]} 
                    />
                  </View>
                </View>
                <Text style={styles.subjectPercentage}>{item.progress}%</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
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
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subscriptionText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 72) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementUnlocked: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#10b981',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  progressPercentage: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#3A7CA5',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3A7CA5',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  subjectProgress: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  subjectProgressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectLeft: {
    flex: 1,
    marginRight: 16,
  },
  subjectName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 8,
  },
  subjectBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  subjectFill: {
    height: '100%',
    backgroundColor: '#3A7CA5',
    borderRadius: 3,
  },
  subjectPercentage: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    minWidth: 40,
    textAlign: 'right',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4A261',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginLeft: 8,
  },
});