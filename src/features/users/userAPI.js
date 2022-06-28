const { SERVER_URL = "http://localhost:8000" } = process.env;

export async function fetchUser(creds) {
  try {
    const response = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    if (!response.ok) throw response;
    const data = await response.json();

    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}

export async function getUsers() {
  try {
    const response = await fetch("http://localhost:8000/users");
    if (!response.ok) throw response;
    const data = await response.json();

    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}

export async function getOneUserCall(username) {
  try {
    const response = await fetch(
      `http://localhost:8000/users?username=${username}`
    );
    if (!response.ok) throw response;
    const data = await response.json();

    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}

export async function updateUser(updatedUser) {
  try {
    const response = await fetch(
      `http://localhost:8000/users/${updatedUser._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );
    if (!response.ok) throw response;
    const data = await response.json();

    return data;
  } catch (err) {
    return Promise.reject(err.statusText || err.message);
  }
}
