import React, { useContext, useState } from "react";

import Button from "../Restyle/Button";
import Grid from "../Restyle/Grid";
import Modal from "./Modal";
import Radio from "../Restyle/Radio";
import { RootStoreContext } from "../../stores/RootStore";
import Text from "../Restyle/Text";
import { fullLanguages } from "../../localization";
import { lang } from "../../utils";
import { observer } from "mobx-react-lite";

interface Props {
  light?: boolean;
}

export const LanguagesSwitch = observer((props: Props) => {
  const [modal, setModal] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { userStore } = rootStore;
  const language = lang(userStore.language);
  const toggleModal = () => {
    setModal(!modal);
  };

  const changeLanguage = (language: string) => {
    userStore.language = language;
    toggleModal();
  };

  return (
    <React.Fragment>
      <Button
        onPress={toggleModal}
        variant="transparentCircle"
        textVariant={props.light ? "textLight" : "textDark"}
        label={language === "GER" ? "DE" : language}
        marginRight="s"
      />
      <Modal visible={modal} toggleModal={toggleModal}>
        <Text variant="modalHeader" marginBottom="s">
          {userStore.t("changeLanguage")}
        </Text>
        {fullLanguages.map((language, i) => {
          const active = userStore.language === language.id;
          return (
            <Button
              variant="transparentWrapper"
              key={language.id}
              onPress={() => changeLanguage(language.id)}
            >
              <Grid variant="row" alignItems="center" marginBottom="s">
                <Radio variant={active ? "primary" : "inactive"} />
                <Text variant={active ? "textPrimary" : "textDark"}>
                  {language.full}
                </Text>
              </Grid>
            </Button>
          );
        })}
      </Modal>
    </React.Fragment>
  );
});

export default LanguagesSwitch;
