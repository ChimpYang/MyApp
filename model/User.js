Ext.define('MyApp.model.User', {
    extend: 'Ext.data.Model',
    
    alias: 'model.user',

    fields: [
        {name: 'id', type: 'int'},
        'userCode',
        'userName',
        'currentStatus',
        'empCode',
        'createDate',
        'lastModifyDate',
        'userImage',
        'password',
        'validDate'
    ],

});
