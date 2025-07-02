import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BookOpen, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const terms = [
  'You must be at least 16 years old to use this app.',
  'Do not share your account credentials with others.',
  'All content is for educational purposes only.',
  'Do not attempt to hack, reverse engineer, or misuse the app.',
  'Your data is protected as per our privacy policy.',
  'We reserve the right to suspend accounts for misuse.',
  'Subscription fees are non-refundable except as required by law.',
  'By using the app, you agree to receive important notifications.',
  'Contact support for any issues or questions.',
];

export default function Terms() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={26} color="#3A7CA5" />
      </TouchableOpacity>
      <View style={styles.heroBanner}>
        <BookOpen size={40} color="#fff" style={{ marginBottom: 10 }} />
        <Text style={styles.heroTitle}>Terms & Conditions</Text>
      </View>
      <View style={styles.termsSection}>
        {terms.map((term, idx) => (
          <View key={idx} style={styles.termItem}>
            <Text style={styles.termIndex}>{idx + 1}.</Text>
            <Text style={styles.termText}>{term}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  termsSection: {
    marginHorizontal: 18,
    marginTop: 10,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  termIndex: {
    fontSize: 16,
    color: '#3A7CA5',
    fontWeight: 'bold',
    marginRight: 8,
  },
  termText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
}); 