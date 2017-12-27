define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dijit/_WidgetBase","dojo/on","dojo/dom","dojo/dom-class","dojo/dom-construct","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/layout/TabContainer","dojo/Deferred"],function(e,t,i,n,o,s,d,a,r,l,c,h){return t("application.Drawer",[n,e],{options:{showDrawerSize:850,borderContainer:null,contentPaneCenter:null,contentPaneSide:null,toggleButton:null,mapResizeTimeout:300,mapResizeStepTimeout:25,config:null},constructor:function(e){var t=i.mixin({},this.options,e);this.set("showDrawerSize",t.showDrawerSize),this.set("borderContainer",t.borderContainer),this.set("contentPaneCenter",t.contentPaneCenter),this.set("mapResizeTimeout",t.mapResizeTimeout),this.set("mapResizeStepTimeout",t.mapResizeStepTimeout),this.css={toggleButton:"toggle-grey",toggleButtonSelected:"toggle-grey-on",drawerOpen:"drawer-open",drawerOpenComplete:"drawer-open-complete"}},startup:function(){this._init()},destroy:function(){this._removeEvents(),this.inherited(arguments)},resize:function(){this._borderContainer&&this._borderContainer.layout()},toggle:function(e){var t=new h,n=d.contains(document.body,this.css.drawerOpen);if(n&&!0===e||!n&&!1===e)return t.promise;var o;return o=void 0!==e?d.toggle(document.body,this.css.drawerOpen,e):d.toggle(document.body,this.css.drawerOpen,!n),d.remove(document.body,this.css.drawerOpenComplete),this._animationSteps&&(clearInterval(this._animationSteps),this._animationSteps=null),this._animationSteps=setInterval(i.hitch(this,function(){this.resize()}),this.get("mapResizeStepTimeout")),this._animationTimeout&&(clearTimeout(this._animationTimeout),this._animationTimeout=null),this._animationTimeout=setTimeout(i.hitch(this,function(){this._checkDrawerStatus(),clearInterval(this._animationSteps),this._animationSteps=null,o&&d.add(document.body,this.css.drawerOpenComplete),t.resolve()}),this.get("mapResizeTimeout")),t.promise},_removeEvents:function(){if(this._events&&this._events.length)for(var e=0;e<this._events.length;e++)this._events[e].remove();this._events=[],this._contentPaneCenter&&this._contentPaneCenter.destroy(),this._contentPaneSide&&this._contentPaneSide.destroy(),this._borderContainer&&this._borderContainer.destroy()},_init:function(){if(this._removeEvents(),this._borderContainerNode=s.byId(this.get("borderContainer")),this._contentPaneCenterNode=s.byId(this.get("contentPaneCenter")),this._borderContainerNode&&this._contentPaneCenterNode){if(this._borderContainer=new r({design:"sidebar",gutters:!1},this._borderContainerNode),this._contentPaneCenter=new l({region:"center",style:{padding:0}},this._contentPaneCenterNode),this._borderContainer.addChild(this._contentPaneCenter),this.displayDrawer){this._contentPaneSide=new l({region:"leading",id:"cp_left",style:{padding:0}},a.create("div",{class:"content-pane-left"})),this._borderContainer.addChild(this._contentPaneSide);var e=new c({id:"tabContainer",class:"tabs"},a.create("div",{},"cp_left")),t=0;if(this.config.legend||this.config.legendlayers){t+=1;var n=new l({id:"legend",title:this.config.i18n.tools.legend.title,selected:!0},a.create("div"));e.addChild(n)}if(this.config.details){t+=1;var h=new l({id:"details",title:this.config.i18n.tools.details.title},a.create("div"));e.addChild(h)}if(this.config.popup_sidepanel){t+=1;var g=new r({id:"popup",title:this.config.i18n.tools.popup.title},a.create("div")),u=new l({region:"center",id:"info_content"},a.create("div"));g.addChild(u);var p=new l({region:"top",id:"info_header",content:"<div id='selectCount' class='no-select'>"+this.config.i18n.tools.popup.instructions+"</div><div id='popupNav'><div id='prev_nav' class='nav esri-icon-left'></div><div id='next_nav'class='nav esri-icon-right'></div><div id='nav_count'class='nav no-select'></div></div>"},a.create("div"));g.addChild(p),e.addChild(g)}d.add(e.domNode,"tab_"+t),e.startup(),a.create("div",{innerHTML:"<div tabindex='0' class='vertical-line'><button  id='toggle_button' tabindex='0' class='menu-button' title='"+this.config.i18n.map.toggle+"' aria-label='"+this.config.i18n.map.toggle+"'></button></div>"},this._contentPaneCenterNode),this._toggleNode=s.byId("toggle_button")}else d.add(document.body,"no-title");if(d.add(document.body,"drawer-closed"),this._borderContainer.startup(),this.displayDrawer){var _=o(this._toggleNode,"click",i.hitch(this,function(){d.remove(document.body,"drawer-closed"),this.toggle()}));this._events.push(_)}this.drawerOpen?(this._toggleNode.click(),this.resize()):(d.add(document.body,this.css.drawerOpen),this.toggle(!1).always(i.hitch(this,function(){this.resize()}))),this.set("loaded",!0),this.emit("load",{})}else console.log("Drawer::Missing required node")},_checkDrawerStatus:function(){this.displayDrawer&&this._toggleButton()},_toggleButton:function(){d.contains(document.body,this.css.drawerOpen)?(d.contains(this._toggleNode),d.replace(this._toggleNode,"esri-icon-expand","esri-icon-collapse"),d.contains(this._toggleNode,this.css.toggleButton)&&d.replace(this._toggleNode,this.css.toggleButtonSelected,this.css.toggleButton)):(d.contains(this._toggleNode),d.replace(this._toggleNode,"esri-icon-collapse","esri-icon-expand"),d.contains(this._toggleNode,this.css.toggleButtonSelected)&&d.replace(this._toggleNode,this.css.toggleButton,this.css.toggleButtonSelected))}})});