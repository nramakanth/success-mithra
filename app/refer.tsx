import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Share } from 'react-native';
import { Award, Star, User, Gift, CheckCircle, Share2, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const referralCode = 'JEE500';
const referredFriends = [
  { name: 'Rahul Sharma', status: 'Joined', reward: '₹250' },
  { name: 'Priya Singh', status: 'Pending', reward: '-' },
  { name: 'Amit Patel', status: 'Joined', reward: '₹250' },
];

export default function Refer() {
  const router = useRouter();
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join Success Mithra and get rewards! Use my code: ${referralCode}`,
      });
    } catch (error) {}
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={26} color="#3A7CA5" />
      </TouchableOpacity>
      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Star size={40} color="#fff" style={{ marginBottom: 10 }} />
        <Text style={styles.heroTitle}>Refer & Earn</Text>
        <Text style={styles.heroSubtitle}>Invite friends and earn rewards for every successful referral!</Text>
      </View>

      {/* Referral Code Section */}
      <View style={styles.referralCard}>
        <Text style={styles.referralLabel}>Your Referral Code</Text>
        <View style={styles.referralRow}>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Share2 size={18} color="#fff" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rewards Section */}
      <View style={styles.rewardsCard}>
        <Gift size={28} color="#F4A261" style={{ marginBottom: 8 }} />
        <Text style={styles.rewardsTitle}>Earn ₹250 per friend!</Text>
        <Text style={styles.rewardsDesc}>For every friend who joins and subscribes using your code, you both get ₹250 credited to your account.</Text>
      </View>

      {/* Tracking Section */}
      <View style={styles.trackingSection}>
        <Text style={styles.trackingTitle}>Referral Tracking</Text>
        <FlatList
          data={referredFriends}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.friendRow}>
              <User size={22} color="#3A7CA5" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendStatus}>{item.status}</Text>
              </View>
              <View style={styles.rewardBox}>
                {item.status === 'Joined' ? (
                  <>
                    <CheckCircle size={16} color="#10b981" style={{ marginRight: 4 }} />
                    <Text style={styles.rewardText}>{item.reward}</Text>
                  </>
                ) : (
                  <Text style={[styles.rewardText, { color: '#aaa' }]}>Pending</Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No referrals yet. Start inviting friends!</Text>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroBanner: {
    backgroundColor: '#3A7CA5',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 4,
  },
  referralCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginHorizontal: 18,
    marginBottom: 18,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  referralLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  referralRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  referralCode: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A7CA5',
    letterSpacing: 2,
    backgroundColor: '#f0f4ff',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4A261',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 12,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  rewardsCard: {
    backgroundColor: '#fff7e6',
    borderRadius: 18,
    padding: 22,
    marginHorizontal: 18,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  rewardsTitle: {
    fontSize: 20,
    color: '#F4A261',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rewardsDesc: {
    fontSize: 14,
    color: '#b45309',
    textAlign: 'center',
  },
  trackingSection: {
    marginTop: 18,
    marginHorizontal: 18,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  trackingTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 12,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 10,
  },
  friendName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  friendStatus: {
    fontSize: 13,
    color: '#64748b',
  },
  rewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0fbe0',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 60,
    justifyContent: 'center',
  },
  rewardText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 36,
    left: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
}); 