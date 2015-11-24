Ext.define('MyApp.model.RoleUser', {
    extend: 'Ext.data.Model',
    
    alias: 'model.roleUser',

    fields: [
        {name: 'id', type: 'int'},
        'roleCode',
        'roleName',
        'userCode',
        'userName'
    ]

});
