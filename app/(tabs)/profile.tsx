import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Switch, Image, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Edit, Bell, Trophy, ChartBar as BarChart3, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, Star, Target, Calendar, Award, BookOpen } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState<'JEE' | 'EAMCET'>('JEE');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState('Arjun Kumar');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [newName, setNewName] = useState(name);
  const [newAvatar, setNewAvatar] = useState<string | null>(avatar);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  // Animation for modal
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (editModalVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [editModalVisible]);

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setNewAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setName(newName);
    setAvatar(newAvatar);
    setEditModalVisible(false);
  };

  const handleCancel = () => {
    setNewName(name);
    setNewAvatar(avatar);
    setEditModalVisible(false);
  };

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
    { title: 'Refer & Earn', icon: Star, color: '#f59e0b', route: '/refer' },
    { title: 'Notifications', icon: Bell, color: '#ff6b6b', hasSwitch: true },

    { title: 'Help & Support', icon: HelpCircle, color: '#f59e0b', route: '/help' },
    { title: 'Terms & Conditions', icon: BookOpen, color: '#3A7CA5', route: '/terms' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSolidWrap}>
        <View style={styles.headerSolid}>
          <View style={styles.profileHeaderRow}>
            <View style={styles.avatarContainerLarge}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarLarge} />
              ) : (
                <View style={styles.avatarLarge}>
                  <Text style={styles.avatarTextLarge}>{name.split(' ').map(n => n[0]).join('').toUpperCase()}</Text>
                </View>
              )}
            </View>
            <View style={styles.profileDetailsCol}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={styles.nameLarge}>{name} <Text style={{ color: '#fff', fontSize: 15 }}>({selectedExam})</Text></Text>
                <TouchableOpacity style={styles.editButtonRow} onPress={() => setEditModalVisible(true)}>
                  <Edit size={18} color="#3A7CA5" />
                </TouchableOpacity>
              </View>
              <Text style={styles.emailLarge}>arjun.kumar@email.com</Text>
              <View style={styles.subscriptionBadgeRow}>
                <Star size={16} color="#F4A261" />
                <Text style={styles.subscriptionTextRow}>Premium Member</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      

      <View style={styles.content}>

        {/* Stats Heading */}
      {/* Stats Grid Below Header */}
      <Text style={styles.statsHeading}>Your Stats</Text>

      <View style={styles.statsGridWrap}>
        
        {stats.map((stat, index) => (
          <View key={index} style={styles.statGridCard}>
            <Text style={[styles.statValueRow, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabelRow}>{stat.label}</Text>
          </View>
        ))}
      </View>
     

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          {/* Modern Segmented Control with Sliding Indicator */}
          <View style={{ alignItems: 'center', marginBottom: 28, marginTop: 8 }}>
            <View
              style={{
                width: 220,
                height: 44,
                backgroundColor: '#e0e7ef',
                borderRadius: 22,
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'space-between',
                padding: 4,
              }}
            >
              {/* Sliding indicator */}
              <View
                style={{
                  position: 'absolute',
                  top: 4,
                  left: selectedExam === 'JEE' ? 4 : 110,
                  width: 106,
                  height: 36,
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  elevation: 2,
                  shadowColor: '#3A7CA5',
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                  transitionDuration: '200ms',
                }}
              />
              <TouchableOpacity
                style={{
                  width: 106,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
                onPress={() => setSelectedExam('JEE')}
                activeOpacity={0.85}
              >
                <Text style={{
                  color: selectedExam === 'JEE' ? '#3A7CA5' : '#64748b',
                  fontWeight: 'bold',
                  fontSize: 17,
                  letterSpacing: 1,
                }}>
                  JEE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 106,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
                onPress={() => setSelectedExam('EAMCET')}
                activeOpacity={0.85}
              >
                <Text style={{
                  color: selectedExam === 'EAMCET' ? '#3A7CA5' : '#64748b',
                  fontWeight: 'bold',
                  fontSize: 17,
                  letterSpacing: 1,
                }}>
                  EAMCET
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => {
                if (item.route === '/subscription') router.push('/subscription');
                else if (item.route === '/refer') router.push('/refer');
                else if (item.route === '/help') router.push('/help');
                else if (item.route === '/terms') router.push('/terms');
                // else if (item.route === '/settings') router.push('/settings');
              }}
            >
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}> 
                  <item.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              {item.hasSwitch ? (
                <Switch 
                  value={notificationEnabled}
                  onValueChange={setNotificationEnabled}
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

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/auth/login')}>
          <LogOut size={20} color="#F4A261" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="fade"
        transparent
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.editModalCard, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }] }>
            <Text style={styles.editModalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handlePickAvatar} style={{ alignSelf: 'center', marginBottom: 18 }}>
              {newAvatar ? (
                <Image source={{ uri: newAvatar }} style={[styles.avatarLarge, { borderWidth: 2, borderColor: '#3A7CA5' }]} />
              ) : (
                <View style={[styles.avatarLarge, { borderWidth: 2, borderColor: '#3A7CA5' }] }>
                  <Text style={styles.avatarTextLarge}>{newName.split(' ').map(n => n[0]).join('').toUpperCase()}</Text>
                </View>
              )}
              <Text style={{ color: '#3A7CA5', marginTop: 6, fontWeight: 'bold', textAlign: 'center' }}>Change Photo</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.nameLarge, { backgroundColor: '#fff', color: '#222', borderRadius: 8, paddingHorizontal: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb', minWidth: 120 }]}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
              textAlign="center"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
              <TouchableOpacity style={{ backgroundColor: '#3A7CA5', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 4 }} onPress={handleSave}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#e5e7eb', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24, marginTop: 4 }} onPress={handleCancel}>
                <Text style={{ color: '#3A7CA5', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerSolidWrap: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    marginBottom: 0,
  },
  headerSolid: {
    backgroundColor: '#3A7CA5',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 0,
    minHeight: 160,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 10,
  },
  avatarContainerLarge: {
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarTextLarge: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3A7CA5',
  },
  profileDetailsCol: {
    flex: 1,
    justifyContent: 'center',
  },
  nameLarge: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  editButtonRow: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  emailLarge: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  subscriptionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  subscriptionTextRow: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  statsGridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statGridCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValueRow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabelRow: {
    fontSize: 11,
    color: '#64748b',
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4A261',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F4A261',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalCard: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  editModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 18,
  },
  statsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
});