import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function LetUsDetails() {
  const [college, setCollege] = useState('');
  const [district, setDistrict] = useState('');
  const [exam, setExam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!college || !district || !exam) {
      Alert.alert('Please fill all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tell Us About You</Text>
        <Text style={styles.tagline}>
          By giving these details, we can customize the app experience for you.
        </Text>
        <View style={styles.formCard}>
          <Text style={styles.label}>Which college are you studying at?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your college name"
            placeholderTextColor="#A0A0A0"
            value={college}
            onChangeText={setCollege}
          />
          <Text style={styles.label}>Your native district</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your native district"
            placeholderTextColor="#A0A0A0"
            value={district}
            onChangeText={setDistrict}
          />
          <Text style={styles.label}>Are you preparing for JEE or EAPCET?</Text>
          <View style={styles.pickerRow}>
            <TouchableOpacity
              style={[styles.pickerButton, exam === 'JEE' && styles.pickerButtonSelected]}
              onPress={() => setExam('JEE')}
            >
              <Text style={[styles.pickerText, exam === 'JEE' && styles.pickerTextSelected]}>JEE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pickerButton, exam === 'EAPCET' && styles.pickerButtonSelected]}
              onPress={() => setExam('EAPCET')}
            >
              <Text style={[styles.pickerText, exam === 'EAPCET' && styles.pickerTextSelected]}>EAPCET</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.submitButton, isLoading && { opacity: 0.7 }]} onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Continue</Text>
            )}
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
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
  input: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#222',
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 4,
  },
  pickerButton: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6ECF2',
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  pickerButtonSelected: {
    backgroundColor: '#3A7CA5',
    borderColor: '#3A7CA5',
  },
  pickerText: {
    fontSize: 16,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
  },
  pickerTextSelected: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#F4A261',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#F4A261',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
}); 