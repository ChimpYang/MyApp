Ext.define('MyApp.view.commdialog.StatusWin', {
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.window.Window',
    xtype: 'statusWin',
    
    modal: true,
    
    onSelect: null,
    
    requires: [
        'MyApp.view.commdialog.StatusList',
        'MyApp.view.commdialog.StatusWinController'
    ],
    
    controller: 'statusWin',
    
    height: 300,
    width: 400,
    title: '选择状态',
    
    invokerEvent: null,
	invokerPanel: null,

    layout: 'border',
    items:[{
    	xtype: 'statusList',
    	region: 'center'
    }],
    
    // bbar: ['->', {
    	// iconCls: 'fa fa-close',
    	// text: '关闭',
    	// handler: 'onCloseInWin'
     // }, {
    	// iconCls: 'fa fa-sign-in',
    	// text: '选择',
    	// handler: 'onSelectInWin'
    // }],
    
});