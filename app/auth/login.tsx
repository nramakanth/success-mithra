import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Modal, Alert, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft, Shield, RotateCcw, Phone } from 'lucide-react-native';
import { AntDesign } from '@expo/vector-icons';
import type { TextInput as RNTextInput } from 'react-native';

const { width } = Dimensions.get('window');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const router = useRouter();
  const otpScale = useRef(new Animated.Value(0.8)).current;
  const otpOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: number | undefined;
    if (showOtpModal) {
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '']);
      Animated.parallel([
        Animated.timing(otpScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp),
        }),
        Animated.timing(otpOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      otpScale.setValue(0.8);
      otpOpacity.setValue(0);
    }
    return () => {
      if (interval !== undefined) {
        clearInterval(interval as any);
      }
    };
  }, [showOtpModal]);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpModal(true);
    }, 1500);
  };

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');
    if (otpToVerify.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter the complete 4-digit OTP');
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setShowOtpModal(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number');
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

          {/* Title and Subtitle */}
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue your learning journey</Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#3A7CA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#A0A0A0"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
              {!isLoading && <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />}
            </TouchableOpacity>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>
            <TouchableOpacity style={styles.googleButton}>
              <AntDesign name="google" size={22} color="#3A7CA5" style={styles.googleIcon} />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* OTP Modal */}
      <Modal
        visible={showOtpModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowOtpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.otpModalCard, { transform: [{ scale: otpScale }], opacity: otpOpacity }]}>
            <View style={styles.otpHeader}>
              {/* <View style={styles.otpIconContainer}>
                <Shield size={40} color="#3A7CA5" />
              </View> */}
              <Text style={styles.otpTitle}>Enter Verification Code</Text>
              <Text style={styles.otpSubtitle}>We've sent a 4-digit code to your number</Text>
            </View>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: RNTextInput | null) => { inputRefs.current[index] = ref; }}
                  style={[
                    styles.otpInput,
                    { borderColor: digit ? '#3A7CA5' : 'rgba(102, 126, 234, 0.3)' }
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>
            <TouchableOpacity
              style={[styles.verifyButton, { opacity: otp.join('').length === 4 ? 1 : 0.6 }]}
              onPress={() => handleVerifyOTP()}
              disabled={otp.join('').length !== 4 || otpLoading}
            >
              <Text style={styles.buttonText}>{otpLoading ? 'Verifying...' : 'Verify OTP'}</Text>
            </TouchableOpacity>
            <View style={styles.resendContainer}>
              {!canResend ? (
                <Text style={styles.resendText}>
                  Resend OTP in {timer}s
                </Text>
              ) : (
                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendOTP}
                >
                  <RotateCcw size={16} color="#ff6b6b" />
                  <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setShowOtpModal(false)}>
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#fff',
    opacity: 0.9,
  },
  loginButton: {
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
  },
  loginButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 8,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 14,
  },
  googleText: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  signUpText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpModalCard: {
    width: '90%',
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
  otpHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  otpIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  otpTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#3A7CA5',
    textAlign: 'center',
    marginBottom: 4,
  },
  otpSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 40,
    height: 48,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    color: '#3A7CA5',
    backgroundColor: '#F4F8FB',
    marginHorizontal: 4,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  verifyButton: {
    backgroundColor: '#F4A261',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  resendText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  resendButtonText: {
    color: '#3A7CA5',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginLeft: 4,
  },
  closeModalBtn: {
    marginTop: 8,
  },
  closeModalText: {
    color: '#F4A261',
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
});