import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <Text style={styles.title}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
}); 