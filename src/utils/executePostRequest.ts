export const request = async (
  method: string,
  body: string,
  endPoint: string,
  token: string
) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/${endPoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body,
    }
  );
  const data = await response.json();
  if (!response.ok) {
    let error;
    if (data.message) {
      error = data.message;
    } else if (data.error) {
      error = data.error;
    } else {
      error = response.statusText;
    }
    throw new Error(error);
  }
  return { response, data };
};
