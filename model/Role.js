Ext.define('MyApp.model.Role', {
    extend: 'Ext.data.Model',
    
    alias: 'model.role',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'maxUserNumber', type: 'int'},
        'roleCode',
        'roleName',
        'currentStatus',
        'roleDesc'
    ]

});
