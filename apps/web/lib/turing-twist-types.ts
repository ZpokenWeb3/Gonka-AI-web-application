export type TuringTwistMessage = {
  id: string;
  from: "you" | "opponent" | "ai" | "system";
  text: string;
  time: number;
  movesLeft?: number;
};

