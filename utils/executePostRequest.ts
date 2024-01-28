export const request = async (
  method: string,
  body: string,
  endPoint: string,
  token: string
) => {
  try {
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
    if (!response.ok) throw new Error(data.error);

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
