import React from "react";
import { teamColors } from "../../globals";
import { Theme } from "../../styled/theme";
import Box from "../Restyle/Box";
import Grid from "../Restyle/Grid";
import Text from "../Restyle/Text";

interface Props {
  score: number[];
  activeTeam: number;
  activeTurn: boolean;
}

export const TeamsScore = (props: Props) => {
  return (
    <Grid variant="row" marginLeft="l" justifyContent="flex-end">
      {props.score.map((score, team) => {
        const color = teamColors[team].color;
        const isActive = props.activeTeam === team && props.activeTurn;
        return (
          <Box key={color} flex={1} marginHorizontal="xxs" maxWidth={70}>
            <Box
              padding="s"
              backgroundColor={teamColors[team].name as keyof Theme["colors"]}
              borderRadius="l"
              alignItems="center"
              shadowColor="black"
              borderWidth={2}
              borderColor={isActive ? "textLight" : "screenBackground"}
            >
              <Text color="white">{score}</Text>
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
};

export default TeamsScore;
