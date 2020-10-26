import { Button } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import {
  Translate as TranslateType,
  Translated,
  useAdminTranslateMutation,
} from "../generated/graphql";

interface TranslateProps {
  text: TranslateType | Translated;
  updateTranslations(data: Translated): void;
}

const langs = ["PL", "EN", "GER", "ES", "RU"];

export const Translate: React.FC<TranslateProps> = ({
  text,
  updateTranslations,
}) => {
  const [adminTranslateMutation, { loading }] = useAdminTranslateMutation();
  const [language, setLanguage] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    for (let i = 0; i < langs.length; i++) {
      const lang = langs[i];
      if (text[lang].length > 0) {
        setLanguage(lang);
        setData(text[lang]);
        break;
      }
    }
  }, [text]);

  const handleClick = async () => {
    const res = await adminTranslateMutation({
      variables: { text: data, language },
    });
    updateTranslations(res.data.adminTranslate);
  };

  return (
    <Button
      w="140px"
      isLoading={loading}
      isDisabled={data === null || language === null}
      colorScheme="teal"
      onClick={handleClick}
    >
      TRANSLATE
    </Button>
  );
};
