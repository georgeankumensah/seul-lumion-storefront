const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  // Add other languages as needed
}

export const getDictionary = async (locale: string) => {
  if (!Object.keys(dictionaries).includes(locale)) {
    return dictionaries.en()
  }
  return dictionaries[locale as keyof typeof dictionaries]()
}

