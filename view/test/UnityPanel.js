Ext.define('MyApp.view.test.UnityPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'unityDemoPanel',
    
    // requires:[
    	// 'MyApp.view.test.UnityPanelController',
    // ],
    
    config: {
        params: null,
    },
    controller: 'unityPanel',
    
    initComponent: function() {
        var me = this;
 
        this.callParent();
    },
    
    bodyStyle: 'background:#f00;',
    
    unityObject2: null,
    
    insertUnity: function(width, height) {
    	var config = {
			params: { 
				enableDebugging: "0",
				disableContextMenu: true
			}
		};
		
		var html = '';
		html += '<div class="content">';
		html += '	<div id="unityPlayer" style="margin:auto auto;" >';
		html += '		<div class="missing">';
		html += '			<a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!">';
		html += '				<img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" />';
		html += '			</a>';
		html += '		</div>';
		html += '		<div class="broken">';
		html += '			<a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now! Restart your browser after install.">';
		html += '				<img alt="Unity Web Player. Install now! Restart your browser after install." src="http://webplayer.unity3d.com/installation/getunityrestart.png" width="193" height="63" />';
		html += '			</a>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		
		var panelId = this.id+'-body';
		this.getEl().getById(panelId).insertHtml('afterBegin', html);
		
		$("#unityPlayer").height(height);
		$("#unityPlayer").width(width);
			
        var u = new UnityObject2(config);
 		jQuery(function() {
 			var $missingScreen = jQuery("#unityPlayer").find(".missing");
			var $brokenScreen = jQuery("#unityPlayer").find(".broken");
			$missingScreen.hide();
			$brokenScreen.hide();
			
			u.observeProgress(function (progress) {
				switch(progress.pluginStatus) {
					case "broken":
						$brokenScreen.find("a").click(function (e) {
							e.stopPropagation();
							e.preventDefault();
							u.installPlugin();
							return false;
						});
						$brokenScreen.show();
					break;
					case "missing":
						$missingScreen.find("a").click(function (e) {
							e.stopPropagation();
							e.preventDefault();
							u.installPlugin();
							return false;
						});
						$missingScreen.show();
					break;
					case "installed":
						$missingScreen.remove();
					break;
					case "first":
					break;
				}
			});
			// u.initPlugin(jQuery("#unityPlayer")[0], "resources/unity/demo.unity3d");
			u.initPlugin(jQuery("#unityPlayer")[0], "resources/unity/webplay.unity3d");
		});//jQuery
		
		this.unityObject2 = u;
    },
    
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;
        
        if(!this.unityObject2) {
        	this.insertUnity(width, height);
        }
        
    }, //fucntion
    
});