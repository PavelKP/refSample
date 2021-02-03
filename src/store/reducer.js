import {extend} from '../utils';
import {ActionType} from './action';
import {SortingType} from '../const';

const DEFAULT_CARDS_AMOUNT = 2;

const initialState = {
  flights: [],
  filtered: [],
  sorting: SortingType.TO_HIGH,
  transferOne: false,
  transferZero: false,
  priceFrom: 0,
  priceTo: 1000000,
  activeCompanies: [],
  cards: DEFAULT_CARDS_AMOUNT,
};


const countDuration = (legs) => {
  return legs.reduce((acc, current) => acc + current.duration, 0);
}

const countTransfers = (legs) => {
  let counter = 0;
  legs.forEach((leg) => {
    if (leg.segments.length === 2) {
      counter++;
    }
  })
  return counter;
};

const sortingToFilter = {
  [SortingType.TO_HIGH]: (offers) => offers.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount),
  [SortingType.TO_LOW]: (offers) => offers.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount),
  [SortingType.TIME]: (offers) => offers.sort((a, b) => {
    return countDuration(a.flight.legs) - countDuration(b.flight.legs)
  }),
}

const selectData = (offers, selection) => {
  let filtered = offers.slice(0, selection.cards);
  filtered = sortingToFilter[selection.sorting](filtered);

  if (selection.transferOne && selection.transferZero){
    filtered = filtered.filter((offer) => countTransfers(offer.flight.legs) === 0 || countTransfers(offer.flight.legs) === 1);
  }
  else if (selection.transferOne) {
    filtered = filtered.filter((offer) => countTransfers(offer.flight.legs) === 1);
  }
  else if (selection.transferZero) {
    filtered = filtered.filter((offer) => countTransfers(offer.flight.legs) === 0);
  }

  filtered = filtered.filter((offer) => {
    return +offer.flight.price.total.amount >= +selection.priceFrom && +offer.flight.price.total.amount <= +selection.priceTo;
  })

  if (selection.activeCompanies.length !== 0) {
    filtered = filtered.filter((flight) => {
      return selection.activeCompanies.indexOf(flight.flight.carrier.caption) !== -1;
    });
  }

  return filtered;
}


const refreshCompanies = (array, element) => {
  const unique = new Set(array);
  if (unique.has(element)) {
    unique.delete(element);
  } else {
    unique.add(element);
  }

  return [...unique]
}

const reducer = (state = initialState, action) => {
  const selection = {
    sorting: state.sorting,
    transferOne: state.transferOne,
    transferZero: state.transferZero,
    priceFrom: state.priceFrom,
    priceTo: state.priceTo,
    activeCompanies: state.activeCompanies,
    cards: state.cards,
  }

  switch (action.type) {
    case ActionType.LOAD_FLIGHTS:
      return extend(state, {
        flights: action.payload.result.flights,
        filtered: sortingToFilter[initialState.sorting](action.payload.result.flights)
      });
    case ActionType.SET_SORTING:
      return extend(state, {
        sorting: action.payload,
        filtered: selectData(state.flights, extend(selection, {sorting: action.payload}))
      });
    case ActionType.SET_COMPANY:
      return extend(state, {
        activeCompanies: refreshCompanies(state.activeCompanies, action.payload),
        filtered: selectData(state.flights, extend(selection,
          {activeCompanies: refreshCompanies(selection.activeCompanies, action.payload)}))
      });
    case ActionType.CHANGE_TRANSFER_ONE:
      return extend(state, {
        transferOne: !state.transferOne,
        filtered: selectData(state.flights, extend(selection, {transferOne: !state.transferOne}))
      });
    case ActionType.CHANGE_TRANSFER_ZERO:
      return extend(state, {
        transferZero: !state.transferZero,
        filtered: selectData(state.flights, extend(selection, {transferZero: !state.transferZero}))
      });
    case ActionType.SET_PRICE_FROM:
      return extend(state, {
        priceFrom: action.payload,
        filtered: selectData(state.flights, extend(selection, {priceFrom: action.payload}))
      });
    case ActionType.SET_PRICE_TO:
      return extend(state, {
        priceTo: action.payload,
        filtered: selectData(state.flights, extend(selection, {priceTo: action.payload}))
      });
    case ActionType.SET_FILTERED:
      return extend(state, {
        filtered: action.payload,
      });
    case ActionType.SET_CARDS_AMOUNT:
      return extend(state, {
        cards: state.cards + action.payload,
        filtered: selectData(state.flights, extend(selection, {cards: state.cards + action.payload}))
      });
    default:
      return state;
  }
};

export {reducer};
