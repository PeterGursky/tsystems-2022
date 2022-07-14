interface Country {
  name: string;
}

export const task1 = (countries:Country[]):string[] => {
  return countries.map(country => country.name);
}