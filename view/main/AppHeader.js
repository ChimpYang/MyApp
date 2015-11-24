Ext.define('MyApp.view.main.AppHeader', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    // id: 'app-header',
    title: 'ChimpWeb',
    
    requires: [
		'MyApp.view.main.HeaderToolBar',
		'MyApp.view.main.HeaderInfos',
		'MyApp.view.main.UploadHeadImageWin',
		'MyApp.view.main.LogoutForm',

		'MyApp.view.main.AppHeaderController'
	],
    height: 80,
    layout: 'border',

    controller: 'appHeader',
    
    items: [{
    	region: 'west',
    	xtype: 'panel',
    	width: 300,
    	html: '<img src="resources/ChimpCJFLogo-T1.png"></img>'
    }, {
    	region: 'center',
    	bodyStyle: {
		    background: '#E9F8FF'
		},
    	html: ''
    }, {
    	// xtype: 'apptoolbar',
    	// region: 'east'
    	
    	xtype: 'panel',
    	region: 'east',
    	width: 480,
    	height: 80,
    	layout: 'border',
    	
    	items: [{
    		region: 'center',
    		// height: 40,
    		// xtype: 'apptoolbar',
    		
			xtype: 'panel',
			layout: {
		        type: 'vbox',
		        pack: 'start',
		        align: 'stretch'
		    },
			items: [{
	            flex: 1,
	            xtype: 'apptoolbar'
	        },
	        {
	            height: 35,
	            xtype: 'appinfos'
	        }]
    		
    		
    	}, {
    		region: 'east',
			xtype: 'toolbar',
			id: 'appHeader-toolbar-userHead',
			width: 80,
			style: {
				background: '#E9F8FF',
			},
	
			items: [{
				xtype: 'box',
				width: 64,
				height: 64,
				id: 'userHeadBox',
				// cls: 'userProfilePic',
				autoEl: {  
			        tag: 'img',  
			        //src: 'resources/ghost.jpg'
			        src: Ext.get('userHeadImg').getValue() ,
			        style: {
			        	width: '64px',
			        	height: '64px',
			        	borderRadius: '50px'
			        }
			    }, 

			}],
    	}]
    }],

    initComponent: function() {
        document.title = this.title;
        
        this.callParent();

  //       .btnListeners = myButton.mon({
		//     destroyable: true
		//     mouseover:   function() { console.log('mouseover'); },
		//     mouseout:    function() { console.log('mouseout'); },
		//     click:       function() { console.log('click'); }
		// });
    }
});
