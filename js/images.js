export async function fetchImages(apiType, count) {
    let urls = [];
    
    if (apiType === 'lorem-picsum') {
        for (let i = 0; i < count; i++) {
            urls.push(`https://picsum.photos/100?random=${i}`);
        }
    } else if (apiType === 'dog-api') {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
        const data = await response.json();
        urls = data.message;
    } else if (apiType === 'cataas') {
        for (let i = 0; i < count; i++) {
            urls.push(`https://cataas.com/cat?unique=${i}`);
        }
    }

    return [...urls, ...urls].sort(() => 0.5 - Math.random());
}
