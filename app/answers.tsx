import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Answers() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Answers</Text>
        <Text style={styles.subtitle}>Review your answers and explanations here.</Text>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>[Answer review list will appear here]</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 32,
    backgroundColor: '#F4F8FB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A7CA5',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  placeholderBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
  },
}); 