const subscribeButton = (subscribed) => {
    return subscribed
        ? `
        <button class="subscribe-button available-medium12">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.26699 9L3.66699 8.4L6.06699 6L3.66699 3.6L4.26699 3L6.66699 5.4L9.06699 3L9.66699 3.6L7.26699 6L9.66699 8.4L9.06699 9L6.66699 6.6L4.26699 9Z" fill="#879298"/>
            </svg>
            <div>해지하기</div>
        </button>
        `
        : `
        <button class="subscribe-button available-medium12">
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z"
                    fill="#879298"
                />
            </svg>
            <div>구독하기</div>
        </button>
            `;
};

export { subscribeButton };
