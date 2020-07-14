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
            if (constraints[i].fieldName == "codcoligada" && constraints[i].initialValue && constraints[i].initialValue != "") {

                filtro = "" ? filtro = " where p.codcoligada = " + constraints[i].initialValue:filtro += " and p.codcoligada = " + constraints[i].initialValue

            }
            if (constraints[i].fieldName == "componente" && constraints[i].initialValue && constraints[i].initialValue != "") {
            
                filtro = "" ? filtro = " where p.cod_compn = " + constraints[i].initialValue:filtro += " and p.cod_compn = " + constraints[i].initialValue

            }
        }
        if (filtro == "") {
            query = ""
        }
    } else {
        query = "select p.codfilial as 'codfilial' " +
                    ",p.codccusto as 'codccusto' " +
                    ",p.codnatfinanceirarec as 'codnatfinanceirarec' " +
                    ",p.codnatfinanceirapag as 'codnatfinanceirapag' " +
                    ",p.codtdorec as 'codtdorec' " +
                    ",p.codtdopag as 'codtdopag' " +
                "from xcomponente c join xtipoparcela t on c.cod_tipo_parc = t.cod_tipo_parc " +
                    "join xparametrostipoparcela p on  t.cod_tipo_parc = p.cod_tipo_parc " + filtro
    }

    
    log.info(query);
    
    
    return query;
}