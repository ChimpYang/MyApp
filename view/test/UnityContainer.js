Ext.define('MyApp.view.test.UnityContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'unityContainer',
    
    id: 'testpanelid',
    
    requires:[
    	'MyApp.view.test.UnityPanel',
    	'MyApp.view.test.UnityPanelController',
    ],
    
    controller: 'unityPanel',
    
    layout: 'border',
    
    bodyStyle: 'background:#ffc;',
    
    listeners: {
    	resize: 'onResizeContainer',
    },
    
    items: [{
    	region: 'center',
    	xtype: 'unityDemoPanel',
    	
    	reference: 'refUnityDemoPanel'
    }, {
    	region: 'north',
	    xtype: 'toolbar',
	    items: [{
	    	xtype: 'button',
	    	text: 'Red1',
	    	listeners: {
	    		click: 'onRed1'
	    	}
	    }, {
	    	xtype: 'button',
	    	text: 'Red2',
	    	listeners: {
	    		click: 'onRed2'
	    	}
	    }, {
	    	xtype: 'button',
	    	text: 'Yellow1',
	    	listeners: {
	    		click: 'onYellow1'
	    	}
	    }, {
	    	xtype: 'button',
	    	text: 'Yellow2',
	    	listeners: {
	    		click: 'onYellow2'
	    	}
	    }]
    }],
    
    //failed
    //ReferenceError: onExtAgent is not defined
    //必须放在index.jsp | index.html中
    // onExtAgent: function(p1, p2) {
    	// console.log('onExtAgent');
    	// console.log(p1);
    	// console.log(p2);
    // }
});