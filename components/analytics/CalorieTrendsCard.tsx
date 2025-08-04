import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CalorieData } from '@/types/nutrition';

interface CalorieTrendsCardProps {
  data: CalorieData[];
  title?: string;
  style?: any;
  onDataPointClick?: (data: any) => void;
}

const screenWidth = Dimensions.get('window').width;

export function CalorieTrendsCard({ 
  data, 
  title = "Calorie Trends", 
  style,
  onDataPointClick 
}: CalorieTrendsCardProps) {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: data.map((item, index) => ({
      data: item.data,
      color: (opacity = 1) => item.color,
      strokeWidth: 3,
      withDots: false,
    })),
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.6})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.8})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    paddingLeft: 25, // Reduce left padding
    paddingRight: 15, // Reduce right padding
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(255, 255, 255, 0.2)',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '400',
    },
    // Adjust Y-axis label positioning
    yAxisLabel: '',
    yAxisSuffix: '',
    yAxisInterval: 1,
    yLabelsOffset: 10, // Reduce offset to bring labels closer
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.chartArea}>
        <LineChart
          data={chartData}
          width={screenWidth - 60}
          height={200}
          chartConfig={chartConfig}
          bezier={true}
          style={styles.chart}
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={false}
          yAxisSuffix=""
          yAxisInterval={1}
          onDataPointClick={onDataPointClick}
        />
      </View>

      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#a855f7',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
  },
  chartArea: {
    height: 200,
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingLeft: 10, // Reduce left padding for Y-axis labels
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '400',
    flexShrink: 1,
  },
}); 