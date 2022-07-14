interface Country {
  name: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: Language[];
}

interface Language {
  iso639_1: string,
	iso639_2: string,
	name: string,
	nativeName: string
}

/**
 * Vráťte pole s názvami všetkých krajín.
 */
export const task1 = (countries:Country[]):string[] => {
  return countries.map(country => country.name);
}

/**
 * Vráťte pole s názvami európskych krajín.
 */
 export const task2 = (countries:Country[]):string[] => {
  return countries.filter(country => country.region === 'Europe').map(country => country.name);
}

/**
 * Vráťte pole objektov s vlastnosťami name a area, popisujúce krajiny s počtom obyvateľov nad 100 miliónov, teda:
[ { name: 'Bangladesh', area: '147570 km2' },
  { name: 'Brazil', area: '8515767 km2' },
  { name: 'China', area: '9640011 km2' },
  ... ]
 */
export const task3 = (countries: Country[]) => {
  return countries.filter(country => country.population >= 100000000)
                  // .map(country => {
                  //   return { name: country.name, area: country.area + ' km2'};
                  // });
                  .map(({name, area}) => ({name , area: area + ' km2'}));
}

/**
 * Vráťte pole všetkých jazykov, ktoré sa používajú Južnej Amerike bez duplicít, teda:
[ { iso639_1: 'es', iso639_2: 'spa', name: 'Spanish', nativeName: 'Español' },
  { iso639_1: 'gn', iso639_2: 'grn', name: 'Guaraní', nativeName: "Avañe'ẽ" },
  { iso639_1: 'ay', iso639_2: 'aym', name: 'Aymara', nativeName: 'aymar aru'},
  ...   ]
 */
  export const task4 = (countries: Country[]) => {
    return countries.filter(country => country.subregion === 'South America')
                    .map(country => country.languages)
                    .flat()
                    .reduce((result, lang) => result.some(resultLang => resultLang.name === lang.name) ? result : [...result, lang], []);
  }

  /**
 * Vráťte objekt, kde vlastnosti sú jazyky z Južnej Ameriky a ich hodnotami polia krajín z Južnej Ameriky, v ktorých sa nimi hovorí, teda:
{
  Spanish: ['Argentina', 'Bolivia (Plurinational State of)', 'Chile',...],
  Portuguese: [ 'Brazil' ],
  English: [ 'Falkland Islands (Malvinas)', 'Guyana',...],
  ...   }
 */
  export const task5 = (countries: Country[]) => {

    const langCountry = (country: Country) => {
      return country.languages.map(lang => ({language: lang.name, country: country.name}));
    }

    return countries.filter(country => country.subregion === 'South America')
                    .map(country => langCountry(country))
                    .flat()
                    .reduce((acc, {language, country}) => {
                      return acc[language] 
                              ? {...acc, [language] : [ ...acc[language], country]} 
                              : {...acc, [language] : [country]}
                    }, {});
  }

  /**
 * Vráťte pole objektov s dvoma vlastnosťami, jazyk z Južnej Ameriky a krajiny z Južnej Ameriky, v ktorých sa ním hovorí, teda:
[ { language: 'Spanish', countries: ['Argentina', 'Bolivia (Plurinational State of)', 'Chile',...]},
  { language: 'Portuguese', countries: [ 'Brazil' ]},
  { language: 'English', countries: [ 'Falkland Islands (Malvinas)', 'Guyana',...]},
  ...   ]
 */
  export const task6 = (countries: Country[]) => {
    return Object.entries(task5(countries)).map( pair => ({ language: pair[0], countries: pair[1]}));
  }
  