Ext.define('MyApp.view.test.Component1', {
    extend: 'Ext.panel.Panel',
    xtype: 'component1',
    
    requires:[
    	'MyApp.ux.Unity',
    	'MyApp.view.test.Component1Controller',
    ],
    
    controller: 'component1',
    
    layout: 'fit',

    dockedItems: [{
        region: 'north',
        xtype: 'toolbar',
        id: 'component1-mainToolbar',

        //Unity加载需要时间，在Unity初始化完成之前，按钮必须被禁用
        defaults: {
            disabled: true
        },

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
    
    items: {
        region: 'center',
    	xtype:'unity',
    	url: 'resources/unity/webplay.unity3d',
    	logoimage: 'resources/unity/xhr-logo.png',
		progressbarimage: 'resources/unity/MyProgressFrame.png',
		progressframeimage: 'resources/unity/MyProgressBar.png',
    	
    	reference: 'refUnity',

        listeners: {
            unityFirstFrame: 'onUnityFirstFrame',
            resize: 'onResize',
            boxready: 'onBoxReady',
        }
    },
    
    //未增加dockitems时在这监听
    listeners: {
    	// resize: 'onResize',
    	// boxready: 'onBoxReady',
    }
});