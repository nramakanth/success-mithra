import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Phone, Shield } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: '/auth/otp',
        params: { phone }
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Decorative background circle */}
      <View style={styles.bgCircle} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.centeredContent}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Phone size={28} color="#3A7CA5" />
            </View>
            <Text style={styles.title}>Sign in with Mobile</Text>
          </View>
          <Text style={styles.subtitle}>We'll send you a verification code to confirm your identity</Text>
          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#A0A0A0"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButton, { opacity: phone.length === 10 ? 1 : 0.6 }]}
            onPress={handleSendOTP}
            disabled={phone.length !== 10 || isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Sending...' : 'Send OTP'}</Text>
          </TouchableOpacity>
          <View style={styles.securityNote}>
            <Shield size={15} color="#3A7CA5" />
            <Text style={styles.securityText}>Your phone number is secure and will only be used for verification</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const CIRCLE_SIZE = width * 1.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7CA5',
    position: 'relative',
  },
  bgCircle: {
    position: 'absolute',
    top: -CIRCLE_SIZE * 0.3,
    left: -CIRCLE_SIZE * 0.15,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.10)',
    zIndex: 0,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 2,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  card: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E6ECF2',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    backgroundColor: '#F0F4F8',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#3A7CA5',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  countryCode: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#3A7CA5',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  sendButton: {
    backgroundColor: '#F4A261',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 18,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontWeight: 'bold',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  securityText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#3A7CA5',
    marginLeft: 7,
    textAlign: 'center',
    lineHeight: 16,
  },
});