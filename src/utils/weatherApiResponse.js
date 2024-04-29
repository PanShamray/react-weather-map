export function weatherApiResponse(
  apiUrl,
  valueShouldToUpdate,
  shouldSlice = false,
  start = null,
  end = null
) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Щось пішло не так');
      }
      return response.json();
    })
    .then((data) => {
      if (shouldSlice) {
        const slicedData =
          start !== null && end !== null
            ? data.list.slice(start, end)
            : data.list;
        valueShouldToUpdate(slicedData);
      } else {
        valueShouldToUpdate(data);
      }
    })
    .catch((error) => console.error(error));
}