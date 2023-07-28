
async function getJSON(url) {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData;
    }
    catch (err){
        console.log(err);
    }
}

export {getJSON}