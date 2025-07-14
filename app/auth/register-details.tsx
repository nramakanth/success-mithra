import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function RegisterDetails() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const otpInputRefs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleRegister = async () => {
    if (!agreed) {
      alert('You must agree to the Terms of Use and Privacy Policy to continue.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpModal(true);
    }, 1500);
  };

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, '').slice(0, 1);
    setOtp(newOtp);
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleOTPKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpValue: string) => {
    if ((otpValue || otp.join('')).length !== 4) {
      alert('Please enter the complete 4-digit OTP');
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setShowOtpModal(false);
      router.replace('/auth/letus-details');
    }, 1200);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill in your details to get started</Text>
          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <User size={20} color="#3A7CA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#A0A0A0"
                value={formData.fullName}
                onChangeText={(text) => setFormData({...formData, fullName: text})}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#3A7CA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#A0A0A0"
                value={formData.phoneNumber}
                onChangeText={(text) => {
                  // Only allow numbers and max 10 digits
                  const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
                  setFormData({...formData, phoneNumber: cleaned});
                }}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#3A7CA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#A0A0A0"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#3A7CA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#A0A0A0" />
                ) : (
                  <Eye size={20} color="#A0A0A0" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#3A7CA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#A0A0A0"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#A0A0A0" />
                ) : (
                  <Eye size={20} color="#A0A0A0" />
                )}
              </TouchableOpacity>
            </View>
            {/* Terms and Privacy Checkbox */}
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreed(!agreed)}>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to the 
                <Text style={styles.link} onPress={() => router.push('/terms')}>Terms of Use</Text> 
                {/* and  */}
                {/* <Text style={styles.link} onPress={() => router.push('/privacy')}>Privacy Policy</Text> */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.registerButton, !agreed && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={isLoading || !agreed}
            >
              <Text style={styles.registerText}>{isLoading ? 'Creating Account...' : 'Create Account'}</Text>
              {!isLoading && <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />}
            </TouchableOpacity>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.signUpText}>Log In</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.termsText}>
            By continuing, you accept the <Text style={styles.termsLink}>Terms Of Use</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text> */}
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
          <View style={styles.otpModalCard}>
            <Text style={styles.otpTitle}>Enter Verification Code</Text>
            <Text style={styles.otpSubtitle}>We've sent a 4-digit code to your mobile number</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => { otpInputRefs.current[index] = ref; }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={value => handleOTPChange(value, index)}
                  onKeyPress={e => handleOTPKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => handleVerifyOTP(otp.join(''))}
              disabled={otpLoading || otp.join('').length !== 4}
            >
              <Text style={styles.verifyButtonText}>{otpLoading ? 'Verifying...' : 'Verify'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Back button floating */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={26} color="#3A7CA5" />
      </TouchableOpacity>
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
    paddingHorizontal: 8,
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
    marginBottom: 16,
    backgroundColor: '#F4F8FB',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  formCard: {
    width: '100%',
    // backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.06,
    // shadowRadius: 12,
    // elevation: 2,
    // marginBottom: 18,
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
  registerButton: {
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
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 2,
  },
  registerText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    // marginTop: 8,
  },
  footerText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Inter-Regular',
  },
  signUpText: {
    fontSize: 15,
    color: '#F4A261',
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 12,
  },
  termsLink: {
    color: '#F4A261',
    textDecorationLine: 'underline',
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
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3A7CA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    // backgroundColor: '#3A7CA5',
    // borderColor: '#3A7CA5',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  checkmark: {
    color: '#F4A261',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: '#F4A261',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Bold',
    marginLeft: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpModalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  otpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3A7CA5',
  },
  otpSubtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpInput: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: '#3A7CA5',
    borderRadius: 8,
    marginHorizontal: 6,
    fontSize: 20,
    textAlign: 'center',
    color: '#222',
    backgroundColor: '#F4F8FB',
  },
  verifyButton: {
    backgroundColor: '#F4A261',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 