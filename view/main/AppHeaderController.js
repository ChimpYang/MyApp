Ext.define('MyApp.view.main.AppHeaderController', {
    extend: 'Ext.app.ViewController',
	
	alias: 'controller.appHeader',

	openLogoutWin: function() {
		var win = Ext.create('Ext.window.Window',{
			modal:true,
			border: 0,
			closable: true,
			resizable: false,
			
			header: true,
			title: '退出系统',
			
			items:[{
				xtype:'logoutForm'
			}]
		});

		win.show();
	},

	openHeadImageWindow: function() {
		var win = Ext.create('MyApp.view.main.UploadHeadImageWin',{
			modal:true,
			border: 0,
			closable: true,
			resizable: false,
			header: true
		});	

		win.show();
	},

	onLogoutInForm: function(button) {
		//logoutClient.do
		var form = button.ownerCt.ownerCt;
		if (form.isValid()) {
            form.submit({
                url: '/ChimpJavaWeb/logoutClient.do',
                waitMsg: 'logout system...',
                success: this.onLogoutSuccess,
                failure: this.onLogoutSuccessFailure
            });
        }
	},

	onLogoutSuccess: function(form, action) {
		var win = form.owner.ownerCt;
		win.close();

		window.location = '/ChimpJavaWeb/login.jsp';
	},

	onLogoutSuccessFailure: function(form, action) {
		console.log('onLogoutSuccessFailure');	
	},

	onLogout: function(menuItem) {
		this.openLogoutWin();
	},

	onUserHead: function(menuItem) {
		this.openHeadImageWindow();
	},

	onHeadImageChange: function(fileField, value, eOpts ) {
		var suffix = this.getFileNameSuffix(value);

		if(!this.imageTypeCheck(suffix)) {
			console.error('file type not allow.');
		} else {
			var item = 'fileName';
			var field = fileField.ownerCt.down('[name=' + item + ']');
			field.setValue(value);
		}
	},

	onClose: function(button) {
		var win = button.ownerCt.ownerCt.ownerCt;
		win.close();
	},

	onReset: function(button) {
		var form = button.ownerCt.ownerCt;
		form.reset();
	},

	onSubmit: function(button) {
		var form = button.ownerCt.ownerCt;
		if (form.isValid()) {
            form.submit({
                url: '/ChimpJavaWeb/uploadUserHeadImage.do',
                waitMsg: 'Uploading your photo...',
                success: this.onSubmitSuccess,
                failure: this.onSubmitSuccessFailure
            });
        }
	},

	onSubmitSuccess: function(form, action) {
		// console.log('onSubmitSuccess');
		// console.log(action);
		// console.log(action.result.obj.url);
		// console.log(form);//Ext.form.Basic
		var url = 'resources/headimg/' + action.result.obj.url;
		var f = form.owner;
		var c = f.getComponent('headImgBoxContainer');
		// console.log( c );
		// console.log( c.getComponent('userHeadImg') );//failure
		// console.log( c.down('box'));//success
		var box = c.down('box');
		// Ext.apply(box, {
		// 	autoEl: {  
  //               tag: 'img',
  //               src: url,
  //               style: {
  //                   width: '64px',
  //                   height: '64px',
  //                   borderRadius: '50px'
  //               }
  //           }
		// }, box);//failure

		// box.getEl().dom.src = url;//success
		// box.getEl().repaint();//failure'

		// console.log(Ext.get('userHeadBox'));
		var userHeadImgInAppHeader = Ext.get('userHeadBox');
		// userHeadImgInAppHeader.getEl().dom.src = url;
		userHeadImgInAppHeader.dom.src = url;
		
		Ext.get('userHeadImg').setValue(url)

		f.ownerCt.close();
	},

	onSubmitSuccessFailure: function(form, action) {
		console.log('onSubmitSuccessFailure');	
	},

	//上传图片的类型验证-Begin
	//文件名后缀
	getFileNameSuffix : function(value) { 
        var suffix = '';  
        var index = value.lastIndexOf('.');  
        if (index != -1) {  
            suffix = value.substr(index + 1);  
        }  

        return suffix;  
    },  

	imageTypeCheck : function(suffix) {  
        var allow = 'jpg,jpeg,png,gif,bmp';  
        var types = allow.split(',');

        for (var i = 0; i < types.length; i++) {  
            if (suffix.toUpperCase() == types[i].toUpperCase()) {  
                return true;  
            }  
        }  

        return false;  
    }, 
	//上传图片的类型验证-End

});