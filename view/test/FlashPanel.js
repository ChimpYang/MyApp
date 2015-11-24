Ext.define('MyApp.view.test.FlashPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'flashPanel',
    
    requires:[
    	'Ext.flash.Component',
    ],
    
    layout: 'fit',
    
    items: {
    	// width: 800,
    	// height: 400,
    	width: 0,
    	xtype:'flash',
    	url: 'resources/flash/flashDemo.swf'
    },
});