 Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	
	var win;
	var formaUsers;
	
    Ext.tip.QuickTipManager.init();
	
	Ext.define('uscosoft.users', {
		extend: 'Ext.data.Model',
		fields: [
			'codigo', 'persona', 'login', 'password', 'estado'
		]
	});
		
	Ext.define('uscosoft.fielderror', {
		extend: 'Ext.data.Model',
		fields: ['id', 'msg']
	});
	
	
	
    Ext.define('Users',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            'codigo', 'login', 'password'
        ]
    });

    // create the Data Store
    var storeUsers = Ext.create('Ext.data.Store', {
        model: 'Users',
        autoLoad: true,
		pageSize: 10,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../Users?metodo=getUsers',
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
    var gridUsers = Ext.create('Ext.grid.Panel', {
    	title: 'Administracion de Usuarios',
    	frame: true,
        store: storeUsers,        
        columns: [
            {text: "Codigo", flex: 1, dataIndex: 'codigo'},
            //{text: "Unidad Academica Administrativa", flex: 2, dataIndex: 'uaa'},
            {text: "Login", flex: 1, dataIndex: 'login'},
            {text: "Password", flex: 1, dataIndex: 'password'}
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
            store: storeUsers,
			pageSize: 2,
            displayInfo: true,
            displayMsg: 'Mostrando usuarios {0} - {1} de {2}',
            emptyMsg: "No hay usuarios para mostrar"
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
		
		var registro = gridUsers.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		//var basedato = comboBaseDato.getValue();
		var codigo = registro.get('codigo');
		//alert(codigo);
		
		
		//editar('Modificar', basedato, codigo, storeAsunto);
		
		mostrarForma('Modificar', codigo, storeUsers);
		cargarRegistro(codigo);
		
    }
    
    function eliminar(){
		var registro = gridUsers.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		var codigo = registro.get('codigo');
		mostrarForma('Eliminar', codigo, storeUsers);
		cargarRegistro(codigo);
	}
	
	function cargarRegistro(codigo){
		//this.up('formaRecurso').getForm().load({
		formaUsers.getForm().load({
			url: '../Users?metodo=getUsers&codigo=' + codigo,
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
			var storePersona = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Users?metodo=getPersonas',
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
					url: '../Users?metodo=getEstados',
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

			var textoLogin = Ext.create('Ext.form.field.Text', {
				name: 'login',
				fieldLabel: 'Login',
				allowBlank: false  // requires a non-empty value
			});
			
			var textoPassword = Ext.create('Ext.form.field.Text', {
				name      : 'password',
				fieldLabel: 'Password',
				allowBlank: false  //  requires a non-empty value
			});					
							
				// Create the combo box, attached to the states data store
				var comboPersona = Ext.create('Ext.form.ComboBox', {
					name: 'persona',
					fieldLabel: 'Persona',
					store: storePersona,
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
			
	            formaUsers = Ext.widget('form', {
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
					model: 'uscosoft.users',
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
					comboPersona,
					textoLogin,					
					textoPassword,					
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
								url: '../Users?metodo=editar&accion=' + accion + "&codigo=" + codigo,
								submitEmptyText: false,
								waitMsg: 'Guardando datos...'
							});
                            
							this.up('window').hide();
							storeUsers.load();							
							
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Users',
                closeAction: 'hide',
                width: 500,
                height: 500,
                minWidth: 500,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formaUsers,
                defaultFocus: 'nombre'
            });
        //}
        win.show();
    }
});
