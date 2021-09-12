import { SERVER_URL } from "../consts";

async function createFeed(source) {
  const url = `${SERVER_URL}/create`;
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ source }),
    mode: "cors",
  });
  return resp.json();
}

export { createFeed };
