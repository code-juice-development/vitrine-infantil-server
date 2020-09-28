export const getValueFromRegex = (
  value: string,
  regex: string,
  defaultValue = '',
): string => {
  return new RegExp(regex).exec(value)?.[0].trim() ?? defaultValue;
};
