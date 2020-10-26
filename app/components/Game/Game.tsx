import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStore";
import { teamColors, AS_MANY_PER_ROUND } from "../../globals";
import { withNavigation } from "react-navigation";
import { NavigationProps } from "../../types";
import { WIN } from "../../screens";
import ScreenPanelBox from "../../screens/ScreenPanelBox";
import ScreenPanelHeading from "../../screens/ScreenPanelHeading";
import Grid from "../Restyle/Grid";
import BasicView from "../../screens/BasicView";
import Text from "../Restyle/Text";
import { TeamsScore } from "./TeamsScore";
import Box from "../Restyle/Box";

import IllustrationWord from "../../../assets/img/drawable/ilustration_word.svg";
import { Theme } from "../../styled/theme";
import Button from "../Restyle/Button";
import Timer from "./Timer";
import { lang } from "../../utils";
import Animated, { Clock, Easing } from "react-native-reanimated";
import { timing, TimingParams } from "react-native-redash";

interface Props extends NavigationProps {}

export const Game = observer((props: Props) => {
  const rootStore = useContext(RootStoreContext);
  const { userStore, gameStore, timerStore } = rootStore;
  const language = lang(userStore.language);
  const [progress, setProgress] = useState<Animated.Node<number>>();

  useEffect(() => {
    if (timerStore.isRunning) {
      const seconds = gameStore.time * 60;
      const config: TimingParams = {
        clock: new Clock(),
        from: 0,
        to: 1,
        duration: (seconds - (seconds - timerStore.seconds)) * 1000,
        easing: Easing.linear,
      };
      setProgress(timing(config));
    }
  }, [timerStore.isRunning, props.navigation.isFocused()]);

  useEffect(() => {
    if (timerStore.seconds > 0) {
      timerStore.startTimer();
    }
    return () => {
      timerStore.pauseTimer();
    };
  }, [props.navigation.isFocused()]);

  useEffect(() => {
    if (timerStore.seconds === 0 && timerStore.isRunning) {
      checkForWin(gameStore.countType === AS_MANY_PER_ROUND);
    }
  }, [timerStore.seconds, timerStore.isRunning]);

  const start = () => {
    timerStore.stopTimer();
    random();
    gameStore.reroll = true;
    timerStore.startTimer(gameStore.time * 60);
  };

  const random = () => {
    const randomWordIndex = Math.floor(
      Math.random() * gameStore.gameWords.length
    );
    const randomWord = gameStore.gameWords.splice(randomWordIndex, 1)[0];
    gameStore.usedGameWords.push(randomWord);
    gameStore.randomWord = randomWord;
  };

  const setNextUserTurn = () => {
    const team = gameStore.userTurn.team;
    const allTeams = gameStore.teams;
    let newTeam: number;
    let newUser: number;

    if (team + 1 < allTeams.length) {
      newTeam = team + 1;
    } else {
      gameStore.round = gameStore.round + 1;
      newTeam = 0;
    }
    const whichUser = gameStore.round % allTeams[newTeam].length;
    if (whichUser === 0) {
      newUser = allTeams[newTeam].length - 1;
    } else {
      newUser = whichUser - 1;
    }
    gameStore.userTurn = {
      team: newTeam,
      user: newUser,
    };
  };

  const checkForWin = (manyPerRound = false) => {
    const { userTurn, teams, score, whenWin } = gameStore;
    const { team } = userTurn;
    if (gameStore.gameWords.length === 0) {
      const winningTeams = [];
      const highest = Math.max(...score);
      score.forEach((single, i) => {
        if (single === highest) {
          winningTeams.push(i);
        }
      });
      if (winningTeams.length > 0) {
        gameStore.gameStarted = false;
        gameStore.winners = winningTeams;
        props.navigation.navigate(WIN);
      }
    } else {
      const checkAllTeams = () => {
        const winningTeams = [];
        score.forEach((single, i) => {
          if (single === whenWin) {
            winningTeams.push(i);
          }
        });
        if (winningTeams.length > 0) {
          gameStore.gameStarted = false;
          gameStore.winners = winningTeams;
          props.navigation.navigate(WIN);
        }
      };

      if (manyPerRound) {
        if (team + 1 === teams.length) {
          if (score[team] === whenWin) {
            checkAllTeams();
          } else {
            if (timerStore.seconds === 0) {
              timerStore.stopTimer();
              setNextUserTurn();
              checkAllTeams();
            } else {
              random();
            }
          }
        } else {
          if (team + 1 !== teams.length) {
            if (score[team] === whenWin || timerStore.seconds === 0) {
              timerStore.stopTimer();
              setNextUserTurn();
            } else {
              random();
            }
          }
        }
      } else {
        timerStore.stopTimer();
        setNextUserTurn();
        if (team + 1 === teams.length) {
          checkAllTeams();
        }
      }
    }
  };

  const goodAnswer = () => {
    if (timerStore.seconds > 0) {
      const team = gameStore.userTurn.team;
      const newScore = gameStore.score[team] + 1;
      gameStore.score[team] = newScore;
      checkForWin(gameStore.countType === AS_MANY_PER_ROUND);
    }
  };

  const change = () => {
    gameStore.reroll = false;
    random();
  };

  if (!gameStore.gameStarted) {
    return null;
  }

  return (
    <BasicView backgroundColor="screenBackground" back language light>
      <ScreenPanelHeading>
        <Grid variant="row">
          <Grid variant="column">
            <Text variant="headingLight">
              {!timerStore.isRunning
                ? `${userStore.t("round")} ${gameStore.round}`
                : gameStore.teams[gameStore.userTurn.team][
                    gameStore.userTurn.user
                  ].text}
            </Text>
          </Grid>
          <Grid variant="element" flex={1}>
            <TeamsScore
              activeTeam={gameStore.userTurn.team}
              score={gameStore.score}
              activeTurn={timerStore.isRunning}
            />
          </Grid>
        </Grid>
      </ScreenPanelHeading>
      <ScreenPanelBox>
        <Box padding="l" alignItems="center" justifyContent="center" flex={1}>
          {!timerStore.isRunning ? (
            <>
              <Box marginBottom="l">
                <IllustrationWord height="210" />
              </Box>
              <Box marginBottom="xl" width="100%" alignItems="center">
                <Text
                  fontSize={12}
                  color={
                    teamColors[gameStore.userTurn.team]
                      .name as keyof Theme["colors"]
                  }
                >
                  {userStore.t(teamColors[gameStore.userTurn.team].name)}
                </Text>
                <Text fontSize={22}>
                  {
                    gameStore.teams[gameStore.userTurn.team][
                      gameStore.userTurn.user
                    ].text
                  }
                </Text>
              </Box>
              <Box width="100%">
                <Button
                  variant="secondary"
                  onPress={start}
                  label={userStore.t("randomWord")}
                />
              </Box>
            </>
          ) : (
            <>
              <Text variant="heading" marginBottom="xs" textAlign="center">
                {gameStore.randomWord.translate[language]}
              </Text>
              <Text fontSize={12} color="textPrimary">
                {userStore.t("category")}{" "}
                {gameStore.randomWord.category.translate[language]}
              </Text>
              <Text fontSize={12} color="textPrimary" marginBottom="l">
                {userStore.t("words")}{" "}
                {
                  gameStore.randomWord.translate[language]
                    .replace(/[&\/\\#,\-\=\!+()$~%.'":*?<>{}]/g, "")
                    .replace(/ +(?= )/g, "")
                    .split(" ").length
                }
              </Text>
              <Box marginBottom="xl">
                <Timer
                  time={timerStore.display}
                  progress={progress}
                  seconds={timerStore.seconds}
                />
              </Box>
              <Button
                variant="transparentWrapper"
                onPress={change}
                marginBottom="m"
              >
                {gameStore.reroll && gameStore.gameWords.length >= 1 && (
                  <Text variant="textDarkUnderlineSmall" fontWeight="bold">
                    {userStore.t("replaceWordOnce")}
                  </Text>
                )}
              </Button>
              <Box width="100%">
                <Button
                  variant="secondary"
                  onPress={goodAnswer}
                  label={userStore.t("correct")}
                />
              </Box>
            </>
          )}
        </Box>
      </ScreenPanelBox>
    </BasicView>
  );
});

export default withNavigation(Game);
