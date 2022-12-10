/**
 * My Giphy API key.
 */
const giphyApiKey = 'ReaVDiiXruBEbPkcqzwx0Ai3XgcDF6A4';

/**
 * Giphy Random API.
 */
const url = 'https://api.giphy.com/v1/gifs/random';

/**
 * Partial type of the Giphy Random API response.
 */
export type GiphyApiResponse = Readonly<{
  data: {
    type: string;
    id: string;
    url: string;
    slug: string;
    embed_url: string;
    title: string;
    // some fields omitted
  };
  meta: {
    msg: string;
    status: number;
    response_id: string;
  };
}>;

/**
 * Pull a cat gif from Giphy.
 */
const getCatGif = async () => {
  const fullUrl = `${url}?api_key=${giphyApiKey}&tag=cat&rating=g`;

  const r = await fetch(fullUrl);
  const json = (await r.json()) as GiphyApiResponse;

  return json.data.embed_url;
};

/**
 * What the cat says.
 */
const lexicon = [
  'meow',
  'mew',
  'mrp',
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
  const idx = Math.round(Math.random() * lexicon.length - 1);
  return lexicon[idx];
};

/**
 * Get the cat's response to a message.
 *
 * (The cat ignores everything and says whatever it wants.)
 */
export const replyTo = async (_: string) => {
  const url = await getCatGif();
  return {
    content: getVocalization(),
    gif: url,
  };
};
