module.exports = function() {
  return function( input, farDistance ) {
      console.table( input );
      console.log( farDistance );
    // return input.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    //   return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    // });
  };
}
