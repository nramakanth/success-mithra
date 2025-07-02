import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <ShieldCheck size={28} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionText}>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
        </Text>
        <Text style={styles.sectionTitle}>Information Collection</Text>
        <Text style={styles.sectionText}>
          We collect information you provide directly, such as your name, email, phone number, and any other details you enter during registration or while using the app.
        </Text>
        <Text style={styles.sectionTitle}>Use of Information</Text>
        <Text style={styles.sectionText}>
          We use your information to provide and improve our services, personalize your experience, communicate with you, and ensure the security of your account.
        </Text>
        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.sectionText}>
          We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
        </Text>
        <Text style={styles.sectionTitle}>Third-Party Services</Text>
        <Text style={styles.sectionText}>
          We may use third-party services for analytics, authentication, or other features. These services have their own privacy policies, and we encourage you to review them.
        </Text>
        <Text style={styles.sectionTitle}>User Rights</Text>
        <Text style={styles.sectionText}>
          You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.
        </Text>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions or concerns about this Privacy Policy, please contact our support team.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A7CA5',
    paddingTop: 54,
    paddingBottom: 22,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  content: {
    padding: 22,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginTop: 18,
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 8,
    lineHeight: 22,
  },
}); 