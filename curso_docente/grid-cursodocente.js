Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	
	var win;
	var formaCursoDocente;
	
    Ext.tip.QuickTipManager.init();
	
	Ext.define('uscosoft.cursodocente', {
		extend: 'Ext.data.Model',
		fields: [
			'codigo','nombre', 'asignatura', 'calendario', 'estudiante', 'descripcion'
		] 
	});
		
	Ext.define('uscosoft.fielderror', {
		extend: 'Ext.data.Model',
		fields: ['id', 'msg']
	});
	
	
	
    Ext.define('Cursodocente',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            'codigo','nombre', 'asignatura', 'calendario', 'estudiante', 'descripcion'
        ]
    });

    // create the Data Store
    var storeCursoDocente = Ext.create('Ext.data.Store', {
        model: 'Cursodocente',
        autoLoad: true,
		pageSize: 2,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../Cursodocente?metodo=getCursosDocente',
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
    var gridCursoDocente = Ext.create('Ext.grid.Panel', {
    	title: 'Cursos por Docente',
    	frame: true,
        store: storeCursoDocente,
        columns: [
            {text: "Codigo", flex: 1, dataIndex: 'codigo'},
			{text: "Nombre", flex: 2, dataIndex: 'nombre'},
            {text: "Asignatura", flex: 2, dataIndex: 'asignatura'},
            {text: "Calendario", flex: 2, dataIndex: 'calendario'},
			{text: "Estudiante", flex: 2, dataIndex: 'estudiante'},
			{text: "Descripcion", flex: 2, dataIndex: 'descripcion'}
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
            store: storeCursoDocente,
			pageSize: 2,
            displayInfo: true,
            displayMsg: 'Mostrando registros {0} - {1} de {6}',
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
		
		var registro = gridCursoDocente.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		//var basedato = comboBaseDato.getValue();
		var codigo = registro.get('codigo');
		//alert(codigo);
		
		
		//editar('Modificar', basedato, codigo, storeAsunto);
		
		mostrarForma('Modificar', codigo, storeCursoDocente);
		cargarRegistro(codigo);
		
    }
    
    function eliminar(){
		var registro = gridCursoDocente.getSelectionModel().getSelection()[0];
		
		if (!registro) {
			alert("Por favor seleccione el registro.");
			return false;
		}
		var codigo = registro.get('codigo');
		mostrarForma('Eliminar', codigo, storeCursoDocente);
		cargarRegistro(codigo);
	}
	
	function cargarRegistro(codigo){
		//this.up('formaRecurso').getForm().load({
		formaCursoDocente.getForm().load({
			url: '../Cursodocente?metodo=getCursosDocente&codigo=' + codigo,
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
			var storeEstudiante = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Cursodocente?metodo=getEstudiante',
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
			var storeAsignatura = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Cursodocente?metodo=getAsignatura',
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
			
			var storeCalendario = Ext.create('Ext.data.Store', {
				model: 'Item',
				autoLoad: true,
				//pageSize: 2,
				proxy: {
					// load using HTTP
					type: 'ajax',
					url: '../Cursodocente?metodo=getCalendario',
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
					
			
			var comboEstudiante = Ext.create('Ext.form.ComboBox', {
				name: 'estudiante',
				fieldLabel: 'Estudiante',
				store: storeEstudiante,
				queryMode: 'remote',
				displayField: 'nombre',
				valueField: 'codigo'
			});
			
			var comboAsignatura = Ext.create('Ext.form.ComboBox', {
				name: 'asignatura',
				fieldLabel: 'Asignatura',
				store: storeAsignatura,
				queryMode: 'remote',
				displayField: 'nombre',
				valueField: 'codigo'
			});
			
				var comboCalendario = Ext.create('Ext.form.ComboBox', {
				name: 'calendario',
				fieldLabel: 'Calendario',
				store: storeCalendario,
				queryMode: 'remote',
				displayField: 'nombre',
				valueField: 'codigo'
			});
		
            formaCursoDocente = Ext.widget('form', {
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
					model: 'uscosoft.cursodocente',
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
					comboAsignatura,
					comboEstudiante,
					textoNombre,
					textoDescripcion,
					comboCalendario
					//comboEstado
				],

                buttons: [{
                    text: 'Cancel',
                    handler: function() {
                        //this.up('form').getForm().reset();
                        this.up('window').hide();
						
					
                    }
                }, {
                    text: accion,
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            // In a real application, this would submit the form to the configured url
                            
							this.up('form').getForm().submit({
								url: '../Cursodocente?metodo=editar&accion=' + accion + "&codigo=" + codigo,
								submitEmptyText: false,
								waitMsg: 'Guardando datos...'
							});
                            
							this.up('window').hide();
							storeCursoDocente.load();
							
						
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Cursodocente',
                closeAction: 'hide',
                width: 500,
                height: 500,
                minWidth: 500,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formaCursoDocente,
                defaultFocus: 'nombre'
            });
        //}
        win.show();
    }
});
