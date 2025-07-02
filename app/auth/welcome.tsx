import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    image: require('../../assets/images/onboarding1.png'),
    title: 'Welcome to Success Mithra',
    description: 'We provide the best learning courses and great mentors tailored for your needs.',
  },
  {
    image: require('../../assets/images/onboarding2.png'),
    title: 'For Aspirants',
    description: 'This app is for students preparing for JEE, EAMCET, EMCET, and those who have passed intermediate and are preparing for exams.',
  },
  {
    image: require('../../assets/images/onboarding3.png'),
    title: 'Track Your Progress',
    description: 'Monitor your learning journey and achieve your goals with detailed analytics.',
  },
];

export default function Welcome() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else router.push('/auth/register');
  };
  const handleSkip = () => router.push('/auth/register');

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={slides[current].image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.title}>{slides[current].title}</Text>
        <Text style={styles.description}>{slides[current].description}</Text>
        <View style={styles.dotsWrap}>
          {slides.map((_, idx) => (
            <View key={idx} style={[styles.dot, current === idx && styles.activeDot]} />
          ))}
        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>{current === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7CA5',
  },
  imageWrap: {
    width: '100%',
    height: height * 0.8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  contentBox: {
    position: 'absolute',
    top: height * 0.55,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 0,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
  },
  dotsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d5db',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#F4A261',
    width: 18,
  },
  nextBtn: {
    backgroundColor: '#F4A261',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipBtn: {
    borderWidth: 1,
    borderColor: '#F4A261',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 60,
    width: '100%',
    alignItems: 'center',
  },
  skipBtnText: {
    color: '#F4A261',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});