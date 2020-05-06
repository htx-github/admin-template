const getters = {
  app: state => state.app,
  currentUser: state => state.user,
  menus: state => state.user.menus,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
  // messages: state => state.message.messages,
  // messageTotal: state => state.message.messageTotal,
  // loading: state => state.app.loading,
  // sidebarCollapse: state => state.app.sidebarCollapse,
  // noPermission: state => state.user.noPermission,
  // buttons: state => state.user.buttons,
  // addRoutes: state => state.user.addRoutes,
  // tabs: state => state.tab.tabs,
  // refreshTabs: state => state.tab.refreshTabs,
  // refreshForms: state => state.tab.refreshForms,
  // backtrackPath: state => state.app.backtrackPath,
  // orgTree: state => state.orgTree.tree
};

export default getters;
