 Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	
	var win;
	var formaPerfil;
	
    Ext.tip.QuickTipManager.init();
	
	Ext.define('uscosoft.perfil', {
		extend: 'Ext.data.Model',
		fields: [
			'codigo', 'usuario', 'perfil', 'uaa', 'estado'
		]
	});
		
	Ext.define('uscosoft.fielderror', {
		extend: 'Ext.data.Model',
		fields: ['id', 'msg']
	});
	
	
	
    Ext.define('Perfil',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            'codigo', 'usuario', 'perfil'
        ]
    });

    // create the Data Store
    var storeUsuarioPerfil = Ext.create('Ext.data.Store', {
        model: 'Perfil',
        autoLoad: true,
		pageSize: 10,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../Perfil?metodo=getUsuariosPerfiles',
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
    var gridUsuarioPerfil = Ext.create('Ext.grid.Panel', {
    	title: 'Asignacion de Perfiles',
    	frame: true,
        store: storeUsuarioPerfil,        
        columns: [
            {text: "Codigo", flex: 1, dataIndex: 'codigo'},
            //{text: "Unidad Academica Administrativa", flex: 2, dataIndex: 'uaa'},
            {text: "Usuario", flex: 1, dataIndex: 'usuario'},
            {text: "Perfil", flex: 1, dataIndex: 'perfil'}
            //{text: "Nivel Academico", flex: 2, dataIndex: 'nivel_academico'}
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
            store: storeUsuarioPerfil,
			pageSize: 2,
            displayInfo: true,
            displayMsg: 'Mostrando usuarios/perfiles {0} - {1} de {2}',
            emptyMsg: "No hay usuarios/perfiles para mostrar"
        }),
		
        renderTo:'example-grid',
        width: 600,
        height: 400,       
    });
    
    function adicionar(){
		mostrarForma('Adicionar');
    }
    
    function modificar(){
		//mostrarForma('Modificar');
		
		var registro = gridUsuarioPerfil.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		//var basedato = comboBaseDato.getValue();
		var codigo = registro.get('codigo');
		//alert(codigo);
		
		
		//editar('Modificar', basedato, codigo, storeAsunto);
		
		mostrarForma('Modificar', codigo, storeUsuarioPerfil);
		cargarRegistro(codigo);
		
    }
    
    function eliminar(){
		var registro = gridUsuarioPerfil.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		var codigo = registro.get('codigo');
		mostrarForma('Eliminar', codigo, storeUsuarioPerfil);
		cargarRegistro(codigo);
	}
	
	function cargarRegistro(codigo){
		//this.up('formaRecurso').getForm().load({
		formaPerfil.getForm().load({
			url: '../Perfil?metodo=getUsuariosPerfiles&codigo=' + codigo,
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
			var storeUsuario = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Perfil?metodo=getUsuarios',
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
			
			// create the Data Store
			var storePerfil = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Perfil?metodo=getPerfiles',
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
			
			// create the Data Store
			var storeEstado = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Perfil?metodo=getEstados',
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
			
			// create the Data Store
			var storeUaa = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Perfil?metodo=getUaa',
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

			
							
				// Create the combo box, attached to the states data store
				var comboUsuario = Ext.create('Ext.form.ComboBox', {
					name: 'usuario',
					fieldLabel: 'Usuario',
					store: storeUsuario,
					queryMode: 'remote',
					displayField: 'nombre',
					valueField: 'codigo'
				});
				
				var comboPerfil = Ext.create('Ext.form.ComboBox', {
					name: 'perfil',
					fieldLabel: 'Perfil',
					store: storePerfil,
					queryMode: 'remote',
					displayField: 'nombre',
					valueField: 'codigo'
				});
				
				var comboUaa = Ext.create('Ext.form.ComboBox', {
					name: 'uaa',
					fieldLabel: 'Unidad Academica Administrativa',
					store: storeUaa,
					queryMode: 'remote',
					displayField: 'nombre',
					valueField: 'codigo'
				});
				
				var comboEstado = Ext.create('Ext.form.ComboBox', {
					name: 'estado',
					fieldLabel: 'Estado',
					store: storeEstado,
					queryMode: 'remote',
					displayField: 'nombre',
					valueField: 'codigo'
				});
			
	            formaPerfil = Ext.widget('form', {
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
					model: 'uscosoft.perfil',
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
					comboUsuario,
					comboPerfil,
					comboUaa,					
					comboEstado
				],

                buttons: [{
                    text: 'Cancel',
                    handler: function() {                       
                        this.up('window').hide();
						
                    }
                }, {
                    text: accion,
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                                                       
							this.up('form').getForm().submit({
								url: '../Perfil?metodo=editar&accion=' + accion + "&codigo=" + codigo,
								submitEmptyText: false,
								waitMsg: 'Guardando datos...'
							});
                            
							this.up('window').hide();
							storeUsuarioPerfil.load();							
							
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Perfil',
                closeAction: 'hide',
                width: 500,
                height: 500,
                minWidth: 500,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formaPerfil,
                defaultFocus: 'nombre'
            });
        //}
        win.show();
    }
});
