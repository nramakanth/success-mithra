import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
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
  const streak = 5;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Text style={styles.header}>Your Insights</Text>
      <Text style={styles.subtitle}>Analysis for {exam} Preparation</Text> */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Insights</Text>
        <Text style={styles.headerSubtitle}>Personalized analytics for your progress</Text>
      </View>

      <View style={styles.innercontent}>

      {/* Best/Weakest Topic & Streak */}
      <View style={styles.row}>
        <View style={[styles.cardGradient, styles.flex1, { marginRight: 8 }]}> 
          <View style={styles.cardIconRow}><Award size={22} color="#10b981" /></View>
          <Text style={styles.cardLabel}>Best Topic</Text>
          <Text style={styles.cardValue}>{bestTopic}</Text>
        </View>
        <View style={[styles.cardGradient, styles.flex1, { marginLeft: 8 }]}> 
          <View style={styles.cardIconRow}><TrendingDown size={22} color="#ef4444" /></View>
          <Text style={styles.cardLabel}>Weakest Topic</Text>
          <Text style={styles.cardValue}>{weakestTopic}</Text>
        </View>
        <View style={[styles.cardGradient, styles.flex1, { marginLeft: 8 }]}> 
          <View style={styles.cardIconRow}><Repeat size={22} color="#F4A261" /></View>
          <Text style={styles.cardLabel}>Streak</Text>
          <Text style={styles.cardValue}>{streak} days</Text>
        </View>
      </View>

      {/* Weekly Practice Questions Line Chart */}
      <View style={styles.cardGradient}>
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
}); 