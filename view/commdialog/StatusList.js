Ext.define('MyApp.view.commdialog.StatusList', {
    extend: 'Ext.grid.Panel',
    xtype: 'statusList',

    requires: [
        'MyApp.store.array.Status'
    ],
    
    header: false,
    columnLines: true,
    frame: true,
    
    columns: [
        { text: 'id',  dataIndex: 'id' },
        { text: 'name', dataIndex: 'name', flex: 1 },
    ],
    
    store: {
    	type: 'states'
    },
    
    bbar: ['->', {
    	iconCls: 'fa fa-close',
    	text: '关闭',
    	handler: 'onCloseInForm'
     }, {
    	iconCls: 'fa fa-sign-in',
    	text: '选择',
    	handler: 'onSelectInForm'
    }],
});
