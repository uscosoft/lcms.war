Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	
	var win;
	var formaRecurso;
	
    Ext.tip.QuickTipManager.init();
	
	Ext.define('uscosoft.recurso', {
		extend: 'Ext.data.Model',
		fields: [
			'codigo', 'nombre', 'descripcion', 'url', 'tipo', 'estado'
		]
	});
		
	Ext.define('uscosoft.fielderror', {
		extend: 'Ext.data.Model',
		fields: ['id', 'msg']
	});
	
	
	
    Ext.define('Recurso',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            'codigo', 'nombre', 'url'
        ]
    });

    // create the Data Store
    var storeRecurso = Ext.create('Ext.data.Store', {
        model: 'Recurso',
        autoLoad: true,
		pageSize: 2,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../Recurso?metodo=getRecursos',
            // the return will be XML, so lets set up a reader
            reader: {
                type: 'xml',
                // records will have an "Item" tag
                record: 'registro',
                idProperty: 'codigo',
                totalRecords: '@total'
            }
        }
    });

    // create the grid
    var gridRecurso = Ext.create('Ext.grid.Panel', {
    	title: 'Administracion de Recursos',
    	frame: true,
        store: storeRecurso,
        columns: [
            {text: "Codigo", flex: 1, dataIndex: 'codigo'},
            {text: "Nombre", flex: 2, dataIndex: 'nombre'},
            {text: "URL", flex: 2, dataIndex: 'url'}
        ],
        dockedItems: [{
            xtype: 'toolbar',
            items: ['->', {
                iconCls: 'icon-adicionar',
                text: 'Adicionar',
                scope: this,
                handler: adicionar
            }, {
                iconCls: 'icon-modificar',
                text: 'Modificar',
                itemId: 'modificar',
                scope: this,
                handler: modificar
            }, {
                iconCls: 'icon-eliminar',
                text: 'Eliminar',
                itemId: 'delete',
                scope: this,
                handler: eliminar
            }]
        }],
		
		// paging bar on the bottom
        bbar: Ext.create('Ext.PagingToolbar', {
            store: storeRecurso,
			pageSize: 2,
            displayInfo: true,
            displayMsg: 'Mostrando registros {0} - {1} de {2}',
            emptyMsg: "No hay registros para mostrar"
        }),
		
        renderTo:'example-grid',
        width: 680,
        height: 400
    });
    
    function adicionar(){
		mostrarForma('Adicionar');
    }
    
    function modificar(){
		//mostrarForma('Modificar');
		
		var registro = gridRecurso.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		//var basedato = comboBaseDato.getValue();
		var codigo = registro.get('codigo');
		//alert(codigo);
		
		
		//editar('Modificar', basedato, codigo, storeAsunto);
		
		mostrarForma('Modificar', codigo, storeRecurso);
		cargarRegistro(codigo);
		
    }
    
    function eliminar(){
		var registro = gridRecurso.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		var codigo = registro.get('codigo');
		mostrarForma('Eliminar', codigo, storeRecurso);
		cargarRegistro(codigo);
	}
	
	function cargarRegistro(codigo){
		//this.up('formaRecurso').getForm().load({
		formaRecurso.getForm().load({
			url: '../Recurso?metodo=getRecursos&codigo=' + codigo,
			waitMsg: 'Cargando...'
		});
	}					
	
	//------------------------------------------------------------
	//			formulario
	//------------------------------------------------------------
	function mostrarForma(accion, codigo, store) {
        //if (!win) {
		
			Ext.define('Item',{
				extend: 'Ext.data.Model',
				proxy: {
					type: 'ajax',
					reader: 'xml'
				},
				fields: [
					'codigo', 'nombre'
				]
			});

			// create the Data Store
			var storeTipoRecurso = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Recurso?metodo=getTipoRecurso',
					// the return will be XML, so lets set up a reader
					reader: {
						type: 'xml',
						// records will have an "Item" tag
						record: 'registro',
						idProperty: 'codigo',
						totalRecords: '@total'
					}
				}
			});
				
			// The data store containing the list of states
			var estados = Ext.create('Ext.data.Store', {
				fields: ['codigo', 'nombre'],
				data : [
					{"codigo":"1", "nombre":"Activo"},
					{"codigo":"2", "nombre":"No Activo"},
					{"codigo":"3", "nombre":"Bloqueado"}
				]
			});

			var textoNombre = Ext.create('Ext.form.field.Text', {
				name: 'nombre',
				fieldLabel: 'Nombre',
				allowBlank: false  // requires a non-empty value
			});
			
			var textoDescripcion = Ext.create('Ext.form.field.TextArea', {
				grow      : false,
				name      : 'descripcion',
				fieldLabel: 'Descripcion',
				anchor    : '100%'
			});
					
			var textoURL = Ext.create('Ext.form.field.Text', {
				name: 'url',
				fieldLabel: 'URL',
				allowBlank: false  // requires a non-empty value
			});
					
			// Create the combo box, attached to the states data store
			var comboEstado = Ext.create('Ext.form.ComboBox', {
				name: 'estado',
				fieldLabel: 'Estado',
				store: estados,
				queryMode: 'local',
				displayField: 'nombre',
				valueField: 'codigo'
			});
			
			var comboTipoRecurso = Ext.create('Ext.form.ComboBox', {
				name: 'tipo',
				fieldLabel: 'Tipo',
				store: storeTipoRecurso,
				queryMode: 'remote',
				displayField: 'nombre',
				valueField: 'codigo'
			});
		
            formaRecurso = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold',
					msgTarget: 'side'
                },
				
				// configure how to read the XML data, using an instance
				reader : new Ext.data.reader.Xml({
					model: 'uscosoft.recurso',
					record : 'registro',
					successProperty: '@exito'
				}),

				// configure how to read the XML error, using a config
				errorReader: {
					type: 'xml',
					model: 'uscosoft.fielderror',
					record : 'field',
					successProperty: '@exito'
				},
				
                items: [
					comboTipoRecurso,
					textoNombre,
					textoDescripcion,
					textoURL,
					comboEstado
				],

                buttons: [{
                    text: 'Cancel',
                    handler: function() {
                        //this.up('form').getForm().reset();
                        this.up('window').hide();
						
						/*
						var codigo = '2';
						this.up('form').getForm().load({
							url: '../Recurso?metodo=getRecursos&codigo=' + codigo,
							waitMsg: 'Cargando...'
						});
						*/
                    }
                }, {
                    text: accion,
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            // In a real application, this would submit the form to the configured url
                            
							this.up('form').getForm().submit({
								url: '../Recurso?metodo=editar&accion=' + accion + "&codigo=" + codigo,
								submitEmptyText: false,
								waitMsg: 'Guardando datos...'
							});
                            
							this.up('window').hide();
							storeRecurso.load();
							
							//this.up('form').getForm().reset();
                            //this.up('window').hide();
                            //Ext.MessageBox.alert('Thank you!', 'Your inquiry has been sent. We will respond as soon as possible.');
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Recurso',
                closeAction: 'hide',
                width: 500,
                height: 500,
                minWidth: 500,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formaRecurso,
                defaultFocus: 'nombre'
            });
        //}
        win.show();
    }
});