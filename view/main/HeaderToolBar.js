Ext.define('MyApp.view.main.HeaderToolBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'apptoolbar',
	
	width: 400,
	
	style: {
		background: '#E9F8FF',
	},
	
	defaults: {
		style: {
            background: '#E9F8FF',  
            borderColor: 'transparent'
       	},
       	
		listeners: {
			afterrender: function(button) {
				// console.log(Ext.getCmp(this.id));
				// Ext.getCmp(this.id).btnInnerEl.setStyle('color','green');
				
				//Important
				//修改按钮和字体图标的颜色
				//名字是通过FireBug跟踪出来的btnInnerEl,btnIconEl
				//也可以在Button.js的源码中找到；childEls : 'btnEl', 'btnWrap', 'btnInnerEl', 'btnIconEl', 'arrowEl'
				var text = Ext.getCmp(this.id).btnInnerEl;
				if(text) {
					text.setStyle('color','black');
				}
				var icon = Ext.getCmp(this.id).btnIconEl;
				if(icon) {
					icon.setStyle('color','black');
				}
			},
       		mouseover : function() {  
                var b = document.getElementById(this.id);  
                b.style.borderColor = '#778877';  
            },  
            mouseout : function() {  
                var b = document.getElementById(this.id);  
                b.style.borderColor = 'transparent';  
            },
            blur : function() {  
                var b = document.getElementById(this.id);  
                b.style.borderColor = 'transparent';  
            },
            deactivate : function() {  
                var b = document.getElementById(this.id);  
                b.style.borderColor = 'transparent';  
            },
		}
	},
	
	items: ['->', {
		text: '设置',
		iconCls: 'fa fa-cog',
		// scale: 'medium'
	}, {
		text: '帮助',
		iconCls: 'fa fa-question-circle',
	}, {
		text: '关于',
		iconCls: 'fa fa-info-circle',
	}, {
		text: '用户',
		iconCls: 'fa fa-user',
		// style: {
			// fontColor: '#FF0000'
		// },
		menu:[{
			text: '退出登出',
			iconCls: 'fa fa-sign-out',

			listeners: {
				click: 'onLogout'
			}
		}, {
			text: '口令修改',
			iconCls: 'fa fa-key'
		}, {
			text: '用户信息',
			iconCls: 'fa fa-info'
		}, {
			text: '修改头像',
			iconCls: 'fa fa-smile-o',

			listeners: {
				click: 'onUserHead'
			}
		}]
	}],
	
});