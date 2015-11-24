Ext.define('MyApp.view.CheckTree', {
    extend: 'Ext.tree.Panel',
    xtype:'check-tree',
    
    initComponent: function() {
		var store = Ext.create('MyApp.store.Menus');
		
		Ext.apply(this, {
			store: store,
			
			rootVisible: false
		});
		
		this.callParent();
	},
	
	listeners : {
		itemclick : 'onTreeItemClick1'
	}
});