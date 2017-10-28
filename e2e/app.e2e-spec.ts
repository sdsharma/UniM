import { PartnerNg2Page } from './app.po';

describe('partner-ng2 App', () => {
  let page: PartnerNg2Page;

  beforeEach(() => {
    page = new PartnerNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
