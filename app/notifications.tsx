import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Mock Test Completed',
    subtitle: 'You scored 85% in Physics Mock Test.',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'alert',
    title: 'New Mock Test Available',
    subtitle: 'Try the new Chemistry Practice Test!',
    time: 'Yesterday',
  },
  {
    id: 3,
    type: 'success',
    title: 'Streak Achieved!',
    subtitle: 'You have a 5-day study streak. Keep it up!',
    time: '3 days ago',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Leaderboard Updated',
    subtitle: 'You moved up to 3rd place in the leaderboard.',
    time: '4 days ago',
  },
  {
    id: 3,
    type: 'success',
    title: 'Streak Achieved!',
    subtitle: 'You have a 5-day study streak. Keep it up!',
    time: '3 days ago',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Leaderboard Updated',
    subtitle: 'You moved up to 3rd place in the leaderboard.',
    time: '4 days ago',
  },
  {
    id: 3,
    type: 'success',
    title: 'Streak Achieved!',
    subtitle: 'You have a 5-day study streak. Keep it up!',
    time: '3 days ago',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Leaderboard Updated',
    subtitle: 'You moved up to 3rd place in the leaderboard.',
    time: '4 days ago',
  },
  {
    id: 3,
    type: 'success',
    title: 'Streak Achieved!',
    subtitle: 'You have a 5-day study streak. Keep it up!',
    time: '3 days ago',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Leaderboard Updated',
    subtitle: 'You moved up to 3rd place in the leaderboard.',
    time: '4 days ago',
  },
];

export default function Notifications() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <Bell size={48} color="#3A7CA5" />
            <Text style={styles.placeholderText}>No notifications yet</Text>
          </View>
        ) : (
          notifications.map((notif) => (
            <View key={notif.id} style={styles.card}>
              <View style={styles.iconContainer}>
                {notif.type === 'success' ? (
                  <CheckCircle size={24} color="#3A7CA5" />
                ) : (
                  <AlertCircle size={24} color="#F4A261" />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{notif.title}</Text>
                <Text style={styles.subtitle}>{notif.subtitle}</Text>
                <Text style={styles.time}>{notif.time}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F6F8FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#3A7CA5',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
  },
  backButton: {
    position: 'absolute',
    top: 62,
    left: 18,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 