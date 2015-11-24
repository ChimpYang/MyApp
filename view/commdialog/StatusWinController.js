Ext.define('MyApp.view.commdialog.StatusWinController', {
    extend: 'Ext.app.ViewController',
	
	alias: 'controller.statusWin',
	
	onCloseInForm: function(button) {
		console.log('onCloseInForm');

		var win = button.ownerCt.ownerCt.ownerCt;
		win.close();
	},
	
	onSelectInForm: function(button) {
		console.log('onSelectInForm');
		
		var win = button.ownerCt.ownerCt.ownerCt;
		var grid = win.down('panel');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个状态');
			return ;
		}
		
		var records = sm.getSelection();
		var selected = records[0];
		
		if (win.invokerEvent) {
			win.invokerEvent(button, selected, win.invokerPanel);
		} else {
			console.log('null == invoker');
		}
		
		win.close();
	},
	
	onSelectInWin: function(button) {
		console.log('onCloseInWin');
		
		var win = button.ownerCt.ownerCt;
		var grid = win.down('panel');
		var sm = grid.getSelectionModel();
		var count = sm.getCount();
		
		if(count != 1) {
			this.showMessage('请先选择一个状态');
			return ;
		}
		
		var records = sm.getSelection();
		var selected = records[0];
		
		if (win.invokerEvent) {
			win.invokerEvent(button, selected, win.invokerPanel);
		} else {
			console.log('null == invoker');
		}
		
		win.close();
	},
	
	onCloseInWin: function(button) {
		console.log('onSelectInWin');
		
		var win = button.ownerCt.ownerCt;
		win.close();
	},
	
	showMessage: function(message) {
		Ext.MessageBox.show({
            title: 'Information',
            msg: message,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFORMATION
        });
	},
});
	