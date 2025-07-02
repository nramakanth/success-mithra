import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Award, CheckCircle, ChevronLeft } from 'lucide-react-native';

export default function Subscription() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroBanner}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Award size={48} color="#fff" style={styles.heroIcon} />
        <Text style={styles.heroTitle}>Go Premium</Text>
        <Text style={styles.heroSubtitle}>Unlock all features and get ahead in your exam preparation!</Text>
      </View>
      <View style={styles.planCardModern}>
        <Text style={styles.planPriceModern}>₹5000</Text>
        <Text style={styles.planDurationModern}>for 3 months</Text>
        <TouchableOpacity style={styles.paymentButtonModern} onPress={() => router.push('/payment')}>
          <Text style={styles.paymentButtonTextModern}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.featuresSectionModern}>
        <Text style={styles.featuresTitleModern}>What's included</Text>
        <View style={styles.featuresListModern}>
          <View style={styles.featureItemModern}><CheckCircle size={20} color="#10b981" /><Text style={styles.featureTextModern}>Unlimited Mock Tests & Practice</Text></View>
          <View style={styles.featureItemModern}><CheckCircle size={20} color="#10b981" /><Text style={styles.featureTextModern}>Detailed Analytics & Leaderboard</Text></View>
          <View style={styles.featureItemModern}><CheckCircle size={20} color="#10b981" /><Text style={styles.featureTextModern}>Access to All Previous Year Papers</Text></View>
          <View style={styles.featureItemModern}><CheckCircle size={20} color="#10b981" /><Text style={styles.featureTextModern}>Priority Support</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 0,
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 18,
    left: 12,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 2,
  },
  planCardModern: {
    backgroundColor: '#fff7e6',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 32,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  planPriceModern: {
    fontSize: 38,
    color: '#F4A261',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  planDurationModern: {
    fontSize: 18,
    color: '#b45309',
    marginBottom: 18,
  },
  paymentButtonModern: {
    backgroundColor: '#F4A261',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 38,
    marginTop: 10,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentButtonTextModern: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  featuresSectionModern: {
    marginTop: 8,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  featuresTitleModern: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresListModern: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featureItemModern: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTextModern: {
    fontSize: 16,
    color: '#222',
    marginLeft: 12,
    fontWeight: '500',
  },
}); 