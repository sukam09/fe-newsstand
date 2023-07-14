function convertIdx(idx, categories) {
    const result = { convertedIdx: 0, category: "" };
    for (const category of categories) {
        if (idx <= category.amount - 1) {
            result.convertedIdx = idx;
            result.category = category.name;
            break;
        }
        idx -= category.amount;
    }
    return result;
}
export { convertIdx };
