import React, { useRef } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import type { ScrollView as RNScrollView, View as RNView } from 'react-native';
import { LineChart, ProgressChart, BarChart } from 'react-native-chart-kit';
import { TrendingUp, TrendingDown, Flame, Award, Repeat, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function Insights() {
  // Dummy data
  const exam = 'JEE';
  const weeklyQuestions = [20, 35, 40, 50, 45, 60, 70];
  const accuracy = 0.82; // 82%
  const avgTime = '1m 12s';
  const progress = '+12%';
  const subjects = {
    labels: ['Physics', 'Chemistry', 'Math'],
    datasets: [{ data: [85, 72, 91] }],
  };
  const bestTopic = 'Optics';
  const weakestTopic = 'Thermodynamics';
  const mostImprovedTopic = 'Algebra';

  // Example topic data for each section
  const bestTopics = {
    Physics: ['Optics', 'Mechanics'],
    Chemistry: ['Organic Chemistry'],
    Math: ['Algebra', 'Calculus'],
  };
  const weakestTopics = {
    Physics: ['Thermodynamics'],
    Chemistry: ['Inorganic Chemistry'],
    Math: ['Statistics'],
  };
  const improvedTopics = {
    Physics: ['Waves'],
    Chemistry: ['Physical Chemistry'],
    Math: ['Trigonometry'],
  };

  const scrollRef = useRef<RNScrollView>(null);
  const chartRef = useRef<RNView>(null);
  const handleTakeTestScroll = () => {
    if (chartRef.current && scrollRef.current) {
      // @ts-ignore
      chartRef.current.measureLayout(
        // @ts-ignore
        scrollRef.current.getInnerViewNode(),
        (x: number, y: number) => {
          scrollRef.current?.scrollTo({ y: y - 24, animated: true });
        }
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} ref={scrollRef}>
      {/* <Text style={styles.header}>Your Insights</Text>
      <Text style={styles.subtitle}>Analysis for {exam} Preparation</Text> */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Insights</Text>
        <Text style={styles.headerSubtitle}>Personalized analytics for your progress</Text>
      </View>

      <View style={styles.innercontent}>

      {/* Best/Weakest Topic & Streak */}
      {/* <View style={styles.summaryRowModern}>
        <View style={[styles.summaryCardModern, { marginRight: 8 }]}> 
          <Award size={28} color="#10b981" style={styles.summaryIconModern} />
          <Text style={styles.summaryLabelModern}>Best Topic</Text>
          <View style={styles.summaryBadgeModern}><Text style={styles.summaryBadgeTextModern}>{bestTopic}</Text></View>
        </View>
        <View style={[styles.summaryCardModern, { marginHorizontal: 8 }]}> 
          <TrendingDown size={28} color="#ef4444" style={styles.summaryIconModern} />
          <Text style={styles.summaryLabelModern}>Weakest Topic</Text>
          <View style={[styles.summaryBadgeModern, { backgroundColor: '#fff0f0' }]}><Text style={[styles.summaryBadgeTextModern, { color: '#ef4444' }]}>{weakestTopic}</Text></View>
        </View>
        <View style={[styles.summaryCardModern, { marginLeft: 8 }]}> 
          <TrendingUp size={28} color="#10b981" style={styles.summaryIconModern} />
          <Text style={styles.summaryLabelModern}>Most Improved</Text>
          <View style={[styles.summaryBadgeModern, { backgroundColor: '#f0fdf4' }]}><Text style={[styles.summaryBadgeTextModern, { color: '#10b981' }]}>{mostImprovedTopic}</Text></View>
        </View>
      </View> */}

      {/* Weekly Practice Questions Line Chart */}
      <View style={styles.cardGradient} ref={chartRef}>
        <View style={styles.cardIconRow}><Flame size={22} color="#3A7CA5" /></View>
        <Text style={styles.cardTitle}>Weekly Practice Questions</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: weeklyQuestions }],
          }}
          width={width - 48}
          height={180}
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(58, 124, 165, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(58, 124, 165, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#F4A261',
            },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* Accuracy & Average Time */}
      <View style={styles.row}>
        <View style={[styles.cardGradient, styles.flex1, { marginRight: 8 }]}> 
          <View style={styles.cardIconRow}><TrendingUp size={22} color="#F4A261" /></View>
          <Text style={styles.cardTitle}>Accuracy</Text>
          <View style={styles.accuracyChartContainer}>
            <ProgressChart
              data={{ data: [accuracy] }}
              width={width / 2 - 32}
              height={120}
              strokeWidth={10}
              radius={40}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(244, 162, 97, ${opacity})`,
              }}
              hideLegend
              style={{ marginTop: 0 }}
            />
            <Text style={styles.accuracyTextCentered}>{Math.round(accuracy * 100)}%</Text>
          </View>
        </View>
        <View style={[styles.cardGradient, styles.flex1, { marginLeft: 8, justifyContent: 'center', alignItems: 'center' }]}> 
          <View style={styles.cardIconRow}><Clock size={22} color="#3A7CA5" /></View>
          <Text style={styles.cardTitle}>Avg. Time/Qn</Text>
          <Text style={styles.statValue}>{avgTime}</Text>
          <Text style={styles.progressLabel}>Recent Progress</Text>
          <Text style={[styles.progressValue, progress.startsWith('+') ? styles.positive : styles.negative]}>{progress}</Text>
        </View>
      </View>

      {/* Subject Mastery Bar Chart */}
      <View style={styles.cardGradient}>
        <View style={styles.cardIconRow}><Award size={22} color="#10b981" /></View>
        <Text style={styles.cardTitle}>Subject Mastery</Text>
        <BarChart
          data={subjects}
          width={width - 48}
          height={180}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(58, 124, 165, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(58, 124, 165, ${opacity})`,
            propsForBackgroundLines: {
              stroke: '#E6ECF2',
            },
          }}
          style={{ borderRadius: 16 }}
          showValuesOnTopOfBars
        />
      </View>

      {/* Best, Weakest, Most Improved Topics Section */}
      <View style={styles.topicSectionModern}>
        <Text style={styles.topicSectionTitle}>Your Key Topics</Text>
        <View style={styles.topicCardsColumn}>
          {/* Best Topics Card */}
          <View style={[styles.topicCardModern, { borderColor: '#10b981', marginBottom: 16 }]}> 
            <View style={styles.topicCardHeader}><Award size={22} color="#10b981" /><Text style={[styles.topicCardTitle, { color: '#10b981' }]}>Best Topics</Text></View>
            {Object.entries(bestTopics).map(([subject, topics]) => (
              <View key={subject} style={styles.topicSubjectRow}>
                <Text style={styles.topicSubjectLabel}>{subject}</Text>
                <View style={styles.topicBadgesRow}>
                  {topics.map(topic => (
                    <View key={topic} style={styles.topicBadge}>
                      <Text style={styles.topicBadgeText}>{topic}</Text>
                      <TouchableOpacity style={styles.topicTestBtn} onPress={handleTakeTestScroll}>
                        <Text style={styles.topicTestBtnText}>Take Test</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {/* Weakest Topics Card */}
          <View style={[styles.topicCardModern, { borderColor: '#ef4444', marginBottom: 16 }]}> 
            <View style={styles.topicCardHeader}><TrendingDown size={22} color="#ef4444" /><Text style={[styles.topicCardTitle, { color: '#ef4444' }]}>Weakest Topics</Text></View>
            {Object.entries(weakestTopics).map(([subject, topics]) => (
              <View key={subject} style={styles.topicSubjectRow}>
                <Text style={styles.topicSubjectLabel}>{subject}</Text>
                <View style={styles.topicBadgesRow}>
                  {topics.map(topic => (
                    <View key={topic} style={styles.topicBadge}>
                      <Text style={styles.topicBadgeText}>{topic}</Text>
                      <TouchableOpacity style={styles.topicTestBtn} onPress={handleTakeTestScroll}>
                        <Text style={styles.topicTestBtnText}>Take Test</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {/* Most Improved Topics Card */}
          <View style={[styles.topicCardModern, { borderColor: '#10b981' }]}> 
            <View style={styles.topicCardHeader}><TrendingUp size={22} color="#10b981" /><Text style={[styles.topicCardTitle, { color: '#10b981' }]}>Most Improved</Text></View>
            {Object.entries(improvedTopics).map(([subject, topics]) => (
              <View key={subject} style={styles.topicSubjectRow}>
                <Text style={styles.topicSubjectLabel}>{subject}</Text>
                <View style={styles.topicBadgesRow}>
                  {topics.map(topic => (
                    <View key={topic} style={styles.topicBadge}>
                      <Text style={styles.topicBadgeText}>{topic}</Text>
                      <TouchableOpacity style={styles.topicTestBtn} onPress={handleTakeTestScroll}>
                        <Text style={styles.topicTestBtnText}>Take Test</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  innercontent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#3A7CA5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 18,
    fontFamily: 'Inter-Regular',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardGradient: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
    // elevation: 2,
  },
  cardIconRow: {
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 13,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 18,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  flex1: {
    flex: 1,
  },
  accuracyText: {
    display: 'none',
  },
  accuracyChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 8,
    marginBottom: 8,
  },
  accuracyTextCentered: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    color: '#3A7CA5',
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 28,
    color: '#F4A261',
    fontFamily: 'Inter-Bold',
    marginVertical: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Inter-Regular',
    marginTop: 8,
  },
  progressValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ff6b6b',
  },
  summaryRowModern: {
    flexDirection: 'row',
    marginBottom: 18,
    gap: 0,
  },
  summaryCardModern: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e6ecf2',
  },
  summaryIconModern: {
    marginBottom: 6,
  },
  summaryLabelModern: {
    fontSize: 13,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  summaryBadgeModern: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 2,
  },
  summaryBadgeTextModern: {
    fontSize: 15,
    color: '#10b981',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  topicSectionModern: {
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  topicSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 14,
    textAlign: 'center',
  },
  topicCardsColumn: {
    flexDirection: 'column',
    gap: 0,
  },
  topicCardModern: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 2,
    padding: 16,
    marginHorizontal: 2,
    shadowColor: '#3A7CA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  topicCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  topicCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  topicSubjectRow: {
    marginBottom: 8,
  },
  topicSubjectLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  topicBadgesRow: {
    marginBottom: 2,
  },
  topicBadge: {
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    width: '100%',
  },
  topicBadgeText: {
    fontSize: 15,
    color: '#3A7CA5',
    fontWeight: 'bold',
  },
  topicTestBtn: {
    backgroundColor: '#F4A261',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 2,
  },
  topicTestBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
}); 