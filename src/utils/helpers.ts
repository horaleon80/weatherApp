export const cleanTimeZone = (input: string | undefined): string => {
  return input ? input.replace(/\//g, ", ").replace(/_/g, " ") : "";
};
