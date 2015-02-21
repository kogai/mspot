describe('AngularJSホームページ', function() {
    beforeEach( function(){
        browser.get( browser.baseUrl );
    });

    it( 'タイトルを持つ', function() {
        expect(browser.getTitle()).toEqual('MAP-APP');
    });
    it( '地図が表示されている', function(){

    });
    it( '地図がカスタム表示されている', function(){

    });
    it( 'マーカーが10個表示されている', function(){

    });
});
