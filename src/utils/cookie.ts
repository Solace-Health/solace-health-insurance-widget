export enum Cookie {
  ProspectId = "solace_prospect_id",
}

export const setCookie = (name: Cookie, value: string) => {
  const expires = "";
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
