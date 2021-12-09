sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/build/standard/cis/model/models",
	"com/sap/build/standard/cis/controller/ListSelector",
	"./model/errorHandling"
], function(UIComponent, Device, models, ListSelector, errorHandling) {
	"use strict";

	var navigationWithContext = {
		"ProductSet": {
			"MasterPage1": "Supplier",
			"DetailPage1": "Supplier",
			"DetailPage2": "Supplier"
		},
		"SupplierSet": {
			"MasterPage1": "",
			"DetailPage1": "",
			"DetailPage2": "",
			"MasterPage2": "citas",
			"DetailPage6": "citas",
			"MasterPage3": "Cliente",
			"DetailPage7": "Cliente"
		},
		"CalendarioSet": {
			"MasterPage1": "Supplier",
			"DetailPage1": "Supplier",
			"DetailPage2": "Supplier",
			"MasterPage3": "Cliente",
			"DetailPage7": "Cliente"
		},
		"CommunicationMethodSet": {
			"MasterPage1": "Supplier",
			"DetailPage1": "Supplier",
			"DetailPage2": "Supplier"
		},
		"Cities_AvailableSet": {
			"MasterPage1": "Supplier",
			"DetailPage1": "Supplier",
			"DetailPage2": "Supplier"
		},
		"Services_AvailableSet": {
			"MasterPage1": "Supplier",
			"DetailPage1": "Supplier",
			"DetailPage2": "Supplier"
		},
		"ClienteSet": {
			"MasterPage1": "Supplier",
			"DetailPage1": "Supplier",
			"DetailPage2": "Supplier",
			"MasterPage2": "cita_agente",
			"DetailPage6": "cita_agente",
			"MasterPage3": "",
			"DetailPage7": ""
		},
		"Cita_AgenteSet": {
			"MasterPage1": "Agente",
			"DetailPage1": "Agente",
			"DetailPage2": "Agente",
			"MasterPage2": "",
			"DetailPage6": "",
			"MasterPage3": "Cliente",
			"DetailPage7": "Cliente"
		}
	};

	return UIComponent.extend("com.sap.build.standard.cis.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the FLP and device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function() {
			this.oListSelector = new ListSelector();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the FLP model
			this.setModel(models.createFLPModel(), "FLP");

			// set the dataSource model
			this.setModel(new sap.ui.model.json.JSONModel({
				"uri": "/here/goes/your/serviceUrl/local/"
			}), "dataSource");

			// set application model
			var oApplicationModel = new sap.ui.model.json.JSONModel({});
			this.setModel(oApplicationModel, "applicationModel");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// delegate error handling
			errorHandling.register(this);

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ListSelector and ErrorHandler are destroyed.
		 * @public
		 * @override
		 */
		destroy: function() {
			this.oListSelector.destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		getNavigationPropertyForNavigationWithContext: function(sEntityNameSet, targetPageName) {
			var entityNavigations = navigationWithContext[sEntityNameSet];
			return entityNavigations == null ? null : entityNavigations[targetPageName];
		}

	});

});
