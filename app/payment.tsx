import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Award } from 'lucide-react-native';

export default function Payment() {
  const router = useRouter();
  const handlePay = () => {
    Alert.alert('Payment Successful', 'Your subscription is now active!', [
      { text: 'OK', onPress: () => router.push('/') },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Award size={40} color="#F4A261" />
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Complete your subscription</Text>
      </View>
      <View style={styles.planCard}>
        <Text style={styles.planLabel}>Plan:</Text>
        <Text style={styles.planPrice}>₹5000</Text>
        <Text style={styles.planDuration}>for 3 months</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  planCard: {
    backgroundColor: '#fff7e6',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  planLabel: {
    fontSize: 16,
    color: '#b45309',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 32,
    color: '#F4A261',
    fontWeight: 'bold',
  },
  planDuration: {
    fontSize: 16,
    color: '#b45309',
    marginBottom: 18,
  },
  payButton: {
    backgroundColor: '#F4A261',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignSelf: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 