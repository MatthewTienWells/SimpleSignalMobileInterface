import * as React from 'react';
import { Button, View, StyleSheet, Image, Pressable, Table, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function GroupPanel() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title><Text>Your Groups:</Text></DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell><Pressable style={{backgroundColor: "#00FFFF", borderRadius:50, height: 20, width: 20}} onPress={() => navigation.navigate('Signal', {groupNum: 1})}></Pressable></DataTable.Cell>
        <DataTable.Cell><Pressable style={styles.button}><Text style={styles.text}>OC Raiders</Text></Pressable></DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell><Pressable style={{backgroundColor: "#FF00FF", borderRadius:50, height: 20, width: 20}} onPress={() => navigation.navigate('Signal', {groupNum: 2})}></Pressable></DataTable.Cell>
        <DataTable.Cell><Pressable style={styles.button}><Text style={styles.text}>Movers and Makers</Text></Pressable></DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell><Pressable style={{backgroundColor: "#FFFF00", borderRadius:50, height: 20, width: 20}} onPress={() => navigation.navigate('Signal', {groupNum: 3})}></Pressable></DataTable.Cell>
        <DataTable.Cell><Pressable style={styles.button}><Text style={styles.text}>The Order of the Triangle</Text></Pressable></DataTable.Cell>
      </DataTable.Row>
    </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 24,
    flexWrap: "wrap",
    overflowY: "scroll",
    height: 500,
    backgroundColor: "#DDDDDD",
  },
  button: {
    height: 35,
    width: 140,
  },
  circle: {
    borderRadius:50,
    height: 20,
    width: 20,
    backgroundColor: "#0000FF",
  },
  table: {
    position: "relative",
    top: 0,
    left: 0,
  },
  text: {
    color: "#000000",
  }
});
