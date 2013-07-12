Ext.require([
    'Ext.data.*',
    'Ext.grid.*'
]);

Ext.onReady(function(){
    Ext.define('Book',{
        extend: 'Ext.data.Model',
        proxy: {
            type: 'ajax',
            reader: 'xml'
        },
        fields: [
            // set up the fields mapping into the xml doc
            // The first needs mapping, the others are very basic
            'titulo', 'creditos', 'registro'
        ]
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        model: 'Book',
        autoLoad: true,
        proxy: {
            // load using HTTP
            type: 'ajax',
            url: '../Porgrama?metodo=getProgramas',
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
    Ext.create('Ext.grid.Panel', {
    	title: 'Administracion de Programas',
    	frame: true,
        store: store,
        columns: [
            {text: "Titulo", flex: 2, dataIndex: 'titulo'},
            {text: "Creditos", flex: 1, dataIndex: 'creditos'},
            {text: "Registro", flex: 1, dataIndex: 'registro'}
        ],
        dockedItems: [{
            xtype: 'toolbar',
            items: ['->',{
                iconCls: 'icon-add',
                text: 'Add',
                scope: this,
                handler: adicionar
            }, {
                iconCls: 'icon-delete',
                text: 'Delete',
                disabled: true,
                itemId: 'delete',
                scope: this//,
                //handler: this.onDeleteClick
            }]
        }],
        renderTo:'example-grid',
        width: 640,
        height: 320
    });
	
	function adicionar(){
		//alert('ADDDDD');
		
		 Ext.MessageBox.show({
           msg: 'Saving your data, please wait...',
           progressText: 'Saving...',
           width:300,
           wait:true,
           waitConfig: {interval:200},
           icon:'ext-mb-download', //custom class in msg-box.html
           animateTarget: 'mb7'
       });
		
	}
});
