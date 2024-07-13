function getTotalPrice(details) {
    return details.reduce((prevPrice, currDetail) => {
        return prevPrice + currDetail.quantity * currDetail.price;
    }, 0);
}

function getIntoPrice(details) {
    return details.reduce((prevPrice, currDetail) => {
        return prevPrice + currDetail.quantity * currDetail.priceDiscounted;
    }, 0);
}

function getPriceDiscounted(details) {
    return details.reduce((prevPrice, currDetail) => {
        return prevPrice + currDetail.quantity * (currDetail.price - currDetail.priceDiscounted);
    }, 0);
}

export const paymentOrderSelector = (state) => {
    const details = state.order.details;
    const productIds = state.selectedOrderItems.productIds;
    const selectedDetails = details.filter((details) =>
        productIds.find((id) => id === details.product.id),
    );
    return {
        details: selectedDetails,
        totalPrice: getTotalPrice(selectedDetails),
        intoMoney: getIntoPrice(selectedDetails),
        priceDiscounted: getPriceDiscounted(selectedDetails),
    };
};
