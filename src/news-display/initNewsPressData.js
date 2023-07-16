export const initNewsPressData = async () => {
    try {
        const response = await fetch("../data/press-data.json");
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log(error);
    }
};
