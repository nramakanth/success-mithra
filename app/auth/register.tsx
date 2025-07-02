import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Apple } from 'lucide-react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with logo */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.innerContent}>
          {/* Social/Alternative Login Buttons */}
          <View style={styles.socialContainer}>
            {/* <TouchableOpacity style={styles.socialButton}>
              <Mail size={20} color="#3A7CA5" style={styles.socialIcon} />
              <Text style={styles.socialText}>Continue with Email</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={20} color="#3A7CA5" style={styles.socialIcon} />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Apple size={20} color="#3A7CA5" style={styles.socialIcon} />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
          {/* Create Account Manually Button */}
          <TouchableOpacity style={styles.manualButton} onPress={() => router.push('/auth/register-details')}>
            <Text style={styles.manualButtonText}>Create Account Manually</Text>
          </TouchableOpacity>
          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>
          {/* Login navigation */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.termsText}>
          By continuing, you accept the 
          <Text style={styles.termsLink} onPress={() => router.push('/terms')}>Terms Of Use</Text> 
          and 
          <Text style={styles.termsLink} onPress={() => router.push('/privacy')}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC', // subtle background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    // marginBottom: 8,
  },
  innerContent: {
    alignItems: 'center',
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
  socialContainer: {
    width: '100%',
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Inter-Medium',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E6ECF2',
    borderRadius: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#A0A0A0',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    letterSpacing: 1,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  loginText: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  loginLink: {
    fontSize: 15,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 12,
  },
  termsLink: {
    color: '#3A7CA5',
    textDecorationLine: 'underline',
  },
  manualButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#3A7CA5',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
  manualButtonText: {
    color: '#3A7CA5',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
