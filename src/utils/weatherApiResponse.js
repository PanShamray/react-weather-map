export function weatherApiResponse(apiUrl, valueShouldToUpdate) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Негативна відповідь мережі');
      }
      return response.json();
    })
    .then((data) => valueShouldToUpdate(data))
    .catch((error) => console.error("Error:", error));
}