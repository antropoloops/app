import Session from "./Session";

let session = null;

export function createSession(url, websockets) {
  if (session) throw Error("Can't create a session twice");
  session = new Session(url, websockets);
  return session;
}

export function getSession() {
  return session;
}
