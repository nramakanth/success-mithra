import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function ForgotOTP() {
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Navigate to reset password or success page
    }, 1000);
  };

  const handleResend = () => {
    // TODO: Implement resend OTP logic
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContent}>
          {/* Logo */}
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>Enter the code sent to your email address.</Text>
          <TextInput
            style={styles.otpInput}
            placeholder="Enter 6-digit code"
            placeholderTextColor="#A0A0A0"
            value={otp}
            onChangeText={setOTP}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            disabled={isLoading || otp.length !== 6}
          >
            <Text style={styles.verifyButtonText}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
            {!isLoading && <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.resendLink} onPress={handleResend}>
            <Text style={styles.resendLinkText}>Resend OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToLogin} onPress={() => router.push('/auth/login')}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7CA5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  innerContent: {
    alignItems: 'center',
    width: '100%',
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: '#F4F8FB',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  otpInput: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    color: '#222',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4A261',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 18,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  verifyButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  resendLink: {
    marginBottom: 8,
  },
  resendLinkText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
  backToLogin: {
    marginTop: 8,
  },
  backToLoginText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
}); 