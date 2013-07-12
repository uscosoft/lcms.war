 Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	
	var win;
	var formaPrograma;
	
    Ext.tip.QuickTipManager.init();
	
	Ext.define('uscosoft.programa', {
		extend: 'Ext.data.Model',
		fields: [
			'codigo', 'uaa', 'registroSnies', 'titulo', 'creditos', 'nivel_academico'
		]
	});
		
	Ext.define('uscosoft.fielderror', {
		extend: 'Ext.data.Model',
		fields: ['id', 'msg']
	});
	
	
	
    Ext.define('Programa',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            'codigo', 'titulo', 'creditos'
        ]
    });

    // create the Data Store
    var storePrograma = Ext.create('Ext.data.Store', {
        model: 'Programa',
        autoLoad: true,
		pageSize: 10,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../Programa?metodo=getProgramas',
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
    var gridPrograma = Ext.create('Ext.grid.Panel', {
    	title: 'Administracion de Programas',
    	frame: true,
        store: storePrograma,        
        columns: [
            {text: "Codigo", flex: 1, dataIndex: 'codigo'},
            //{text: "Unidad Academica Administrativa", flex: 2, dataIndex: 'uaa'},
            {text: "Titulo", flex: 2, dataIndex: 'titulo'},
            {text: "No. de Creditos", flex: 1, dataIndex: 'creditos'}
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
            store: storePrograma,
			pageSize: 2,
            displayInfo: true,
            displayMsg: 'Mostrando programas {0} - {1} de {2}',
            emptyMsg: "No hay programas para mostrar"
        }),
		
        renderTo:'example-grid',
        width: 900,
        height: 500,       
    });
    
    function adicionar(){
		mostrarForma('Adicionar');
    }
    
    function modificar(){
		//mostrarForma('Modificar');
		
		var registro = gridPrograma.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		//var basedato = comboBaseDato.getValue();
		var codigo = registro.get('codigo');
		//alert(codigo);
		
		
		//editar('Modificar', basedato, codigo, storeAsunto);
		
		mostrarForma('Modificar', codigo, storePrograma);
		cargarRegistro(codigo);
		
    }
    
    function eliminar(){
		var registro = gridPrograma.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		var codigo = registro.get('codigo');
		mostrarForma('Eliminar', codigo, storePrograma);
		cargarRegistro(codigo);
	}
	
	function cargarRegistro(codigo){
		//this.up('formaRecurso').getForm().load({
		formaPrograma.getForm().load({
			url: '../Programa?metodo=getProgramas&codigo=' + codigo,
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
			var storeNivelAcademico = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Programa?metodo=getNivelAcademico',
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
					url: '../Programa?metodo=getUaa',
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

			var textoTitulo = Ext.create('Ext.form.field.Text', {
				name: 'titulo',
				fieldLabel: 'Titulo',
				allowBlank: false  // requires a non-empty value
			});
			
			var textoRegistro = Ext.create('Ext.form.field.Text', {
				name      : 'registroSnies',
				fieldLabel: 'Registro',
				allowBlank: false  //  requires a non-empty value
			});
					
			var textoCreditos = Ext.create('Ext.form.field.Text', {
				name: 'creditos',
				fieldLabel: 'Creditos',
				allowBlank: false  // requires a non-empty value
			});
					
				// Create the combo box, attached to the states data store
				var comboNivelAcademico = Ext.create('Ext.form.ComboBox', {
					name: 'nivel_academico',
					fieldLabel: 'Nivel Academico',
					store: storeNivelAcademico,
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
			
	            formaPrograma = Ext.widget('form', {
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
					model: 'uscosoft.programa',
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
					textoTitulo,					
					textoRegistro,
					textoCreditos,
					comboNivelAcademico,
					comboUaa
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
								url: '../Programa?metodo=editar&accion=' + accion + "&codigo=" + codigo,
								submitEmptyText: false,
								waitMsg: 'Guardando datos...'
							});
                            
							this.up('window').hide();
							storePrograma.load();							
							
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Programa',
                closeAction: 'hide',
                width: 500,
                height: 500,
                minWidth: 500,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formaPrograma,
                defaultFocus: 'nombre'
            });
        //}
        win.show();
    }
});
