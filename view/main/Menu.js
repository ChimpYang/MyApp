Ext.define('MyApp.view.main.Menu', {
    //TODO; why Ext.Panel
    // extend: 'Ext.panel.Panel',
    extend: 'Ext.Panel',
    
    xtype: 'app-menu',
    requires: [
		'Ext.layout.container.Border',
		
		//不引入包，在开发时不会报错；在发布环境会报错
		'Ext.plugin.Viewport',
		
		// 'MyApp.view.CheckTree',
		'MyApp.view.main.MenuTree',
		'MyApp.view.main.DynamicTabs',
		'MyApp.view.main.AppHeader',
	],
	
	controller: 'menu',
	plugins: 'viewport',
	
	layout: 'border',
	bodyBorder: false,
	
	defaults: {
		// collapsible: true,
		// split: true
	},
	
	items: [{
	        region: 'north',
	        xtype: 'appHeader',
	        frame: true
	    },
		{
			region: 'west',
			title: 'MenuTree',
			width: 200,
			// minWidth: 200,
			// maxWidth: 400,
			layout: 'fit',
			xtype: 'menu-tree',
			
			collapsible: true,
			split: true
		},
		// {
			// title: 'footer',
			// region:'south',
			// height: 30,
			// header: false,
			// html: '<p style="margin: 0px; padding: 0px;line-height:25px;  ">Copyright (c) 2004-2015</p>',
			// collapsible: true,
			// frame: true
		// },
		{
			region: 'center',
			flex: 1,
			header: false,
			xtype: 'dtabs',
			reference: 'refTabs',
			
			collapsible: true,
			split: true
		}
	]
});