export type PlayerType = "ATK" | "DEF";
export type ScreenType = "main" | "about" | "settings";

export type DieType = { value: number; active: boolean; defeated: boolean };
export type RollType = {
  atk: DieType[];
  def: DieType[];
  numAtkDefeated: number;
  numDefDefeated: number;
  timeStamp?: number;
};
export type MessageType = { message: string; color: "red" | "blue" };
