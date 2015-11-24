Ext.define('MyApp.model.SysTypeVal', {
    extend: 'Ext.data.Model',
    
    alias: 'model.sysTypeVal',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'sysFlag', type: 'int'},
        'sysTypeCode',
        'sysValueCode',
        'sysValueName',
        'sysValue',
        'sysValue2',
        'sysValue3',
        'sysTypeName'
    ]

});
