import { MessagesDataState } from '../interfaces/message-data-state.interface';

/**
 * Finds the given message in the behavior subject messages array values.
 *
 * @param {string} message - message that we want to find if it is in the array.
 * @param {MessagesDataState[]} messagesValues - current behavior subject messages array values.
 *
 * @return {MessagesDataState} - the message object found in the behavior subject messages array values.
 */
export function filterDesiredMessage(
  messageType: string,
  messagesValues: MessagesDataState[]
): MessagesDataState | undefined {
  return messagesValues.find((message) => message.type === messageType);
}

export const getDesiredMessageData = (messages: MessagesDataState[], desiredMessage: string) => {
  const message = filterDesiredMessage(desiredMessage, messages);
  if (message) {
    return message.data;
  }
};

export const hasAlreadyMessageDataStored = (messageValues: MessagesDataState[], messageType: string): boolean => {
  return messageValues.some((message) => message.type === messageType);
};

export const updateMessageData = (value: MessagesDataState, messageToUpdate: string, messages: MessagesDataState[]) => {
  return messages.map((message) => {
    return message.type === messageToUpdate ? value : message;
  })
}

/**
 * Generates UUID version 4. The solution above uses Math.random() for brevity, however Math.random() is not
 * guaranteed to be a high-quality RNG.
 *
 * @return UUID version 4.
 */
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Validates key matching.
 *
 * @param messageType Key to identify the message.
 * @param wildcard Key received from on method.
 *
 * @return true if key matches, false otherwise.
 */
export const keyMatch = (messageType: string, wildcard: string): boolean => {
  const w = '*';
  const ww = '**';

  const partMatch = (wl: string, k: string): boolean => {
    return wl === w || wl === k;
  };

  const sep = ':';
  const kArr = messageType.split(sep);
  const wArr = wildcard.split(sep);

  const kLen = kArr.length;
  const wLen = wArr.length;
  const max = Math.max(kLen, wLen);

  for (let i = 0; i < max; i++) {
    const cK = kArr[i];
    const cW = wArr[i];

    if (cW === ww && typeof cK !== 'undefined') {
      return true;
    }

    if (!partMatch(cW, cK)) {
      return false;
    }
  }

  return true;
}