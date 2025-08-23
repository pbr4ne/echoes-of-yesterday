export const useText = () => {

  const toTitleCase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return { toTitleCase };
}