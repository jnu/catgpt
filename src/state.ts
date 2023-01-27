import {Store} from './store';

export type Message = Readonly<{
  id: string;
  who: 'user' | 'cat';
  content: string;
  ts: number;
  attachments?: string[];
}> & {loading?: boolean};

export const state = new Store({
  thread: [] as Message[],
  thinking: false,
});

let _ctr = 0;
const newId = () => `id${_ctr++}`;

const newMsg = (
  who: 'user' | 'cat',
  content: string,
  attachments?: string[],
): Message => ({
  id: newId(),
  who,
  content,
  ts: Date.now(),
  attachments,
});

export const newUserMsg = (content: string) => newMsg('user', content);

export const newCatMsg = (content: string, gif?: string) =>
  newMsg('cat', content, gif ? [gif] : undefined);
