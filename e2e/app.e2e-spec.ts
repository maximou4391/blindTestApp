import { BlindtestAppPage } from './app.po';

describe('blindtest-app App', function() {
  let page: BlindtestAppPage;

  beforeEach(() => {
    page = new BlindtestAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
