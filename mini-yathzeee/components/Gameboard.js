import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
  SCOREBOARD_KEY
} from "../constants/Game";
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../Style/style";
import { setStatusBarStyle } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

let board = [];

export default Gameboard = ({ navigation, route }) => {
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Throw dices");
  const [gameEndStatus, setGameEndStatus] = useState(false);
  // Mitkä nopat ovat kiinnitetty
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  // Noppien silmäluvut
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  // Onko silmäluvulle valittu pisteet
  const [selectedDicePoints, setSelectedDicePoints] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  // Kerätyt pisteet
  const [dicePointsTotal, setDicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0));
  // Tulostaulun pisteet
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"dice" + dice}>
        <Pressable key={"dice" + dice} onPress={() => selectDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50}
            color={getDiceColor(dice)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          key={"buttonsRow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        let nbrOfDices = diceSpots.reduce(
          (total, x) => (x === i + 1 ? total + 1 : total),
          0
        );
        points[i] = nbrOfDices * (i + 1);
        selectedPoints[i] = true;
      } else {
        setStatus("You already selected points for " + (i + 1));
      }
      setDicePointsTotal(points);
      setSelectedDicePoints(selectedPoints);
    } else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points");
    }
  };

  const savePlayerPoints = async () => {
    const newKey = scores.length + 1;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const playerPoints = {
      key: newKey,
      name: playerName,
      date: formattedDate,
      time: formattedTime,
      points: dicePointsTotal.reduce((total, points) => total + points, 0),
    };
    try {
      const newScore = [...scores, playerPoints];
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
      setNbrOfThrowsLeft(NBR_OF_THROWS);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setDiceSpots(new Array(NBR_OF_DICES).fill(0));
      setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
      setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    } catch (e) {
      console.log("Save error: " + e);
    }
  }

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
  }

  const throwDices = () => {
    console.log("Throwing dices. Throws left:", nbrOfThrowsLeft);
    if (nbrOfThrowsLeft === 0 && gameEndStatus) {
      console.log("Game reset.");
      setGameEndStatus(false);
      diceSpots.fill(0);
      dicePointsTotal.fill(0);
      setNbrOfThrowsLeft(NBR_OF_THROWS);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } else if (nbrOfThrowsLeft === 0) {
      console.log("Select points before the next throw.");
      setStatus("Select your points before the next throw");
    } else {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = "dice-" + randomNumber;
          spots[i] = randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setDiceSpots(spots);
      setStatus("Select and throw dices again");
    }
  };

  useEffect(() => {
    if (nbrOfThrowsLeft === 0) {
      const totalPoints = dicePointsTotal.reduce((total, points) => total + points, 0);
      console.log("Total points:", totalPoints);
      setDicePointsTotal(new Array(MAX_SPOT).fill(0));
      setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    }
  }, [nbrOfThrowsLeft]);

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first.");
    }
  };

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] && !gameEndStatus ? "black" : "steelblue";
  }

  return (
    <>
      <Header />
      <View style={styles.centeredContainer}>
      <MaterialCommunityIcons
          name="dice-multiple"
          size={90}
          color="gray"
        />
        <Container fluid>
          <Row>{dicesRow}</Row>
        </Container>
        <Text style={styles.centeredText}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.centeredText}>{status}</Text>
        <Pressable onPress={() => throwDices()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>THROW DICES</Text>
        </Pressable>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Pressable onPress={() => savePlayerPoints()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SAVE POINTS</Text>
        </Pressable>
        <Text style={styles.centeredText}>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  );
};
