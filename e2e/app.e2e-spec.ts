import { StudyBetterPage } from './app.po';

describe('study-better App', function() {
  let page: StudyBetterPage;

  beforeEach(() => {
    page = new StudyBetterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
