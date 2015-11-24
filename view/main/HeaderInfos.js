Ext.define('MyApp.view.main.HeaderInfos', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'appinfos',
	
	width: 400,
	
	style: {
		background: '#E9F8FF',
	},
	
	defaults: {
		xtype: 'tbtext',
		style: {
            background: '#E9F8FF',  
       	}
	},
	
	items: [{
		// xtype: 'tbtext',
		width: 90,
		align: 'center',
		text: '欢迎：' + Ext.get('userName').getValue()
		//text: '欢迎：'
	}, '->', {
		text: '齐天大圣旅游集团 Copyright@ 1978-2015'
	}],
	
});