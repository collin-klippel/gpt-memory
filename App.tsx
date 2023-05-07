import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import shuffleArray from "./utils/shuffleArray";
import cards from "./cards";
import Card from "./components/Card";
import CardClass from "./models/CardClass";

const initialShuffledCards = shuffleArray(cards);

export default function App(): JSX.Element {
  // This is the updated card set as matches are found.
  const [stableGameCards, setStableGameCards] = useState(initialShuffledCards);
  // This is the "in progress" card set with `isFaceUp` toggles.
  const [gameCards, setGameCards] = useState(initialShuffledCards);

  /**
   * Set app state to a new shuffled version of the card stock.
   */
  const reset = (shuffledCards = shuffleArray(cards)): void => {
    setGameCards(shuffledCards);
    setStableGameCards(shuffledCards);
  };

  /**
   * Check to see if two `isFaceUp` cards have the same `backgroundColor`. If so, remove
   * them from the card set.
   *
   * If the game is over, reset it. Otherwise go back to the last stable version.
   */
  const handleSecondCardPress = (newGameCards: CardClass[]): void => {
    setTimeout(() => {
      const [firstFaceUpCard, secondFaceUpCard] = newGameCards.filter(
        (card) => card.isFaceUp
      );

      // Check for a match
      if (firstFaceUpCard.matchProperty === secondFaceUpCard.matchProperty) {
        const unMatchedCards = newGameCards.filter((card) => !card.isMatched);

        // Check for GAME OVER and start again
        if (unMatchedCards.length === 2) {
          reset();
        } else {
          const newerGameCards = newGameCards.map((card) => {
            const isMatchingFaceUpCard =
              card.matchProperty === firstFaceUpCard.matchProperty;
            return {
              ...card,
              isMatched: isMatchingFaceUpCard ? true : card.isMatched,
              isFaceUp: isMatchingFaceUpCard ? false : card.isFaceUp,
            };
          });
          setGameCards(newerGameCards);
          setStableGameCards(newerGameCards);
        }
      } else {
        // No match, go back to last saved version
        setGameCards(stableGameCards);
      }
    }, 250);
  };

  /**
   * Generates the new object representation of the cards by turning
   * the clicked one face up.
   *
   * If a card is already flipped, schedules a function to run after a
   * timeout that checks for a match.
   */
  const handleCardPress = (clickedCard): void => {
    const cardAlreadyFlipped = gameCards.some((card) => card.isFaceUp);

    // Flip the card that was clicked by toggling `isFaceUp`, making a copy of
    // each card object in the process to avoid mutation bugs.
    const newGameCards: CardClass[] = gameCards.map((card) => {
      return {
        ...card,
        isFaceUp: card.id === clickedCard.id ? true : card.isFaceUp,
      };
    });

    // Set new cards right away so the user sees both face up.
    setGameCards(newGameCards);

    // If we have two face up cards, schedule callback to check for a match
    if (cardAlreadyFlipped) {
      handleSecondCardPress(newGameCards);
    }
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>GPT Memory</Text>
      <Text style={styles.description}>
        A cross-platform memory game app created in 2 hours with help from
        ChatGPT.
      </Text>
      <View style={styles.gameBoard}>
        {gameCards.map((card) => (
          <Card
            card={card}
            onPress={() => handleCardPress(card)}
            key={card.id}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 16,
    maxWidth: 500,
    margin: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
  description: {
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
    fontSize: 12,
  },
  gameBoard: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
