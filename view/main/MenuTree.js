Ext.define('MyApp.view.main.MenuTree', {
    extend: 'Ext.tree.Panel',
    xtype:'menu-tree',
    
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