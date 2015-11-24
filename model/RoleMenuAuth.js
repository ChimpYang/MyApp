Ext.define('MyApp.model.RoleMenuAuth', {
    extend: 'Ext.data.Model',
    alias: 'model.roleMenuAuth',
    
    fields: [
	    {name: 'id', type: 'int'},
		'menuCode',
		'menuTitle',
		'roleCode',
		{name: 'canCreate', type: 'int'},
		{name: 'canRemove', type: 'int'},
		{name: 'canModify', type: 'int'},
		{name: 'canQuery', type: 'int'},
		{name: 'canExport', type: 'int'},
		{name: 'canImport', type: 'int'},
		{name: 'canAttachmentCreate', type: 'int'},
		{name: 'canAttachmentRemove', type: 'int'},
		{name: 'canEnable', type: 'int'},
		{name: 'canDisable', type: 'int'},
		{name: 'canSpecial1', type: 'int'},
		{name: 'canSpecial2', type: 'int'},
		{name: 'canSpecial3', type: 'int'}
    ]

});