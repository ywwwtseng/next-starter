export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const isServer = () => typeof window === 'undefined';

export const parseJSON = (string, fallback = {}) => {
  try {
    const parsed = JSON.parse(string);
    return parsed;
  } catch (error) {
    return fallback;
  }
};