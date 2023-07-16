const handleClickTitleIcon = () => {
    const titleIcon = document.querySelector(".title-icon");
    titleIcon.addEventListener("click", () => {
        location.reload();
    });
};

export { handleClickTitleIcon };
