branches.create('app', () => {
  const element = DC();

  function interfaceMethod() {
    // do something internal
  }

  // return element + some interface methods
  return {
    element,
    interfaceMethod
  }
});

branches.create('authorized-branch', ['app'], (App) => {
  const element = DC();

  // branch initialized only on first invocation
  console.log('branch initialized');

  function init() {
    console.log('method called');
    App.interfaceMethod();
  }

  return {
    element,
    init
  }
});

branches.initialize(['app', 'authorized-branch'], (App, AuthorizedBranch) => {
  // entry point of application
  // no return
  App.element.into(document.body);

  App.interfaceMethod();

  AuthorizedBranch.init();
});
