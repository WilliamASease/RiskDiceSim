import { PlayerType } from "../types/types";
import { Image } from "react-native";
import { rollDie } from "../util/math";

export const DieImage = (props: { player?: PlayerType; value?: number }) => {
  const { player, value } = props;

  let req: NodeRequire | undefined = undefined;
  switch (`${player}${value}`) {
    case "ATK1":
      req = require(`../assets/atk1.png`);
      break;
    case "ATK2":
      req = require(`../assets/atk2.png`);
      break;
    case "ATK3":
      req = require(`../assets/atk3.png`);
      break;
    case "ATK4":
      req = require(`../assets/atk4.png`);
      break;
    case "ATK5":
      req = require(`../assets/atk5.png`);
      break;
    case "ATK6":
      req = require(`../assets/atk6.png`);
      break;
    case "DEF1":
      req = require(`../assets/def1.png`);
      break;
    case "DEF2":
      req = require(`../assets/def2.png`);
      break;
    case "DEF3":
      req = require(`../assets/def3.png`);
      break;
    case "DEF4":
      req = require(`../assets/def4.png`);
      break;
    case "DEF5":
      req = require(`../assets/def5.png`);
      break;
    case "DEF6":
      req = require(`../assets/def6.png`);
      break;
  }

  return (
    <Image
      source={req ?? require(`../assets/baseDie.png`)}
      style={{
        margin: 5,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
      }}
    />
  );
};
