import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { DataTable } from "react-native-paper";
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../Style/style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default Scoreboard = ({ navigation}) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
      }
    } catch (e) {
      console.log("Save error: " + e);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.clear();
      setScores([]);
    } catch (e) {
      console.log('clear error: ' + e);
    }
  };

  return (
    <>
      <Header />
      <View>
      <MaterialCommunityIcons
          name="view-list"
          size={90}
          color="steelblue"
        />
        <Text style={[styles.centeredText, styles.title2]}>Top Seven</Text>
        { scores.length === 0 ?
        <Text style={styles.centeredText}>Scoreboard is empty</Text>
        :
        scores.map((player, index) => (
          index < NBR_OF_SCOREBOARD_ROWS &&
          <DataTable.Row key ={player.key}>
            <DataTable.Cell><Text style={styles.centeredText2}>{index + 1}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.centeredText2}>{player.name}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.centeredText2}>{player.date}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.centeredText2}>{player.time}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.centeredText2}>{player.points}</Text></DataTable.Cell>
          </DataTable.Row>
        ))
        }
      </View>
      <View style>
        <Pressable
         onPress={() => clearScoreboard()} style={styles.buttonContainer2}>
          <Text style={styles.buttonText}>CLEAR SCOREBOARD</Text>
         </Pressable>
      </View>
      <Footer />
    </>
  );
};
