/**
 * My Cat API key.
 */
const apiKey = 'live_wXdRWSmy20KAMn7ktK0A0TUPK9yZTbciawGuF8XEM2v2XwK8TJkcWxuVJB9AYE0Q';

/**
 * Cat API search endpoint.
 */
const url = 'https://api.thecatapi.com/v1/images/search'

/**
 * Type of the Cat API search response.
 */
export type CatApiResponse = Readonly<{
  id: string;
  url: string;
  breeds: string[];
  categories: string[];
}>;

/**
 * Pull a cat image from the Cat API.
 */
const getCat = async () => {
  const fullUrl = `${url}?api_key=${apiKey}`

  const r = await fetch(fullUrl);
  const json = (await r.json()) as CatApiResponse[]

  return json[0].url
};

/**
 * What the cat says.
 */
const lexicon = [
  'meow',
  'mew',
  'mrrrroww',
  'mrowwrw',
  'purr',
  'meowwwww',
  'purrrrrrrr',
  'meww',
];

/**
 * Get a cat sound.
 */
const getVocalization = () => {
  const idx = Math.round(Math.random() * (lexicon.length - 1));
  return lexicon[idx];
};

/**
 * Get the cat's response to a message.
 *
 * (The cat ignores everything and says whatever it wants. Because it is cat.)
 */
export const replyTo = async (_: string) => {
  const url = await getCat();
  return {
    content: getVocalization(),
    url,
  };
};
