import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Clock, ArrowRight, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  chapter: string;
}

interface PracticeScreenProps {
  questions: Question[];
  title: string;
  timeLimit: number; // in seconds
  onComplete: (results: any) => void;
}

export default function PracticeScreen({ questions, title, timeLimit, onComplete }: PracticeScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showExplanation, setShowExplanation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    const correct = Object.entries(selectedAnswers).filter(
      ([questionIndex, answer]) => questions[parseInt(questionIndex)].correctAnswer === answer
    ).length;

    const results = {
      totalQuestions: questions.length,
      attempted: Object.keys(selectedAnswers).length,
      correct,
      percentage: Math.round((correct / questions.length) * 100),
      timeSpent: timeLimit - timeLeft,
      answers: selectedAnswers
    };

    onComplete(results);
  };

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isAnswered = selectedAnswer !== undefined;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#3A7CA5' }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.questionNumber}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </View>
          <View style={styles.timer}>
            <Clock size={20} color="#ffffff" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / questions.length) * 100}%`, backgroundColor: '#ffffff' }
              ]} 
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.subjectText}>{question.subject} • {question.chapter}</Text>
          </View>
          
          <Text style={styles.questionText}>{question.question}</Text>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showExplanation;
              
              let optionStyle = styles.option;
              let optionTextStyle = styles.optionText;
              
              if (showResult) {
                if (isCorrect) {
                  optionStyle = styles.optionCorrect;
                  optionTextStyle = styles.optionTextCorrect;
                } else if (isSelected && !isCorrect) {
                  optionStyle = styles.optionWrong;
                  optionTextStyle = styles.optionTextWrong;
                }
              } else if (isSelected) {
                optionStyle = styles.optionSelected;
                optionTextStyle = styles.optionTextSelected;
              }
              
              return (
                <TouchableOpacity
                  key={index}
                  style={optionStyle}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionLetter}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                    <Text style={optionTextStyle}>{option}</Text>
                    {showResult && isCorrect && (
                      <CheckCircle size={20} color="#10b981" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle size={20} color="#ef4444" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {showExplanation && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, { opacity: currentQuestion === 0 ? 0.5 : 1 }]}
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          {isAnswered && !showExplanation ? (
            <TouchableOpacity
              style={styles.showExplanationButton}
              onPress={() => setShowExplanation(true)}
            >
              <Text style={styles.showExplanationText}>Show Explanation</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={[
              styles.nextButton,
              { opacity: !isAnswered && !showExplanation ? 0.5 : 1 }
            ]}
            onPress={handleNext}
            disabled={!isAnswered && !showExplanation}
          >
            <View style={[styles.nextButtonGradient, { backgroundColor: '#F4A261' }]}>
              <Text style={[styles.nextButtonText, { color: '#1e293b' }]}>
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </Text>
              <ArrowRight size={16} color="#1e293b" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  questionNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  questionHeader: {
    marginBottom: 16,
  },
  subjectText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    lineHeight: 26,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  optionSelected: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff',
  },
  optionCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  optionWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLetter: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
    marginRight: 12,
    minWidth: 20,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
    flex: 1,
    lineHeight: 22,
  },
  optionTextSelected: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
    flex: 1,
    lineHeight: 22,
  },
  optionTextCorrect: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
    flex: 1,
    lineHeight: 22,
  },
  optionTextWrong: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    flex: 1,
    lineHeight: 22,
  },
  explanationContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  explanationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 24,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  showExplanationButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#667eea',
  },
  showExplanationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginRight: 8,
  },
});