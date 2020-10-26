import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStore";
import { withNavigation, ScrollView } from "react-navigation";
import { NavigationProps, SingleOption } from "../../types";
import { GAME } from "../../screens";
import BasicView from "../../screens/BasicView";
import ScreenPanelBox from "../../screens/ScreenPanelBox";
import ScreenPanelHeading from "../../screens/ScreenPanelHeading";
import Box from "../Restyle/Box";
import Grid from "../Restyle/Grid";
import Text from "../Restyle/Text";
import { useEffect } from "react";
import Groups from "./Groups";
import Button from "../Restyle/Button";
import { useState } from "react";

interface Props extends NavigationProps {}

const GameTeams = observer((props: Props) => {
  const [randomShots, setRandomShots] = useState(2);
  const rootStore = useContext(RootStoreContext);
  const { gameStore, timerStore, userStore } = rootStore;

  const setTeams = (teams: SingleOption[][]) => {
    gameStore.teams = teams;
  };

  const startGame = () => {
    gameStore.startGame();
    timerStore.stopTimer();
    props.navigation.navigate(GAME);
  };

  const resumeGame = () => {
    props.navigation.navigate(GAME);
  };

  const makeTeams = () => {
    const teams: SingleOption[][] = [];
    const source = [...gameStore.players];
    let team = 0;
    for (let i = 0; i < gameStore.players.length; i++) {
      const optionIndex = Math.floor(Math.random() * source.length);
      if (teams[team] === undefined) {
        teams[team] = [];
      }
      teams[team].push(source[optionIndex]);
      team++;
      source.splice(optionIndex, 1);
      if (team === gameStore.teamsAmount) {
        team = 0;
      }
    }
    setTeams(teams);
  };

  const randomAgain = () => {
    setRandomShots(randomShots - 1);
    makeTeams();
  };

  useEffect(() => {
    makeTeams();
  }, []);

  return (
    <BasicView backgroundColor="screenBackground" back home language light>
      <ScreenPanelHeading>
        <Grid variant="row" justifyContent="center">
          <Text variant="headingLight">{userStore.t("letsPlay")}</Text>
        </Grid>
      </ScreenPanelHeading>
      <ScreenPanelBox>
        <ScrollView>
          <Box padding="l" position="relative">
            {gameStore.teams.length > 0 && (
              <>
                <Groups />
                {gameStore.gameStarted ? (
                  <Button
                    variant="secondary"
                    onPress={resumeGame}
                    label={userStore.t("resumeGame")}
                  />
                ) : (
                  <>
                    <Button
                      variant="primary"
                      marginBottom="s"
                      onPress={randomAgain}
                      label={userStore.t("rollTeamsAgain")}
                      disabled={randomShots === 0}
                    />
                    <Button
                      variant="secondary"
                      onPress={startGame}
                      label={userStore.t("startGame")}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </ScrollView>
      </ScreenPanelBox>
    </BasicView>
  );
});

export default withNavigation(GameTeams);
