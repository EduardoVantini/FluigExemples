function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    log.info("QUERY: " + myQuery);
    var dataSource = "/jdbc/RM_SQLSERVER";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    // var myQuery = "select codetdmunicipio as 'estado', nomemunicipio as 'cidade' from gmunicipio";
    var myQuery = getSQL(constraints);
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }

    return newDataset;
}


function getSQL(constraints) {
    var query
    var filtro = "";

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "venda" && constraints[i].initialValue && constraints[i].initialValue != "") {

                filtro = " where codgrupo = 1 and numvenda = " + constraints[i].initialValue

            }
        }
        if (filtro == "") {
            query = ""
        }
    } else {
        
    }


    query = "select idlan from xvendaparcela" + filtro

    
    log.info(query);
    
    
    return query;
}