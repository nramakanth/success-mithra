import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, TextInput } from 'react-native';
import { Mail, Phone, MessageCircle, ChevronDown, ChevronUp, HelpCircle, ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const faqs = [
  { q: 'How do I reset my password?', a: 'Go to the login page and click on "Forgot Password?" to reset your password.' },
  { q: 'How do I contact support?', a: 'You can email us at support@successmithra.com or use the form below.' },
  { q: 'How do I change my profile details?', a: 'Go to your profile page and tap the edit icon to update your details.' },
];

export default function Help() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleExpand = (idx: number) => setExpanded(expanded === idx ? null : idx);
  const handleContact = (type: string) => {
    if (type === 'email') Linking.openURL('mailto:support@successmithra.com');
    if (type === 'phone') Linking.openURL('tel:+919999999999');
    if (type === 'whatsapp') Linking.openURL('https://wa.me/919999999999');
  };
  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={26} color="#3A7CA5" />
      </TouchableOpacity>
      <View style={styles.heroBanner}>
        <HelpCircle size={40} color="#fff" style={{ marginBottom: 10 }} />
        <Text style={styles.heroTitle}>Help & Support</Text>
        <Text style={styles.heroSubtitle}>We're here to help you with any questions or issues.</Text>
      </View>
      {/* Contact Options */}
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactButton} onPress={() => handleContact('email')}>
          <Mail size={22} color="#3A7CA5" />
          <Text style={styles.contactText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={() => handleContact('phone')}>
          <Phone size={22} color="#3A7CA5" />
          <Text style={styles.contactText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={() => handleContact('whatsapp')}>
          <MessageCircle size={22} color="#3A7CA5" />
          <Text style={styles.contactText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, idx) => (
          <View key={idx} style={styles.faqItem}>
            <TouchableOpacity style={styles.faqQuestionRow} onPress={() => handleExpand(idx)}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              {expanded === idx ? <ChevronUp size={18} color="#3A7CA5" /> : <ChevronDown size={18} color="#3A7CA5" />}
            </TouchableOpacity>
            {expanded === idx && <Text style={styles.faqAnswer}>{faq.a}</Text>}
          </View>
        ))}
      </View>
      {/* Support Form */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>Contact Support</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={form.name}
          onChangeText={t => setForm(f => ({ ...f, name: t }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={form.email}
          onChangeText={t => setForm(f => ({ ...f, email: t }))}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Your Message"
          value={form.message}
          onChangeText={t => setForm(f => ({ ...f, message: t }))}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{submitted ? 'Submitted!' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroBanner: {
    backgroundColor: '#3A7CA5',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  contactButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
    minWidth: 80,
  },
  contactText: {
    color: '#3A7CA5',
    fontWeight: 'bold',
    marginTop: 6,
  },
  faqSection: {
    marginHorizontal: 18,
    marginBottom: 24,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 12,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 14,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  faqAnswer: {
    marginTop: 8,
    color: '#64748b',
    fontSize: 14,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 18,
    padding: 18,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 15,
    color: '#222',
  },
  submitButton: {
    backgroundColor: '#3A7CA5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
}); 