import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const users = [
  { id: 1, name: 'Arjun Kumar', score: 980, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Priya Sharma', score: 950, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Rahul Verma', score: 920, avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { id: 4, name: 'Sneha Patel', score: 900, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 5, name: 'Amit Singh', score: 880, avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: 6, name: 'Riya Das', score: 860, avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 7, name: 'Vikram Rao', score: 850, avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
];

export default function Leaderboard() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Gradient Header with floating trophy icon and back button */}
      <View style={styles.headerContainer}>
        <LinearGradient colors={["#3A7CA5", "#5DB7DE"]} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ChevronLeft size={28} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerIconCircle}>
              <Trophy size={36} color="#fff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Leaderboard</Text>
              <Text style={styles.headerSubtitle}>See how you rank among other students.</Text>
            </View>
          </View>
          <View style={styles.wave} />
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top 3 Users */}
        <View style={styles.topThreeWrap}>
          {/* 2nd Place */}
          <View style={styles.topUserWrap}>
            <Image source={{ uri: users[1].avatar }} style={[styles.topAvatar, { borderColor: '#F4A261' }]} />
            <Text style={styles.topRank}>2</Text>
            <Text style={styles.topName}>{users[1].name}</Text>
            <Text style={styles.topScore}>{users[1].score} pts</Text>
          </View>
          {/* 1st Place */}
          <View style={[styles.topUserWrap, styles.firstPlaceWrap]}>
            <View style={styles.crown}>
              <Trophy size={26} color="#F4A261" />
            </View>
            <Image source={{ uri: users[0].avatar }} style={[styles.topAvatar, { borderColor: 'transparent', width: 90, height: 90 }]} />
            <Text style={[styles.topRank, { color: '#F4A261', fontSize: 22 }]}>1</Text>
            <Text style={[styles.topName, { fontWeight: 'bold',color: '#fff' }]}>{users[0].name}</Text>
            <Text style={[styles.topScore, { color: '#F4A261' }]}>{users[0].score} pts</Text>
          </View>
          {/* 3rd Place */}
          <View style={styles.topUserWrap}>
            <Image source={{ uri: users[2].avatar }} style={[styles.topAvatar, { borderColor: '#CD7F32' }]} />
            <Text style={styles.topRank}>3</Text>
            <Text style={styles.topName}>{users[2].name}</Text>
            <Text style={styles.topScore}>{users[2].score} pts</Text>
          </View>
        </View>
        {/* Other Users */}
        <View style={styles.othersList}>
          {users.slice(3).map((user, idx) => (
            <View key={user.id} style={styles.userCard}>
              <Text style={styles.userRank}>{idx + 4}</Text>
              <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userScore}>{user.score} pts</Text>
              </View>
            </View>
          ))}
        </View>
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
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#F4A261',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    elevation: 6,
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
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#eaf1f8',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.04)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
    paddingHorizontal: 12,
    // paddingTop: 18,
    paddingBottom: 24,
    marginTop : 30,
  },
  trophyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F4A261',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  topThreeWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 32,
    gap: 8,
  },
  topUserWrap: {
    alignItems: 'center',
    width: 90,
    marginHorizontal: 6,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  firstPlaceWrap: {
    marginHorizontal: 12,
    zIndex: 2,
    backgroundColor: '#3A7CA5',
    borderWidth: 2,
    borderColor: '#3A7CA5',
    paddingVertical: 18,
    width: 110,
  },
  crown: {
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -8,
    backgroundColor: 'transparent',
    zIndex: 3,
  },
  topAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    marginBottom: 6,
    backgroundColor: '#F4A261',
  },
  topRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 2,
  },
  topName: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  topScore: {
    fontSize: 14,
    color: '#3A7CA5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  othersList: {
    width: '100%',
    marginTop: 2,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  userRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    width: 28,
    textAlign: 'center',
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginHorizontal: 10,
    backgroundColor: '#F6F8FB',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  userScore: {
    fontSize: 15,
    color: '#3A7CA5',
    fontWeight: 'bold',
  },
}); 