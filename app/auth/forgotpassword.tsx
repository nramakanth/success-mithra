import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Lock, Eye, EyeOff, ArrowRight, Shield, RotateCcw, CheckCircle2 } from 'lucide-react-native';
import type { TextInput as RNTextInput } from 'react-native';

export default function ForgotPassword() {
  const [mobile, setMobile] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const otpScale = useRef(new Animated.Value(0.8)).current;
  const otpOpacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();

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
        clearInterval(interval);
      }
    };
  }, [showOtpModal]);

  const handleContinue = () => {
    if (!mobile || mobile.length < 10) {
      Alert.alert('Please enter a valid mobile number');
      return;
    }
    setShowOtpModal(true);
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
      setShowReset(true);
    }, 1000);
  };

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number');
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Please fill both password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      setShowOtpModal(false);
      setShowReset(false);
      setNewPassword('');
      setConfirmPassword('');
      router.replace('/auth/login');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your registered mobile number to reset your password</Text>
        <View style={styles.formCard}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputContainer}>
            <Phone size={20} color="#3A7CA5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#A0A0A0"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* OTP Modal */}
      <Modal
        visible={showOtpModal && !successModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowOtpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.otpModalCard, { transform: [{ scale: otpScale }], opacity: otpOpacity }]}> 
            {!showReset ? (
              <>
                <View style={styles.otpHeader}>
                  <View style={styles.otpIconContainer}>
                    <Shield size={48} color="#667eea" />
                  </View>
                  <Text style={styles.otpTitle}>Enter Verification Code</Text>
                  <Text style={styles.otpSubtitle}>We've sent a 4-digit code to your mobile</Text>
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
              </>
            ) : (
              <>
                <Text style={styles.otpTitle}>Reset Password</Text>
                <Text style={styles.otpSubtitle}>Enter your new password below</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#3A7CA5" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="#A0A0A0"
                    value={newPassword}
                    onChangeText={setNewPassword}
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
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                <TouchableOpacity style={styles.verifyButton} onPress={handleResetPassword}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
      {/* Success Modal */}
      <Modal
        visible={successModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.successModalContainer}>
          <View style={styles.successCardOnly}>
            <CheckCircle2 size={56} color="#10b981" style={styles.successCheckIcon} />
            <Text style={styles.successTextOnly}>Password changed successfully!</Text>
          </View>
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  formCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 6,
    marginTop: 12,
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
  continueButton: {
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
  continueButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  // OTP Modal styles (reuse from login)
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
  // Success Modal
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  successCardOnly: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  successCheckIcon: {
    marginBottom: 16,
  },
  successTextOnly: {
    fontSize: 18,
    color: '#10b981',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
}); 