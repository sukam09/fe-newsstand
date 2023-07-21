export const getDate = () => {
    const today = new Date();
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    };
    return today.toLocaleDateString("ko-KR", options);
};

export const shuffleNewsPress = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const updateSubscribeList = (jsonData, subscribeList) => {
    if (localStorage.getItem("subscribeList") === null) {
        subscribeList = [];
        jsonData.forEach((data) => {
            if (data.subscribed === true) {
                subscribeList.push({ id: data.id, name: data.name });
            }
        });
        localStorage.setItem("subscribeList", JSON.stringify(subscribeList));
    } else {
        const localSubscribeList = JSON.parse(
            localStorage.getItem("subscribeList")
        );
        subscribeList = [];
        localSubscribeList.forEach((data) => {
            subscribeList.push({ id: data.id, name: data.name });
        });
        return subscribeList;
    }
};
