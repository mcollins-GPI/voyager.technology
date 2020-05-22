require({
    packages: [
        {
            name: 'dgrid',
            location: '//unpkg.com/dgrid@1.1.0/'
        },
        {
            name: 'dstore',
            location: '//unpkg.com/dojo-dstore@1.1.1/'
        }
    ]
},[
    'dgrid/Grid',
    'dojo/domReady!'
], function (Grid) {
    var data = [
        { first: 'Bob', last: 'Barker', age: 89 },
        { first: 'Vanna', last: 'White', age: 55 },
        { first: 'Pat', last: 'Sajak', age: 65 }
    ];
    var grid = new Grid({
    columns: {
        first: 'First Name',
        last: 'Last Name',
        age: 'Age'
    }   
    }, 'grid');
    grid.renderArray(data);
});
