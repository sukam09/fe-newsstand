function getPressJSON(){
    const pressData = fetch("./data/press_data.json")
    .then(res => res.json());
    return pressData;
}

export { getPressJSON };
//  
