describe('AngularJSホームページ', function() {
  beforeEach( function(){
    browser.get( browser.baseUrl );
  });

  it( 'タイトルを持つ', function() {
    expect(browser.getTitle()).toEqual('MAP-APP');
  });

  it( '地図が表示されている', function(){
    expect( element(by.css('.angular-google-map-container')).isPresent() ).toBe( true );
  });

  it( '地図がカスタム表示されている', function(){
    
  });

  // it( 'マーカーが10以上個表示されている', function(){
  //
  // });
});
