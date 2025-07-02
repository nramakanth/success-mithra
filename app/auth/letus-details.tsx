import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, ScrollView as RNScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LetUsDetails() {
  const [college, setCollege] = useState('');
  const [district, setDistrict] = useState('');
  const [exam, setExam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCollegeSuggestions, setShowCollegeSuggestions] = useState(false);
  const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
  const collegeInputRef = useRef<TextInput>(null);
  const districtInputRef = useRef<TextInput>(null);
  const router = useRouter();

  // Example static lists (replace with API if needed)
  const collegeList = [
    'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kharagpur', 'IIT Kanpur',
    'NIT Warangal', 'NIT Trichy', 'NIT Surathkal', 'BITS Pilani', 'JNTU Hyderabad',
    'Osmania University', 'Andhra University', 'SV University', 'CBIT', 'VNR VJIET',
    'VIT Vellore', 'SRM University', 'IIIT Hyderabad', 'IIIT Delhi', 'IIIT Bangalore',
  ];
  const districtList = [
    'Hyderabad', 'Ranga Reddy', 'Medchal', 'Warangal', 'Karimnagar', 'Nalgonda',
    'Khammam', 'Nizamabad', 'Adilabad', 'Mahbubnagar', 'Suryapet', 'Vizag',
    'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Chittoor', 'Anantapur',
    'East Godavari', 'West Godavari', 'Prakasam', 'Srikakulam', 'Kadapa',
  ];
  const filteredColleges = collegeList.filter(c => c.toLowerCase().includes(college.toLowerCase()) && college.length > 0);
  const filteredDistricts = districtList.filter(d => d.toLowerCase().includes(district.toLowerCase()) && district.length > 0);

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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Tell Us About You</Text>
        <Text style={styles.tagline}>
          By giving these details, we can customize the app experience for you.
        </Text>
        <View style={styles.formCard}>
          <Text style={styles.label}>Which college are you studying at?</Text>
          <TextInput
            ref={collegeInputRef}
            style={styles.input}
            placeholder="Enter your college name"
            placeholderTextColor="#A0A0A0"
            value={college}
            onChangeText={text => {
              setCollege(text);
              setShowCollegeSuggestions(true);
            }}
            onFocus={() => setShowCollegeSuggestions(true)}
          />
          {showCollegeSuggestions && filteredColleges.length > 0 && (
            <View style={styles.suggestionBox}>
              <RNScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
                {filteredColleges.map((item, idx) => (
                  <TouchableOpacity key={idx} onPress={() => {
                    setCollege(item);
                    setShowCollegeSuggestions(false);
                  }} style={styles.suggestionItem}>
                    <Text style={styles.suggestionText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                  </TouchableOpacity>
                ))}
              </RNScrollView>
            </View>
          )}
          <Text style={styles.label}>Your native district</Text>
          <TextInput
            ref={districtInputRef}
            style={styles.input}
            placeholder="Enter your native district"
            placeholderTextColor="#A0A0A0"
            value={district}
            onChangeText={text => {
              setDistrict(text);
              setShowDistrictSuggestions(true);
            }}
            onFocus={() => setShowDistrictSuggestions(true)}
          />
          {showDistrictSuggestions && filteredDistricts.length > 0 && (
            <View style={styles.suggestionBox}>
              <RNScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
                {filteredDistricts.map((item, idx) => (
                  <TouchableOpacity key={idx} onPress={() => {
                    setDistrict(item);
                    setShowDistrictSuggestions(false);
                  }} style={styles.suggestionItem}>
                    <Text style={styles.suggestionText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                  </TouchableOpacity>
                ))}
              </RNScrollView>
            </View>
          )}
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
          <TouchableOpacity style={[styles.submitButton, isLoading && { opacity: 0.7 }]} onPress={async () => {
            await handleSubmit();
            router.replace('/(tabs)');
          }} disabled={isLoading}>
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
  suggestionBox: {
    backgroundColor: '#fff',
    borderColor: '#E6ECF2',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: -8,
    marginBottom: 8,
    height: 160,
    maxHeight: 160,
    zIndex: 10,
    elevation: 5,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F8FB',
  },
  suggestionText: {
    fontSize: 15,
    color: '#3A7CA5',
    flexShrink: 1,
  },
}); 