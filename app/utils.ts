import { AsyncStorage, Dimensions, PixelRatio } from "react-native";
import { LocalizationKeys, en } from "./localization";

import { ApolloError } from "apollo-client";
import { MOVIES } from "./globals";

export const apolloServer = __DEV__
  ? "http://192.168.1.118:4000/graphql"
  : "http://kalambury.adamlorek.usermd.net/graphql";
export const apolloRefresh = __DEV__
  ? "http://192.168.1.118:4000/refresh_token"
  : "http://kalambury.adamlorek.usermd.net/refresh_token";

export const IndexKeyExtractor = (item: any, index: number) => `${index}`;

export const widthPtoDP = (widthPercent: number) => {
  const screenWidth = Dimensions.get("window").width;
  const elemWidth = widthPercent;
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPtoDP = (heightPercent: number) => {
  const screenHeight = Dimensions.get("window").height;
  const elemHeight = heightPercent;
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const widthPtoDPpx = (widthPercent: number) => {
  return `${widthPtoDP(widthPercent)}px`;
};

export const widthPtoDPp = (widthPercent: number) => {
  return `${widthPtoDP(widthPercent)}%`;
};

export const heightPtoDPpx = (heightPercent: number) => {
  return `${heightPtoDP(heightPercent)}px`;
};

export const heightPtoDPp = (heightPercent: number) => {
  return `${heightPtoDP(heightPercent)}%`;
};

export const getCategoryList = (category) => {
  switch (category) {
    case MOVIES:
      return require("../assets/movie.json");
  }
};

export const setTokens = async (
  access_token: string,
  refresh_token: string
) => {
  await AsyncStorage.setItem("accessToken", access_token);
  await AsyncStorage.setItem("refreshToken", refresh_token);
};

export const lang = (language: string) => {
  return language === 'de' ? "GER" : language.toUpperCase();
};

export const returnArrayIds = (data: { id: string }[], key?: string) => {
  const ids = {};
  data.forEach((item) => {
    const id = key ? item[key].id : item.id;
    ids[id] = true;
  });
  return ids;
};

export const windowWidth = (percent?: number) => {
  return percent
    ? Dimensions.get("window").width * percent
    : Dimensions.get("window").width;
};

export const windowHeight = (percent?: number) => {
  return percent
    ? Dimensions.get("window").height * percent
    : Dimensions.get("window").height;
};

export const validateEmail = (string: string) => {
  const pattern = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return pattern.test(string);
};

export const getQlError = (error: ApolloError) => {
  const replaced = error.message.replace("GraphQL error: ", "");
  console.log("getQLError ", error.message);
  if (en[replaced]) {
    return replaced;
  } else {
    return "somethingWrong" as keyof LocalizationKeys;
  }
};
