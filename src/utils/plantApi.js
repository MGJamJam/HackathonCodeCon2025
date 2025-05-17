const identifyPlant = ({ imageBase64, latitude, longitude }) => {
    const apiUrl = 'https://plant.id/api/v3/identification';
    const apiKey = import.meta.env.VITE_API_KEY;
  
    const plantData = {
      images: [imageBase64],
      latitude,
      longitude,
      similar_images: true
    };
  
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plantData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Identificação:', data);
        return data;
      });
  };
  
  export default identifyPlant;