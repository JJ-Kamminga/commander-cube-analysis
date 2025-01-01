export const parseList = (cubeTextList: string) => {
  return cubeTextList.split('\n')
    .filter(line => line.trim() !== '')
    .filter(line => !line.startsWith('#'))
    .map(line => line.trim());
};
