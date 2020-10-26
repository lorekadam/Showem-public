import React, { useContext } from "react";
import Box from "../Restyle/Box";
import Text from "../Restyle/Text";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStore";
import { teamColors } from "../../globals";
import { Theme } from "../../styled/theme";

const Groups = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { gameStore, userStore } = rootStore;
  const { teams } = gameStore;
  return (
    <Box>
      {teams.map((team, i) => (
        <Box
          key={i}
          borderWidth={2}
          borderRadius="l"
          padding="m"
          marginBottom="m"
          borderColor={teamColors[i].name as keyof Theme["colors"]}
          alignItems="center"
        >
          <Text
            color={teamColors[i].name as keyof Theme["colors"]}
            marginBottom="s"
          >
            {userStore.t(teamColors[i].name)}
          </Text>
          {team.map((team, i) => (
            <Text variant="heading" key={i}>
              {team.text}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  );
});

export default Groups;

// <Group color={colors && teamColors[i].color} key={i}>
//   {colors && <Text>Drużyna {teamColors[i].name}</Text>}
// </Group>
