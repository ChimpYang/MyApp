Ext.define('MyApp.view.BasicTrees', {
	extend : 'Ext.tree.Panel',
	xtype : 'basic-trees',

	requires : ['Ext.data.TreeStore',
	// 'MyApp.store.Files'
	'MyApp.store.Menus'],

	header : true,
	title : 'Tree',

	store : {
		// type: 'files'
		type : 'menus'
	},

	listeners : {
		itemclick : 'onTreeItemClick'
	}

});
