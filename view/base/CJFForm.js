Ext.define('MyApp.view.base.CJFForm', {
	extend: 'Ext.form.Panel',

    readOnlyStyle: 'background-color:#C0C0C0',
    
    initComponent: function() {
        this.callParent();
        
        //必须放在this.callParent函数之后，否则会提示item.each不是函数
        if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_VIEW) {
    		this.setFormViewMode(this);
    	} else if(this.openMode == MyApp.AppConfig.WIN_OPENMODE_CREATE) {
    		this.setFormCrateMode(this);
    	} else if (this.openMode == MyApp.AppConfig.WIN_OPENMODE_EDIT) {
    		this.setFormEditMode(this);
    	}
    },
    
    setFormReadOnly: function(panel) {
    	Ext.each(this.allFields, function(item){
    		var field = panel.down('[name=' + item + ']');
            if(!field) {
                return ;
            }

            field.setFieldStyle(this.readOnlyStyle);
    		field.setReadOnly(true);
    	}, this);
    },
    
    setFormViewMode: function(panel) {
    	Ext.each(this.allFields, function(item){
    		var field = panel.down('[name=' + item + ']');
            if(!field) {
                return ;
            }

            field.setFieldStyle(this.readOnlyStyle);
            // field.setFieldStyle('color:blue');
    		field.setReadOnly(true);
    	}, this);
    	
    	var saveBtn = this.down('button[name=btnSave]');
    	saveBtn.hide();
    },
    
    setFormCrateMode: function(panel) {
    	
    },
    
    setFormEditMode: function(panel) {
    	Ext.each(this.readOnlyFields, function(item){
    		var field = panel.down('[name=' + item + ']');
            if(!field) {
                return ;
            }

            field.setFieldStyle(this.readOnlyStyle);
            // field.setFieldStyle('color:red');
    		field.setReadOnly(true);
    	}, this);
    }
});