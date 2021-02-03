export const ActionType = {
  LOAD_FLIGHTS: `LOAD_FLIGHTS`,
  SET_SORTING: `SET_SORTING`,
  SET_COMPANY: `SET_COMPANY`,
  CHANGE_TRANSFER_ONE: `CHANGE_TRANSFER_ONE`,
  CHANGE_TRANSFER_ZERO: `CHANGE_TRANSFER_ZERO`,
  SET_PRICE_FROM: `SET_PRICE_FROM`,
  SET_PRICE_TO: `SET_PRICE_TO`,
  SET_FILTERED: `SET_FILTERED`,
  SET_CARDS_AMOUNT: `SET_CARDS_AMOUNT`,
};

export const ActionCreator = {
  loadFlights(flights) {
    return {
      type: ActionType.LOAD_FLIGHTS,
      payload: flights,
    };
  },
  setSorting(sortingType) {
    return {
      type: ActionType.SET_SORTING,
      payload: sortingType,
    };
  },
  setCompany(companyName) {
    return {
      type: ActionType.SET_COMPANY ,
      payload: companyName,
    };
  },
  changeTransferOne() {
    return {
      type: ActionType.CHANGE_TRANSFER_ONE,
    };
  },
  changeTransferZero() {
    return {
      type: ActionType.CHANGE_TRANSFER_ZERO,
    };
  },
  setPriceFrom(price) {
    return {
      type: ActionType.SET_PRICE_FROM,
      payload: price,
    };
  },
  setPriceTo(price) {
    return {
      type: ActionType.SET_PRICE_TO,
      payload: price,
    };
  },
  setFiltered(filtered) {
    return {
      type: ActionType.SET_FILTERED,
      payload: filtered,
    };
  },
  setCards(amount) {
    return {
      type: ActionType.SET_CARDS_AMOUNT,
      payload: amount,
    };
  }
};
