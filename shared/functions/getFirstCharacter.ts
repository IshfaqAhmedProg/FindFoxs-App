export default function (str: string){
  const words = str.split(' ');
  let result = '';

  for (const word of words) {
    if (word.length > 0) {
      result += word[0].toUpperCase();
    }
  }
  return result;
}