import { ResizeAppPage } from './app.po';

describe('resize-app App', () => {
  let page: ResizeAppPage;

  beforeEach(() => {
    page = new ResizeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
