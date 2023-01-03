const ActionType = {
  RECEIVE_CATEGORIES: 'categories/receive',
  SET_CATEGORY: 'categories/set',
  CLEAR_CATEGORY: 'categories/clear',
};

function receiveCategoriesActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      categories: [...new Set(threads.map((thread) => thread.category))],
    },
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
};
