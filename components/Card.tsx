import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CardClass from "../models/CardClass";

interface CardProps {
  card: CardClass;
  onPress: (event: GestureResponderEvent) => void;
}

export default function Card({ card, onPress }: CardProps) {
  return (
    <TouchableOpacity
      disabled={card.isMatched}
      onPress={onPress}
      style={[
        styles.cardContainer,
        {
          backgroundColor: card.isFaceUp
            ? card.backgroundColor
            : card.isMatched
            ? "#212121"
            : "#ccc",
        },
      ]}
    >
      {card.isFaceUp && <View style={styles.cardShape} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    width: 80,
    height: 120,
    borderRadius: 10,
    flexBasis: "47%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  cardShape: {
    width: 50,
    height: 50,
    borderRadius: 5,
    transform: [{ rotate: "45deg" }],
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#ccc",
  },
});
